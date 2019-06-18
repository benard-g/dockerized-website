# Dockerized WebSite !

A Node.js project built around Docker.

The goal of this project is to build a complete setup that allows to develop on a FullStack application without any other dependency than docker.

## Requirements

```
docker
docker-compose
```

## Quickstart

At the root of the project, run the following:

```sh
# If you want to start everything
docker-compose up

# To start it in background
docker-compose up -d

# If you just want to start the api
docker-compose up api
```

That's it, you now have a working development server for a back-end and a front-end application (depending on what you started).

The API is accesible through port `3000`.

## Clean up

To stop all working services, run the following:

```sh
# Stop running containers
docker-compose down

# Stop running containers and clean existing volumes
docker-compose down -v
```
