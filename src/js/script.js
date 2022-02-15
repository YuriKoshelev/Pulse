const slider = tns({
    container: '.carusel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.button-prev').addEventListener('click', () => {
    slider.goTo('prev');
}); 

document.querySelector('.button-next').addEventListener('click', () => {
    slider.goTo('next');
}); 