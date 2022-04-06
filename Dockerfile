
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env .env

RUN npm install

COPY . .

# WORKDIR /usr/src/app/dist

# COPY ./dist/ ./

# WORKDIR /usr/src/app/src/swagger

# COPY /src/swagger/swagger.json ./

# WORKDIR /usr/src/app

EXPOSE 3001

CMD ["npm", "run", "start-bundled"]
