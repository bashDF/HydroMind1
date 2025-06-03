document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('visible');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('visible');
});

function mostrarDetalle(id) {
  document.querySelectorAll('.detalle-producto').forEach(div => {
    div.classList.remove('visible');
  });
  document.getElementById(id).classList.add('visible');
}

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);
