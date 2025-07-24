# Dependencies
docker-compose.yml:
	echo -e "ERROR: No docker-compose.yml found."

package-lock.json:
	echo -e "ERROR: No package-lock.json found."

node_modules: package-lock.json
	npm clean-install

# Commands
up: docker-compose.yml
	docker-compose up -d
	sleep 3

down: docker-compose.yml
	docker-compose down -v

dev: node_modules
	npm run dev

build: node_modules
	npm run build

lint: node_modules
	npm run lint

format: node_modules
	npm run format

tests: node_modules
	npm run test

migrate: up
	npx prisma migrate dev --name init

.PHONY: up down dev build lint format tests migrate

# Aliases
run: up dev
.PHONY: run
