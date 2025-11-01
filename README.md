# PERSONAL EXPENSE

A full-stack personal expense tracking application. Built with a Laravel 12 API backend and a Next.js frontend.

## 1. Backend Setup (Laravel)

Ikuti langkah-langkah ini untuk menjalankan server API backend. Pastikan sudah terinstall PHP 8.3+.

**Clone**

```shell
git clone https://github.com/khmalz/personal-expense-tracker.git
```

**Go to Backend Directory**

```shell
cd backend
```

**Install Dependencies**

```shell
composer install
```

**Config Environment**

Salin file environment.

```shell
cp .env.example .env
```

**Generate Key**

```shell
php artisan key:generate
```

**Setting App URLs in .env**

Ini **penting** agar backend tahu di mana frontend berjalan (untuk CORS).

```
# URL untuk backend
APP_URL=http://localhost:8000
```

**Migrate Database & Run Seeder**

Perintah ini akan membuat struktur tabel dan mengisi data _dummy_ (termasuk data expense).

```shell
php artisan migrate --seed
```

**Run Local Server**

Server backend akan berjalan di `http://localhost:8000`.

```shell
php artisan serve
```

---

## 2. Frontend Setup (Next.js)

**Go to Frontend Directory**

```shell
cd frontend
```

**Install Dependencies**

```shell
npm install
// OR
pnpm install
```

**Config Environment**

Buat file `.env.local` untuk menyimpan _environment variable_ khusus frontend.

```shell
cp .env.example .env.local
```

**Setting Backend URL in .env.local**

Edit file `.env.local` dan arahkan ke URL backend Laravel.

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Run Local Server**

Server development Next.js akan berjalan di `http://localhost:3000`.

```shell
npm run dev
// OR
pnpm dev
```

---

## 3. Demo Credentials

Setelah kedua server (backend dan frontend) berjalan, buka `http://localhost:3000` di browser.

---

## 4. Alternatif: Setup dengan Docker

**Prasyarat:**

-  [Git](https://git-scm.com/)
-  [Docker](https://www.docker.com/) (Docker Desktop atau Docker CE di WSL 2)

### 1. Clone & Masuk ke Folder

```shell
git clone https://github.com/khmalz/personal-expense-tracker.git
cd personal-expense-tracker
```

_(Semua perintah selanjutnya dijalankan dari **folder root** ini)._

### 2\. Konfigurasi Backend (Laravel)

Buat file `.env` untuk _backend_ (Laravel).

```shell
# Masuk ke folder backend dan salin file .env
cd backend
cp .env.example .env
```

Buka file dan edit `backend/.env`:

```dotenv
DB_CONNECTION=sqlite
```

### 3\. Konfigurasi Frontend (Next.js)

Selanjutnya, Buat file `.env.local` untuk _frontend_ (Next.js) sesuai dengan `.env.example`.

```shell
# Salin file .env.local dari contohnya
cp frontend/.env.example frontend/.env.local
```

Buka `frontend/.env.local` dan isi **kedua** variabel (untuk _Client_ dan _Server component_):

```dotenv
# Untuk Client-side (Browser), panggil 'localhost'
NEXT_PUBLIC_BACKEND_URL=http://localhost

# Untuk Server-side (Server Components), panggil nama service 'nginx'
SERVER_BACKEND_URL=http://nginx
```

### 4. Build dan Jalankan Kontainer

Dengan menggunaakan `Makefile`.

```shell
# Perintah ini akan membangun & menyalakan semua kontainer
make up
```

### 5. Jalankan Setup Project (Pertama Kali)

Setelah kontainer berjalan, jalankan _setup_ otomatis.

```shell
# Perintah ini akan:
# 1. Menjalankan 'composer install'
# 2. Membuat file database/database.sqlite
# 3. Menjalankan 'php artisan key:generate'
# 4. Menjalankan 'php artisan migrate:fresh --seed'
make setup
```

Aplikasi sekarang berjalan:

-  **Frontend (Next.js):** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
-  **Backend (Laravel):** [http://localhost](https://www.google.com/search?q=http://localhost)

---

### List perintah `make`

Gunakan perintah ini dari _root_ project untuk manage command Docker:

-  `make up`: Membangun dan menyalakan semua kontainer.
-  `make down`: Menghentikan dan menghapus semua kontainer & volume data.
-  `make stop`: Hanya menghentikan kontainer (tanpa menghapus).
-  `make setup`: Menjalankan setup awal Laravel.
-  `make artisan [command]`: Menjalankan perintah artisan (Contoh: `make artisan route:list`).
-  `make composer [command]`: Menjalankan perintah composer (Contoh: `make composer require laravel/breeze`).
-  `make redis`: Masuk ke shell Redis.
-  `make shell`: Masuk ke shell (sh) kontainer `php`.

## Developer

-  [@khmalz](https://github.com/khmalz)
