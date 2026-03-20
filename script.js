// Script.js for Anniversary App

// Slide navigation logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', previousSlide);

// Animations
let animationInterval = setInterval(() => {
    nextSlide();
}, 5000); // Change slides every 5 seconds

// Number counters
const counters = document.querySelectorAll('.counter');
function startCounter(counter) {
    let count = 0;
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = Math.ceil(target / 100);

    const counterInterval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(counterInterval);
        }
        counter.innerText = count;
    }, 20);
}

counters.forEach(counter => {
    startCounter(counter);
});

// VK API integration
const VK_APP_ID = 'your_vk_app_id';
const VK_API_VERSION = '5.131';

function VKInit() {
    VK.init({ apiId: VK_APP_ID });
}

function VKGetUserInfo() {
    VK.Api.call('users.get', { version: VK_API_VERSION }, (res) => {
        if (res.response && res.response.length > 0) {
            const user = res.response[0];
            console.log(`User ID: ${user.id}, Name: ${user.first_name} ${user.last_name}`);
        }
    });
}

VKInit();
VKGetUserInfo();

// Initial call to show the first slide
showSlide(currentSlide);