let getData = async () => {
    document.getElementById("response").innerHTML = `
        <div class="text-center animate-pulse">
            Chargement ... <i class="fa-solid fa-fan animate-spin"></i>
        </div>
        `
    document.getElementById("response").hidden = false
    let data = await _GetRequest("text")
    let oneMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth(), 
        new Date().getDate() -7
    )
    data.forEach(text => {
        let badgeEsp = "", newBadge = ""
        let badgeFr = "", niveauBadge = ""
        badgeEsp = `<span class="bg-red-700 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayOriginalText('${text.id}')">Español</span>`
        badgeFr = `<span class="bg-blue-600 text-gray-200 text-xs px-2 py-1 rounded-full cursor-pointer" onclick="displayTranslateText('${text.id}')">Français</span>`
        if (!text.add_date){
            newBadge = `<span class="bg-amber-600 text-gray-200 text-xs px-2 py-1 rounded-full italic">Coming Soon!</span>`
        }else if (new Date(text.add_date) > new Date(oneMonthAgo)){
            newBadge = `<span class="bg-green-600 text-gray-200 text-xs px-2 py-1 rounded-full">Nouveau !</span>`
        }
        if (text.niveau){
            niveauBadge = `<span class="bg-cyan-600 text-gray-200 text-xs px-2 py-1 rounded-full font-bold">${text.niveau}</span>`
        }
        document.getElementsByClassName("lecture__main")[0].innerHTML += `
            <article class="my-5 w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 mx-auto border border-current rounded-lg shadow-xl dark:shadow-slate-700 dark:shadow-lg bg-slate-300 dark:bg-gray-800 text-slate-600 dark:text-slate-300">
                ${badgeEsp} ${badgeFr} <span class="float-right">${newBadge} ${niveauBadge}</span>
                <div class="mt-3 text-justify" id="text_es_${text.id}">
                    <h4 class="font-bold">${text.title_es || ""}</h4>
                    ${text.text_es}
                </div>
                <div class="mt-3 text-justify" hidden id="text_fr_${text.id}">
                    <h4 class="font-bold">${text.title_fr || ""}</h4>
                    ${text.text_fr}
                </div>
                <div class="text-right mt-2 italic source-text text-slate-500 dark:text-slate-400">
                    Source : ${text.source}
                </div>
            </article>
        `
    });
    document.getElementById("response").innerHTML = null
    document.getElementById("response").hidden = true
    document.getElementsByClassName("lecture__main")[0].hidden = false
}

let displayOriginalText = (id) => {
    document.getElementById("text_es_"+id).hidden = false
    document.getElementById("text_fr_"+id).hidden = true
}

let displayTranslateText = (id) => {
    document.getElementById("text_es_"+id).hidden = true
    document.getElementById("text_fr_"+id).hidden = false
}

getData()