function filterDevices(devices) {
    let selectedBrand = document.getElementById("ddlFilter").value;
    if(selectedBrand != "0"){
        return devices.filter(device => {return device[0]==selectedBrand});
    }
    else{
        return devices;
    }
    
}

function sortDevices(devices) {
    let sortCriteria = $("#ddlSort").val(); 

    if(sortCriteria != "0"){
        let a, b;
        let brandDivs = $(".brandDiv");

        if(sortCriteria === "name_asc"){
            a = 1, b = -1;
        }
        else if(sortCriteria === "name_desc"){
            a = -1, b = 1;
        }

        brandDivs.sort(function (brand1, brand2) {
            if ($(brand1).attr("id") > $(brand2).attr("id")) {return a}
            else if ($(brand1).attr("id") < $(brand2).attr("id")) {return b}
            else {return 0}
        });
        $("main").append(brandDivs);

        devices.sort(function (device1, device2) {
            if (device1[1] > device2[1]) {return a}
            else if (device1[1] < device2[1]) {return b}
            else {return 0}
        });
    }
}

function createCategoriesDivs(brands) {
    if(brands.length > 0){
        let mainElement = document.querySelector("main"); 

        for (const brand of brands) {
            let categoryDiv = document.createElement("div");
            categoryDiv.id = brand;
            categoryDiv.className = "brandDiv";
            mainElement.appendChild(categoryDiv);
        }
    }
} 

function returnDeviceCard (name, imgSrc) {
    let columnElement = document.createElement("div");
    columnElement.classList.add("col");

        let cardElement = document.createElement("div");
        cardElement.classList.add("card", "h-100", "p-2");

            let galleryLink = document.createElement("a");
            galleryLink.setAttribute("href", imgSrc);
            galleryLink.setAttribute("data-lightbox", "devicesGallery");
            galleryLink.setAttribute("data-title", name);
            galleryLink.setAttribute("data-alt", name);

                let imgElement = document.createElement("img");
                imgElement.classList.add("card-img-top");
                imgElement.setAttribute("src", imgSrc);
                imgElement.setAttribute("alt", name);

            let cardBodyElement = document.createElement("div");
            cardBodyElement.classList.add("card-body", "d-flex");

                let deviceTitleElement = document.createElement("h5");
                deviceTitleElement.classList.add("card-title", "align-self-end", "m-0", "p-3");
                let deviceTitle = document.createTextNode(name);

    deviceTitleElement.appendChild(deviceTitle); 
    cardBodyElement.appendChild(deviceTitleElement);
    galleryLink.appendChild(imgElement)
    cardElement.appendChild(galleryLink);
    cardElement.appendChild(cardBodyElement);
    columnElement.appendChild(cardElement);

    return columnElement;
} 

function showDevices(devices){
    
    devices = filterDevices(devices);
    sortDevices(devices);

    if(devices.length > 0){

        let categoriesCounters = {}; 
        brands.forEach(brand => {
            document.getElementById(brand).innerHTML = ""; 
            categoriesCounters[brand] = 0;
        });

        let rowElement; 
        for (let device of devices) { 

            if(categoriesCounters[device[0]]%3==0){
                if(categoriesCounters[device[0]] > 0){
                    document.querySelector("#"+device[0]+" .newest").classList.remove("newest");
                }
                rowElement = document.createElement("div");
                rowElement.classList.add("row", "row-cols-3", "mt-4", "newest");
                rowElement.appendChild(returnDeviceCard(device[0]+" "+device[1], device[2]));
                categoriesCounters[device[0]]++;
                document.getElementById(device[0]).appendChild(rowElement);
            }
            else{
                rowElement = document.querySelector("#"+device[0]+" .newest");
                rowElement.appendChild(returnDeviceCard(device[0]+" "+device[1], device[2]));
                categoriesCounters[device[0]]++;
            }
            
        }
    }
} 

function insertBrandFilters(brands) {
    let ddlFilter = document.getElementById("ddlFilter");
    let filterOption, filterOptionText;
    for (const brand of brands) {
        filterOption = document.createElement("option"); 
        filterOption.setAttribute("value", brand); 
        filterOptionText = document.createTextNode(brand); 
        filterOption.appendChild(filterOptionText); 
        ddlFilter.appendChild(filterOption); 
    }
}

window.addEventListener("load", function () { 

    createCategoriesDivs(brands); 
    showDevices(devices); 
    insertBrandFilters(brands); 

    let ddlFilter = document.getElementById("ddlFilter");
    ddlFilter.addEventListener("change", () => {showDevices(devices)});

    let ddlSort = document.getElementById("ddlSort");
    ddlSort.addEventListener("change", () => {showDevices(devices)});
}); 