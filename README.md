# felo

Unofficial Node.js client untuk [Felo AI](https://felo.ai) — reverse-engineered dari web API-nya langsung. Mendukung login, pencarian AI dengan streaming, dan akses tanpa login (guest mode).

> ⚠️ **Disclaimer:** Library ini menggunakan internal API Felo yang tidak resmi. Bisa berubah sewaktu-waktu tanpa pemberitahuan. Gunakan dengan bijak dan sesuai ToS Felo.

---

## ✨ Fitur

- 🔐 Login & logout dengan email/password
- 🔍 AI-powered search dengan web retrieval real-time
- 🌊 Streaming response via SSE (Server-Sent Events)
- 🌐 Guest mode — bisa search tanpa login
- 📚 Source references dari hasil pencarian
- 🌏 Multi-bahasa (lang support: `id`, `en`, dll.)
- 🔑 Zero dependency — murni Node.js built-in (`https`, `crypto`)

---

## 📦 Instalasi

```bash
git clone https://github.com/XBotzLauncher/felo.git
cd felo
npm install
```

**Tidak ada external dependency** — hanya menggunakan modul bawaan Node.js.

---

## 🚀 Quick Start

### Search Tanpa Login (Guest Mode)

```js
const { FeloClient } = require('./felo');

const client = new FeloClient();

const { answer, sources } = await client.search('Apa itu kecerdasan buatan?');
console.log(answer);
console.log(sources); // array of { title, url }
```

---

### Search dengan Streaming

```js
const client = new FeloClient();

const { answer, sources } = await client.search('Siapa presiden Indonesia?', {
  onChunk: chunk => process.stdout.write(chunk), // print real-time
});

process.stdout.write('\n');
console.log('Sources:', sources);
```

---

### Login + Search

```js
const client = new FeloClient();

await client.login('email@example.com', 'password');

const { answer, sources } = await client.search('Jelaskan quantum computing', {
  lang: 'id',
  mode: 'concise',
});

console.log(answer);
await client.logout();
```

---

## 📖 API Reference

### `new FeloClient()`
Buat instance client baru. Otomatis generate `deviceId` dan `visitorId` untuk guest session.

---

### `client.login(email, password)`
Login ke akun Felo AI.

| Param | Type | Keterangan |
|-------|------|------------|
| `email` | `string` | Email akun Felo |
| `password` | `string` | Password akun |

**Returns:** `{ ok: true, token: string }`

---

### `client.logout()`
Logout dan hapus token sesi. Aman dipanggil meski belum login.

---

### `client.search(query, opts?)`
Lakukan pencarian AI. Bisa dipakai dengan atau tanpa login.

| Param | Type | Default | Keterangan |
|-------|------|---------|------------|
| `query` | `string` | — | Pertanyaan / query pencarian |
| `opts.lang` | `string` | `'id'` | Bahasa respons (`'id'`, `'en'`, dll.) |
| `opts.mode` | `string` | `'concise'` | Mode jawaban (`'concise'` / `'detail'`) |
| `opts.onChunk` | `function` | `undefined` | Callback streaming, dipanggil tiap chunk teks baru |

**Returns:**
```js
{
  answer: string,   // Jawaban lengkap dari AI
  sources: [        // Referensi web yang digunakan
    { title: string, url: string },
    // ...
  ]
}
```

---

## ❌ Error Handling

Semua error dilempar sebagai instance `FeloError`:

```js
try {
  await client.login('wrong@email.com', 'wrongpass');
} catch (err) {
  console.log(err.name);    // "FeloError"
  console.log(err.message); // pesan error
  console.log(err.code);    // kode error, e.g. "AUTH_FAILED"
  console.log(err.data);    // raw response dari server (jika ada)
}
```

**Kode error umum:**

| Code | Keterangan |
|------|------------|
| `AUTH_FAILED` | Login gagal, kredensial salah atau respons tidak valid |
| `STREAM_ERROR` | Error saat membaca SSE stream |
| `TIMEOUT` | Request timeout (30 detik untuk REST, 60 detik untuk SSE) |
| `HTTP_4xx` | HTTP error dari server (client-side) |
| `HTTP_5xx` | HTTP error dari server (server-side) |
| `UNKNOWN` | Error tidak dikenali |

---

## 📁 Struktur File

```
felo/
├── felo.js        # Core client library
├── tes.js         # Contoh penggunaan
└── package.json
```

---

## 🧪 Menjalankan Contoh

```bash
npm start
# atau
node tes.js
```

---

## 📝 Lisensi

MIT — © [XBotzLauncher](https://github.com/XBotzLauncher)
