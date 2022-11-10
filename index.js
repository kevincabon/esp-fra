let _GetRequest = (requestPath) => {
    return new Promise((resolve) => {
        fetch("https://opensheet.elk.sh/1E3O5NWsM4Cka4CJa3jb_54gcvpAFYpmbOVeYcUG3-Ps/" + requestPath)
        .then( (response) => {
            return response.json()
        })
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            console.error(err)
            return err
        })
    });
  }

  let _FormatDate = (date, lang) => {
    if (!date){
        return ""
    }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let datetime = new Date(date)
    let str = datetime.toLocaleDateString(lang, options)
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  let _CustomSort = (a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  let getWordOfTheDay = async () => {
    let data = await _GetRequest("palabra_del_dia");
    data.sort(_CustomSort);
    let word = data[0];
    if (
        new Date(word.date).toLocaleDateString() == new Date().toLocaleDateString()
      ) {
        let gender_fr = null;
        let gender_es = null;
        let citation = "";
        if (word.palabra_name_gender_fr) {
          if (
            word.palabra_name_gender_fr == "m" ||
            word.palabra_name_gender_fr == "f" ||
            word.palabra_name_gender_fr == "m/f"
          ) {
            gender_fr = `(n.${word.palabra_name_gender_fr})`;
          } else {
            gender_fr = `(${word.palabra_name_gender_fr})`;
          }
        } else {
          gender_fr = "";
        }
        if (word.palabra_name_gender_es) {
          if (
            word.palabra_name_gender_es == "m" ||
            word.palabra_name_gender_es == "f" ||
            word.palabra_name_gender_es == "m/f"
          ) {
            gender_es = `(n.${word.palabra_name_gender_es})`;
          } else {
            gender_es = `(${word.palabra_name_gender_es})`;
          }
        } else {
          gender_es = "";
        }
        if (word.citation_es && word.citation_autor) {
          citation = `
                            <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                            <figure class="col-lg-10 mx-auto">
                                <blockquote>
                                    <span class="font-bold text-green-700">${word.citation_es}</span>
                                    <br>
                                    <span class="italic text-red-700">${word.citation_fr}</span>
                                </blockquote>
                                <figcaption class="text-sm m-1 before:content-['—']">
                                    ${word.citation_autor}
                                </figcaption>
                                <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                                <cite title="Sources : Proverbia et LexisRex" class="text-sm">Sources :  <a href="https://www.lexisrex.com/Espagnol/Mot-du-Jour" target="_blank" class="hover:text-slate-900 hover:dark:text-slate-200">LexisRex.com</a>&nbsp;&&nbsp;<a href="https://proverbia.net/frase-del-dia/" target="_blank" class="hover:text-slate-900 hover:dark:text-slate-200">Proverbia.net</a></cite>
                            </figure>
                        `;
        } else {
          citation = `
                            <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                            <cite title="Sources : Proverbia et LexisRex" class="text-sm">Sources :  <a href="https://www.lexisrex.com/Espagnol/Mot-du-Jour" target="_blank" class="hover:text-slate-900 hover:dark:text-slate-200">LexisRex.com</a>&nbsp;&&nbsp;<a href="https://proverbia.net/frase-del-dia/" target="_blank" class="hover:text-slate-900 hover:dark:text-slate-200">Proverbia.net</a></cite>
                        `;
        }
    
        document.getElementById("word-of-the-day").innerHTML = `
                        <h2 class="text-2xl text-slate-800 dark:text-slate-200">Palabra, Frase y Cita del día</h2>
                        <p class="font-bold mt-1">
                            ${_FormatDate(word.date, "es-ES")}
                            <br>
                            <span class="italic text-sm">${_FormatDate(
                              word.date,
                              "fr-FR"
                            )}</span> 
                        </p>
                        <p id="audio" class="text-center"></p>
                        <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                        <p><span class="font-bold text-green-700">${
                          word.palabra_es
                        }</span> <span class="italic text-sm">${gender_es}</span> - <span class="text-red-700">${
          word.palabra_fr
        }</span> <span class="italic text-sm">${gender_fr}</span></p>
                        <p>
                            <hr class="w-4/12 my-3 mx-auto border-slate-600 dark:border-slate-400">
                            <span class="font-bold text-green-700">${
                              word.frase_es
                            }</span><br>
                            <span class="italic text-red-700">${
          word.frase_fr
        }</span>
                        </p>
                        ${citation}
                    `;
      } else {
        document.getElementsByClassName("loading_div")[0].innerHTML = `
            <span class="text-red-700">Aucun mot & aucune phrase disponible !</span>
        `;
        document
          .getElementsByClassName("loading_div")[0]
          .classList.remove("animate-pulse");
        document
          .getElementsByClassName("loading_div")[0]
          .classList.add("text-sm", "md:text-base");
      }
  }

  getWordOfTheDay()