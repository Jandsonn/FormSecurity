FROM node:12

WORKDIR /usr/src/app

COPY package*.json dest ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]

