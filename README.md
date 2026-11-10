# Katalog WeGame Resources

Katalog borong untuk WeGame Resources: konsol, controller, aksesori dan alat ganti gaming. Peruncit dan kedai repair boleh semak produk, harga ikut kuantiti dan status stok, kemudian hantar senarai sebut harga melalui WhatsApp.

> **Versi demo.** Semua data disimpan dalam `localStorage` pelayar. Perubahan pada satu peranti tidak dilihat oleh peranti lain. Fasa seterusnya: sambung ke Supabase.

## Ciri-ciri

**Untuk pelanggan (Katalog)**
- Hero dengan carian besar, carian popular dan jubin kategori
- Penapis di sisi: kategori, platform, jenama, keadaan, boleh ditempah (panel bawah di telefon)
- Kad produk dengan ilustrasi automatik ikut jenis produk dan warna jenama, harga asas, harga tier terbaik dan % jimat
- Tambah ke sebut harga terus dari kad, kemudian ubah kuantiti di kad yang sama
- Butiran produk: tier harga boleh diklik, kalkulator jumlah dan penjimatan, petunjuk “tambah X lagi untuk harga lebih murah”, produk berkaitan, pautan terus (`#produk-<id>`)
- Senarai sebut harga: bar terapung, butang naikkan ke tier seterusnya, ringkasan penjimatan, maklumat pelanggan, salin mesej atau hantar terus ke WhatsApp
- Tema cerah / gelap, kekunci `/` untuk carian, paparan grid atau senarai

**Untuk staf (Inventori, `#inventori`)**
- KPI: nilai stok, ada stok, stok rendah, habis stok (boleh diklik untuk tapis)
- Jadual inventori: susun ikut lajur, ubah stok terus dengan butang +/−
- Tambah / edit / salin / padam produk dengan pratonton kad secara langsung
- Muat naik gambar (dikecilkan automatik)
- Tetapan syarikat: hubungan, WhatsApp, terma borong, tunjuk/sembunyi harga dan stok
- Import CSV dan salin CSV; buang data contoh atau reset demo

## Struktur

```
index.html          Laman utama
css/style.css       Gaya & token warna (tema cerah/gelap)
js/seed.js          Data contoh
js/storage.js       Lapisan storage (localStorage sekarang, Supabase nanti)
js/app.js           Logik aplikasi
brand/              Logo (SVG + PNG)
supabase/schema.sql Cadangan skema untuk fasa Supabase
```

## Jalankan

Tiada build. Buka `index.html` terus dalam pelayar, atau guna server statik:

```bash
npx serve .
```

Boleh di-deploy terus ke GitHub Pages, Netlify atau Vercel.

## Format CSV

```
sku,name,brand,category,platforms,condition,stock,unit,moq,min1,price1,min2,price2,min3,price3,srp,preorder,featured,desc,specs
```

- `category`: `konsol`, `controller`, `aksesori`, `sparepart`
- `platforms`: dipisahkan dengan `|`, cth. `PS5|PC`
- `condition`: `Baru`, `Refurbished`, `OEM`
- Produk dengan SKU yang sama akan dikemas kini; SKU baharu akan ditambah.

## Pindah ke Supabase

`app.js` hanya bercakap dengan `window.WGStore` (lihat `js/storage.js`). Semua fungsi sudah async. Untuk sambung Supabase:

1. Jalankan `supabase/schema.sql` dalam SQL editor Supabase.
2. Gantikan isi fungsi dalam `js/storage.js` dengan panggilan `supabase-js` (`load`, `saveProduct`, `saveProducts`, `deleteProduct`, `deleteProducts`, `saveSettings`).
3. Simpan gambar dalam Supabase Storage dan simpan URL dalam lajur `image`.
4. Tambah log masuk staf (Supabase Auth) dan tunjuk butang “Urus” hanya selepas log masuk.

## Jenama

**Logo:** wordmark “WEGAME.” dilukis sendiri (huruf blok condong, bukan fon), dengan titik biru sebagai tanda tangan dan “RESOURCES” di bawah. Fail dalam `brand/`:

| Fail | Guna |
|---|---|
| `logo-wordmark.svg` / `.png` | Latar cerah (utama) |
| `logo-wordmark-white.svg` / `.png` | Latar gelap |
| `logo-wordmark-mono.svg` / `.png` | Satu warna (cop, invois, cetakan) |
| `logo-mark.svg` / `.png` | Ikon aplikasi, favicon, avatar media sosial |
| `logo-mark-dark.svg` / `.png` | Ikon atas latar gelap |

| Token | Cerah | Gelap |
|---|---|---|
| Dakwat | `#0F1420` | `#E9ECF2` |
| Biru jenama | `#1F44E0` | `#6684FF` |

Fon: Archivo (tajuk & angka harga), IBM Plex Sans (teks), IBM Plex Mono (SKU).
