<img width="1421" height="689" alt="image" src="https://github.com/user-attachments/assets/38b361bb-ce97-49ec-b5eb-e849d28feed6" />
<img width="1439" height="341" alt="image" src="https://github.com/user-attachments/assets/9e010f80-6c63-47c5-ae78-fa1b4a1a625b" />



# Airline Voucher Seat Assignment Application

## Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM
- SQLite

## Installation

### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. Configure `.env` for SQLite (DB_DATABASE=/path/to/database/vouchers.db)
6. `php artisan migrate`
7. `php artisan serve` (Runs on http://localhost:8000)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on http://localhost:5173)

## API Endpoints
- POST /api/check
- POST /api/generate
