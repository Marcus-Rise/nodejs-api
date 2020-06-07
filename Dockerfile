FROM node:14-alpine as base

WORKDIR /app

FROM base as node_modules

COPY package*.json ./

RUN npm ci
#RUN npm audit

FROM node_modules as build

COPY ./ .

RUN npm run test
RUN npm run build

FROM base as dist

# Reduce image size by splicing node_modules
COPY package*.json ./
RUN npm ci --only=prod

COPY --from=build /app/dist /app/dist
COPY --from=build /app/env /app/env

CMD npm run start

EXPOSE 8081
