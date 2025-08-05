# Dependencies
docker-compose.yml:
	echo -e "ERROR: No docker-compose.yml found."

package-lock.json:
	echo -e "ERROR: No package-lock.json found."

node_modules: package-lock.json
	npm clean-install

# Variables
MIGRATION_NAME ?=

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
	npm run format:w

tests: node_modules
	npm test

tests-shared: node_modules
	npm run tests:units:shared

tests-api: tests-shared
	npm run tests:units:api

tests-ui: tests-shared
	npm run tests:units:ui

coverage: node_modules
	npm run test:cov

migrate: up
	@if [ -z "$(MIGRATION_NAME)" ]; then \
	  echo "Error: MIGRATION_NAME is required"; \
	  exit 1; \
	fi
	npm run prisma:migrate "$(MIGRATION_NAME)"

reset_db: up
	npm run prisma:reset

clean:
	rm -rf .next node_modules package-lock.json
	npm install

.PHONY: up down dev build lint format tests tests-shared tests-api tests-ui coverage migrate reset_db clean

# Aliases
run: up dev
checks: lint tests
ci: checks build
.PHONY: run checks ci
