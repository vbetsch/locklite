# Dependencies
docker-compose.yml:
	echo -e "ERROR: No docker-compose.yml found."

package-lock.json:
	echo -e "ERROR: No package-lock.json found."

node_modules: package-lock.json
	npm clean-install

# Commands
up: docker-compose.yml
	docker compose up -d

down: docker-compose.yml
	docker compose down

dev: node_modules
	npm run dev

build: node_modules
	npm run build

lint: node_modules
	npm run lint

.PHONY: up down dev build lint

# Aliases
run: up down dev
.PHONY: run
