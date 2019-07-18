FROM node:9.11.2
WORKDIR /src/app

COPY package.json /src/app/
RUN npm install --silent

COPY . /src/app
# RUN npm build

CMD ["npm","start"]