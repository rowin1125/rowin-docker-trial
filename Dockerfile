FROM node:15
WORKDIR /app

COPY package.json .

RUN yarn install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then yarn install; \
      else yarn install --prod; \
      fi;

COPY . .
COPY .env.production .env

ENV PORT 4545

EXPOSE $PORT

CMD ["node", "index.js"]
