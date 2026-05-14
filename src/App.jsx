import  { useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Caption } from './components/Caption';
import { Grid } from './components/Grid';
import { Ending } from './components/Ending';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initLenis = () => {
      lenisRef.current = new Lenis({
        lerp: 0.05,
        infinite: false,
        scrollX: false,
      });

      lenisRef.current.on('scroll', ({ progress, limit, velocity }) => {
        ScrollTrigger.update();

        if (progress > 0.99 && velocity >= 0) {
          lenisRef.current.velocity = 0;
          lenisRef.current.scrollTo(limit, { immediate: true });
        }
      });

      gsap.ticker.add((time) => lenisRef.current.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    // const cloneForInfinity = () => {
    //   const main = document.querySelector('main');
    //   const section = document.createElement('section');
    //   section.classList.add('section-forInfinity');
    //   section.style.height = '100vh';

    //   const clone = document.querySelector('.hero').cloneNode(true);
    //   section.appendChild(clone);
    //   main.appendChild(section);
    // };

    const animateCaption = () => {
      const caption = {
        section: document.querySelector('.caption'),
        background: document.querySelector('.caption_background'),
        titleText: document.querySelectorAll('.caption_content_title_text'),
      };

      const array = [...caption.titleText];
      const splice = array.splice(1, caption.titleText.length);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: caption.section,
          start: 'top top',
          end: '+=3000 bottom',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      gsap.set(caption.background, { width: 0 });
      gsap.set(splice, { display: 'none' });

      timeline
        .to(caption.background, { width: 'calc(100% - 4rem)' }, 0)
        .to(splice, { display: 'inline-block', stagger: 0.1 }, 0)
        .to(caption.background, { scale: 1.2 }, 0.5);
    };

    const animateGrid = () => {
      const grid = {
        section: document.querySelector('.grid'),
        wrapper: document.querySelector('.grid_wrapper'),
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: grid.section,
          start: 'top top',
          end: '+=5000 bottom',
          scrub: true,
          pin: true,
        },
      });

      gsap.set(grid.wrapper, { yPercent: 50, autoAlpha: 0 });

      timeline
        .to(grid.wrapper, { yPercent: 0, autoAlpha: 1 }, 0.2)
        .to(grid.wrapper, { scale: 3.2 }, 0.5);
    };

    const initAnimations = () => {
      initLenis();
      animateCaption();
      animateGrid();
      lenisRef.current.scrollTo(0);

      window.lenisInstance = lenisRef.current;
    };

    if (document.readyState === 'complete') {
      initAnimations();
    } else {
      window.addEventListener('load', initAnimations);
    }

    return () => {
      window.removeEventListener('load', initAnimations);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <main>
      <Hero />
      <Caption />
      <Grid />
      <Ending />
    </main>
  );
};

export default App;