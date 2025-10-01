// ==================== USERNAME INPUT ====================
const usernameInput = document.getElementById('username');

usernameInput.addEventListener('input', function () {
  let value = usernameInput.value;

  if (value.startsWith('http')) return;
  if (value.startsWith('@')) return;

  if (value.length > 0) {
    usernameInput.value = '@' + value;
  }
});

// ==================== DROPDOWN LAYANAN ====================
const dropdown = document.getElementById('dropdown');
const dropdownList = document.getElementById('dropdownList');
const dropdownSelected = document.getElementById('dropdownSelected');
const serviceBoxes = document.querySelectorAll('.service-box');

let isOpen = false;

// harga per 1000 item (biar gampang hitung)
const priceMap = {
  layanan1: 0.044,
  layanan2: 0.069,
  layanan3: 0.082,
  layanan4: 0.122,
  layanan5: 0.149,
  layanan6: 0.164,
  layanan7: 0.152,
  layanan8: 22088
};

let selectedPrice = 0;

// toggle dropdown
dropdownSelected.addEventListener('click', () => {
  isOpen = !isOpen;
  dropdownList.style.maxHeight = isOpen ? dropdownList.scrollHeight + "px" : "0";
});

// pilih layanan
document.querySelectorAll('#dropdownList li').forEach(item => {
  item.addEventListener('click', () => {
    dropdownSelected.textContent = item.textContent;
    dropdownList.style.maxHeight = "0";
    isOpen = false;

    serviceBoxes.forEach(box => box.style.display = "none");

    const targetId = item.dataset.target;
    const targetBox = document.getElementById(targetId);
    if (targetBox) {
      targetBox.style.display = "block";
    }

    selectedPrice = priceMap[targetId] || 0;
    updateTotalHarga();
  });
});

// ==================== KUANTITAS & HARGA OTOMATIS ====================
const quantityInput = document.getElementById('quantity');
const totalHargaInput = document.getElementById('totalHarga');
const bonusText = document.getElementById('bonusText');
const alertContainer = document.getElementById('alertContainer'); // alert peringatan

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(angka);
}

let lastTotal = 0;

function updateTotalHarga() {
  let qty = parseInt(quantityInput.value) || 0;

  // harga per item = harga per 1000 / 1000
  let hargaPerItem = selectedPrice / 1000;
  let total = qty * hargaPerItem;

  lastTotal = total;
  totalHargaInput.value = total > 0 ? formatRupiah(total) : "";

  // logika bonus
  if (total >= 27000) {
    bonusText.textContent = "[ 🎁 ] Selamat kamu mendapatkan bonus gratis 100 Like.";
    bonusText.classList.add("show");
  } else {
    bonusText.classList.remove("show");
  }
}

quantityInput.addEventListener('input', updateTotalHarga);

// ==================== FUNSI ALERT ====================
function showAlert(message) {
  alertContainer.textContent = message;
  alertContainer.style.display = "block";

  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 3000);
}

// ==================== TOMBOL PESAN WA ====================
const btnPesan = document.getElementById('btnPesan');
const loadingOverlay = document.getElementById('loadingOverlay'); // overlay full layar

btnPesan.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const layanan = dropdownSelected.textContent.trim();
  const qty = quantityInput.value.trim();
  const total = parseInt(totalHargaInput.value.replace(/[^0-9]/g, '')) || 0;

  // VALIDASI FORM
  if (!username) {
    showAlert("⚠︎ Username/Link Belum diisi.");
    return;
  }

  if (!layanan || layanan === "Pilih Layanan") {
    showAlert("⚠︎ Silahkan Pilih layanan terlebih dahulu.");
    return;
  }

  if (!qty) {
    showAlert("⚠︎ Kuantitas item belum diisi.");
    return;
  }

  if (total < 12000) {
    showAlert("⚠︎ Mohon Buat pesanan minimal 12.000, Terimakasih.");
    return;
  }

  // cek bonus
  let totalWithBonus = totalHargaInput.value.trim();
  if (lastTotal >= 27000) {
    totalWithBonus += " |  🎁 Plus Bonus";
  }

  const message =
    `Hallo admin @Lannefy‼️, Mau buat pesanan nih.%0A` +
    `— Username/Link = ${username}%0A` +
    `— Layanan = ${layanan}%0A` +
    `— Kuantitas = ${qty}%0A` +
    `— Total Harga = ${totalWithBonus}`;

  const waUrl = `https://wa.me/6283171804227?text=${message}`;

  // tampilkan overlay loading
  loadingOverlay.style.display = "flex";

  setTimeout(() => {
    window.open(waUrl, "_blank");
    loadingOverlay.style.display = "none";
  }, 1500);
});

// ==================== TOMBOL BACK HEADER ====================
function goBackSMM() {
  history.back(); // kembali ke halaman sebelumnya
}