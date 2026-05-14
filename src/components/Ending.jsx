import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Ending.css';

export const Ending = () => {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ending_form-label',
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.ending_brand',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section className="ending" ref={sectionRef}>
      <div className="ending_grid">
        <div className="ending_headline">
          <span className="ending_headline-overline">New business</span>
          <h2 className="ending_headline-title">
            Let&rsquo;s work
            <br />
            together
          </h2>
          <p className="ending_headline-desc">
            We partner with ambitious brands to build digital experiences
            that move people.
          </p>
        </div>

        <form className="ending_form" onSubmit={handleSubmit}>
          <div className="ending_form-field">
            <label className="ending_form-label" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formState.name}
              onChange={handleChange}
              className="ending_form-input"
              placeholder="Full name"
            />
          </div>

          <div className="ending_form-field">
            <label className="ending_form-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="ending_form-input"
              placeholder="you@company.com"
            />
          </div>

          <div className="ending_form-field">
            <label className="ending_form-label" htmlFor="message">
              Tell us about your project
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formState.message}
              onChange={handleChange}
              className="ending_form-input ending_form-input--textarea"
              placeholder="Scope, timeline, budget — anything that helps us understand."
            />
          </div>

          <button
            type="submit"
            className={`ending_form-submit ${submitted ? 'ending_form-submit--sent' : ''}`}
          >
            <span className="ending_form-submit-text">
              {submitted ? 'Message sent' : 'Send message'}
            </span>
            <span className="ending_form-submit-arrow">&rarr;</span>
          </button>
        </form>
      </div>

      <div className="ending_brand">
        <span>MAKINGEXP</span>
      </div>
    </section>
  );
};
