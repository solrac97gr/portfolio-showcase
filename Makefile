build:
	@npm run build
	@cd functions && npm run build

deploy:
	@make build
	@firebase deploy

deploy-hosting:
	@npm run build
	@firebase deploy --only hosting

deploy-functions:
	@cd functions && npm run build
	@firebase deploy --only functions

run:
	@firebase serve

.PHONY: build deploy deploy-hosting deploy-functions run
