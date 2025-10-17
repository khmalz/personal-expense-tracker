# PERSONAL EXPENSE

A full-stack personal expense tracking application. Built with a Laravel 12 API backend and a Next.js frontend.

## 1\. Backend Setup (Laravel)

Ikuti langkah-langkah ini untuk menjalankan server API backend. Pastikan sudah terinstall PHP 8.2+.

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

Server backend Anda akan berjalan di `http://localhost:8000`.

```shell
php artisan serve
```

---

## 2\. Frontend Setup (Next.js)

**Go to Frontend Directory**

```shell
cd frontend
```

**Install Dependencies**

```shell
npm install
pnpm install
```

**Config Environment**

Buat file `.env.local` untuk menyimpan _environment variable_ khusus frontend.

```shell
cp .env.example .env
```

**Setting Backend URL in .env.local**

Edit file `.env` dan arahkan ke URL backend Laravel Anda.

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Run Local Server**

Server development Next.js Anda akan berjalan di `http://localhost:3000`.

```shell
npm run dev
pnpm dev
```

---

## 3\. Demo Credentials

Setelah kedua server (backend dan frontend) berjalan, buka `http://localhost:3000` di browser Anda.

## Developer

-  [@khmalz](https://github.com/khmalz)
