dev:
	npm run dev

build:
	npm run build

init_db:
	echo is not ready

db_init:
	echo is not ready

docker-build:
	docker build -t milkyway .

docker-create:
	docker create --name milkyway_app --env-file ./.env -p 5000:5000 -v "$$(pwd)"/src/:/app/src/ milkyway

docker-start:
	docker container start milkyway_app -a

docker-run:
	docker run --rm --name milkyway_app \
	 --env-file ./.env \
	 -p 5000:5000 \
	 -v "$$(pwd)"/src/:/app/src/ \
	 milkyway

docker_back-sh:
	docker exec -it milkyway_app sh

# docker-compose back
