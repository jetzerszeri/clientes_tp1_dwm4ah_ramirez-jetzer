const togglebtn = document.querySelector('.toggle-button');
const navbarlinks = document.querySelector('.navbar-links');

togglebtn.addEventListener('click', () => {
    navbarlinks.classList.toggle('active');
})
