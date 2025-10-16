
// Basic interactive behaviors: nav toggle, carousel, testimonials, modal, form handling
document.addEventListener('DOMContentLoaded', function(){

  // Nav toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', ()=>{
    if(navLinks.style.display === 'flex'){ navLinks.style.display = ''; }
    else { navLinks.style.display = 'flex'; navLinks.style.flexDirection='column'; }
  });

  // Simple carousel
  const slides = document.querySelector('#carousel .slides');
  const imgs = slides.querySelectorAll('img');
  let idx = 0;
  document.getElementById('next').addEventListener('click', ()=>{ idx = (idx+1)%imgs.length; updateCarousel(); });
  document.getElementById('prev').addEventListener('click', ()=>{ idx = (idx-1+imgs.length)%imgs.length; updateCarousel(); });
  function updateCarousel(){ slides.style.transform = `translateX(-${idx * 100}%)`; }
  // autoplay
  setInterval(()=>{ idx = (idx+1)%imgs.length; updateCarousel(); }, 4000);

  // Testimonials simple slider
  const testiSlider = document.getElementById('testi-slider');
  let tIdx = 0;
  function updateTesti(){ testiSlider.style.transform = `translateX(-${tIdx * 100}%)`; }
  updateTesti();
  setInterval(()=>{ tIdx = (tIdx+1)%testiSlider.children.length; updateTesti(); }, 3500);

  // Modal for reservations
  const modal = document.getElementById('modal');
  const reserveBtn = document.getElementById('reserve-btn');
  const modalClose = document.getElementById('modal-close');
  reserveBtn.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','false'); });
  modalClose.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Form submit (demo)
  document.getElementById('reserve-form').addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // basic validation
    if(!data.get('name') || !data.get('phone')) { alert('Please fill name and phone'); return; }
    modal.querySelector('.modal-dialog').innerHTML = '<h3>Reservation Requested</h3><p>Thanks! We will contact you shortly to confirm.</p>';
    setTimeout(()=> modal.setAttribute('aria-hidden','true'), 2200);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      if(window.innerWidth < 900) { navLinks.style.display=''; }
    });
  });

});
