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

anda akan mendapatkan hanya user pertama yang dibuat

anda dapat merubah angka satu menjadi user id lainya

jika id tidak ditemukan, anda akan mendapatkan respon

```json
{
    "error": true,
    "message": "User tidak ditemukan"
}
```

### Query `Products`

request:

```http
GET http://localhost:3000/products
```

anda akan mendapatkan `[]`, berarti array kosong, karena kita belum membuat produk

### Create `Product`

request:

```http
POST http://localhost:3000/products
{
    name: "Kasur",
    brand: "lg",
    price: 50000,
    ownerId: 1
}
```

anda akan mendapatkan respon: "Created", yang berarti produk berhasil dibuat

gunakan request dari **Query Products** untuk melihat produk yang terbuat

anda dapat menambahkan beberapa data, lalu **Query Products** akan merespon
dengan semua produk

### Get `Product`

jika anda ingin melihat satu produk, request:

```bash
GET http://localhost:3000/products/1
```

anda akan mendapatkan hanya produk pertama yang dibuat

anda dapat merubah angka satu menjadi produk id lainya

jika id tidak ditemukan, anda akan mendapatkan respon

```json
{
    "error": true,
    "message": "Produk tidak ditemukan"
}
```

anda dapat menambahkan query paramter `owner`:

```bash
GET http://localhost:3000/products/1?owner=1
```

maka anda juga akan mendapat data dari pemilik produk tersebut

### List `User Products`

request:

```bash
GET http://localhost:3000/users/1/products
```

anda akan mendapatkan semua produk dari pemilik yang memiliki user id 1

