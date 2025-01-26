FROM node:22-alpine3.20

WORKDIR /app
COPY ./package*.json ./
RUN npm install .
COPY ./src/ ./src/
COPY ./tsconfig.json ./
COPY ./tsoa.json ./

EXPOSE 8080
CMD ["npm", "run", "dev"]
