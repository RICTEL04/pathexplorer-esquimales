FROM node:18-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon", "-L", "--watch", ".", "--ignore", "node_modules", "--ext", "js,jsx,ts,tsx,json", "--exec", "npm", "run", "dev"]