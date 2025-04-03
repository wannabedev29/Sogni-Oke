FROM node:18

# Set work directory
WORKDIR /app

# Install missing system dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libgbm1 \
    libglib2.0-0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libxext6 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libxkbcommon-x11-0 \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libnspr4 \
    lsb-release \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file proyek ke dalam container
COPY . .

# Set Puppeteer agar berjalan tanpa sandbox (opsional)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Jalankan script saat container berjalan
CMD ["node", "damnson.js"]
