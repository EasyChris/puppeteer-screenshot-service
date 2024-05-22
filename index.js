const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL parameter is missing');
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set the viewport to the MacBook 16-inch dimensions
    await page.setViewport({
      width: 3072,
      height: 1920,
      deviceScaleFactor: 2,  // This sets the device scale factor to 2 for high DPI screens
    });
    
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(screenshot, 'base64'));
  } catch (error) {
    res.status(500).send(`Failed to capture screenshot: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Screenshot service listening at http://localhost:${port}`);
});
