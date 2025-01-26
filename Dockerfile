FROM node:latest

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Run build task
RUN npm run build

# Expose port 80 for the application
EXPOSE 3000
ENV NITRO_PORT 3000

# Verify the file exists and can be executed
RUN ls -la .output/server/

# Run the Deno server
CMD node .output/server/index.mjs
