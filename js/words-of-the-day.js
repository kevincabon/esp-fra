let getData = async () => {
    let data = await _GetRequest("palabra_del_dia");
    data.sort(_CustomSort);
    document.getElementById("palabra-y-frase__main--list-exemple").innerHTML = null
    data.forEach(word => {
        let     gender_fr = "", gender_es = "", citation = "", palabra_avanzada = "", gender_avanzada_es = "", gender_avanzada_fr = ""
                playWordAudio_fr = "", playFraseAudio_fr = "",  
                mainSection = document.getElementById("palabra-y-frase__main--list"),  
                secondSection = document.getElementById("palabra-y-frase__main--list--oldest")
                oneWeekAgo = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(), 
                    new Date().getDate() - 8
                    )

        playWordAudio_fr = isAudioFile(word.word_audio_fr)
        playFraseAudio_fr = isAudioFile(word.frase_audio_fr)
        gender_fr = formatGenderOfWord(word.palabra_name_gender_fr)
        gender_es = formatGenderOfWord(word.palabra_name_gender_es)
        if (word.palabra_avanzada_fr){
            gender_avanzada_fr = formatGenderOfWord(word.palabra_avanzada_gender_fr)
            gender_avanzada_es = formatGenderOfWord(word.palabra_avanzada_gender_es)
            palabra_avanzada = `
                <br>
                <span class="font-bold text-green-700">${word.palabra_avanzada_es}</span> <span class="italic text-xs">${gender_avanzada_es}</span> - <span class="text-red-700">${word.palabra_avanzada_fr}</span> <span class="italic text-xs">${gender_avanzada_fr}</span>
            `
        }
        if (word.citation_es && word.citation_autor){
            citation = `
                    <hr class="w-4/12 my-3 border-slate-600 dark:border-slate-400">
                    <div>
                        <figure>
                            <blockquote class="text-justify">
                                <span class="font-bold text-green-700">${word.citation_es}</span>
                                <br>
                                <span class="italic text-red-700">${word.citation_fr}</span>
                            </blockquote>
                            <figcaption class="text-sm m-1 before:content-['—']">
                                ${word.citation_autor}
                            </figcaption>
                        </figure>
                    </div>
                `
        }
        let content = `
            <article class="my-5 w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 p-3 mx-auto border border-current rounded-lg shadow-xl dark:shadow-slate-700 dark:shadow-lg bg-slate-300 dark:bg-gray-800 text-slate-600 dark:text-slate-300">
                <div class="row text-center">
                    <span class="font-bold">${_FormatDate(word.date, "es-ES")}</span>
                    <br>
                    <span class="italic text-sm">${_FormatDate(word.date, "fr-FR")}</span> 
                </div>
                <hr class="w-4/12 mx-auto my-3 border-slate-600 dark:border-slate-400">
                <article class="my-2">
                    <div>
                        <span class="font-bold text-green-700">${word.palabra_es}</span> <span class="italic text-xs">${gender_es}</span> - ${playWordAudio_fr}<span class="text-red-700">${word.palabra_fr}</span> <span class="italic text-xs">${gender_fr}</span>
                        ${palabra_avanzada}
                    </div>
                    <hr class="w-4/12 my-3 border-slate-600 dark:border-slate-400">
                    <div>
                        <span class="font-bold text-green-700">${word.frase_es}</span><br>
                        ${playFraseAudio_fr}<span class="italic text-red-700">${word.frase_fr}</span>
                    </div>
                    ${citation}
                </article>
            </article>
        `
        if (new Date(word.date) > new Date(oneWeekAgo)){
            mainSection.innerHTML += content
        }else{
            secondSection.innerHTML += content
        }
    });
    
    document.getElementById("response").innerHTML = null
    document.getElementById("response").hidden = true
    document.getElementById("see-more-div").hidden = false
    document.getElementsByClassName("palabra-y-frase__main")[0].hidden = false
}

let isAudioFile = (nameOfFile) => {
    if(!nameOfFile){ return "" }
    return `<i class="fa-solid fa-circle-play" onclick="_LoadAudio('${nameOfFile}')"></i>&nbsp;`
}

let displayOldWords = (elem) => {
    elem.closest("div").hidden = true
    document.getElementById("palabra-y-frase__main--list--oldest").hidden = false
}

getData()