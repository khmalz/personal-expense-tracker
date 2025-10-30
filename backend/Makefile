.PHONY: up down stop setup migrate-fresh artisan composer shell

up:
	@echo "--- Memulai semua kontainer Docker (di background)... ---"
	docker compose up -d --build

down:
	@echo "--- Menghentikan dan menghapus semua kontainer... ---"
	docker compose down -v

stop:
	@echo "--- Menghentikan kontainer... ---"
	docker compose stop

setup: composer-install key-generate migrate-fresh
	@echo "--- 🔥 Setup Project Selesai! ---"

migrate-fresh:
	@echo "--- Menjalankan migrate:fresh --seed... ---"
	docker compose exec php php artisan migrate:fresh --seed

composer-install:
	@echo "--- Menjalankan composer install... ---"
	docker compose exec php composer install

key-generate:
	@echo "--- Menjalankan artisan key:generate... ---"
	docker compose exec php php artisan key:generate

artisan:
	docker compose exec php php artisan $(filter-out $@,$(MAKECMDGOALS))

composer:
	docker compose exec php composer $(filter-out $@,$(MAKECMDGOALS))

shell:
	docker compose exec php /bin/sh