"use client";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import "./quest.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
};

type Brief = {
  title: string;
  category: string;
  industry: string;
  rarity: string;
  difficulty: string;
  deadline: string;
  twist: string;
  client: string;
  problem: string;
  mission: string;
  projectOverview?: string;
  acceptanceCriteria?: string[];
  requirements: string[];
  deliverables: string[];
  skills: string[];
  tools: string[];
};

const categories: Category[] = [
  { id: "web", name: "Web Development", subtitle: "Frontend / Backend", icon: "</>" },
  { id: "mobile", name: "Mobile Development", subtitle: "iOS / Android", icon: "▣" },
  { id: "data", name: "Data & AI", subtitle: "Data Processing / AI", icon: "◉" },
  { id: "game", name: "Game Development", subtitle: "Game Engine / Gameplay", icon: "⌘" },
  { id: "cloud", name: "DevOps & Cloud", subtitle: "Infrastructure / Deployment", icon: "☁" },
  { id: "other", name: "Lainnya", subtitle: "Tools / Scripting", icon: "•••" },
];

const briefs: Brief[] = [
  {
    title: "E-commerce Platform with AI Recommendation",
    category: "web",
    industry: "E-commerce",
    rarity: "Legendary",
    difficulty: "Hard",
    deadline: "2 hari",
    twist: "Sistem rekomendasi harus tetap berguna tanpa layanan AI berbayar.",
    client: "Shopera — platform belanja online untuk brand lokal.",
    problem: "Pelanggan kesulitan menemukan produk yang sesuai dengan minat mereka. Pemilik toko juga membutuhkan cara untuk memahami produk yang paling diminati.",
    mission: "Bangun platform belanja dengan katalog produk, pencarian, keranjang, dan rekomendasi produk sederhana.",
    projectOverview: "Shopera ingin mengembangkan pengalaman belanja online yang membantu pelanggan menemukan produk tanpa harus menelusuri seluruh katalog secara manual. Saat ini, pelanggan dapat melewatkan produk relevan karena katalog yang semakin besar membuat pencarian kurang efisien. Pemilik toko juga membutuhkan cara untuk menampilkan produk terkait dan memahami hubungan antara kategori serta minat pelanggan. Bangun aplikasi web responsif yang mengintegrasikan katalog, pencarian, keranjang belanja, dan rekomendasi berbasis aturan atau interaksi sederhana. Solusi harus tetap berfungsi tanpa layanan AI berbayar, menjelaskan kondisi ketika rekomendasi belum tersedia, dan menyediakan data contoh agar seluruh alur dapat diuji.",
    acceptanceCriteria: ["Pengguna dapat melihat katalog produk beserta nama, harga, kategori, gambar atau placeholder, dan informasi ketersediaan.","Pencarian dan filter kategori memperbarui daftar produk serta menampilkan pesan yang jelas ketika tidak ada hasil.","Pengguna dapat menambahkan produk ke keranjang, mengubah kuantitas, menghapus item, dan melihat subtotal yang dihitung dengan benar.","Rekomendasi menampilkan produk terkait berdasarkan aturan yang terdokumentasi dan tidak merekomendasikan item yang tidak valid.","Tampilan dapat digunakan pada layar desktop dan mobile, serta input dan kondisi error ditangani dengan jelas.","README menjelaskan setup, data contoh, pendekatan rekomendasi, batasan solusi, dan cara menguji alur utama."],
    requirements: ["Katalog dan pencarian produk", "Keranjang belanja", "Rekomendasi produk", "Responsive layout", "Validasi input dan error state"],
    deliverables: ["Source code di repository Git", "README dan instruksi instalasi", "Screenshot fitur utama", "Demo aplikasi yang bisa dijalankan"],
    skills: [
      "Frontend Development — katalog, pencarian, dan keranjang responsif.",
      "CRUD \u0026 Database Design — struktur produk dan data keranjang.",
      "Recommendation Logic — rekomendasi berdasarkan kategori atau interaksi.",
      "Input Validation — validasi input dan penanganan error.",
      "Testing \u0026 Git — pengujian alur utama dan version control."
    ],
    tools: [
      "Next.js atau React — antarmuka web.",
      "Node.js — logika backend atau API jika diperlukan.",
      "SQLite atau PostgreSQL — penyimpanan data.",
      "Git \u0026 GitHub — version control dan dokumentasi.",
      "Vitest atau Jest — pengujian fungsi penting."
    ],
  },
  {
    title: "Smart Appointment Booking",
    category: "web",
    industry: "Travel & Hospitality",
    rarity: "Rare",
    difficulty: "Medium",
    deadline: "3 hari",
    twist: "Dua pengguna tidak boleh mendapatkan slot waktu yang sama.",
    client: "TripNest — startup yang membantu wisatawan memesan aktivitas lokal.",
    problem: "Pemesanan aktivitas masih dilakukan melalui pesan manual, sehingga jadwal sering bentrok dan status pesanan sulit dilacak.",
    mission: "Buat sistem booking dengan daftar aktivitas, pilihan jadwal, dan status pemesanan.",
    projectOverview: "TripNest mengelola pemesanan aktivitas lokal yang memiliki jadwal dan kapasitas terbatas. Pemesanan melalui pesan manual menyulitkan staf untuk mengetahui slot yang masih tersedia dan meningkatkan risiko dua pelanggan memesan waktu yang sama. Pelanggan membutuhkan informasi aktivitas, jadwal yang jelas, serta konfirmasi status pemesanan tanpa harus menghubungi staf berulang kali. Bangun sistem booking yang memungkinkan pengguna memilih aktivitas dan slot, mengirim data pemesan, serta melihat status pesanannya. Aturan ketersediaan harus diperiksa kembali saat pemesanan disimpan agar slot yang sudah penuh tidak dapat dipesan lagi.",
    acceptanceCriteria: ["Daftar aktivitas menampilkan informasi yang relevan, termasuk nama, deskripsi singkat, jadwal, dan kapasitas.","Pengguna hanya dapat memilih slot yang masih tersedia dan tidak berada di masa lalu.","Form booking memvalidasi field wajib dan menolak data yang tidak sesuai.","Sistem menolak pemesanan yang menyebabkan kapasitas slot terlampaui, termasuk ketika slot telah dipesan sebelumnya.","Pemesanan yang berhasil menghasilkan identitas atau referensi booking dan status yang dapat dilihat kembali.","Status kosong, slot penuh, kegagalan penyimpanan, dan keberhasilan booking memiliki umpan balik yang berbeda."],
    requirements: ["Daftar aktivitas", "Kalender atau pilihan slot", "Form booking", "Pencegahan jadwal bentrok", "Halaman status pesanan"],
    deliverables: ["Source code", "README", "Screenshot alur booking", "Demo aplikasi"],
    skills: [
      "Web Development — halaman aktivitas dan formulir booking.",
      "CRUD \u0026 Database Design — pengelolaan aktivitas, slot, dan booking.",
      "Business Logic — mencegah pemesanan slot yang sama.",
      "Input Validation — memvalidasi tanggal dan data pemesan.",
      "Testing — menguji bentrok jadwal dan perubahan status."
    ],
    tools: [
      "Next.js atau React — antarmuka booking.",
      "Node.js dan Express — API backend.",
      "SQLite atau PostgreSQL — data slot dan pemesanan.",
      "Git \u0026 GitHub — version control.",
      "Postman — pengujian API jika menggunakan REST."
    ],
  },
  {
    title: "Inventory Control Dashboard",
    category: "web",
    industry: "Logistik",
    rarity: "Common",
    difficulty: "Medium",
    deadline: "5 hari",
    twist: "Tampilkan peringatan ketika stok mencapai batas minimum.",
    client: "GudangKita — usaha distribusi yang masih mencatat stok secara manual.",
    problem: "Selisih catatan stok membuat staf kesulitan mengetahui barang yang hampir habis.",
    mission: "Bangun dashboard inventaris untuk mencatat produk, perubahan stok, dan peringatan stok rendah.",
    projectOverview: "GudangKita mendistribusikan barang ke berbagai pelanggan dan masih bergantung pada pencatatan stok yang tersebar. Perbedaan antara stok fisik dan catatan membuat staf terlambat mengetahui barang yang hampir habis atau jumlah yang tidak wajar. Tim membutuhkan satu dashboard yang menjadi tempat untuk memeriksa produk, menelusuri perubahan kuantitas, dan memprioritaskan pengadaan. Bangun sistem inventaris yang mendukung pengelolaan produk, pencarian, filter, ringkasan jumlah stok, serta pencatatan barang masuk dan keluar. Setiap perubahan stok harus divalidasi dan dapat ditelusuri melalui riwayat transaksi agar kesalahan lebih mudah ditemukan.",
    acceptanceCriteria: ["Pengguna dapat membuat, melihat, memperbarui, dan menghapus produk sesuai aturan aplikasi.","Produk memiliki identitas unik serta informasi nama, kategori, jumlah stok, dan batas stok minimum.","Pencarian dan filter menampilkan hasil yang sesuai serta menyediakan kondisi ketika data tidak ditemukan.","Transaksi barang masuk dan keluar memperbarui stok secara konsisten dan menolak kuantitas nol, negatif, atau pengeluaran melebihi stok tersedia.","Produk yang mencapai atau berada di bawah batas minimum diberi indikator stok rendah.","Dashboard menampilkan ringkasan yang konsisten dengan data produk dan riwayat perubahan stok."],
    requirements: ["CRUD produk", "Pencarian dan filter", "Pencatatan perubahan stok", "Indikator stok minimum", "Ringkasan inventaris"],
    deliverables: ["Source code", "README", "Contoh data produk", "Screenshot dashboard"],
    skills: [
      "Dashboard Development — ringkasan inventaris yang mudah dibaca.",
      "CRUD \u0026 Database Design — pengelolaan produk dan stok.",
      "Search \u0026 Filtering — pencarian dan filter produk.",
      "Business Logic — pembaruan stok dan peringatan stok minimum.",
      "Validation \u0026 Testing — validasi jumlah dan pengujian perubahan stok."
    ],
    tools: [
      "React atau Next.js — antarmuka dashboard.",
      "Node.js dan Express — API untuk pengelolaan data.",
      "SQLite atau PostgreSQL — penyimpanan inventaris.",
      "Git \u0026 GitHub — version control.",
      "Chart.js — opsi untuk visualisasi data stok."
    ],
  },
  {
    title: "Mobile Habit Tracker",
    category: "mobile",
    industry: "Lifestyle",
    rarity: "Rare",
    difficulty: "Medium",
    deadline: "4 hari",
    twist: "Pengguna harus tetap bisa mencatat kebiasaan saat offline.",
    client: "Daymark — produk digital untuk membantu pengguna membangun rutinitas.",
    problem: "Pengguna sering kehilangan konsistensi karena tidak punya cara sederhana untuk memantau rutinitas.",
    mission: "Buat aplikasi mobile untuk mengelola kebiasaan dan melihat progres harian.",
    projectOverview: "Daymark ingin membantu pengguna membangun kebiasaan melalui rutinitas kecil yang dapat dilacak setiap hari. Pengguna sering kehilangan konsistensi karena progres tersebar dalam catatan atau aplikasi yang terlalu rumit. Aplikasi harus membuat aktivitas harian mudah ditandai sekaligus memperlihatkan riwayat yang membantu pengguna mengevaluasi kebiasaan mereka. Bangun aplikasi mobile untuk membuat dan mengedit kebiasaan, menandai penyelesaian harian, serta melihat progres berdasarkan tanggal. Data harus tersimpan secara lokal sehingga pengguna tetap dapat menggunakan fitur utama tanpa koneksi internet, dan antarmuka harus membedakan hari yang belum diisi dari hari ketika kebiasaan memang tidak diselesaikan.",
    acceptanceCriteria: ["Pengguna dapat membuat, mengedit, dan menghapus kebiasaan dengan nama yang divalidasi.","Setiap kebiasaan dapat ditandai selesai atau dibatalkan untuk tanggal yang sesuai.","Status kebiasaan dan riwayatnya tetap tersedia setelah aplikasi ditutup dan dibuka kembali.","Ringkasan progres dihitung dari data yang tersimpan dan tidak menghitung satu kebiasaan dua kali pada tanggal yang sama.","Daftar kosong, belum ada riwayat, dan kegagalan penyimpanan memiliki tampilan atau pesan yang jelas.","README menjelaskan cara menjalankan aplikasi, mekanisme penyimpanan lokal, dan langkah pengujian."],
    requirements: ["Tambah dan edit kebiasaan", "Checklist harian", "Riwayat progres", "Penyimpanan lokal", "Empty state yang jelas"],
    deliverables: ["Source code", "README", "Screenshot aplikasi", "Demo atau rekaman singkat"],
    skills: [
      "Mobile UI Development — layar daftar dan detail kebiasaan.",
      "State Management — pembaruan checklist dan progres.",
      "Local Data Persistence — penyimpanan data saat offline.",
      "Date \u0026 Progress Logic — perhitungan progres harian.",
      "Testing \u0026 UX — pengujian alur dan kondisi kosong."
    ],
    tools: [
      "Flutter dan Dart — pengembangan aplikasi mobile.",
      "SQLite atau penyimpanan lokal Flutter — data offline.",
      "Android Studio — emulator dan debugging.",
      "Git \u0026 GitHub — version control.",
      "Flutter Test — pengujian fungsi dan antarmuka."
    ],
  },
  {
    title: "Customer Churn Explorer",
    category: "data",
    industry: "Fintech",
    rarity: "Epic",
    difficulty: "Hard",
    deadline: "2 hari",
    twist: "Setiap grafik harus menjelaskan insight, bukan hanya menampilkan angka.",
    client: "Finora — layanan keuangan digital yang ingin memahami pelanggan tidak aktif.",
    problem: "Tim belum bisa melihat pola pelanggan yang berpotensi berhenti menggunakan layanan.",
    mission: "Buat dashboard analisis data pelanggan dengan visualisasi dan ringkasan temuan.",
    projectOverview: "Finora ingin memahami karakteristik pelanggan yang berhenti menggunakan layanan agar tim dapat mengevaluasi strategi retensi. Data pelanggan yang tersedia belum memberikan gambaran yang mudah dipahami mengenai pola aktivitas, kelompok pelanggan, dan kemungkinan faktor yang berkaitan dengan churn. Tim membutuhkan analisis yang transparan, bukan sekadar grafik tanpa penjelasan atau klaim sebab-akibat yang tidak didukung data. Buat alur analisis yang mendokumentasikan dataset, membersihkan data, menghitung metrik churn, dan menampilkan visualisasi yang dapat dijelajahi. Setiap temuan harus menyertakan interpretasi, ukuran data yang digunakan, asumsi, dan keterbatasan agar hasilnya dapat dinilai secara kritis.",
    acceptanceCriteria: ["Dataset dan definisi churn dijelaskan, termasuk sumber data, kolom penting, serta keterbatasannya.","Proses pembersihan menangani atau melaporkan nilai kosong, duplikat, dan tipe data yang tidak valid.","Metrik churn dihitung dengan rumus yang dijelaskan dan jumlah data yang digunakan dapat diverifikasi.","Dashboard atau laporan memuat minimal tiga visualisasi yang menjawab pertanyaan analisis yang berbeda.","Filter atau pengelompokan yang tersedia memperbarui hasil analisis secara konsisten.","Setiap visualisasi memiliki penjelasan insight dan tidak menyatakan hubungan sebab-akibat tanpa bukti yang memadai."],
    requirements: ["Dataset yang terdokumentasi", "Pembersihan data", "Minimal tiga visualisasi", "Filter data", "Ringkasan insight"],
    deliverables: ["Source code atau notebook", "Dokumentasi dataset", "Dashboard atau laporan", "Kesimpulan analisis"],
    skills: [
      "Data Cleaning — menangani data kosong dan duplikat.",
      "Exploratory Data Analysis — menemukan pola pelanggan tidak aktif.",
      "Data Visualization — memilih grafik yang tepat.",
      "Insight Communication — menjelaskan temuan dan keterbatasan.",
      "Data Quality — memeriksa kualitas data dan asumsi analisis."
    ],
    tools: [
      "Python — bahasa untuk analisis data.",
      "Pandas — pembersihan dan transformasi data.",
      "Jupyter Notebook — dokumentasi analisis.",
      "Matplotlib — visualisasi data.",
      "Git \u0026 GitHub — version control dan dokumentasi."
    ],
  },
  {
    title: "Automated Deployment Pipeline",
    category: "cloud",
    industry: "SaaS",
    rarity: "Epic",
    difficulty: "Professional",
    deadline: "3 hari",
    twist: "Pipeline harus menghentikan deployment ketika pemeriksaan gagal.",
    client: "ShipShape — tim kecil yang sering melakukan deployment manual.",
    problem: "Kesalahan saat rilis sulit dideteksi karena proses pengujian dan deployment belum konsisten.",
    mission: "Rancang pipeline otomatis yang menjalankan pemeriksaan sebelum aplikasi dirilis.",
    projectOverview: "ShipShape adalah tim pengembang kecil yang ingin mengurangi kesalahan ketika menyiapkan rilis aplikasi. Proses manual membuat pemeriksaan kualitas, pengujian, dan pembuatan build dilakukan secara tidak konsisten antarperubahan kode. Tim membutuhkan pipeline yang memberikan hasil pemeriksaan yang dapat dipahami dan mencegah perubahan yang gagal dalam pemeriksaan berlanjut ke tahap rilis. Rancang workflow CI yang berjalan pada perubahan repository, menjalankan pemeriksaan kode dan pengujian, lalu membangun aplikasi hanya jika tahap sebelumnya berhasil. Dokumentasikan cara membaca log, menangani kegagalan, mengelola konfigurasi secara aman, dan membuktikan bahwa pipeline berhasil maupun sengaja gagal ketika sebuah pemeriksaan tidak lolos.",
    acceptanceCriteria: ["Workflow dipicu oleh event repository yang didokumentasikan, seperti push atau pull request.","Pipeline menjalankan pemeriksaan kode, tes yang tersedia, dan build dengan urutan yang jelas.","Kegagalan pada tahap pemeriksaan atau tes membuat workflow berstatus gagal dan menghentikan tahap lanjutan yang bergantung padanya.","Log workflow cukup jelas untuk mengidentifikasi tahap yang gagal tanpa mengungkap secret.","Konfigurasi tidak menyimpan token, password, atau secret sensitif secara langsung di repository.","README menjelaskan prasyarat, cara memicu workflow, contoh hasil sukses dan gagal, serta langkah troubleshooting."],
    requirements: ["Repository dengan konfigurasi pipeline", "Tahap pemeriksaan otomatis", "Build aplikasi", "Penanganan kegagalan", "Dokumentasi proses"],
    deliverables: ["File konfigurasi pipeline", "Source code contoh", "README", "Bukti pipeline berhasil dan gagal"],
    skills: [
      "CI/CD Design — menyusun tahapan pemeriksaan dan build.",
      "Automated Testing — menjalankan tes sebelum rilis.",
      "Build \u0026 Deployment — menyiapkan aplikasi untuk deployment.",
      "Failure Handling — menghentikan pipeline jika pemeriksaan gagal.",
      "Secrets \u0026 Documentation — menjaga rahasia konfigurasi dan mendokumentasikan alur."
    ],
    tools: [
      "Git \u0026 GitHub — repository dan pemicu pipeline.",
      "GitHub Actions — menjalankan workflow CI/CD.",
      "Node.js dan npm — contoh lingkungan build web.",
      "ESLint dan TypeScript — pemeriksaan kode jika digunakan proyek.",
      "Platform deployment pilihan — menjalankan aplikasi hasil build."
    ],
  },
  {
    title: "Mini Roguelike Adventure",
    category: "game",
    industry: "Entertainment",
    rarity: "Legendary",
    difficulty: "Professional",
    deadline: "2 hari",
    twist: "Setiap permainan baru harus menghasilkan susunan tantangan yang berbeda.",
    client: "PixelForge — studio indie yang menguji prototipe game pendek.",
    problem: "Studio membutuhkan prototipe sederhana untuk menguji apakah mekanik eksplorasi dan pertarungan terasa menarik.",
    mission: "Bangun game mini dengan pergerakan karakter, tantangan, dan sistem skor.",
    projectOverview: "PixelForge membutuhkan prototipe game pendek untuk mengevaluasi apakah eksplorasi dan tantangan berulang dapat terasa menarik dalam sesi bermain singkat. Prototipe harus memiliki tujuan yang mudah dipahami, kontrol yang konsisten, dan umpan balik yang jelas ketika pemain berhasil atau gagal. Susunan tantangan yang selalu sama akan mengurangi variasi, sehingga setiap permainan baru perlu menghasilkan tata letak atau kombinasi tantangan yang berbeda tetapi tetap dapat diselesaikan. Bangun game mini dengan pergerakan karakter, rintangan atau musuh, sistem skor, dan kondisi akhir permainan. Sertakan mekanisme mulai ulang yang mengatur ulang status permainan dan dokumentasikan kontrol serta batasan generator level.",
    acceptanceCriteria: ["Pemain dapat memulai permainan, menggerakkan karakter, dan berinteraksi dengan tantangan menggunakan kontrol yang terdokumentasi.","Game memiliki kondisi menang atau kalah yang dapat dicapai dan ditampilkan dengan jelas.","Skor berubah berdasarkan tindakan yang ditentukan dan tidak bertambah hanya karena antarmuka diperbarui.","Permainan baru menghasilkan variasi tata letak atau tantangan sesuai aturan generator yang dijelaskan.","Tata letak yang dihasilkan tetap memiliki jalur atau kondisi yang memungkinkan permainan diselesaikan.","Fitur restart mengatur ulang posisi, skor, status permainan, dan elemen tantangan dengan benar."],
    requirements: ["Kontrol karakter", "Sistem tantangan", "Kondisi menang atau kalah", "Skor permainan", "Restart permainan"],
    deliverables: ["Source code", "Build yang dapat dimainkan", "Instruksi kontrol", "Screenshot atau rekaman gameplay"],
    skills: [
      "Gameplay Programming — gerakan dan interaksi karakter.",
      "Game State Management — kondisi bermain, menang, dan kalah.",
      "Procedural Generation — variasi susunan tantangan.",
      "Collision \u0026 Scoring Logic — interaksi dan perhitungan skor.",
      "Debugging \u0026 Playtesting — menguji kontrol dan restart."
    ],
    tools: [
      "Godot dan GDScript — pilihan engine untuk prototipe 2D.",
      "Godot Scene System — menyusun level dan objek game.",
      "Git \u0026 GitHub — version control.",
      "Godot Debugger — membantu menemukan masalah gameplay.",
      "Screen recorder — merekam demo untuk portfolio."
    ],
  },
  {
    title: "Developer Utility CLI",
    category: "other",
    industry: "Developer Tools",
    rarity: "Common",
    difficulty: "Easy",
    deadline: "1 hari",
    twist: "Tool harus memberikan pesan error yang membantu pengguna memperbaiki input.",
    client: "DevNest — komunitas developer yang ingin mengurangi pekerjaan repetitif.",
    problem: "Developer menghabiskan waktu untuk tugas kecil yang sering dilakukan berulang kali.",
    mission: "Buat command-line tool yang mengotomatisasi satu tugas developer dengan input dan output yang jelas.",
    projectOverview: "DevNest ingin mengurangi waktu yang dihabiskan developer untuk menjalankan tugas kecil yang berulang. Perintah manual yang tidak konsisten dapat menyebabkan input salah, output sulit dibaca, dan proses yang sebenarnya sederhana menjadi memakan waktu. Tool yang dibuat harus menyelesaikan satu tugas spesifik dengan antarmuka perintah yang mudah dipahami dan perilaku yang dapat diprediksi. Bangun command-line utility yang menerima argumen, memvalidasi input, menjalankan operasi yang terdokumentasi, dan menghasilkan output yang konsisten. Ketika terjadi kesalahan, program harus memberikan pesan yang menjelaskan masalah dan cara memperbaikinya, serta menggunakan kode keluar yang sesuai agar dapat dipakai dalam otomasi.",
    acceptanceCriteria: ["CLI menyediakan perintah atau argumen yang terdokumentasi untuk menjalankan fungsi utamanya.","Input wajib yang hilang atau format yang salah menghasilkan pesan bantuan yang jelas.","Input valid menghasilkan output dengan format konsisten dan sesuai dengan contoh di README.","Kesalahan operasional ditangani tanpa menampilkan traceback yang tidak diperlukan kepada pengguna biasa.","Kode keluar membedakan eksekusi berhasil dan gagal agar dapat digunakan dalam script otomasi.","Tes mencakup minimal satu kasus sukses, satu input tidak valid, dan satu kondisi error."],
    requirements: ["Argumen CLI", "Validasi input", "Output terstruktur", "Penanganan error", "Petunjuk penggunaan"],
    deliverables: ["Source code", "README", "Contoh perintah", "Contoh hasil output"],
    skills: [
      "CLI Design — merancang perintah yang mudah digunakan.",
      "Input Parsing \u0026 Validation — memvalidasi argumen dan format input.",
      "Automation \u0026 File Handling — mengotomatisasi tugas repetitif.",
      "Error Handling — pesan error yang membantu pengguna.",
      "Testing \u0026 Documentation — menguji input dan mendokumentasikan penggunaan."
    ],
    tools: [
      "Python — bahasa untuk command-line tool.",
      "argparse — memproses argumen perintah.",
      "pytest — menguji input dan output.",
      "Git \u0026 GitHub — version control dan dokumentasi.",
      "PowerShell atau Bash — menjalankan dan menguji tool."
    ],
  },
];

