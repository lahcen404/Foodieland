FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]