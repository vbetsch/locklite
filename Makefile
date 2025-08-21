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

start: node_modules
	npm run start

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

tests-pa11y: node_modules
	@curl -f http://localhost:3000/ui > /dev/null 2>&1 || (echo "❌ Server is not running on http://localhost:3000. Please build and start it with 'npm run start'" && exit 1)
	npm run a11y:pa11y

coverage: node_modules
	npm run test:cov

migrate: node_modules up
	@if [ -z "$(MIGRATION_NAME)" ]; then \
	  echo "Error: MIGRATION_NAME is required"; \
	  exit 1; \
	fi
	npm run prisma:migrate "$(MIGRATION_NAME)"

reset: node_modules up
	npm run prisma:reset

generate: node_modules up
	npm run prisma:generate

seed: node_modules up
	npm run prisma:seed

clean:
	rm -rf .next node_modules package-lock.json
	npm install

.PHONY: up down dev build start lint format tests tests-shared tests-api tests-ui tests-pa11y coverage migrate reset generate seed clean

# Aliases
run: dev
checks: lint tests
reset_db: reset generate seed
ci: lint coverage build
build_start: build start
a11y: tests-pa11y
.PHONY: run checks reset_db ci a11y
