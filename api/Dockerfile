FROM benardg/node-bcrypt

WORKDIR /app

# Install node_modules
COPY package.json yarn.lock ./
RUN yarn install

# Copy application
COPY ./ ./

EXPOSE 3000

CMD yarn run typeorm migration:run \
    && yarn run start
