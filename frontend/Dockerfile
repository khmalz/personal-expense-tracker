FROM node:22-alpine

RUN npm install -g corepack
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]