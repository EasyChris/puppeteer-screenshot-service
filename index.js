import express from 'express';
import puppeteer from 'puppeteer';
import { default as PQueue } from 'p-queue';
import crypto from 'crypto';

const app = express();
const port = 3000;

// Create a queue with concurrency of 1 (i.e., one screenshot at a time)
const queue = new PQueue({ concurrency: 1 });

// Function to generate a random string
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Function to scroll the page to load lazy-loaded content
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Function to pause execution for a given amount of time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  const type = req.query.type;
  const width = parseInt(req.query.width, 10) || null;
  const height = parseInt(req.query.height, 10) || null;
  const fullPage = req.query.fullPage === 'true';

  if (!url) {
    return res.status(400).send('URL parameter is missing');
  }

  // Add the screenshot task to the queue
  queue.add(async () => {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      if (type === 'mobile') {
        // Set the viewport to the iPhone 15 dimensions or custom dimensions
        await page.setViewport({
          width: width || 585,
          height: height || 1266,
          deviceScaleFactor: 3,  // iPhone 15's Retina display
        });
        // Set the user agent to a mobile user agent
        await page.setUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        );
      } else {
        // Set the viewport to the default or custom dimensions
        await page.setViewport({
          width: width || 1920,
          height: height || 1080,
          deviceScaleFactor: 2,  // Default Retina display
        });
      }

      await page.goto(url, { waitUntil: 'networkidle2' });

      // Scroll to load lazy-loaded content
      await autoScroll(page);
      
      // Wait for a few seconds to ensure lazy-loaded content is loaded
      await sleep(3000);

      const screenshotBuffer = await page.screenshot({ encoding: 'binary', fullPage: fullPage });
      await browser.close();

      // Generate a random file name
      const randomFileName = `screenshot_${generateRandomString(8)}.png`;

      res.setHeader('Content-Disposition', `attachment; filename=${randomFileName}`);
      res.setHeader('Content-Type', 'image/png');
      res.send(screenshotBuffer);
    } catch (error) {
      console.error(`Failed to capture screenshot: ${error.message}`);
      res.status(500).send(`Failed to capture screenshot: ${error.message}`);
    }
  }).catch(error => {
    console.error(`Queue error: ${error.message}`);
    res.status(500).send(`Queue error: ${error.message}`);
  });
});

app.listen(port, () => {
  console.log(`Screenshot service listening at http://localhost:${port}`);
});
