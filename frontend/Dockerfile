# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install

# Build React application
RUN npm run build

# Start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]