function showNextSlide() {
    let currentSlide = $('#mainSlider .active');
    let nextSlide;

    if(currentSlide.next().length){
        nextSlide = currentSlide.next();
    }
    else{
        nextSlide = currentSlide.parent().children(':first');
    }

    currentSlide.removeClass('active');
    nextSlide.addClass('active');
    
}

function showPreviousSlide() {
    let currentSlide = $('#mainSlider .active');
    let previousSlide;

    if(currentSlide.prev().length){
        previousSlide = currentSlide.prev();
    }
    else{
        previousSlide = currentSlide.parent().children(':last');
    }

    currentSlide.removeClass('active');
    previousSlide.addClass('active');
}

let sliderTImer = setInterval(showNextSlide, 5000); 

function restartTImer() {
    clearInterval(sliderTImer);
    sliderTImer = setInterval(showNextSlide, 5000); 
}

$('#btnNextSlide').click(() => {
    showNextSlide();
    restartTImer();
});
$('#btnPreviousSlide').click(() => {
    showPreviousSlide();
    restartTImer();
});