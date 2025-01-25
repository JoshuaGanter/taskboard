FROM node:22-alpine3.20

WORKDIR /app
COPY ./package*.json ./
RUN npm install .
COPY ./src/ ./src/

EXPOSE 8080
CMD ["npm", "run", "dev"]
