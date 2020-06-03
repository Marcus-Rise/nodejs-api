FROM node:12-alpine as base

WORKDIR /app

FROM base as node_modules

COPY package*.json ./

RUN npm ci --only=production
#RUN npm audit

FROM node_modules as build

COPY ./ .

RUN npm run build

FROM node_modules as dist

RUN npm ci --only=production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/env /app/env

CMD npm run start

EXPOSE 8081
