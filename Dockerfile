FROM node:16.15.0-alpine as build

ARG COMMIT_SHA=<not-specified>
ENV NODE_ENV=production

WORKDIR /build-dir

COPY package*json ./

RUN npm install

COPY . .

RUN echo "service-name: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:16.15.0-alpine

ENV NODE_ENV=production
ENV LOG_LEVEL=warn
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

CMD ["npm", "run", "start:no-env-vars", "--", "--HTTP_PORT", "${HTTP_PORT}", "--PLAYGROUND", "${PLAYGROUND}", "--CRUD_URL", "${CRUD_URL}"]