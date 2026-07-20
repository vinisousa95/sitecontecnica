/* ============================================================
   Contécnica — Construções e Reformas
   Interações do site
   ============================================================ */
(function () {
  'use strict';

  /* -------- Ano no rodapé -------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Menu mobile -------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------- Nav ativo conforme rolagem -------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');
  function setActiveLink() {
    var pos = window.scrollY + 120;
    var current = '';
    sections.forEach(function (sec) {
      if (pos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* -------- Reveal ao rolar -------- */
  var revealTargets = document.querySelectorAll(
    '.about, .card, .gallery__item, .stat, .pillar, .section__head, .contact__info, .contact__form-wrap, .strip__grid, .why__text'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------- Carrossel de depoimentos -------- */
  var track = document.getElementById('carouselTrack');
  var dotsWrap = document.getElementById('carouselDots');
  if (track && dotsWrap) {
    var slides = track.children;
    var total = slides.length;
    var index = 0;
    var timer = null;

    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
      dot.dataset.i = i;
      dotsWrap.appendChild(dot);
    }
    var dots = dotsWrap.children;

    function go(n) {
      index = (n + total) % total;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('is-active', k === index);
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function auto() { timer = setInterval(next, 6000); }
    function stop() { if (timer) clearInterval(timer); }

    document.getElementById('nextBtn').addEventListener('click', function () { stop(); next(); auto(); });
    document.getElementById('prevBtn').addEventListener('click', function () { stop(); prev(); auto(); });
    dotsWrap.addEventListener('click', function (e) {
      if (e.target.dataset.i !== undefined) { stop(); go(+e.target.dataset.i); auto(); }
    });

    var carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', auto);

    // Suporte a swipe (toque)
    var startX = 0;
    carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      auto();
    }, { passive: true });

    go(0);
    auto();
  }

  /* -------- Lightbox da galeria -------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  var lightbox = document.getElementById('lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = document.getElementById('lbImg');
    var lbCaption = document.getElementById('lbCaption');
    var current = 0;

    function openLb(i) {
      current = i;
      var item = galleryItems[current];
      lbImg.src = item.dataset.img;
      lbImg.alt = item.dataset.caption || '';
      lbCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function nav(dir) { openLb((current + dir + galleryItems.length) % galleryItems.length); }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLb(i); });
    });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbNext').addEventListener('click', function () { nav(1); });
    document.getElementById('lbPrev').addEventListener('click', function () { nav(-1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    });
  }

  /* -------- Máscara simples de telefone -------- */
  var tel = document.getElementById('telefone');
  if (tel) {
    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      tel.value = v;
    });
  }

  /* -------- Envio do formulário (AJAX para enviar.php) -------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var feedback = document.getElementById('formFeedback');
    var submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.className = 'form__feedback';
      feedback.textContent = '';

      if (!form.checkValidity()) {
        feedback.classList.add('is-err');
        feedback.textContent = 'Por favor, preencha os campos obrigatórios.';
        return;
      }

      submitBtn.disabled = true;
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (data) {
          if (data && data.ok) {
            feedback.classList.add('is-ok');
            feedback.textContent = data.message || 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            form.reset();
          } else {
            throw new Error((data && data.message) || 'erro');
          }
        })
        .catch(function () {
          feedback.classList.add('is-err');
          feedback.innerHTML = 'Não foi possível enviar agora. Fale conosco pelo WhatsApp: ' +
            '<a href="https://wa.me/5511984752466" target="_blank" rel="noopener" style="text-decoration:underline;color:#25D366;">clique aqui</a>.';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  }
})();
