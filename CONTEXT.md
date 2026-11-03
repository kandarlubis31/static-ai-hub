# static-ai-hub — Project Context

## Ringkasan

Kumpulan prompt AI yang bisa dicari, difilter, dan disalin. Situs statis: setiap prompt adalah satu
berkas Markdown di dalam content collection, sehingga menambah prompt berarti menambah berkas, bukan
menyentuh komponen.

## Arsitektur

Astro membangun halaman dari koleksi konten (`src/content/prompts/*.md`) dengan skema di
`src/content/config.ts`. Interaksi yang butuh state dipisahkan sebagai pulau Preact:

| Komponen | Peran |
| :--- | :--- |
| `FilterBar.astro` | Filter kategori/tag (dirender Astro) |
| `PromptBuilder.tsx` | Menyusun prompt dari pilihan pengguna |
| `CopyButton.tsx` | Menyalin isi prompt ke clipboard |
| `RatingSystem.tsx` | Penilaian prompt, disimpan lokal di browser |
| `ThemeToggle.tsx` | Mode terang/gelap |

State lintas pulau memakai **nanostores**, karena tiap pulau adalah aplikasi terpisah dan tidak bisa
berbagi React context.

## Struktur

```
src/content/prompts/   Satu berkas Markdown per prompt (frontmatter: judul, kategori, tag)
src/content/config.ts  Skema frontmatter
src/components/ui/     Tampilan kartu, footer
src/components/interactive/  Pulau Preact
src/assets/            Gambar
```

## Menjalankan

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build && pnpm preview
```

## Catatan

- Hasil rating hanya tersimpan di browser pengguna; tidak ada backend, jadi tidak ada data terpusat.
- Berkas prompt yang frontmatter-nya tidak sesuai skema akan menggagalkan build — periksa pesan
  Astro, biasanya menunjuk berkas yang salah.
- Menambah kategori baru berarti memperbarui skema, bukan hanya menaruh tag di Markdown.
