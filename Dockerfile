FROM node:alpine

WORKDIR /opt/workdir

COPY . .

RUN npm install

CMD npm start
