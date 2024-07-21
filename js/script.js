const toggleButton = document.getElementById('navbar-toggle');
        const navLinks = document.getElementById('nav-links');

        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });


// GALERIA DE IMAGENS //
function filterImages() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const images = document.getElementsByClassName('image-item');

    for (let i = 0; i < images.length; i++) {
        const title = images[i].getAttribute('data-title').toLowerCase();
        if (title.includes(searchValue)) {
            images[i].style.display = '';
        } else {
            images[i].style.display = 'none';
        }
    }
}


// CARD SLIDER //
let currentSlide = 0;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

showSlide(currentSlide);