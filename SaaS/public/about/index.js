function relocateElement() {
    console.log("relocated called");
    changeElementLocation()
}

function changeElementLocation() {
    console.log("change element called");
    if (window.innerWidth < 768) {
        const contact = document.getElementById("contact");
        document.getElementById("right-branch").appendChild(contact);
    } else {
        const contact = document.getElementById("contact");
        document.getElementById("left-branch").appendChild(contact)
    }
}