build:
	@cd functions && npm run build
	@cd ..

run:
	@firebase serve