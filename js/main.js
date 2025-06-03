document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("main .seccion");

  // Restaurar última sección vista
  const lastSection = localStorage.getItem("ultima-seccion");
  if (lastSection && document.getElementById(lastSection)) {
    sections.forEach(sec => sec.classList.remove("visible"));
    document.getElementById(lastSection).classList.add("visible");
  } else {
    document.getElementById("inicio").classList.add("visible");
  }

  // Mostrar menú lateral
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("visible");
  });

  // Ocultar menú lateral
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("visible");
  });

  // Navegación por secciones desde la barra lateral
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;

      if (!target || !document.getElementById(target)) return;

      sections.forEach(sec => sec.classList.remove("visible"));
      document.getElementById(target).classList.add("visible");
      localStorage.setItem("ultima-seccion", target);
      sidebar.classList.remove("visible");
    });
  });

  // Rotación automática del carrusel de fondo
  const slides = document.querySelectorAll(".inicio-fondo-carousel .slide");
  let currentIndex = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }, 5000); // cada 5 segundos
  }
});

// Función para cambiar imagenes de productos
function cambiarImagen(button, direccion) {
  const container = button.parentElement;
  const img = container.querySelector('.imagen-producto');
  const imageList = JSON.parse(img.dataset.images);
  let currentIndex = parseInt(img.dataset.index);

  currentIndex += direccion;

  if (currentIndex < 0) currentIndex = imageList.length - 1;
  if (currentIndex >= imageList.length) currentIndex = 0;

  img.src = imageList[currentIndex];
  img.dataset.index = currentIndex;
}

// Mostrar detalle del producto
function mostrarProducto(productoId) {
  const productos = document.querySelectorAll('.detalle-producto');
  productos.forEach(p => p.classList.remove('visible'));

  const producto = document.getElementById(productoId);
  if (producto) {
    producto.classList.add('visible');
    producto.scrollIntoView({ behavior: 'smooth' });
  }
}


