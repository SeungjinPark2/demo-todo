FROM node:alpine

WORKDIR /opt/workdir

COPY package.json .

RUN npm install

COPY . .

CMD npm start
