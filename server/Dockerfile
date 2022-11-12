FROM node:14.17-alpine
WORKDIR /server/

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

CMD npm run dev
