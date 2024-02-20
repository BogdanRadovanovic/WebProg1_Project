function setActiveLink() 
{
    let urlParts = document.URL.split("/");
    let currentPage = urlParts[urlParts.length - 1].split("#")[0];
    let resourcePages = ["#", "#", "author.html"];

    let menuItems = document.querySelectorAll("#navbarNavDropdown > ul > li > a");
    for (let i = 0; i < menuItems.length; i++) 
    {
        let linkParts = menuItems[i].href.split("/");

        if(linkParts[linkParts.length -1] == currentPage)
        {
            menuItems[i].classList.add("active");
            break;
        }
        else if(resourcePages.includes(currentPage))
        {
            for (const index in menuItems) {
                if(menuItems[index].textContent.toLowerCase().includes("resources"))
                {
                    menuItems[index].classList.add("active"); 
                    break;
                }
            }
            break; 
        }
    }
}

function createMainMenu(devices) 
{    
    let dropdownSubMenu = document.getElementById("dropdownSubMenu");
    if (dropdownSubMenu != null) 
    {
        for (let i = 0; i < devices.length; i++) 
        {
            if(document.getElementById(devices[i][0].toLowerCase()+"Link") == null)
            {
                let listElement = document.createElement("li");
                listElement.classList.add("dropdown");
                listElement.id = devices[i][0].toLowerCase()+"Link";
                listElement.innerHTML = `<a class="dropdown-item dropdown-toggle" href="devices.html#${devices[i][0]}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            ${devices[i][0]}
                                        </a>
                                        <!--dropdown-->
                                        <ul class="dropdown-menu dropdown-menu-dark"></ul>`;
        
                dropdownSubMenu.appendChild(listElement);
            }
            
            let secondLevelSubMenu = document.querySelector("#"+devices[i][0].toLowerCase()+"Link > ul"); 
            if (secondLevelSubMenu != null) 
            {
                let subListElement = document.createElement("li");
                subListElement.innerHTML = `<a class="dropdown-item" href="devices.html#${devices[i][0]}">${devices[i][1]}</a>`;
                secondLevelSubMenu.appendChild(subListElement);
            }
        }

        setActiveLink();
    }
}

window.addEventListener("load", function () 
{    
    createMainMenu(devices); 

    //animation
    //low-res menu show
    $(".navbar-toggler").click(function()
    {
        $($(this).data("bs-target")).toggle();
    });

    //sub-menu dropdown
    $("#navbarNavDropdown li").hover(function() 
    {
        $(this).children("ul").toggle();
    });
}); 