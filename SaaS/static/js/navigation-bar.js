document.getElementsByClassName("navigation-bar__collapse-btn")[0]
    .addEventListener("click",e => {
        const chkbox = document.getElementsByClassName("navigation-bar__collapse-checkbox")[0];
        chkbox.checked = !chkbox.checked;
    });