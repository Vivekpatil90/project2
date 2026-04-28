import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP animation orchestrator.
 * Re-runs on every route change so every page gets the classic entry choreography.
 *
 * Conventions used across pages:
 *  - [data-gsap="hero-title"]   → split letter reveal
 *  - [data-gsap="hero-sub"]     → fade-up after title
 *  - [data-gsap="hero-cta"]     → stagger-up buttons
 *  - [data-gsap="hero-image"]   → ken-burns scale + clip reveal
 *  - [data-gsap="reveal"]       → scroll-triggered fade-up
 *  - [data-gsap="reveal-stagger"] children → staggered fade-up on scroll
 *  - [data-gsap="parallax"]     → subtle Y parallax on scroll
 *  - [data-gsap="page-title"]   → page header reveal
 */
export default function useGsapAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- HERO TITLE: letter-by-letter reveal -----------------------------
      document.querySelectorAll('[data-gsap="hero-title"]').forEach((el) => {
        if (!el.dataset.gsapSplit) {
          const text = el.textContent;
          el.innerHTML = text
            .split(/(\s+)/)
            .map((chunk) =>
              /\s+/.test(chunk)
                ? chunk
                : `<span class="gsap-word">${chunk
                    .split('')
                    .map((c) => `<span class="gsap-char">${c}</span>`)
                    .join('')}</span>`
            )
            .join('');
          el.dataset.gsapSplit = '1';
        }
        gsap.from(el.querySelectorAll('.gsap-char'), {
          yPercent: 120,
          opacity: 0,
          rotateX: -45,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.025,
        });
      });

      // ---- HERO subtitle ---------------------------------------------------
      gsap.from('[data-gsap="hero-sub"]', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.55,
        ease: 'power3.out',
      });

      // ---- HERO CTA buttons -----------------------------------------------
      gsap.from('[data-gsap="hero-cta"] > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.12,
        ease: 'back.out(1.6)',
      });

      // ---- HERO image ------------------------------------------------------
      gsap.from('[data-gsap="hero-image"]', {
        scale: 1.15,
        opacity: 0,
        duration: 1.6,
        ease: 'power3.out',
        clipPath: 'inset(0 0 100% 0)',
      });

      // ---- PAGE titles -----------------------------------------------------
      gsap.from('[data-gsap="page-title"]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // ---- SCROLL REVEALS --------------------------------------------------
      document.querySelectorAll('[data-gsap="reveal"]').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // ---- STAGGERED CHILDREN REVEAL --------------------------------------
      document.querySelectorAll('[data-gsap="reveal-stagger"]').forEach((wrap) => {
        gsap.from(wrap.children, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // ---- PARALLAX --------------------------------------------------------
      document.querySelectorAll('[data-gsap="parallax"]').forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    // Refresh ScrollTrigger after layout settles
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      clearTimeout(t);
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [pathname]);
}
