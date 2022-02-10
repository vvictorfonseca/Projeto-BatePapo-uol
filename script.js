const aside = document.querySelector("aside")
const sidebar = document.querySelector(".sidebar")

function activateSideBar () {
   aside.classList.remove("escondido")
   sidebar.classList.remove("escondido")
}

function disableSideBar (event) {
    if (event.target == aside) {
    aside.classList.add("escondido")
    sidebar.classList.add("escondido")
    }
}

window.addEventListener("click", disableSideBar);




function escolherOpção (event) {
    const p = document.querySelector("p")

    if (event.target == p)
    p.classList.remove("selecionado");
}

window.addEventListener("click", escolherOpção);