const rarityOrder = ["Common", "Rare", "Epic", "Legendary", "Mythic"];

const baseXP: Record<string, number> = {
  Common: 50,
  Rare: 90,
  Epic: 150,
  Legendary: 240,
  Mythic: 350,
};

function getLevelFromXP(totalXP: number): number {
  let level = 1;
  let remainingXP = Math.max(0, totalXP);

  while (level < 99) {
    const requiredXP = 100 + (level - 1) * 25;
    if (remainingXP < requiredXP) break;
    remainingXP -= requiredXP;
    level += 1;
  }

  return level;
}

function getXPForNextLevel(level: number): number {
  return 100 + (level - 1) * 25;
}

function getProjectOverview(brief: Brief): string {
  if (brief.projectOverview?.trim()) {
    return brief.projectOverview.trim();
  }

  return [
    `${brief.client} Proyek ini berfokus pada kebutuhan nyata yang perlu diselesaikan melalui solusi perangkat lunak yang dapat digunakan dan dievaluasi.`,
    `${brief.problem} Kondisi tersebut dapat menghambat pekerjaan pengguna, mengurangi kejelasan informasi, atau meningkatkan risiko kesalahan dalam proses sehari-hari.`,
    `${brief.mission} Solusi yang dibuat harus memiliki alur penggunaan yang jelas, menangani input yang tidak valid, dan memberikan umpan balik yang mudah dipahami.`,
    `Hasil akhir harus dapat dijalankan dan diperiksa oleh orang lain. Sertakan dokumentasi setup, contoh penggunaan, serta bukti pengujian untuk menunjukkan bahwa fitur utama bekerja sesuai kebutuhan.`
  ].join(" ");
}

