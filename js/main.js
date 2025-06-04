document.addEventListener("DOMContentLoaded", () => {
  // Menú lateral
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("visible");
    menuBtn.setAttribute("aria-expanded", "true");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("visible");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  // Navegación entre secciones
  const enlacesNav = document.querySelectorAll(".sidebar nav a");
  const secciones = document.querySelectorAll("main .seccion");

  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const id = enlace.getAttribute("href").substring(1);

      secciones.forEach((sec) => {
        sec.classList.toggle("visible", sec.id === id);
      });

      // Cerrar sidebar si está visible en móvil
      sidebar.classList.remove("visible");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Carrusel de fondo en sección inicio
  const slides = document.querySelectorAll(".inicio-fondo-carousel .slide");
  let currentSlide = 0;

  function cambiarSlide() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentSlide);
    });
    currentSlide = (currentSlide + 1) % slides.length;
  }

  if (slides.length > 0) {
    cambiarSlide();
    setInterval(cambiarSlide, 5000); // Cambia cada 5 segundos
  }

  // Menú de productos
  const productoLinks = document.querySelectorAll(".producto-link");
  const detallesProducto = document.querySelectorAll(".detalle-producto");

  productoLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productoId = link.getAttribute("data-producto");

      detallesProducto.forEach((detalle) => {
        detalle.classList.toggle("visible", detalle.id === productoId);
      });
    });
  });

  // Galería de imágenes en productos
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const imagenProducto = document.getElementById("imagen-producto");
  let indiceImagen = 0;

  // Función para actualizar la imagen mostrada
  function actualizarImagen() {
    if (!imagenProducto) return;
    const visibleDetalle = [...detallesProducto].find((detalle) => detalle.classList.contains("visible"));
    if (!visibleDetalle) return;

    const imgs = visibleDetalle.querySelectorAll("img");
    if (imgs.length === 0) return;

    indiceImagen = (indiceImagen + imgs.length) % imgs.length;
    imagenProducto.src = imgs[indiceImagen].src;
    imagenProducto.alt = imgs[indiceImagen].alt || "Imagen del producto";
  }

  btnPrev?.addEventListener("click", () => {
    const visibleDetalle = [...detallesProducto].find((detalle) => detalle.classList.contains("visible"));
    if (!visibleDetalle) return;

    const imgs = visibleDetalle.querySelectorAll("img");
    if (imgs.length === 0) return;

    indiceImagen = (indiceImagen - 1 + imgs.length) % imgs.length;
    imagenProducto.src = imgs[indiceImagen].src;
    imagenProducto.alt = imgs[indiceImagen].alt || "Imagen del producto";
  });

  btnNext?.addEventListener("click", () => {
    const visibleDetalle = [...detallesProducto].find((detalle) => detalle.classList.contains("visible"));
    if (!visibleDetalle) return;

    const imgs = visibleDetalle.querySelectorAll("img");
    if (imgs.length === 0) return;

    indiceImagen = (indiceImagen + 1) % imgs.length;
    imagenProducto.src = imgs[indiceImagen].src;
    imagenProducto.alt = imgs[indiceImagen].alt || "Imagen del producto";
  });

  // Botón Comprar que abre modal
  const btnCompra = document.getElementById("btn-compra");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".close-modal");

  btnCompra?.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      closeModalBtn?.focus();
    }
  });

  closeModalBtn?.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      btnCompra?.focus();
    }
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      btnCompra?.focus();
    }
  });

  // Control de riego - función simple de simulación
  const btnIniciarRiego = document.getElementById("btn-iniciar-riego");
  const humedadInput = document.getElementById("humedad-deseada");
  const estadoRiegoSpan = document.getElementById("estado-riego");

  btnIniciarRiego?.addEventListener("click", () => {
    const humedad = parseInt(humedadInput.value, 10);
    if (isNaN(humedad) || humedad < 0 || humedad > 100) {
      alert("Por favor, introduce un valor válido entre 0 y 100.");
      return;
    }

    estadoRiegoSpan.textContent = "Iniciando riego...";
    btnIniciarRiego.disabled = true;

    // Simula proceso de riego (3 segundos)
    setTimeout(() => {
      estadoRiegoSpan.textContent = `Riego completado para humedad deseada de ${humedad}%.`;
      btnIniciarRiego.disabled = false;
    }, 3000);
  });
});
