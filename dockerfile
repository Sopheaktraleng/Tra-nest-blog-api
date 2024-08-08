FROM node:18.20.3-slim
WORKDIR /app
ENV NODE_ENV dev
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start:dev"]