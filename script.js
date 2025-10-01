// ==================== SIDEBAR & HAMBURGER ====================
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const header = document.querySelector('.header');
const menuWithSub = document.querySelectorAll('.has-submenu');
const allMenuItems = document.querySelectorAll('.sidebar ul li');

// ==================== TOGGLE SIDEBAR ====================
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  header.classList.toggle('hide');
  if (!sidebar.classList.contains('active')) {
    menuWithSub.forEach(menu => {
      menu.classList.remove('open');
      const submenu = menu.querySelector('.submenu');
      if (submenu) submenu.style.maxHeight = null;
    });
    document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  }
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  header.classList.remove('hide');
  menuWithSub.forEach(menu => {
    menu.classList.remove('open');
    const submenu = menu.querySelector('.submenu');
    if (submenu) submenu.style.maxHeight = null;
  });
  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
});

// ==================== HANDLE SUBMENU ====================
allMenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
    const link = item.querySelector('a');
    if (link) { link.classList.add('active'); }
    menuWithSub.forEach(menu => {
      const submenu = menu.querySelector('.submenu');
      if (submenu && menu !== item) {
        menu.classList.remove('open');
        submenu.style.maxHeight = null;
      }
    });
    if (item.classList.contains('has-submenu')) {
      const submenu = item.querySelector('.submenu');
      if (submenu) {
        item.classList.toggle('open');
        submenu.style.maxHeight = item.classList.contains('open') ? submenu.scrollHeight + "px" : null;
      }
    }
  });
});

// ==================== NAVIGATION FEATURE ====================
const navItems = document.querySelectorAll('.nav-item');
const navContents = document.querySelectorAll('.nav-content');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    navContents.forEach(c => c.classList.remove('active'));
    item.classList.add('active');
    const targetId = item.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// ==================== SIDEBAR -> NAVIGATION LINK ====================
const sidebarBeranda = document.getElementById('sidebar-beranda'); 
const navBeranda = document.querySelector('.nav-item[data-target="beranda"]');

if (sidebarBeranda && navBeranda) {
  sidebarBeranda.addEventListener('click', (e) => {
    e.preventDefault();
    navBeranda.click(); 
    navBeranda.scrollIntoView({ behavior: "smooth", inline: "center" });
    sidebar.classList.remove('active'); 
    overlay.classList.remove('active');
    header.classList.remove('hide');
  });
}

const sidebarKontak = document.getElementById('sidebar-kontak'); 
const navKontak = document.querySelector('.nav-item[data-target="extra"]');

if (sidebarKontak && navKontak) {
  sidebarKontak.addEventListener('click', (e) => {
    e.preventDefault();
    navKontak.click(); 
    navKontak.scrollIntoView({ behavior: "smooth", inline: "center" });
    sidebar.classList.remove('active'); 
    overlay.classList.remove('active');
    header.classList.remove('hide');
  });
}

// ==================== SIDEBAR -> LINK EKSTERNAL ====================
const sidebarTransaksi = document.getElementById('sidebar-transaksi');

if (sidebarTransaksi) {
  sidebarTransaksi.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.location.href = "index.html";
  });
}

// ==================== AUTO OPEN SMM PANEL VIA HASH ====================
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#smm") {
    const navSmm = document.querySelector('.nav-item[data-target="smm"]');
    if (navSmm) {
      navSmm.click();
      navSmm.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }
});