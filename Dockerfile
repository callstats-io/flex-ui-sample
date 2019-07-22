FROM node:9.11.2
WORKDIR /src/app

COPY package.json /src/app/
RUN npm install --silent

COPY . /src/app
RUN npm run build
RUN npm install -g serve

CMD ["serve","-s","build”]