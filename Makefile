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
	@which -s gem npm || (echo "Ruby and Node.js required";  exit 1)
	@which -s bundle || gem install bundler
	@which -s bower || npm install bower
	bundle check || bundle install
	npm install
	bower install

.PHONY: all build test deps
