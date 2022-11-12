let getData = async () => {
    document.getElementById("response").innerHTML = `
        <div class="text-center animate-pulse">
            Chargement ... <i class="fa-solid fa-fan animate-spin"></i>
        </div>
        `
    document.getElementById("response").hidden = false
    let data = await _GetRequest("poemas")
    data.forEach(poem => {
        let originalText = null
        let translateText = ""
        let badgeLang = ""
        let badgeOtherLang = ""
        if (poem.original_lang == "es"){
            originalText = poem.es
            translateText = poem.fr
            badgeLang = `<span class="bg-red-700 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayOriginalText('${poem.id}')">Español</span>`
            badgeOtherLang = `<span class="bg-blue-600 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayTranslateText('${poem.id}')">Français</span>`
        }else if (poem.original_lang == "fr"){
            originalText = poem.fr
            translateText = poem.es
            badgeLang = `<span class="bg-blue-600 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayOriginalText('${poem.id}')">Français</span>`
            badgeOtherLang = `<span class="bg-red-700 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayTranslateText('${poem.id}')">Español</span>`
        }
        document.getElementsByClassName("poem__main")[0].innerHTML += `
            <article class="my-4 w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 p-3 mx-auto border border-current rounded-lg shadow-xl bg-slate-300 dark:bg-gray-800 text-slate-600 dark:text-slate-300">
                ${badgeLang} ${badgeOtherLang}
                <h4 class="font-bold text-center mt-4">${poem.titre || ""}</h4>
                <p class="fst-italic text-center originalText" id="poem_original_${poem.id}">${originalText}</p>
                <p class="fst-italic text-center translateText" id="poem_translate_${poem.id}" hidden>${translateText}</p>
                <p class="font-bold italic">${poem.auteur || ""}</p>
            </article>
        `
    });
    document.getElementById("response").innerHTML = null
    document.getElementById("response").hidden = true
    document.getElementsByClassName("poem__main")[0].hidden = false
}

let displayOriginalText = (id) => {
    document.getElementById("poem_original_"+id).hidden = false
    document.getElementById("poem_translate_"+id).hidden = true
}

let displayTranslateText = (id) => {
    document.getElementById("poem_original_"+id).hidden = true
    document.getElementById("poem_translate_"+id).hidden = false
}

getData()