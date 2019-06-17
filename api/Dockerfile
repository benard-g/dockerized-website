FROM benardg/node-bcrypt

WORKDIR /app

# Install node_modules
COPY package*.json ./
RUN npm install

# Copy and install application
WORKDIR /app/tmp-build
COPY ./ ./
RUN ln -s ../node_modules \
    && npm run build \
    && cp -r build /app/build \
    && cp ormconfig.js /app \
    && rm -r /app/tmp-build
WORKDIR /app

EXPOSE 3000

CMD npm run typeorm -- migration:run \
    && npm run start
