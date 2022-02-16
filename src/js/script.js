document.addEventListener('DOMContentLoaded', () => {
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
    
    const tabs = document.querySelectorAll(".catalog__tab");
    const tabsContent = document.querySelectorAll(".catalog__content");
    
    const catalogItemLink = document.querySelectorAll('.catalog-item__link');
    const catalogButtonsBackDetail = document.querySelectorAll('.catalog-item__back');
    const catalogContents = document.querySelectorAll('.catalog-item__content');
    const catalogDetails = document.querySelectorAll('.catalog-item__list');

    
    function changeActiveTab(index) {
        tabs.forEach((item) => {
            item.classList.remove('catalog__tab_active');
        });
    
        tabs[index].classList.add('catalog__tab_active');
    
        tabsContent.forEach((item) => {
            item.classList.remove('catalog__content_active');
        });
    
        tabsContent[index].classList.add('catalog__content_active');
    
    }
    
    
    tabs.forEach((item, index) => {
        item.addEventListener('click', (i)=> {
            changeActiveTab(index);
        });
    });


    
    function onClickDetail(index, on) {
        console.log(index);
        
        if (on) {
            catalogContents[index].classList.remove('catalog-item__content_active');
            catalogDetails[index].classList.add('catalog-item__list_active');
        }
        else {
            catalogContents[index].classList.add('catalog-item__content_active');
            catalogDetails[index].classList.remove('catalog-item__list_active');
        }
    }

    catalogItemLink.forEach((item, index) => {
        item.addEventListener('click', (i) => {
            i.preventDefault();
            onClickDetail(index, true); 
        });
    });


    catalogButtonsBackDetail.forEach((item, index) => {
        item.addEventListener('click', (i) => {
            i.preventDefault();
            onClickDetail(index, false);
        });
    });
});

