FROM node:16
WORKDIR /app
COPY package.json /app
RUN npm i --silent
COPY . /app
CMD npm run start
EXPOSE 3000