const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;
let visibleImages = [...galleryItems];

function openLightbox(index){
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = visibleImages[currentIndex].querySelector('img').src;
}

function closeLightbox(){
    lightbox.style.display = 'none';
}

function showPrev(){
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].querySelector('img').src;
}

function showNext(){
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(visibleImages.indexOf(item));
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
window.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        visibleImages = [];
        galleryItems.forEach(item => {
            if(category === 'all' || item.dataset.category === category){
                item.style.display = 'block';
                visibleImages.push(item);
            } else {
                item.style.display = 'none';
            }
        });
    });
});
