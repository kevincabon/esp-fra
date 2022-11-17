let getWordOfTheDay = async () => {
    let data = await _GetRequest("palabra_del_dia");
    data.sort(_CustomSort);
    let word = data[0];
    if (new Date(word.date).toLocaleDateString() == new Date().toLocaleDateString()) {
        let gender_fr = null, gender_es = null, gender_avanzada_es = "", gender_avanzada_fr = ""
        let playWordAudio_fr = "", playFraseAudio_fr = "", citation = "", palabra_avanzada = ""
        if (word.word_audio_fr) {
          playWordAudio_fr = `<i class="fa-solid fa-circle-play" onclick="_LoadAudio('${word.word_audio_fr}')"></i>&nbsp;`;
        }
        if (word.frase_audio_fr) {
          playFraseAudio_fr = `<i class="fa-solid fa-circle-play" onclick="_LoadAudio('${word.frase_audio_fr}')"></i>&nbsp;`;
        }
        gender_fr = formatGenderOfWord(word.palabra_name_gender_fr)
        gender_es = formatGenderOfWord(word.palabra_name_gender_es)
    
        if (word.palabra_avanzada_fr){
          gender_avanzada_fr = formatGenderOfWord(word.palabra_avanzada_gender_fr)
          gender_avanzada_es = formatGenderOfWord(word.palabra_avanzada_gender_es)
          palabra_avanzada = `
              <br>
              <b><span class="font-bold text-green-700">${word.palabra_avanzada_es}</span></b> <span class="italic text-xs">${gender_avanzada_es}</span> - <span class="text-red-700">${word.palabra_avanzada_fr}</span> <span class="italic text-xs">${gender_avanzada_fr}</span>
          `
        }
        if (word.citation_es && word.citation_autor) {
            let author = word.citation_autor.split(") ")
            let author_name = author[0].split(" (")[0]
            let author_years = author[0].split(" (")[1]
            let author_infos = author[1].split(". ")
            if (word.citation_autor_wiki){
                author_name = `<a href="https://fr.wikipedia.org/wiki/${word.citation_autor_wiki}" target="_blank">${author_name}</a>`
            }

            let ageOfAuthor = author_years.split("-")
            if (ageOfAuthor[1] == "?"){
                ageOfAuthor[1] = new Date().getFullYear()
            }
            ageOfAuthor = parseInt(ageOfAuthor[1]) - parseInt(ageOfAuthor[0])

            citation = `
                              <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                              <figure class="col-lg-10 mx-auto">
                                  <blockquote>
                                      <b><span class="font-bold text-green-700">${word.citation_es}</span></b>
                                      <br>
                                      <i><span class="italic text-red-700">${word.citation_fr}</span></i>
                                  </blockquote>
                                  <figcaption class="text-sm m-2">
                                      — <b><span class="font-bold">${author_name}</span></b> (${author_years}) <span class="text-xs">(${ageOfAuthor} años)</span>
                                      <br>
                                      <span class="ml-3">${author_infos[0]}. </span><i><span class="italic">${author_infos[1]}</span></i>
                                  </figcaption>
                              </figure>
                          `;
        }
    
        document.getElementById("word-of-the-day").innerHTML = `
                        <button class="absolute top-2 right-2 btn btn-sm" onclick="copyRichText(this)" title="Copier"><i class="fa-regular fa-clipboard"></i></button>
                        <h2 class="text-2xl text-slate-800 dark:text-slate-200">Palabra, Frase y Cita del día</h2>
                        <p class="mt-1">
                            <b><span class="font-bold">${_FormatDate(word.date, "es-ES")}</span></b>
                            <br>
                            <i><span class="italic text-sm">${_FormatDate(word.date, "fr-FR")}</span></i> 
                        </p>
                        <p id="audio" class="text-center"></p>
                        <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                        <p>
                            <b><span class="font-bold text-green-700">${word.palabra_es}</span></b> <i><span class="italic text-sm">${gender_es}</span></i> - ${playWordAudio_fr}<span class="text-red-700">${word.palabra_fr}</span> <i><span class="italic text-sm">${gender_fr}</span></i>
                            ${palabra_avanzada}
                        </p>
                        <p>
                            <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                            <b><span class="font-bold text-green-700">${word.frase_es}</span></b><br>
                            <i><span class="italic text-red-700">${word.frase_fr}</span></i>
                        </p>
                        ${citation}
                    `;
    } else {
        document.getElementsByClassName("loading_div")[0].innerHTML = `
            <span class="text-red-700">Aucun mot & aucune phrase disponible !</span>
        `;
        document.getElementsByClassName("loading_div")[0].classList.remove("animate-pulse");
        document.getElementsByClassName("loading_div")[0].classList.add("text-sm", "md:text-base");
    }
}

getWordOfTheDay()