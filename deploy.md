# Docker

## Deploy without docker swarm

#### locally

1. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml build`
2. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app`

#### Server

3. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull node-app`
4. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-app`

### Optional

You can use `watchtower` to watch for new images from hub.docker

## Deploy with docker swarm
