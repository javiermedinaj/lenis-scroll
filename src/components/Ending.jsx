import './Ending.css';

export const Ending = () => {
  const scrollToTop = () => {
    const lenis = window.lenisInstance;
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    }
  };

  return (
    <section className="ending">
      <h1>MAKINGEXP</h1>
      
      <div className="ending_connect">
        <span className="ending_label">CONNECT</span>
        <div className="ending_links">
          <a href="#instagram" className="ending_link">INSTAGRAM</a>
          <a href="#twitter" className="ending_link">TWITTER / X</a>
          <a href="#linkedin" className="ending_link">LINKEDIN</a>
        </div>
      </div>
      
      <button className="ending_badge" onClick={scrollToTop}>Back to top</button>
    </section>
  );
};