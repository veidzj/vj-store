FROM node:18-alpine

WORKDIR /usr/src/vj-store

COPY ./dist/ /usr/src/vj-store/dist/
COPY ./package.json /usr/src/vj-store/package.json
COPY ./package-lock.json /usr/src/vj-store/package-lock.json

RUN npm pkg delete scripts.prepare
RUN npm install --omit=dev

CMD ["npm", "start"]
