dev:
	npm run dev

build:
	npm run build

init_db:
	echo is not ready

db_init:
	echo is not ready

back-build:
	cd bot; docker build -t milkyway .

back-create:
	cd bot; docker create --name milkyway_app \
	--env-file ./.env \
	 -p 5555:5555 \
	 -v "$$(pwd)"/src/:/app/src/ \
	 milkyway

back-start:
	cd bot; docker container start milkyway_app -a

back-run:
	cd bot; ocker run --rm --name milkyway_app \
	 --env-file ./.env \
	 -p 5555:5555 \
	 -v "$$(pwd)"/src/:/app/src/ \
	 milkyway

back-sh:
	cd bot; docker exec -it milkyway_app sh

db-run:
	cd db; docker run --name db_app \
	--env-file ./.env \
	-p 5432:5432 \
	-d postgres:13.3

db-start:
	docker container start db_app -a

start:
	docker-compose start

stop:
	docker-compose stop

up:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose up --build

front-dev:
	cd front; npm start

front-test:
	cd front; npm test -- --coverage
