FROM node:9.11.2
WORKDIR /src/app

COPY package.json /src/app/
RUN npm install --silent

RUN apt-get update
RUN apt-get install -y gettext-base nginx

COPY . /src/app
RUN npm run build
RUN cp -a build/* /var/www/
RUN cp -a public /var/www/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT /bin/bash -c "/usr/bin/envsubst < /src/app/.env.template > /src/app/.env && ./env.sh && cp env-config.js /var/www/public/ && exec nginx -g 'daemon off;'"
