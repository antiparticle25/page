document.addEventListener('DOMContentLoaded', function() {
    const scrollThumb = document.getElementById('scroll-thumb');
    const scrollBar = document.getElementById('custom-scroll-bar');
    const navbarFixed = document.querySelector('.navbar-fixed');
    const homeSection = document.getElementById('home');
  
    // Function to update the position and size of the scroll thumb
    function updateScrollThumb() {
      const scrollTop = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = documentHeight - viewportHeight;
      const scrollBarHeight = scrollBar.offsetHeight;
  
      const thumbHeight = (viewportHeight / documentHeight) * scrollBarHeight;
      scrollThumb.style.height = thumbHeight + 'px';
  
      const maxThumbTop = scrollBarHeight - thumbHeight;
      const thumbTop = (scrollTop / scrollableHeight) * maxThumbTop;
      scrollThumb.style.top = thumbTop + 'px';
    }
  
    // Function to toggle navbar visibility
    function toggleNavbarVisibility() {
      const scrollY = window.scrollY;
      const threshold = homeSection.offsetHeight - 50;
  
      if (scrollY >= threshold) {
        navbarFixed.style.display = 'flex';
      } else {
        navbarFixed.style.display = 'none';
      }
    }
  
    // Event listeners for scroll and resize to handle scroll thumb and navbar visibility
    window.addEventListener('scroll', function() {
      updateScrollThumb();
      toggleNavbarVisibility();
    });
  
    window.addEventListener('resize', function() {
      updateScrollThumb();
      toggleNavbarVisibility();
    });
  
    // Initialize the scroll thumb and navbar visibility once the content is loaded
    updateScrollThumb();
    toggleNavbarVisibility();
  
    // Handling drag functionality for the custom scroll bar
    let isDragging = false;
    let startY;
    let startThumbTop;
  
    scrollThumb.addEventListener('mousedown', function(e) {
      isDragging = true;
      startY = e.clientY;
      startThumbTop = parseFloat(scrollThumb.style.top) || 0;
      document.body.style.userSelect = 'none';
    });
  
    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        const deltaY = e.clientY - startY;
        const scrollBarHeight = scrollBar.offsetHeight;
        const thumbHeight = scrollThumb.offsetHeight;
        const maxThumbTop = scrollBarHeight - thumbHeight;
  
        let newThumbTop = startThumbTop + deltaY;
        newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));
  
        scrollThumb.style.top = newThumbTop + 'px';
  
        const scrollProportion = newThumbTop / maxThumbTop;
        const newScrollTop = scrollProportion * (document.documentElement.scrollHeight - window.innerHeight);
  
        window.scrollTo(0, newScrollTop);
      }
    });
  
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    });
  
    document.addEventListener('mouseleave', function() {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    });
  });
  
