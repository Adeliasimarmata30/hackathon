# TOBA INFINITY — AI Smart Tourism Platform

> **PENTING - ATURAN BLIND REVIEW:** 
> Peserta **DILARANG KERAS** mencantumkan nama institusi/universitas/sekolah asal di dalam file ini maupun di seluruh _source code_. Pelanggaran terhadap aturan ini dapat berakibat pada pengurangan nilai atau diskualifikasi.

---

## 1. Deskripsi Singkat

**TOBA INFINITY** adalah platform pariwisata cerdas yang menyelesaikan masalah fragmentasi informasi dan kesulitan perencanaan perjalanan bagi wisatawan di ekosistem Danau Toba. Solusi utama kami mengintegrasikan **AI Trip Planner** untuk penyusunan itinerary otomatis dan **AI Chat Assistant** berbasis RAG (_Retrieval-Augmented Generation_) untuk tanya jawab kontekstual seputar wisata, budaya Batak, dan kuliner. Sistem ini dibangun menggunakan arsitektur **Multi-LLM** (Google Gemini, Groq, OpenRouter) dengan _vector database_ Supabase dan model embedding `Qwen/Qwen3-Embedding-0.6B` yang telah memproses 22.760 dokumen pengetahuan untuk memastikan akurasi dan kecepatan respons yang optimal.

## 2. Anggota Tim

*(Ingat: Jangan cantumkan asal institusi!)*

| Nama Lengkap | Peran dalam Tim | Kontak (Email / GitHub) |
| :--- | :--- | :--- |
| [Nama Ketua Tim] | AI & Backend Engineer | [email@domain.com] / [@github_username] |
| [Nama Anggota 2] | Frontend Developer | [email@domain.com] / [@github_username] |
| [Nama Anggota 3] | Data & ML Engineer | [email@domain.com] / [@github_username] |

## 3. Pemanfaatan Data Pariwisata Toba

Sesuai panduan *Challenge Statement*, solusi kami memanfaatkan **Lake Toba Smart Tourism Knowledge Dataset v2.0** secara komprehensif:

- **Data Utama:** Kami menggunakan **13 dari 14 sheet** yang tersedia (semua sheet kecuali `prompt`). Pemanfaatan data meliputi:
  - **Knowledge Base RAG:** `Artikel Danau Toba`, `Info Seputar Danau Toba`, `wisata-metadata`, `hotel-metadata`, `resto-metadata`
  - **AI Trip Planner:** `transportasi`, `waktu operasional destinasi`, `hotel-metadata`, `tempat-wisata-v1`
  - **Direktori & Filter:** `hotel-resto-v1`, `tempat-wisata-v1`, `kuliner`, `Attractions Info`
  - **Review & Sentiment:** `resto-hotel-v2`, `wisata-v2`

- **Pengolahan:** 
  - **Data Profiling & Structuring:** Pembersihan dan normalisasi 13 dataset Excel.
  - **Document Builder:** Menggabungkan dan memecah (_chunking_) data menjadi 22.760 dokumen pengetahuan yang terstruktur.
  - **Embedding Generation:** Mengubah teks menjadi vektor menggunakan model `Qwen/Qwen3-Embedding-0.6B`.
  - **Vector Storage:** Mengunggah 22.760 embedding ke Supabase dengan metadata lengkap (koordinat GPS, rating, kategori).

- **Data Tambahan:** - (Tidak ada, kami fokus memaksimalkan dataset resmi dari panitia).

## 4. Tautan & Aset Pendukung

- **Link Video Demonstrasi (Wajib):** [Masukkan Link YouTube Unlisted di sini]
- **Link Pitch Deck / Proposal (Wajib):** [Masukkan Link Google Drive/PDF di sini]
- **Link Deployment / Live App (Opsional):** [Masukkan Link Vercel/Railway jika ada, atau hapus baris ini]

## 5. Struktur Repository

