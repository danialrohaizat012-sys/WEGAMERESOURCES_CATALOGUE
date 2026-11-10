/*
 * Lapisan storage WeGame Catalogue.
 *
 * Versi DEMO: semua data disimpan dalam localStorage pelayar.
 * Semua fungsi pulangkan Promise supaya app.js tidak perlu diubah bila
 * kita tukar kepada Supabase nanti — cuma ganti isi fungsi di bawah
 * dengan panggilan supabase-js (lihat supabase/schema.sql).
 *
 *   load()                -> { settings, products }
 *   saveProduct(p)        -> simpan / kemas kini satu produk (ikut p.id)
 *   saveProducts(list)    -> simpan banyak produk sekaligus (import CSV)
 *   deleteProduct(id)
 *   deleteProducts(ids)
 *   saveSettings(s)
 *   reset()               -> kembali kepada data contoh (WG_SEED)
 */
(function () {
  "use strict";
  const KEY = "wg-catalogue-v1";

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function readAll() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const db = JSON.parse(raw);
        if (db && db.settings && Array.isArray(db.products)) return db;
      }
    } catch (e) { /* storage disekat atau rosak: guna data contoh */ }
    return clone(window.WG_SEED);
  }

  function writeAll(db) {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch (e) {
      const err = new Error("Storan pelayar penuh atau disekat. Kurangkan saiz/bilangan gambar.");
      err.code = e && e.name === "QuotaExceededError" ? "quota" : "storage";
      throw err;
    }
  }

  function touch(db) {
    const d = new Date();
    db.settings.updated = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  window.WGStore = {
    mode: "local",

    async load() { return readAll(); },

    async saveProduct(p) {
      const db = readAll();
      const i = db.products.findIndex(x => x.id === p.id);
      if (i >= 0) db.products[i] = clone(p); else db.products.push(clone(p));
      touch(db); writeAll(db); return db;
    },

    async saveProducts(list) {
      const db = readAll();
      list.forEach(p => {
        const i = db.products.findIndex(x => x.id === p.id);
        if (i >= 0) db.products[i] = clone(p); else db.products.push(clone(p));
      });
      touch(db); writeAll(db); return db;
    },

    async deleteProduct(id) {
      const db = readAll();
      db.products = db.products.filter(p => p.id !== id);
      touch(db); writeAll(db); return db;
    },

    async deleteProducts(ids) {
      const db = readAll();
      db.products = db.products.filter(p => !ids.includes(p.id));
      touch(db); writeAll(db); return db;
    },

    async saveSettings(s) {
      const db = readAll();
      db.settings = clone(s);
      touch(db); writeAll(db); return db;
    },

    async reset() {
      try { localStorage.removeItem(KEY); } catch (e) {}
      return clone(window.WG_SEED);
    }
  };
})();
