FROM node:12-alpine as base

WORKDIR /app

FROM base as node_modules

COPY package*.json ./

RUN npm ci
#RUN npm audit

FROM node_modules as build

COPY ./ .

RUN npm run lint
RUN npm run build

FROM node_modules as dist

COPY --from=build /app/dist /app/dist
COPY --from=build /app/env /app/env

CMD npm run start

EXPOSE 8081