FROM ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - 
RUN apt-get upgrade -y 
RUN apt-get install -y nodejs 

RUN apt-get install git -y

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x /app/src/main.sh
RUN chmod +x /app/build/index.js

ENTRYPOINT [ "/app/src/main.sh" ]