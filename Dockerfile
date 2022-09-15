FROM node:14.17-alpine
WORKDIR /app/

COPY package.json ./
RUN npm install
COPY tsconfig.json ./
COPY src/ ./src
COPY prisma/ ./prisma
RUN npm run db:deploy

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
        fi

CMD npm run dev
