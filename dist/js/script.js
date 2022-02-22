document.addEventListener('DOMContentLoaded', () => {
    
//Carusel************************************************************************    

    const slider = tns({
        container: '.carusel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
        animateDelay: 5000
      });
    
    document.querySelector('.button-prev').addEventListener('click', () => {
        slider.goTo('prev');
    }); 
    
    document.querySelector('.button-next').addEventListener('click', () => {
        slider.goTo('next');
    }); 
    

//Tabs***************************************************************************

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



//Modal*****************************************************************

    const buttonsOrder = document.querySelectorAll('.button_mini');
    const buttonsClose = document.querySelectorAll('.modal__close');
    const buttonsConsultation = document.querySelectorAll('[data-cons]');
    const overlay = document.querySelector('.overlay');
    const modalOrder = document.querySelector('#order');
    const modalConsultation = document.querySelector('#consultation');
    const modalThanks = document.querySelector('#thanks');
    
    buttonsOrder.forEach((item, index) => {
        item.addEventListener('click', (i) => {
            overlay.style.display = 'block';
            modalOrder.style.display = 'block';

            const product = document.querySelectorAll('.catalog-item__subtitle')[index].textContent;

            document.querySelector('#order .modal__descr').textContent = product;

        });
    });

    buttonsConsultation.forEach((item) => {
        item.addEventListener('click', () => {
            modalConsultation.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    const closeModal = () => {
        overlay.style.display = 'none';
        modalOrder.style.display = 'none';
        modalConsultation.style.display = 'none';
        modalThanks.style.display = 'none';
    };

    buttonsClose.forEach((item) => {
        item.addEventListener('click', closeModal);
    });

//POST**************************************************************************

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    document.querySelectorAll('.feed-form').forEach((item) => {
        
        item.addEventListener("submit", (i) => {
            i.preventDefault();
            
            let formData = new FormData(item);
            console.log(formData);
            postData('mailer/smart.php', formData)
                .then(res => {
                    console.log(res);
                })
                .catch(() => {
                    console.log('Ошибка отправки');
                })
                .finally(() => {
                    closeModal();
                    overlay.style.display = 'block';
                    modalThanks.style.display = 'block';
                    setTimeout(closeModal, 3000);
                    
                    document.querySelectorAll('input').forEach((item) => {
                        item.value = '';
                    });
                });
        });
    });
    

//Scroll, button up********************************************
    const pageup = document.querySelector('.pageup');
    const reviews = document.querySelector('.reviews__wrapper');
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1600) {
            pageup.style.display = 'block';
        }
        else
        {
            pageup.style.display = 'none';
        }

        if (document.documentElement.scrollTop > 3120) {
            reviews.classList.add('animate__fadeInUp');
            reviews.classList.add('animate__animated');
        }

    });
    
//Smooth scroll
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', (e) => {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

});

