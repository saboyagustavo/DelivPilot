FROM node:20-alpine as development

ENV DOCKERIZE_VERSION v0.7.0

RUN apk --no-cache add wget tar \
    && wget -O - "https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz" | tar -C /usr/local/bin -xz \
    && apk del wget tar

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "dockerize -wait tcp://deliv-db:5432 -timeout 1m && npx prisma migrate dev --name 'update' && npm run start:dev"]