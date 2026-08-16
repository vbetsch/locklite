#!/bin/bash
docker-compose up --detach --file docker-compose.prod.yml
npm start
