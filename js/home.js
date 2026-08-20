document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
});

function initHeroAnimations() {
  // GSAP Entrance Sequence
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

  tl.from('.hero-badge', { y: -20, opacity: 0, delay: 0.1 })
    .from('.hero-title', { y: 30, opacity: 0 }, '-=0.6')
    .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.6')
    .from('.hero-cta-group', { y: 20, opacity: 0 }, '-=0.6')
    .from('.hero-featured-card', { y: 40, opacity: 0 }, '-=0.4');

  // GSAP ScrollTrigger or Card Reveal
  gsap.from('.article-card', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 0.5
  });
}