function getAcceptanceCriteria(brief: Brief): string[] {
  if (brief.acceptanceCriteria?.length) {
    return brief.acceptanceCriteria;
  }

  return [
    "Seluruh fitur utama yang tercantum pada requirements dapat didemonstrasikan.",
    "Input yang tidak valid ditangani dengan pesan yang jelas tanpa membuat aplikasi gagal secara tidak terkendali.",
    "Kondisi kosong, data tidak ditemukan, atau kegagalan proses memiliki umpan balik yang sesuai.",
    "README menjelaskan instalasi, konfigurasi, cara menjalankan proyek, dan langkah pengujian.",
    "Deliverables dapat diperiksa dan digunakan untuk mengevaluasi hasil proyek."
  ];
}
function getXPForQuest(brief: Brief): number {
  const rarityXP = baseXP[brief.rarity] ?? 50;
  const difficultyMultiplier: Record<string, number> = {
    Easy: 0.8,
    Medium: 1,
    Hard: 1.3,
    Professional: 1.6,
  };
  const difficulty = difficultyMultiplier[brief.difficulty] ?? 1;
  const deadlineMatch = brief.deadline.match(/\d+/);
  const deadlineDays = deadlineMatch ? Number(deadlineMatch[0]) : 0;
  const deadlineBonus = deadlineDays > 0
    ? Math.min(0.5, 0.5 / deadlineDays)
    : 0;
  const deliverableBonus = Math.min(0.25, brief.deliverables.length * 0.05);

  return Math.round(rarityXP * difficulty * (1 + deadlineBonus + deliverableBonus));
}

