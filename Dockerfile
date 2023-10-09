
###
# 1. Dependencies
###

FROM node:14.5-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
#Working directory
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./

#Update system
RUN apk update && apk upgrade && apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata && apk add curl
RUN npm install pm2 -g

# Clean APK cache
RUN rm -rf /var/cache/apk/*

# Install dependencies
RUN npm install

# Copy app source code
COPY --chown=node:node . .

# Build app
RUN npm run dev

CMD npm start