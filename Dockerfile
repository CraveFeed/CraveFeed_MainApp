FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD [ "yarn" , "start" ]