```text
.
├── Backend/                # Kode server FastAPI, RAG Pipeline, & AI Router
│   ├── utils/              # Helper functions (formatter.py, retrieval.py)
│   ├── tools/              # Utility scripts (count_dataset.py)
│   ├── test/               # Unit testing (test_rag.py, test_router.py)
│   ├── data/prompts/       # System prompt templates
│   ├── app.py              # Entry point FastAPI
│   ├── ai_router.py        # Router untuk AI endpoints
│   ├── rag.py              # Implementasi RAG pipeline
│   ├── planner.py          # Logic perencanaan itinerary
│   ├── planner_engine.py   # Engine untuk trip planner
│   ├── config.py           # Konfigurasi aplikasi
│   ├── models.py           # Pydantic models
│   └── requirements.txt    # Dependensi Python
│
├── Frontend/               # Kode antarmuka pengguna (React + Vite)
│   ├── src/
│   │   ├── pages/          # Halaman (Home, AIAssistant, TripPlanner, dll)
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API services (axios)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── constants/      # Static data (navigation, images)
│   │   ├── types/          # TypeScript definitions
│   │   └── styles/         # Global CSS & themes
│   ├── package.json        # Dependensi Node.js
│   └── vite.config.ts      # Konfigurasi Vite
│
├── notebooks/              # Notebook pengembangan AI & RAG Pipeline
│   ├── 01_Data_Preprocessing.ipynb
│   ├── 02_Knowledge_Base_Builder.ipynb
│   ├── 03_embedding&vectordb.ipynb
│   ├── 04_upload_to_supabase.ipynb
│   ├── 05_RAG-Retrieval.ipynb
│   └── 06_Multi-LLM_Evaluation.ipynb
│
├── .gitignore              # Git ignore rules
└── README.md               # Dokumentasi ini

## 6. Prasyarat (Requirements)

Sebelum instalasi, pastikan sistem Anda memiliki:

- **Environment Backend:** Python versi 3.12 atau lebih tinggi
- **Environment Frontend:** Node.js versi 18+ dan npm
- **Database:** Akun Supabase aktif dengan ekstensi `pgvector` yang sudah di-enable
- **API Key Eksternal:** 
  - Supabase (Project URL & Secret Key)
  - Google AI Studio (Gemini API Key)
  - Groq Console (Groq API Key)
  - OpenRouter (OpenRouter API Key)
- **Package Manager:** `pip` (Python) dan `npm` (Node.js)

## 7. Environment Variables

Sistem ini membutuhkan konfigurasi environment di dua tempat:

**Backend (`Backend/.env`):**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-supabase-secret-key
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key
OPENROUTER_API_KEY=your-openrouter-api-key

Frontend (Frontend/.env):
VITE_API_URL=http://localhost:8000

8. Langkah Instalasi & Menjalankan Project Secara Lokal
A. Backend (FastAPI)
# 1. Clone repository
git clone https://github.com/username/nama-repo-kalian.git
cd nama-repo-kalian/Backend

# 2. Buat dan aktifkan virtual environment
python -m venv venv

# Untuk Windows:
venv\Scripts\activate

# Untuk Mac/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Konfigurasi Environment Variables
# Buat file .env di folder Backend dan isi dengan API key Anda
# (lihat contoh di Bagian 7)

# 5. Jalankan server backend
uvicorn app:app --reload --port 8000

B. Frontend (React + Vite)
# 1. Buka terminal baru, masuk ke folder frontend
cd Frontend

# 2. Install dependencies
npm install

# 3. Konfigurasi Environment Variables
# Buat file .env di root folder Frontend dan isi:
# VITE_API_URL=http://localhost:8000

# 4. Jalankan aplikasi frontend
npm run dev

9. Cara Menggunakan / Testing (Evaluasi Model)
Setelah backend berjalan di http://localhost:8000 dan frontend di http://localhost:5173, berikut cara mencoba fitur utama:
Fitur 1: AI Chat Assistant (RAG)
Buka menu "AI Chat" di navigasi.
Coba input pertanyaan seperti:
"Rekomendasikan hotel terbaik di Balige"
"Apa kuliner khas Batak yang wajib dicoba?"
"Air terjun apa saja di sekitar Danau Toba?"
Sistem akan melakukan retrieval dari 22.760 vektor knowledge base dan merespons menggunakan Multi-LLM.

Fitur 2: AI Trip Planner
Buka menu "Trip Planner".
Isi parameter:
Destination: Misalnya "Pantai Bulbul" atau "Samosir".
Duration: Pilih 1-5 hari.
Hotel Budget: Misalnya Rp 700.000.
Hotel Rating: Pilih minimal bintang yang diinginkan.
Klik "Generate Itinerary". AI akan menyusun rencana perjalanan lengkap dengan estimasi biaya dan jadwal.

Fitur 3: Direktori Wisata
Destinations: Jelajahi 103 destinasi wisata dengan filter kategori dan rating.
Hotels: Cari 36 hotel dengan fasilitas dan kisaran harga.
Culinary: Temukan 100+ kuliner khas dengan kategori (Babi Panggang Karo, Ikan Arsik, dll).
Setiap kartu menampilkan tombol "Buka di Peta" untuk melihat lokasi di Leaflet map.

10. Known Issues / Batasan
Sebagai purwarupa (proof-of-concept) yang dikembangkan dalam waktu terbatas, terdapat beberapa keterbatasan yang kami sadari:
🎨 Frontend UI/UX
Gambar Placeholder: Sebagian besar halaman (Destinations, Hotels, Culinary, Culture) masih menggunakan gambar placeholder/default karena keterbatasan aset visual pada dataset. Hanya halaman AI Chat dan Trip Planner yang sudah memiliki tampilan final.
Responsivitas Mobile: Tampilan antarmuka saat ini dioptimalkan untuk desktop view dan belum sepenuhnya responsif untuk perangkat mobile.
Loading State: Beberapa halaman belum memiliki loading spinner yang optimal saat menunggu respons dari API.
🤖 AI & Backend
Hallucination LLM: Terkadang model LLM masih menghasilkan informasi yang tidak sepenuhnya akurat meskipun sudah menggunakan RAG dengan 22.760 dokumen knowledge base.
Response Latency: Waktu respons untuk Trip Planner bisa mencapai 10-15 detik karena proses planning yang kompleks dan dependensi pada API LLM eksternal.
Embedding Model: Kami menggunakan model Qwen/Qwen3-Embedding-0.6B yang mungkin kurang optimal untuk konteks bahasa daerah (Batak).
Data
Cakupan Dataset: Data hanya mencakup wilayah Danau Toba dan 8 kabupaten sekitarnya.
Update Real-time: Data operasional (jam buka, harga, ketersediaan kamar) bersifat statis sesuai dataset panitia, belum terintegrasi dengan sumber real-time.