function getRarityWeights(level: number): Record<string, number> {
  const progress = Math.max(0, Math.min(1, (level - 1) / 98));

  return {
    Common: 75 - 40 * progress,
    Rare: 20 + 25 * progress,
    Epic: 4 + 10 * progress,
    Legendary: 0.9 + 4 * progress,
    Mythic: 0.1 + progress,
  };
}

function chooseBrief(
  categoryId: string,
  previousTitle: string | null,
  sourceBriefs: Brief[] = briefs,
  level: number = 1,
): Brief {
  const available = sourceBriefs.filter((brief) => brief.category === categoryId);
  const pool = available.length ? available : sourceBriefs;

  if (pool.length === 0) {
    throw new Error("Tidak ada quest yang tersedia.");
  }

  const weights = getRarityWeights(level);
  const availableRarities = rarityOrder.filter((rarity) =>
    pool.some((brief) => brief.rarity === rarity)
  );

  const totalWeight = availableRarities.reduce(
    (total, rarity) => total + weights[rarity],
    0,
  );

  let roll = Math.random() * totalWeight;
  let chosenRarity = availableRarities[availableRarities.length - 1];

  for (const rarity of availableRarities) {
    roll -= weights[rarity];
    if (roll <= 0) {
      chosenRarity = rarity;
      break;
    }
  }

  const rarityPool = pool.filter((brief) => brief.rarity === chosenRarity);
  const withoutPrevious = rarityPool.filter((brief) => brief.title !== previousTitle);
  const candidates = withoutPrevious.length > 0 ? withoutPrevious : rarityPool;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

export default function QuestPage() {
  const [questBriefs, setQuestBriefs] = useState<Brief[]>(briefs);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [questHistory, setQuestHistory] = useState<Brief[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadQuests() {
      const { data, error } = await supabase
        .from("quests")
        .select(
          "title, category, industry, rarity, difficulty, deadline, twist, client, problem, mission, projectOverview:project_overview, acceptanceCriteria:acceptance_criteria, requirements, deliverables, skills, tools"
        )
        .eq("is_active", true);

      if (cancelled) return;

      if (error) {
        console.error("Gagal mengambil quest dari Supabase:", error.message);
        return;
      }

      if (data && data.length > 0) {
        setQuestBriefs(data as Brief[]);
      }
    }

    loadQuests().finally(() => {
      if (!cancelled) setQuestsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("unboxbrief.questHistory");
      if (!saved) return;

      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setQuestHistory(parsed as Brief[]);
      }
    } catch (error) {
      console.error("Gagal membaca riwayat quest:", error);
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("web");
  const [opening, setOpening] = useState(false);
  const [revealedBrief, setRevealedBrief] = useState<Brief | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [questProgress, setQuestProgress] = useState<Record<string, string[]>>({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});
  const [totalXP, setTotalXP] = useState(0);
  const [xpClaimedQuests, setXpClaimedQuests] = useState<Record<string, boolean>>({});
  const [xpLoaded, setXpLoaded] = useState(false);
  const [xpPopup, setXpPopup] = useState<{
    amount: number;
    title: string;
    levelUp: number | null;
  } | null>(null);

  const [collectionFilter, setCollectionFilter] = useState("all");
  const [collectionSearch, setCollectionSearch] = useState("");
  const playerLevel = getLevelFromXP(totalXP);
  const xpForNextLevel = getXPForNextLevel(playerLevel);
  const xpIntoCurrentLevel = totalXP - Array.from(
    { length: playerLevel - 1 },
    (_, index) => 100 + index * 25,
  ).reduce((sum, value) => sum + value, 0);

  const completedHistoryCount = questHistory.filter(
    (brief) => completedQuests[questKey(brief)] === true,
  ).length;
  const completionRate =
    questHistory.length > 0
      ? Math.round((completedHistoryCount / questHistory.length) * 100)
      : 0;
  const playerRarityCounts = questHistory.reduce<Record<string, number>>(
    (counts, brief) => {
      counts[brief.rarity] = (counts[brief.rarity] ?? 0) + 1;
      return counts;
    },
    {},
  );
  const playerRarities = [
    "Common",
    "Uncommon",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic",
  ];
  function questKey(brief: Brief) {
    return `${brief.category}::${brief.title}`;
  }
  const filteredQuestHistory = questHistory.filter((brief) => {
    const key = questKey(brief);
    const checkedCount = (questProgress[key] ?? []).filter(
      (item) => brief.deliverables.includes(item)
    ).length;
    const isCompleted = completedQuests[key] === true;
    const isInProgress = !isCompleted && checkedCount > 0;
    const searchText = `${brief.title} ${brief.industry} ${brief.category}`.toLowerCase();
    const matchesSearch = searchText.includes(collectionSearch.trim().toLowerCase());

    const matchesFilter =
      collectionFilter === "all" ||
      (collectionFilter === "in-progress" && isInProgress) ||
      (collectionFilter === "completed" && isCompleted);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("unboxbrief.questProgress");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setQuestProgress(parsed as Record<string, string[]>);
        }
      }
    } catch (error) {
      console.error("Gagal membaca progress quest:", error);
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("unboxbrief.completedQuests");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setCompletedQuests(parsed as Record<string, boolean>);
        }
      }
    } catch (error) {
      console.error("Gagal membaca status quest selesai:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const savedXP = localStorage.getItem("unboxbrief.totalXP");
      if (savedXP !== null) {
        const parsedXP = Number(savedXP);
        if (Number.isFinite(parsedXP) && parsedXP >= 0) {
          setTotalXP(Math.floor(parsedXP));
        }
      }

      const savedClaims = localStorage.getItem("unboxbrief.xpClaimedQuests");
      if (savedClaims) {
        const parsed: unknown = JSON.parse(savedClaims);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setXpClaimedQuests(parsed as Record<string, boolean>);
        }
      }
    } catch (error) {
      console.error("Gagal membaca data XP:", error);
    } finally {
      setXpLoaded(true);
    }
  }, []);

  function setQuestCompletion(brief: Brief, completed: boolean) {
    const key = questKey(brief);

    if (!completed) return;
    if (!xpLoaded || completedQuests[key] === true) return;

    // Baca checklist terakhir dari penyimpanan agar validasi tidak bergantung
    // pada pembaruan state React yang belum sempat dirender.
    let savedItems: string[] = [];
    try {
      const rawProgress = localStorage.getItem("unboxbrief.questProgress");
      const parsed: unknown = rawProgress ? JSON.parse(rawProgress) : {};
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const items = (parsed as Record<string, unknown>)[key];
        if (Array.isArray(items)) {
          savedItems = items.filter((item): item is string => typeof item === "string");
        }
      }
    } catch (error) {
      console.error("Gagal memvalidasi progress quest:", error);
      return;
    }

    const validItems = new Set(savedItems.filter((item) => brief.deliverables.includes(item)));
    if (
      brief.deliverables.length === 0 ||
      brief.deliverables.some((item) => !validItems.has(item))
    ) {
      return;
    }

    const nextCompleted = { ...completedQuests, [key]: true };
    let nextClaims = xpClaimedQuests;
    let nextXP = totalXP;

    const gainedXP =
      xpClaimedQuests[key] !== true ? getXPForQuest(brief) : 0;

    if (gainedXP > 0) {
      nextXP += gainedXP;
      nextClaims = { ...xpClaimedQuests, [key]: true };
    }

    try {
      localStorage.setItem("unboxbrief.completedQuests", JSON.stringify(nextCompleted));
      localStorage.setItem("unboxbrief.xpClaimedQuests", JSON.stringify(nextClaims));
      localStorage.setItem("unboxbrief.totalXP", String(nextXP));
    } catch (error) {
      console.error("Gagal menyimpan penyelesaian quest dan XP:", error);
      return;
    }

    setCompletedQuests(nextCompleted);
    setXpClaimedQuests(nextClaims);
    setTotalXP(nextXP);

    if (gainedXP > 0) {
      const previousLevel = getLevelFromXP(totalXP);
      const nextLevel = getLevelFromXP(nextXP);

      setXpPopup({
        amount: gainedXP,
        title: brief.title,
        levelUp: nextLevel > previousLevel ? nextLevel : null,
      });

      window.setTimeout(() => setXpPopup(null), 3500);
    }
  }

  function saveQuestProgress(brief: Brief, items: string[]) {
    const key = questKey(brief);
    setQuestProgress((current) => {
      const next = { ...current, [key]: items };
      try {
        localStorage.setItem("unboxbrief.questProgress", JSON.stringify(next));
      } catch (error) {
        console.error("Gagal menyimpan progress quest:", error);
      }
      return next;
    });
  }
  const [previousTitle, setPreviousTitle] = useState<string | null>(null);
  const [showRarityPopup, setShowRarityPopup] = useState(false);

  function saveQuestToHistory(brief: Brief) {
    try {
      const saved = localStorage.getItem("unboxbrief.questHistory");
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      const current = Array.isArray(parsed) ? (parsed as Brief[]) : [];

      const next = [
        brief,
        ...current.filter(
          (item) => !(item.title === brief.title && item.category === brief.category)
        ),
      ].slice(0, 50);

      localStorage.setItem("unboxbrief.questHistory", JSON.stringify(next));
      setQuestHistory(next);
    } catch (error) {
      console.error("Gagal menyimpan riwayat quest:", error);
    }
  }

  function deleteQuestFromCollection(brief: Brief) {
    const key = questKey(brief);
    const updatedHistory = questHistory.filter(
      (item) => questKey(item) !== key
    );

    setQuestHistory(updatedHistory);

    try {
      localStorage.setItem("unboxbrief.questHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Gagal memperbarui koleksi quest:", error);
    }



    if (revealedBrief && questKey(revealedBrief) === key) {
      setRevealedBrief(null);
      setCheckedItems([]);
      setShowRarityPopup(false);
    }
  }
  function reopenQuest(brief: Brief) {
    setRevealedBrief(brief);
    setCheckedItems(questProgress[questKey(brief)] ?? []);
    setShowRarityPopup(false);

    window.setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function openBox() {
    if (opening) return;

    setOpening(true);
    setShowRarityPopup(false);
    setRevealedBrief(null);
    setCheckedItems([]);

    window.setTimeout(() => {
      const brief = chooseBrief(selectedCategory, previousTitle, questBriefs, playerLevel);
      setPreviousTitle(brief.title);
      saveQuestToHistory(brief);
      setRevealedBrief(brief);
      setCheckedItems(questProgress[questKey(brief)] ?? []);
      setOpening(false);
      setShowRarityPopup(true);
    }, 1500);
  }

  function toggleItem(item: string) {
    if (!revealedBrief || completedQuests[questKey(revealedBrief)] === true) return;

    const next = checkedItems.includes(item)
      ? checkedItems.filter((value) => value !== item)
      : [...checkedItems, item];

    setCheckedItems(next);
    saveQuestProgress(revealedBrief, next);

  }

  async function copyBrief() {
    if (!revealedBrief) return;

    const text = [
    `# ${revealedBrief.title}`,
    `Rarity: ${revealedBrief.rarity}`,
    `Category: ${categories.find((category) => category.id === revealedBrief.category)?.name}`,
    `Industry: ${revealedBrief.industry}`,
    `Difficulty: ${revealedBrief.difficulty}`,
    `Deadline: ${revealedBrief.deadline}`,
    `Project Twist: ${revealedBrief.twist}`,
    "",
    `## Project Overview`,
    getProjectOverview(revealedBrief),
    "",
    `## Client`,
    revealedBrief.client,
    "",
    `## Problem Statement`,
    revealedBrief.problem,
    "",
    `## Mission`,
    revealedBrief.mission,
    "",
    `## Requirements`,
    ...revealedBrief.requirements.map((item) => `- [ ] ${item}`),
    "",
    `## Acceptance Criteria`,
    ...getAcceptanceCriteria(revealedBrief).map((item) => `- [ ] ${item}`),
    "",
    `## Deliverables`,
    ...revealedBrief.deliverables.map((item) => `- [ ] ${item}`),
    "",
    `## Skills & Engineering Practices`,
    ...revealedBrief.skills.map((item) => `- ${item.split(/\s+[—–-]\s+/)[0].trim()}`),
    "",
    `## Tools & Technologies`,
    ...revealedBrief.tools.map((item) => `- ${item.split(/\s+[—–-]\s+/)[0].trim()}`),
  ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      window.alert("Brief berhasil disalin!");
    } catch {
      window.alert("Clipboard tidak tersedia. Coba gunakan browser yang mendukung penyalinan.");
    }
  }

  async function exportBrief() {
    if (!revealedBrief) return;

    try {
      const category =
        categories.find((item) => item.id === revealedBrief.category)?.name ??
        revealedBrief.category;

      const response = await fetch("/fonts/arial.ttf");
      if (!response.ok) {
        throw new Error("Font Arial tidak dapat dimuat.");
      }

      const fontBytes = await response.arrayBuffer();
      const pdf = await PDFDocument.create();
      pdf.registerFontkit(fontkit);

      const font = await pdf.embedFont(fontBytes, { subset: true });
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 52;
      const textWidth = pageWidth - margin * 2;
      const ink = rgb(0.08, 0.08, 0.08);

      type PdfLine = { text: string; size: number; gapAfter: number; bold?: boolean };
      const content: PdfLine[] = [];

      const addHeading = (text: string) =>
        content.push({ text, size: 12, gapAfter: 7, bold: true });

      const addParagraph = (text: string, size = 10.5) => {
        content.push({ text, size, gapAfter: 5 });
      };

      const addList = (items: string[], namesOnly = false) => {
        for (const item of items) {
          const label = namesOnly
            ? item.split(/\s+[—–-]\s+/)[0].trim()
            : item;
          content.push({ text: `•  ${label}`, size: 10.5, gapAfter: 4 });
        }
      };

      content.push({ text: revealedBrief.title, size: 21, gapAfter: 10, bold: true });
      addParagraph(
        `${category}  |  Level ${revealedBrief.difficulty}  |  ${revealedBrief.industry}  |  Deadline ${revealedBrief.deadline}`,
        9.5
      );
      content.push({ text: "", size: 5, gapAfter: 8 });

      addHeading("PROJECT OVERVIEW");
      addParagraph(getProjectOverview(revealedBrief));
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("CLIENT");
      addParagraph(revealedBrief.client);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("PROBLEM STATEMENT");
      addParagraph(revealedBrief.problem);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("MISI");
      addParagraph(revealedBrief.mission);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("PROJECT TWIST");
      addParagraph(revealedBrief.twist);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("REQUIREMENTS");
      addList(revealedBrief.requirements);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("ACCEPTANCE CRITERIA");
      addList(getAcceptanceCriteria(revealedBrief));
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("DELIVERABLES");
      addList(revealedBrief.deliverables);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("SKILLS");
      addList(revealedBrief.skills, true);
      content.push({ text: "", size: 5, gapAfter: 5 });

      addHeading("TOOLS");
      addList(revealedBrief.tools, true);

      let page = pdf.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      for (const item of content) {
        const words = item.text.split(/\s+/);
        const wrapped: string[] = [];
        let line = "";

        for (const word of words) {
          const candidate = line ? `${line} ${word}` : word;
          if (line && font.widthOfTextAtSize(candidate, item.size) > textWidth) {
            wrapped.push(line);
            line = word;
          } else {
            line = candidate;
          }
        }
        if (line) wrapped.push(line);
        if (!wrapped.length) wrapped.push("");

        const lineHeight = item.size * 1.45;
        const requiredHeight = wrapped.length * lineHeight + item.gapAfter;

        if (y - requiredHeight < margin) {
          page = pdf.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        for (const text of wrapped) {
          page.drawText(text, {
            x: margin,
            y: y - item.size,
            size: item.size,
            font,
            color: ink,
          });
          y -= lineHeight;
        }
        y -= item.gapAfter;
      }

      const bytes = await pdf.save();
      const blob = new Blob([new Uint8Array(bytes).buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = revealedBrief.title
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9_-]+/g, "-")
        .replace(/^-|-$/g, "") || "unboxbrief";

      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (error) {
      console.error("Gagal mengekspor PDF:", error);
      window.alert("PDF gagal dibuat. Periksa terminal/browser console lalu coba lagi.");
    }
  }
  return (
    <main className="quest-page">
      {process.env.NODE_ENV === "development" && revealedBrief && (
        <button
          type="button"
          className="xp-dev-test-button"
          onClick={() => {
            const simulatedXP = getXPForQuest(revealedBrief);
            setXpPopup({
              amount: simulatedXP,
              title: `[SIMULASI] ${revealedBrief.title}`,
              levelUp: playerLevel < 99 ? playerLevel + 1 : null,
            });
            window.setTimeout(() => setXpPopup(null), 3500);
          }}
        >
          ✦ Uji Pop-up XP
        </button>
      )}
      {xpPopup && (
        <div className="xp-reward-popup" role="status" aria-live="polite">
          <div className="xp-reward-icon" aria-hidden="true">✦</div>
          <div className="xp-reward-copy">
            <strong className="xp-reward-amount">
              +{xpPopup.amount.toLocaleString("id-ID")} XP
            </strong>
            <span className="xp-reward-title">{xpPopup.title}</span>
            {xpPopup.levelUp !== null && (
              <span className="xp-reward-level">
                LEVEL UP! Kamu mencapai Level {xpPopup.levelUp}
              </span>
            )}
          </div>
        </div>
      )}
      <header className="quest-navbar">
        <Link href="/" className="quest-brand" aria-label="unboxBrief beranda">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            unbox<span className="brand-accent">Brief</span>
          </span>
        </Link>
        <nav className="quest-nav-links">
          <Link href="/">Home</Link>
          <a href="#collection">Collection</a>

        </nav>

      </header>
      <section className="quest-intro">
        <Link href="/" className="back-link">Kembali ke beranda</Link>
        <div className="quest-eyebrow">YOUR NEXT CHALLENGE STARTS HERE</div>
        <h1>
          Pilih bidangmu.
          <br />
          <span>Serahkan sisanya pada keberuntungan.</span>
        </h1>
        <p>
          Kamu boleh memilih kategori, tapi tidak bisa memilih isi kotak.
          Industri, proyek, rarity, tingkat kesulitan, dan deadline baru
          akan terungkap setelah kotak dibuka.
        </p>
      </section>

      <div className="quest-main-layout">
        <div className="quest-main-column">

      <section className="category-section" id="category">
        <div className="quest-section-title">
          <div>
            <span className="step-label">STEP 01</span>
            <h2>Pilih kategori</h2>
          </div>
          <span className="selection-count">PILIH 1 BIDANG</span>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-option ${selectedCategory === category.id ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
              disabled={opening}
              aria-pressed={selectedCategory === category.id}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-subtitle">{category.subtitle}</span>
              <span className="category-check">
                {selectedCategory === category.id ? "✓" : "+"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="blindbox-section" aria-live="polite">
        <div className={`blindbox-art ${opening ? "is-opening" : ""} ${revealedBrief ? "is-revealed" : ""}`}>
          <div className="blindbox-aura" />
          <span className="box-star star-a">✦</span>
          <span className="box-star star-b">✧</span>
          <span className="box-star star-c">✦</span>
          <div className="blindbox-cube">
            <div className="cube-lid"><span>✦</span></div>
            <div className="cube-front"><span>?</span></div>
            <div className="cube-side" />
          </div>
        </div>

        <div className="blindbox-copy">
          <span className="step-label">STEP 02</span>
          <h2>
            {opening
              ? "Membuka kotak..."
              : revealedBrief
                ? "Quest berhasil didapat!"
                : "Ada tantangan di dalamnya."}
          </h2>
          <p>
            {opening
              ? "Bersiaplah. Tantanganmu sedang dipilih."
              : revealedBrief
                ? "Inilah tantangan yang akan kamu taklukkan."
                : "Kamu tidak tahu apa yang akan didapatkan. Itulah serunya."}
          </p>

          {opening && (
            <div className="opening-progress">
              <span />
            </div>
          )}

          <button
            className="open-box-button"
            onClick={openBox}
            disabled={opening || questsLoading}
            type="button"
          >
            <span>
              {opening
                ? "Membuka..."
                : revealedBrief
                  ? "◆  Buka Quest Lain"
                  : "◆  Buka Kotak Misteri"}
            </span>

          </button>

          {!opening && !revealedBrief && (
            <span className="under-button-note">
              Setiap pembukaan menghasilkan tantangan baru
            </span>
          )}
        </div>
      </section>

      {revealedBrief && (
        <section
  className={`result-section result-${revealedBrief.rarity.toLowerCase()}`}
  id="result"
>
          <div className="result-header">
            <div>
              <span className="step-label">YOUR UNBOXED QUEST</span>
              <h2>{revealedBrief.title}</h2>
            </div>
            <span className={`rarity-badge rarity-${revealedBrief.rarity.toLowerCase()}`}>
              ✦ {revealedBrief.rarity}
            </span>
          </div>

          <div className="result-stats">
            <div><span>INDUSTRI</span><strong>{revealedBrief.industry}</strong></div>
            <div><span>DIFFICULTY</span><strong>{revealedBrief.difficulty}</strong></div>
            <div><span>DEADLINE</span><strong>{revealedBrief.deadline}</strong></div>
            <div><span>KATEGORI</span><strong>{categories.find((category) => category.id === revealedBrief.category)?.name}</strong></div>
          </div>

          <div className="twist-card">
            <span className="twist-icon">✧</span>
            <div>
              <span>PROJECT TWIST</span>
              <p>{revealedBrief.twist}</p>
            </div>
          </div>

          <div className="brief-content-grid">
            <article className="brief-main-card">
              <h3>Project Overview</h3>
              <p>{getProjectOverview(revealedBrief)}</p>
              <span className="brief-label">THE CLIENT</span>
              <p>{revealedBrief.client}</p>

              <h3>Problem Statement</h3>
              <p>{revealedBrief.problem}</p>

              <h3>Mission</h3>
              <p>{revealedBrief.mission}</p>

              <h3>Requirements</h3>
              <ul className="brief-list">
                {revealedBrief.requirements.map((item) => (
                  <li key={item}><span>◇</span>{item}</li>
                ))}
              </ul>
              <h3>Acceptance Criteria</h3>
              <ul className="brief-list">
                {getAcceptanceCriteria(revealedBrief).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <aside className="deliverables-card">
              <span className="brief-label">DELIVERABLES</span>
              <p className="deliverable-hint">Tandai hasil yang sudah kamu selesaikan.</p>
              <div className="deliverable-progress">
                <div>
                  <span>Progress</span>
                  <strong>{checkedItems.length}/{revealedBrief.deliverables.length}</strong>
                </div>
                <div className="deliverable-track">
                  <span style={{ width: `${(checkedItems.length / revealedBrief.deliverables.length) * 100}%` }} />
                </div>
              </div>
              <div className="deliverable-list">
                {revealedBrief.deliverables.map((item) => (
                  <label key={item} className="deliverable-item">
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item)}
                      onChange={() => toggleItem(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="quest-complete-button"
                disabled={
                  !xpLoaded ||
                  checkedItems.length !== revealedBrief.deliverables.length ||
                  revealedBrief.deliverables.length === 0 ||
                  completedQuests[questKey(revealedBrief)] === true
                  }
                onClick={() => setQuestCompletion(revealedBrief, true)}
              >
                {completedQuests[questKey(revealedBrief)]
                  ? "✓ Quest Selesai"
                  : "Tandai Selesai"}
              </button>
              {checkedItems.length !== revealedBrief.deliverables.length &&
                !completedQuests[questKey(revealedBrief)] && (
                  <p className="quest-complete-hint">
                    Selesaikan semua deliverables untuk membuka tombol ini.
                  </p>
                )}
            </aside>
          </div>

          <div className="brief-detail-grid">
            <article className="brief-detail-card">
              <span className="brief-label">SKILLS & ENGINEERING PRACTICES</span>

              <ul className="brief-list brief-tag-list">
                {revealedBrief.skills.map((item) => (
                  <li key={item}>{item.split(/\s+[—–-]\s+/)[0].trim()}</li>
                ))}
              </ul>
            </article>
            <article className="brief-detail-card">
              <span className="brief-label">TOOLS & TECHNOLOGIES</span>

              <ul className="brief-list brief-tag-list">
                {revealedBrief.tools.map((item) => (
                  <li key={item}>{item.split(/\s+[—–-]\s+/)[0].trim()}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="result-actions">
            <button className="copy-brief-button" onClick={copyBrief} type="button">
              Salin Brief
            </button>
            <button className="copy-brief-button" onClick={exportBrief} type="button">
              Export PDF
            </button>
            <button
              className="collection-delete-button"
              onClick={() => {
                if (!revealedBrief) return;
                const confirmed = window.confirm(
                  `Hapus "${revealedBrief.title}" dari Quest Collection? Progress dan status selesainya juga akan dihapus.`
                );
                if (confirmed) deleteQuestFromCollection(revealedBrief);
              }}
              type="button"
            >
              Hapus Brief
            </button>

          </div>
        </section>
      )}

        </div>

        <aside className="player-stats-panel quest-sidebar" aria-label="Statistik pemain">
          <div className="player-stats-heading">
            <span className="player-stats-eyebrow">PLAYER ANALYTICS</span>
            <h2>Statistik Pemain</h2>
          </div>

      <section className="player-xp-panel" aria-label="Player level and experience">
        <div className="player-xp-top">
          <div className="player-level-icon" aria-hidden="true">LV</div>
          <div className="player-xp-identity">
            <span className="player-xp-label">PLAYER LEVEL</span>
            <strong>Level {playerLevel}</strong>
          </div>
          <div className="player-xp-total">
            <strong>{totalXP.toLocaleString("id-ID")} XP</strong>
            <span>Total experience</span>
          </div>
        </div>
        <div
          className="player-xp-track"
          role="progressbar"
          aria-label="Progress XP menuju level berikutnya"
          aria-valuemin={0}
          aria-valuemax={xpForNextLevel}
          aria-valuenow={Math.min(xpIntoCurrentLevel, xpForNextLevel)}
        >
          <span
            className="player-xp-fill"
            style={{
              width: `${Math.max(0, Math.min(100, (xpIntoCurrentLevel / xpForNextLevel) * 100))}%`,
            }}
          />
        </div>
        <div className="player-xp-footer">
          <span>{playerLevel >= 99 ? "Level maksimum tercapai" : `${Math.max(0, xpIntoCurrentLevel)} / ${xpForNextLevel} XP`}</span>
          <span>{playerLevel >= 99 ? "MAX LEVEL" : `Level ${playerLevel + 1} berikutnya`}</span>
        </div>
      </section>

          <div className="player-stats-grid">
            <div className="player-stat-card">
              <span className="player-stat-label">Level</span>
              <strong>{playerLevel}</strong>
            </div>
            <div className="player-stat-card">
              <span className="player-stat-label">Total XP</span>
              <strong>{totalXP.toLocaleString("id-ID")}</strong>
            </div>
            <div className="player-stat-card">
              <span className="player-stat-label">Quest tercatat</span>
              <strong>{questHistory.length}</strong>
            </div>
            <div className="player-stat-card">
              <span className="player-stat-label">Quest selesai</span>
              <strong>{completedHistoryCount}</strong>
            </div>
          </div>

          <div className="player-sidebar-completion">
            <div className="player-sidebar-completion-heading">
              <span>Tingkat penyelesaian</span>
              <strong>{completionRate}%</strong>
            </div>
            <div
              className="player-sidebar-progress-track"
              role="progressbar"
              aria-label="Tingkat penyelesaian quest"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completionRate}
            >
              <div
                className="player-sidebar-progress-fill"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          <div className="player-sidebar-rarities">
            <h3>Koleksi rarity</h3>
            <div className="player-rarity-grid">
              {playerRarities.map((rarity) => (
                <div
                  className={`player-rarity-item rarity-${rarity.toLowerCase()}`}
                  key={rarity}
                >
                  <span>{rarity}</span>
                  <strong>{playerRarityCounts[rarity] ?? 0}</strong>
                </div>
              ))}
            </div>
          </div>


        </aside>
      </div>
      <section className="collection-section" id="collection">
        <div className="quest-section-title collection-heading">
          <div>
            <span className="step-label">YOUR ARCHIVE</span>
            <h2>Quest Collection</h2>
            <p>Brief yang pernah kamu buka tersimpan di browser ini.</p>
          </div>
          <span className="collection-count">{questHistory.length} / 50</span>
        </div>

        <div className="collection-controls">
          <input
            id="collection-search-input"
            type="search"
            value={collectionSearch}
            onChange={(event) => setCollectionSearch(event.target.value)}
            placeholder="Cari judul quest..."
            aria-label="Cari quest berdasarkan judul"
          />
          <select
            value={collectionFilter}
            onChange={(event) => setCollectionFilter(event.target.value)}
            aria-label="Filter status quest"
          >
            <option value="all">Semua quest</option>
            <option value="in-progress">Sedang dikerjakan</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
        {questHistory.length === 0 ? (
          <div className="collection-empty">
            <span aria-hidden="true">◇</span>
            <h3>Belum ada quest tersimpan</h3>
            <p>Buka blind box untuk mulai mengumpulkan quest pertamamu.</p>
            <a href="#category">Pilih kategori</a>
          </div>
        ) : (
          <div className="collection-grid">
            {filteredQuestHistory.length === 0 ? (
              <p className="collection-filter-empty">
                Tidak ada quest yang cocok dengan pencarian atau filter ini.
              </p>
            ) : filteredQuestHistory.map((brief) => (
              <article
                className={`collection-card rarity-${brief.rarity.toLowerCase()}`}
                key={`${brief.category}-${brief.title}`}
              >
                <div className="collection-card-top">
                  <span className="collection-category">
                    {categories.find((category) => category.id === brief.category)?.name ?? brief.category}
                  </span>
                  {completedQuests[questKey(brief)] && (
                    <span className="quest-completed-badge">✓ Selesai</span>
                  )}
                  <span className={`rarity-badge rarity-${brief.rarity.toLowerCase()}`}>
                    {brief.rarity}
                  </span>
                </div>
                <h3>{brief.title}</h3>
                <p className="collection-industry">{brief.industry}</p>
                <div className="collection-meta">
                  <span>Difficulty: {brief.difficulty}</span>
                  <span>Deadline: {brief.deadline}</span>
                </div>
                <div className="collection-xp-reward">
                  <span>Hadiah XP</span>
                  <strong>+{getXPForQuest(brief)} XP</strong>
                  {xpClaimedQuests[questKey(brief)] && (
                    <span className="collection-xp-claimed">✓ Diklaim</span>
                  )}
                </div>
                <div className="collection-progress">
                  <div className="collection-progress-label">
                    <span>Deliverables</span>
                    <strong>
                      {(questProgress[questKey(brief)] ?? []).filter((item) => brief.deliverables.includes(item)).length}
                      /{brief.deliverables.length} selesai
                    </strong>
                  </div>
                  <div
                    className="collection-progress-track"
                    role="progressbar"
                    aria-label={`Progress deliverables ${brief.title}`}
                    aria-valuemin={0}
                    aria-valuemax={brief.deliverables.length}
                    aria-valuenow={(questProgress[questKey(brief)] ?? []).filter((item) => brief.deliverables.includes(item)).length}
                  >
                    <span
                      style={{
                        width: `${brief.deliverables.length ? ((questProgress[questKey(brief)] ?? []).filter((item) => brief.deliverables.includes(item)).length / brief.deliverables.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="collection-progress-status">
                    {(questProgress[questKey(brief)] ?? []).filter((item) => brief.deliverables.includes(item)).length === 0
                      ? "Belum dimulai"
                      : (questProgress[questKey(brief)] ?? []).filter((item) => brief.deliverables.includes(item)).length === brief.deliverables.length
                        ? "Semua deliverables selesai"
                        : "Sedang dikerjakan"}
                  </span>
                </div>
                <button
                  type="button"
                  className="collection-open-button"
                  onClick={() => reopenQuest(brief)}
                >
                  Buka lagi
                </button>

              </article>
            ))}
          </div>
        )}
      </section>

      {showRarityPopup && revealedBrief && (
        <div
          className="rarity-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rarity-modal-title"
        >
          <div className={`rarity-modal rarity-${revealedBrief.rarity.toLowerCase()}`}>
            <button
              type="button"
              className="rarity-modal-close"
              aria-label="Tutup popup"
              onClick={() => setShowRarityPopup(false)}
            >
              &times;
            </button>
            <div className="rarity-modal-sparkle" aria-hidden="true">&#10022;</div>
            <p className="rarity-modal-eyebrow">BLIND BOX UNSEALED</p>
            <h2 id="rarity-modal-title">Kamu Mendapatkan...</h2>
            <div className="rarity-modal-emblem" aria-hidden="true">
              {revealedBrief.rarity === "Common" && "◆"}
              {revealedBrief.rarity === "Rare" && "✦"}
              {revealedBrief.rarity === "Epic" && "✧"}
              {revealedBrief.rarity === "Legendary" && "♛"}
              {revealedBrief.rarity === "Mythic" && "✹"}
            </div>
            <div className={`rarity-modal-badge rarity-${revealedBrief.rarity.toLowerCase()}`}>
              {revealedBrief.rarity}
            </div>
            <p className="rarity-modal-description">
              {revealedBrief.rarity === "Common" && "Awal yang bagus. Saatnya mengasah kemampuanmu!"}
              {revealedBrief.rarity === "Rare" && "Nice pull! Tantangan menarik sudah menantimu."}
              {revealedBrief.rarity === "Epic" && "Epic pull! Bersiaplah untuk tantangan yang lebih seru."}
              {revealedBrief.rarity === "Legendary" && "LEGENDARY! Kesempatan langka untuk membuat proyek istimewa."}
              {revealedBrief.rarity === "Mythic" && "MYTHIC! Hasil yang luar biasa langka. Tunjukkan kemampuanmu!"}
            </p>
            <button
              type="button"
              className="rarity-modal-button"
              onClick={() => {
                setShowRarityPopup(false);
                window.setTimeout(() => {
                  document.getElementById("result")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
            >
              Lihat Brief <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      )}
      <footer className="quest-footer">
        <Link href="/" className="quest-brand" aria-label="unboxBrief beranda">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            unbox<span className="brand-accent">Brief</span>
          </span>
        </Link>
        <span>LESS GUESSING. MORE BUILDING.</span>
      </footer>
    </main>
  );
}
