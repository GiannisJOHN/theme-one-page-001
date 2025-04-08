function dropdown(menuButton, menu) {


    let isOpenSTATE = menuButton.getAttribute("aria-expanded");
    let menuItems = menu.querySelectorAll('[role="menuitem"]');

    menuButton.addEventListener("click", handleOpenCloseDropdown);

    function handleOpenCloseDropdown(event) {
        event.stopPropagation();


        let firstLink = menu.querySelectorAll('a')[0];

        if (isOpenSTATE === "false") {
            open(menu);
            firstLink.focus()
        } else {
            close(menu);
        }
    }

    function open(menu) {
        menu.classList.add("show");
        isOpenSTATE = "true";
        menuButton.setAttribute("aria-expanded", isOpenSTATE);
        menu.setAttribute("aria-hidden", "false");
    }

    function close(menu) {
        menu.classList.remove("show");
        isOpenSTATE = "false";
        menuButton.setAttribute("aria-expanded", isOpenSTATE);
        menu.setAttribute("aria-hidden", "true");
    }

    //on background click
    document.addEventListener('click', handleCloseDropdown);
    
    function handleCloseDropdown(event) {
        

        if (event.target === menu) {
            event.stopPropagation()
        }

        if (event.target === menuButton) {
            return
        }

        if (event.target !== menu) {
            close(menu)
        }
    }

    //a11y keyboard events
    menu.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            close(this);
            menuButton.focus();
        }
        if (event.key === "Tab") {
            event.preventDefault();
        }
        if (event.key === "Home") {
            event.preventDefault();
        }
        if (event.key === "End") {
            event.preventDefault();
        }
    });

    menuItems.forEach((item, index, items) => {
        item.addEventListener("keydown", function (event) {
            if (event.key === "ArrowDown") {
                if (index < items.length - 1) {
                    items[index + 1].focus();
                } else {
                    items[0].focus();
                }
                event.preventDefault();
            } else if (event.key === "ArrowUp") {
                if (index > 0) {
                    items[index - 1].focus();
                } else {
                    items[items.length - 1].focus();
                }
                event.preventDefault();
            }
        });
    });

}

export default dropdown