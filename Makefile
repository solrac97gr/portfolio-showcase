build:
	@npm run build
	@cd functions && npm run build
	@cd ..

run:
	@firebase serve

deploy:
	@firebase deploy

.PHONY: build run deploy