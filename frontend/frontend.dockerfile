FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Add this environment variable
ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "start"]