FROM node:22.11.0
RUN npm install -g nodemon
WORKDIR /app
COPY ./package.json .
RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]