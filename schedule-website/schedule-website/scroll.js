const video = document.getElementById('myVideo');
const videoOffset = video.offsetTop;
const videoHeight = video.clientHeight;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const videoInView = scrollPosition >= videoOffset && scrollPosition <= videoOffset + videoHeight;

    if (videoInView) {
        video.play();
    } else {
        video.pause();
    }
});


