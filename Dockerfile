# Use the official puppeteer Docker image
FROM satantime/puppeteer-node:20.9.0-bookworm

# Create and change to the app directory
WORKDIR /usr/src/app

# Set npm registry to taobao
RUN npm config set registry https://registry.npmmirror.com/

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies as root user
RUN npm install

# Copy the app source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
