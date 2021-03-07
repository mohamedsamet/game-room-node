FROM node:12.20-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# start app
CMD npm run start:dev
