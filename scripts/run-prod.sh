#!/bin/bash
docker-compose --file docker-compose.prod.yml up --detach
npm start
