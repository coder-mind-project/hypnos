FROM node:latest as node

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build

EXPOSE 3010

CMD ["node", "./build/index.js"]