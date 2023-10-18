FROM node:14.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]