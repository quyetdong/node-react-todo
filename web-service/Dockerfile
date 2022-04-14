
FROM node:14

WORKDIR /usr/src/app

RUN npm install -g serve

COPY ./build ./build

EXPOSE 3000

CMD ["serve", "-s", "build"]
