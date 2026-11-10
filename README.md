# Katalog WeGame Resources

Katalog borong untuk WeGame Resources: konsol, controller, aksesori dan alat ganti gaming. Peruncit dan kedai repair boleh semak produk, harga ikut kuantiti dan status stok, kemudian hantar senarai sebut harga melalui WhatsApp.

> **Versi demo.** Semua data disimpan dalam `localStorage` pelayar. Perubahan pada satu peranti tidak dilihat oleh peranti lain. Fasa seterusnya: sambung ke Supabase.

## Ciri-ciri

**Untuk pelanggan**
- Kategori: Konsol, Controller, Aksesori, Alat Ganti
- Carian (nama, SKU, jenama, platform) dan penapis platform, jenama, status stok
- Paparan grid atau senarai
- Butiran produk: harga tier ikut kuantiti, SRP dan anggaran margin, spesifikasi, MOQ
- Senarai sebut harga: pilih kuantiti, salin teks atau hantar terus ke WhatsApp syarikat

**Untuk staf (butang “Urus”)**
- Tambah, edit, salin dan padam produk (dengan muat naik gambar, dikecilkan automatik)
- Tetapan syarikat: maklumat hubungan, WhatsApp, terma borong, tunjuk/sembunyi harga dan stok
- Import CSV dan salin CSV (untuk Excel / Google Sheets)
- Buang data contoh, atau reset kepada data contoh

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

| Token | Cerah | Gelap |
|---|---|---|
| Biru utama | `#2347E0` | `#5D7DFF` |
| Amber aksen | `#F5A524` | `#FFB940` |
| Dakwat | `#0F1B2D` | `#E7ECF6` |

Fon: Chakra Petch (tajuk / logo), IBM Plex Sans (teks), JetBrains Mono (SKU).
