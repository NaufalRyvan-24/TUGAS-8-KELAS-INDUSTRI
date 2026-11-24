// 1. Daftar keahlian (halaman Beranda)
const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
];
skills.push({ nama: "JavaScript", level: "Dasar" });

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    daftarSkill.appendChild(item);
  });
  if (jumlahSkill) {
    jumlahSkill.textContent = "";
  }
}


// 2. Tema gelap / Dark Mode (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");
if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
    } else {
      tombolTema.textContent = "Mode Gelap";
    }
  });
}


// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}


// 4. Daftar proyek dan filter kategori (halaman Proyek)
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/Latihan1.png",
    alt: "Tangkapan layar halaman profil Naufal Ryvan",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/proyek-responsif.png",
    alt: "Tangkapan layar portofolio di ponsel dan laptop",
    deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "img/Kalkulator.png",
    alt: "Tangkapan layar hasil kalkulator nilai di Console",
    deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "img/Logika5.png",
    kelasGambar: "gambar-proyek--logika",
    alt: "Tangkapan layar hasil uji lima soal logika",
    deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <div class="gambar-proyek ${item.kelasGambar || ""}">
        <img src="${item.gambar}" alt="${item.alt}">
      </div>
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    // Menghapus class 'aktif' dari semua tombol filter lalu menambahkannya ke yang diklik (Tugas)
    const semuaTombolFilter = document.querySelectorAll(".tombol-filter");
    semuaTombolFilter.forEach((t) => t.classList.remove("aktif"));
    tombol.classList.add("aktif");

    // Menyaring data proyek berdasarkan kategori
    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }
  });
}

// Menjalankan filter proyek jika elemen daftarProyek ada di halaman
if (daftarProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}

const usernameGitHub = "NaufalRyvan-24";
const statusRepo = document.querySelector("#status-repo");
const daftarRepo = document.querySelector("#daftar-repo");

async function muatRepositoriGitHub() {
    if (!statusRepo || !daftarRepo) return;

    statusRepo.textContent = "Memuat repositori GitHub...";
    daftarRepo.innerHTML = "";

    try {
        const response = await fetch(`https://api.github.com/users/${usernameGitHub}/repos?per_page=100`);
        if (!response.ok) {
            throw new Error(`Gagal memuat data (Status: ${response.status})`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos) || repos.length === 0) {
            statusRepo.textContent = "Belum ada repositori publik yang ditemukan.";
            return;
        }

        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const repoTeratas = repos.slice(0, 6);

        daftarRepo.innerHTML = repoTeratas
            .map((repo) => {
                const bahasa = repo.language
                    ? `<span class="repo-lang">${repo.language}</span>`
                    : `<span class="repo-lang">Tanpa Bahasa</span>`;
                const bintang = `<span class="repo-stars">⭐ ${repo.stargazers_count}</span>`;
                const deskripsi = repo.description
                    ? `<p class="repo-desc">${repo.description}</p>`
                    : `<p class="repo-desc repo-desc-empty">Tidak ada deskripsi repositori.</p>`;

                return `
                <li class="repo-card">
                    <div class="repo-card-header">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
                        ${bintang}
                    </div>
                    ${deskripsi}
                    <div class="repo-card-footer">
                        ${bahasa}
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-open">Lihat Repo →</a>
                    </div>
                </li>`;
            })
            .join("");

        statusRepo.textContent = `Menampilkan ${repoTeratas.length} repositori terbaru dari @${usernameGitHub}.`;
    } catch (error) {
        statusRepo.textContent = `Terjadi kesalahan saat memuat repositori: ${error.message}`;
    }
}

muatRepositoriGitHub();

const daftarSkillW08 = document.querySelector("#daftar-skill-w08");
const jumlahSkillW08 = document.querySelector("#jumlah-skill-w08");

async function muatKeahlianW08() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const skillsW08 = await response.json();
    skillsW08.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkillW08.appendChild(item);
    });
    jumlahSkillW08.textContent = `Ada ${skillsW08.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkillW08.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkillW08) {
  muatKeahlianW08();
}

const usernameW08 = "NaufalRyvan-24";
const statusRepoW08 = document.querySelector("#status-repo-w08");
const daftarRepoW08 = document.querySelector("#daftar-repo-w08");

async function ambilRepoW08() {
  statusRepoW08.textContent = "Memuat...";
  try {
    const response = await fetch(`https://api.github.com/users/${usernameW08}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();
    const reposTugas = repos.filter((repo) => {
      const nama = repo.name.toLowerCase().replace(/[-_]+/g, " ");
      return nama.includes("tugas") && nama.includes("kelas industri");
    });

    reposTugas.forEach((repo) => {
      const kartu = document.createElement("article");
      kartu.className = "kartu";

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = repo.language || "GitHub";

      const judul = document.createElement("h3");
      judul.textContent = repo.name;

      const tautan = document.createElement("a");
      tautan.className = "tombol";
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = "Lihat repositori";

      kartu.append(label, judul);
      kartu.appendChild(tautan);
      daftarRepoW08.appendChild(kartu);
    });

    statusRepoW08.textContent = "";
  } catch (error) {
    statusRepoW08.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

if (daftarRepoW08) {
  ambilRepoW08();
}

[
{
"nama": "HTML",
"level": "Menengah"
},
{
"nama": "CSS",
"level": "Menengah"
}
]

