FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /react-app

COPY ./package.json /react-app/

RUN npm install

COPY . .

CMD npm start

#docker build -t diegobaggins/pr_frontend .
#docker run -d -p 3000:3000 --restart=always diegobaggins/pr_frontend