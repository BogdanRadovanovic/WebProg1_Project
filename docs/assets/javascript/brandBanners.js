function createBrandBanners(brands) {
    for (let i in brands) {
        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("row");
        categoryDiv.classList.add("justify-content-center");
    
        let imgTag = `<img src="assets/images/brands/brand${parseInt(i)+1}.png" class="img-thumbail float-start d-inline col-md-6 p-0" alt="${brands[i].toUpperCase()}">`;
        let figCapTag = `<figcaption class="figure-caption float-start d-inline text-break col-md-6 p-0">
                            Check out all ${brands[i]} phones.
                        </figcaption>`;
        let figureContent = i%2 === 0 ? imgTag+figCapTag : figCapTag+imgTag;
        
        categoryDiv.innerHTML = `<a href="devices.html#${brands[i]}" class="row justify-content-center">
                                    <figure class="row col-md-6 py-3 px-5 justify-content-between align-items-center">
                                        ${figureContent}
                                    </figure>
                                </a>`;
    
        document.getElementById("brandsDiv").appendChild(categoryDiv);
    }
}

function isInViewport(element) {

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function brandsAnimate(brandsDiv) {

    let visibleCount = 0;
    for (let i = 0; i < brandsDiv.length; i++) {
        
        if(isInViewport(brandsDiv[i]) && brandsDiv[i].style.visibility == "hidden"){
            
            brandsDiv[i].style.visibility = "visible";
            brandsDiv[i].classList.add("animate__animated");

            if(i%2==0){
                brandsDiv[i].classList.add("animate__slideInLeft")
            }
            else{
                brandsDiv[i].classList.add("animate__slideInRight");
            }
        }

        if(brandsDiv[i].style.visibility == "visible"){
            visibleCount++;
        }
    }

    if(visibleCount == brandsDiv.length){
        document.removeEventListener("scroll", brandsAnimate);
    }
}

window.addEventListener("load", function () { 

    createBrandBanners(brands); 

    this.brandsDiv = document.querySelectorAll("#brandsDiv > .row");

    for (let i = 0; i < brandsDiv.length; i++) {
        brandsDiv[i].style.visibility = "hidden";
    }

    brandsAnimate(brandsDiv);
    document.addEventListener("scroll", () => {brandsAnimate(brandsDiv)});
}); 


