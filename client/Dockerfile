FROM node:20
WORKDIR /client
COPY public/ /client/public
COPY src/ /client/src
COPY store/ /client/store
COPY index.html /client/
COPY package*.json /client/
COPY vite.config.ts /client/
COPY tsconfig.json /client/
COPY tsconfig.app.json /client/
COPY tsconfig.node.json /client/
EXPOSE 8000
RUN npm install
RUN npm run build