test-2:
	node -e 'require("./")'

test:
	npm test

install:
	npm install

build:
	neon build --release

clean:
	neon clean

docgen:
	npm run docgen
