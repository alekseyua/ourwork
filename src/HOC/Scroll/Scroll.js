
const Scroll = ({ children }) => {
    let ticking = false;
    
    function preventCollapse() {
      const bottomPosition = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition >= bottomPosition) {
        return window.scrollBy(0, -10);
      }
    }
    window.addEventListener("scroll", function (e) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          preventCollapse();
          ticking = false;
        });
        ticking = true;
      }
    });

    return children;
  };

export default Scroll