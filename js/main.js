const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// JS chung
// function click đổi style của nav button, và mở navbar
const navBtn = $('#nav-btn');
const navbar = $('#navbar-container');

navBtn.onclick = function () {
  if (navBtn.classList.contains('nav-btn-open')) {
    navBtn.classList.remove('nav-btn-open');
  } else {
    navBtn.classList.add('nav-btn-open');
  }
  if (navbar.classList.contains('navbar-open')) {
    navbar.classList.remove('navbar-open');
  } else {
    navbar.classList.add('navbar-open');
  }
};

// function click để ẩn vr iframe
const vrIframe = $('#vr-iframe');
const iframeCloseBtn = $('#iframe-close-btn');
iframeCloseBtn.onclick = function () {
  vrIframe.style.display = 'none';
};

// JS riêng cho tab location
