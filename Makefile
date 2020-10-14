test-2:
	node -e 'require("./")'

test:
	npm test

build:
	npm install

build-release:
	neon build --release

clean:
	neon clean
