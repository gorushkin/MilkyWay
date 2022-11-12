FROM node:14.17-alpine
WORKDIR /app/

ARG DATABASE_URL
COPY package.json ./
COPY migrations ./migrations
COPY schema.prisma ./
RUN npm install
RUN npm run generate

CMD npm run prisma
