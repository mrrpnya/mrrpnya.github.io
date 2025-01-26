FROM denoland/deno:latest

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN deno i

# Copy the rest of the application
COPY . .

# Run build task
RUN deno task build

# Expose port 80 for the application
EXPOSE 3000

# Verify the file exists and can be executed
RUN ls -la .output/server/

# Run the Deno server
CMD deno run --allow-all .output/server/index.mjs
