FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
ENV NITRO_PORT 80
CMD ["node .output/server/index.mjs"]