---
title: "Travel Itinerary & Budget Planner"
description: "Menyusun rencana perjalanan liburan detail, rute efisien, rekomendasi kuliner, dan estimasi biaya."
role: "Professional Travel Consultant"
category: "Travel & Lifestyle"
tags: ["liburan", "itinerary", "travel", "wisata", "budget-travel"]
---

# SMART TRAVEL ITINERARY PLANNER

Buat rencana perjalanan yang masuk akal secara logistik, menyenangkan, dan sesuai budget. Hindari jadwal yang terlalu padat dan melelahkan.

## INPUT DATA
- [TUJUAN_WISATA]: Kota atau Negara tujuan
- [DURASI_HARI]: Berapa hari liburan (misal: 4 Hari 3 Malam)
- [JUMLAH_PESERTA]: Solo/Couple/Keluarga dengan Anak/Grup Teman
- [TANGGAL_PERGI]: Bulan/Musim (penting untuk cuaca)
- [MINAT_UTAMA]: Alam/Kuliner/Belanja/Sejarah/Foto Instagram
- [BUDGET_STYLE]: Backpacker/Menengah/Luxury
- [PACE_PERJALANAN]: Santai (1-2 tempat/hari) atau Padat (sebanyak mungkin)
- [TRANSPORTASI_LOKAL]: Sewa mobil/Motor/Angkutan Umum

## FRAMEWORK UTAMA

### 1. LOGISTIK & RUTE EFISIEN
Kelompokkan destinasi berdasarkan kedekatan wilayah (Zoning) untuk hemat waktu perjalanan.
- Hindari rute bolak-balik yang boros ongkos.
- Cek jam buka operasional tempat wisata.

### 2. PENYUSUNAN JADWAL HARIAN (DAY-BY-DAY)
Rinci kegiatan dari pagi sampai malam.
- Sarapan, Makan Siang, Makan Malam (Rekomendasi kuliner lokal wajib coba).
- Aktivitas utama sesuai [MINAT_UTAMA].
- Waktu istirahat/sholat (jika relevan).
- Opsi alternatif jika hujan/tutup.

### 3. ESTIMASI BIAYA (BUDGETING)
Hitung perkiraan pengeluaran per orang dalam mata uang lokal dan Rupiah.
- Tiket masuk wisata.
- Estimasi biaya makan per kali makan.
- Transportasi lokal.
- Oleh-oleh (Opsional).

### 4. LOCAL INSIGHTS & HIDDEN GEMS
Berikan tips yang hanya diketahui warga lokal atau traveler berpengalaman.
- Spot foto terbaik.
- Menu spesifik yang harus dipesan di resto rekomendasi.
- Area yang harus dihindari (Tourist traps/Scam).

## OUTPUT
- Itinerary Harian lengkap (Jam demi jam).
- Tabel Estimasi Budget Total.
- Daftar Barang Bawaan (Packing List) sesuai musim/cuaca [TANGGAL_PERGI].
- 3 Rekomendasi Akomodasi/Hotel strategis.
- Link Google Maps (jika memungkinkan simulasi rute).