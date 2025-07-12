# Dependencies
package-lock.json:
	echo -e "ERROR: No package-lock.json found."

node_modules: package-lock.json
	npm clean-install

# Commands
dev: node_modules
	npm run dev

build: node_modules
	npm run build

lint: node_modules
	npm run lint

.PHONY: dev build lint

# Aliases
run: dev
.PHONY: run
