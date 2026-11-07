# static-ai-hub

Kumpulan prompt AI yang bisa dicari, difilter, disusun, dan disalin. Saat ini berisi 101 prompt.

Situs statis sepenuhnya: tidak ada backend, tidak ada basis data, tidak ada akun. Rating disimpan di
browser masing-masing pengguna.

## Isi

- **Pencarian & filter** per kategori dan tag.
- **Prompt builder** — susun prompt dari pilihan peran, konteks, dan format keluaran.
- **Tombol salin** sekali klik.
- **Rating** dengan penyimpanan lokal.
- **Mode terang/gelap**.

## Menambah prompt

Buat satu berkas Markdown di `src/content/prompts/`. Namanya menjadi slug URL:

```markdown
---
title: "3D Cartoon Style"
description: "Mengubah foto menjadi karakter kartun 3D bergaya modern."
role: "3D Character Artist"
category: "Image"
tags: ["3d", "cartoon", "character"]
---

Kamu adalah **3D Character Artist**. …
```

Frontmatter divalidasi skema di `src/content/config.ts`. Kategori atau tag yang salah bentuk akan
menggagalkan build, bukan muncul sebagai halaman rusak.

## Menjalankan

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build && pnpm preview
```

## Struktur

```
src/content/prompts/       Satu berkas per prompt
src/content/config.ts      Skema frontmatter
src/components/interactive/  Builder, tombol salin, rating, toggle tema (Preact)
src/components/ui/         Kartu, footer
```

Halaman dibangun Astro; bagian yang butuh state dijalankan sebagai pulau Preact yang berbagi state
lewat nanostores.

## Catatan

- Rating hanya tersimpan di browser, jadi tidak ada angka global dan tidak ada yang bisa dimanipulasi dari sisi server.
- Hasil builder disusun dari pilihan pengguna di sisi klien; tidak ada prompt yang dikirim ke model dari situs ini.

---

## English

**static-ai-hub** is a collection of AI prompts you can search, filter, arrange, and copy — currently 101 of them. The site is fully static: no backend, no database, no accounts, and ratings are stored in the browser.
