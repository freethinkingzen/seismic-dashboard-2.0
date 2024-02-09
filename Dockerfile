FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install
COPY src /app/src
COPY public /app/public
EXPOSE 3000

CMD ["npm", "start"]
