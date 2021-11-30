# Makefile

install: # установка пакетов
		npm ci

test: # запуск тестов
		npx jest --coverage

lint: # запуск линтера
		npx eslint .

publish: # публикация пакетов
		npm publish --dry-run
		npm link