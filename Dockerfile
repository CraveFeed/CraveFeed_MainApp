FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn" , "run" , "dev" ]