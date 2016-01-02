all: build test

browse: build
	open build/index.html

serve: deps
	bundle exec middleman

build: deps
	bundle exec middleman build

test: deps
	rake

deps:
	@which gem npm || (echo "Ruby and Node.js required";  exit 1)
	@which bundle || gem install bundler
	@which bower || npm install -g bower
	bundle check || bundle install
	npm install
	CI=true bower install

.PHONY: all build test deps
