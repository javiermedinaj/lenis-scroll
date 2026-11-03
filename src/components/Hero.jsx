import React from 'react';
import './Hero.css';

export const Hero = () => (
  <section className="hero">
    <div className="hero_wrapper">
      <div className="hero_content">
        <div className="hero_content_title">
          <h1>Agency</h1>
        </div>
        <div className="hero_content_description">
          <span>A community-driven brand focused on empowering developers and designers to create modern and efficient websites.</span>
        </div>
      </div>
      <div className="hero_background">
        <img src="https://assets.lummi.ai/assets/QmTwZP2mqNkoXRzRhJXnFyrJkjL5cESRrGjytaJx6pPWVP?auto=format&w=1500" alt="Background" />
      </div>
    </div>
  </section>
);