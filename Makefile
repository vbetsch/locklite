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

format_check: node_modules
	npm run format:c

format_write: node_modules
	npm run format:w

tests: node_modules
	npm test

coverage: node_modules
	npm run test:cov

migrate: up
	npx prisma migrate dev --name init

.PHONY: up down dev build lint format_check format_write tests coverage migrate

# Aliases
run: up dev
checks: format_check lint
checks_build: checks build
.PHONY: run checks checks_build
