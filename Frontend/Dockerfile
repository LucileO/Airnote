# stage1 as builder
FROM node:14-alpine as builder

RUN apk update && apk add git

# copy the package.json to install dependencies
RUN git clone https://github.com/Neakio/Airnote.git -b test
COPY package.json ./

# Install the dependencies and make the folder
RUN yarn install --frozen-lockfile && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

# Build the project and copy the files
RUN yarn build


FROM nginx:stable-alpine

#!/bin/sh

COPY ./default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the SSL certificate and key files
COPY ./ssl/server.crt /etc/nginx/ssl/server.crt
COPY ./ssl/server.key /etc/nginx/ssl/server.key

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]