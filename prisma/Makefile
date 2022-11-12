build:
	docker build -t milkyway-db .

create:
	docker create --name milkyway-db \
	--env-file ./.env \
	 -p 5050:5555 \
	 -p 5000:5432 \
	 -v "$$(pwd)"/src/:/app/src/ \
	 milkyway-db

start:
	docker container start milkyway-db -a

run:
	docker exec -it milkyway-db sh

volume:
	docker volume create\
	 --name my_test_volume --opt \
	type=none --opt device=/home/jinna/Jinna_Balu/Test_volume --opt o=bind
