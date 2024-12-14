FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate


# RUN npx prisma migrate dev
# RUN npx prisma db seed

CMD ["npm", "run", "dev"]
