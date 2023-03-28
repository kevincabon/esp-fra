const _GetRequest = (requestPath) => {
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
const _FormatDate = (date, lang) => {
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
const _CustomSort = (a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}
const _LoadAudio = (name) => {
    document.getElementById("audio").innerHTML = `    
        <audio src="../assets/audio/${name}.m4a" type="audio/x-m4a" controls autoplay class="mx-auto"></audio>
    `
}
const formatGenderOfWord = (gender) => {
    if (!gender){
        return ""
    }
    if (gender == "m" || gender == "f" || gender == "m/f"){ return `(n.${gender})` }
    else{ return `(${gender})` }
}
const calculAuthorAge = (authorYears) => {
    const startYear = parseInt(authorYears.split('-')[0]);
    const endYear = parseInt((authorYears.split('-')[1] === "?") ? new Date().getFullYear() : authorYears.split('-')[1]);
    return Math.abs(endYear - startYear)
  }  

const formatAuthorContent = ({ citation_es, citation_fr, citation_autor }) => {
    if (!citation_es && !citation_autor) {
      return ""
    }
  
    const [authorNameAndYears, authorInfos] = citation_autor.split(') ');
    const [authorName, authorYears] = authorNameAndYears.split(' (')
    const [authorInfosEsp, authorInfosFra] = authorInfos.split(' (');
    const authorAge = calculAuthorAge(authorYears)
  
    return `
            <hr class="w-4/12 my-3 border-slate-600 dark:border-slate-400">
            <div>
                <figure>
                    <blockquote class="text-justify">
                        <p class="font-bold text-green-700">${citation_es}</p>
                        <p class="italic text-red-700">${citation_fr}</p>
                    </blockquote>
                    <figcaption class="text-sm m-1">
                        — <span class="font-bold">${authorName}</span> (${authorYears}) <span class="text-xs">(${authorAge} años)</span>
                        <br>
                        <span class="ml-3">${authorInfosEsp} </span><span class="italic">(${authorInfosFra || ""}</span>
                    </figcaption>
                </figure>
            </div>
        `
  }  

const formatPalabraDelDia = (word, location) => {
    const palabra_avanzada = word.palabra_avanzada_fr
      ? ` <br>
          <span class="font-bold text-green-700">${word.palabra_avanzada_es}</span> <span class="italic text-xs">${formatGenderOfWord(word.palabra_avanzada_gender_es)}</span> - <span class="text-red-700">${word.palabra_avanzada_fr}</span> <span class="italic text-xs">${formatGenderOfWord(word.palabra_avanzada_gender_fr)}</span>
      `
      : ""
    return `
          <article class="my-5 w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 ${location === "home" ? "xl:w-5/12" : "xl:w-6/12"} p-3 mx-auto border border-current rounded-lg shadow-xl dark:shadow-slate-700 dark:shadow-lg text-slate-600 dark:text-slate-300">
              <div class="row text-center">
                  ${location === "home" ? `<h2 class="text-2xl text-slate-800 dark:text-slate-200 text-center">Palabra, Frase y Cita del día</h2>` : ""}
                  <p class="font-bold">${_FormatDate(word.date, "es-ES")}</p>
                  <p class="italic text-sm">${_FormatDate(word.date, "fr-FR")}</p> 
              </div>
              <hr class="w-4/12 mx-auto my-3 border-slate-600 dark:border-slate-400">
              <p id="audio_${word.id}" class="text-center mt-2"></p>
              <article class="my-2">
                  <div>
                      <span class="font-bold text-green-700">${word.palabra_es}</span> <span class="italic text-xs">${formatGenderOfWord(word.palabra_name_gender_es)}</span> - <span class="text-red-700">${word.palabra_fr}</span> <span class="italic text-xs">${formatGenderOfWord(word.palabra_name_gender_fr)}</span>
                      ${palabra_avanzada}
                  </div>
                  <hr class="w-4/12 my-3 border-slate-600 dark:border-slate-400">
                  <div>
                      <p class="font-bold text-green-700">${word.frase_es}</p>
                      <p class="italic text-red-700">${word.frase_fr}</p>
                  </div>
                  ${formatAuthorContent(word)}
              </article>
          </article>
      `
  }