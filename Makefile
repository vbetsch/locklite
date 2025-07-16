# Dependencies
docker-compose.yml:
	echo -e "ERROR: No docker-compose.yml found."

package-lock.json:
	echo -e "ERROR: No package-lock.json found."

node_modules: package-lock.json
	npm clean-install

# Commands
containers: docker-compose.yml
	docker compose up -d

dev: node_modules
	npm run dev

build: node_modules
	npm run build

lint: node_modules
	npm run lint

.PHONY: containers dev build lint

# Aliases
run: containers dev
.PHONY: run
