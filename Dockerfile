FROM node:latest as node

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build

EXPOSE 3002

CMD ["node", "./build/index.js"]