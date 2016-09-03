FROM node:latest

RUN mkdir -p /app

WORKDIR /app

ADD package.json /app/package.json
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules

ADD . /app

EXPOSE 8080

CMD ["node", "main.js"]