FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install

# Bundle app source
COPY . /usr/src/app

#RUN cd /usr/src/app && node ./config/import.js
#RUN npm run import

EXPOSE 3000
CMD [ "npm", "start"]
