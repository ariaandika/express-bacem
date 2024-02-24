# Express Api Server

contoh api server menggunakan express dan prisma

## Prequiste

untuk menggunakan anda perlu:

- mysql database
- database mbacem di mysql

sebelum mulai, anda perlu membuat semua table dari prisma ke database:

```bash
npm run db:push
```

## Cara Pakai

jalankan server dengan:

```bash
npm run dev
```

api server tersedia di `http://localhost:3000`

lalu gunakan api client favorit anda, pilihan populer: Postman, Insomnia,
atau gunakan curl

### Query `Users`

request:

```http
GET http://localhost:3000/users
```

anda akan mendapatkan `[]`, berarti array kosong, karena kita belum membuat user

### Create `Users`

request:

```http
POST http://localhost:3000/users
{
    "nama": "Budi",
    "email": "budi@gmail.com"
}
```

anda akan mendapatkan respon: "Created", yang berarti user berhasil dibuat

gunakan request dari **Query Users** untuk melihat user yang terbuat

anda dapat menambahkan beberapa data, lalu **Query Users** akan merespon
dengan semua users

### Get `User`

jika anda ingin melihat satu user, request:

```bash
GET http://localhost:3000/users/1
```

anda akan mendapatkan hanya user pertama yang anda buat

