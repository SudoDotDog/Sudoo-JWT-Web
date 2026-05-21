# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha
eslint := node_modules/.bin/eslint

# Build functions
build_utils := node_modules/.bin/build-utils

main: dev

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test \
	$(mocha) --config test/.mocharc.json

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha) --config test/.mocharc.json

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing Development Dependencies"
	@pnpm install

install-prod:
	@echo "[INFO] Installing Production Dependencies"
	@pnpm install

outdated: install
	@echo "[INFO] Checking Outdated Dependencies"
	@pnpm outdated

clean:
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(build_utils) clean-path dist

publish: install tests lint clean build
	@echo "[INFO] Publishing package"
	@pnpm publish --access=public --no-git-checks

publish-dry-run: install tests lint clean build
	@echo "[INFO] Publishing package (dry-run)"
	@pnpm publish --access=public --no-git-checks --dry-run
