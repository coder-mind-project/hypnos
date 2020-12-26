FROM node:15.5.0-alpine3.10 as node

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build

EXPOSE 3010

CMD ["node", "./build/index.js"]