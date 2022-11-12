let _ScrollFunction = () => {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1600) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
}
let _TopFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
let topButton = document.getElementById("top-button");
window.onscroll = function () { _ScrollFunction() };

let footer = `
    <hr class="w-7/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
    <a href="https://fr.wikipedia.org/wiki/France" target="_blank" class="inline-block">
        <img src="../assets/france.svg" class="h-8" alt="france flag">
    </a> 
    <a href="https://es.wikipedia.org/wiki/España" target="_blank" class="inline-block">
        <img src="../assets/espana.svg" class="h-8" alt="espana flag">
    </a> 
    <a href="https://es.wikipedia.org/wiki/México" target="_blank" class="inline-block">
        <img src="../assets/mexico.svg" class="h-8" alt="mexico flag">
    </a>
    <p class="mt-3">
        <a href="mailto:kevin.cabon@proton.me" class="text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-200 text-xs">
            <i class="fa-solid fa-envelope"></i> Contact
        </a>
    </p>
`

document.getElementsByTagName("footer")[0].classList.add("container", "mx-auto", "template_footer", "text-center", "my-4")
document.getElementsByTagName("footer")[0].innerHTML = footer