# Use the official Node.js 14 image with Alpine Linux
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .



# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
