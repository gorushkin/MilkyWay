FROM node:14.17-alpine
WORKDIR /app/

COPY package.json ./
COPY prisma/ ./prisma
COPY tsconfig.json ./
COPY src/ ./src
RUN npm install
RUN npm run db:deploy

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

CMD npm run start:migrate:dev
