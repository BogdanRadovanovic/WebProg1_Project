function createSlider(devices, brands) {
    let brandIndex = 0;
    for (let device of devices) {
        if(brands.length > brandIndex && device[0] == brands[brandIndex]){
            let slide = document.createElement("div");
            slide.classList.add("carousel-item");
            slide.innerHTML = `<a href="#">
                                    <img src="${device[2]}" class="d-block mx-auto" alt="${device[0].trim()} ${device[1].trim()}">
                                </a>`;
            document.querySelector("#mainSlider > .carousel-inner").appendChild(slide);

            brandIndex++;
        }
    }
    document.querySelector("#mainSlider .carousel-item").classList.add("active");
}

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

function restartTimer() {
    clearInterval(window.sliderTimer);
    window.sliderTimer = setInterval(showNextSlide, 3000); 
}

window.addEventListener("load", function () { 

    createSlider(devices, brands); 

    this.sliderTimer = setInterval(showNextSlide, 3000); 

    $('#btnNextSlide').click(() => {
        showNextSlide();
        restartTimer();
    });
    $('#btnPreviousSlide').click(() => {
        showPreviousSlide();
        restartTimer();
    });
    
}); 