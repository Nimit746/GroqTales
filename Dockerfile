FROM node:22-alpine

WORKDIR /app

# Install dependencies (using npm ci for cleaner builds if package-lock.json exists)
COPY package*.json ./
RUN apk add --no-cache git
RUN npm install

# Copy source code
COPY . .

# Expose ports for Next.js (3000) and Backend (5000/3001)
EXPOSE 3000
EXPOSE 5000

# Default command for development
CMD ["npm", "run", "dev"]
