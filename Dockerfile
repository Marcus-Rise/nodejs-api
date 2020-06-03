FROM node:12-alpine as base

WORKDIR /app

FROM base as node_modules

COPY package*.json ./

RUN npm ci
#RUN npm audit

FROM node_modules as build

COPY ./ .

RUN npm run build

FROM base as dist

COPY --from=build /app/package*.json ./

RUN npm ci --only=prod

COPY --from=build /app/dist ./dist
COPY --from=build /app/env ./env

CMD npm run start

EXPOSE 8081
