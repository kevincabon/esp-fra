let getAllWords = async () => {
    document.getElementById("response").innerHTML = `
            <div class="text-center animate-pulse">
                Chargement ... <i class="fa-solid fa-fan animate-spin"></i>
            </div>
        `
    document.getElementById("response").hidden = false
    let data = await _GetRequest("french_sounds")
    data.forEach(word => {
        let gender_fr = null
        let gender_es = null
        let playAudio = "", playAudioIcon = ""
        if (word.audio_fr){
            playAudioIcon = `<i class="fa-solid fa-circle-play"></i>&nbsp;`
            playAudio = `onclick="_LoadAudio('${word.audio_fr}')"`
        }else if (!word.audio_fr && word.sound != "u-and-ou"){
            playAudioIcon = `<i class="fa-solid fa-circle-play opacity-50"></i>&nbsp;`
        }
        if (word.name_gender_fr){
            if (word.name_gender_fr == "m" || word.name_gender_fr == "f" || word.name_gender_fr == "m/f"){
                gender_fr = `(n.${word.name_gender_fr})`
            }else{
                gender_fr = `(${word.name_gender_fr})`
            }
        }else{
            gender_fr = ""
        }
        if (word.name_gender_es){
            if (word.name_gender_es == "m" || word.name_gender_es == "f" || word.name_gender_es == "m/f"){
                gender_es = `(n.${word.name_gender_es})`
            }else{
                gender_es = `(${word.name_gender_es})`
            }
        }else{
            gender_es = ""
        }
        document.getElementById("fr-sounds__main--" + word.sound).innerHTML += `
            <li class="my-1 ml-2 sm:ml-1 lg:ml-4"><span class="font-bold cursor-pointer" ${playAudio}>${playAudioIcon}${word.fr}</span> <span class="italic text-sm">${gender_fr}</span> - ${word.es} <span class="italic text-sm">${gender_es}</span></li>
        `
    });
    document.getElementById("response").innerHTML = null
    document.getElementById("response").hidden = true
    document.getElementsByClassName("fr-sounds__main")[0].hidden = false
}

let changeIcon = (elem) => {
    if (elem.innerHTML.split(`fa-chevron-`)[1].split(` float-right`)[0] == "down"){
        elem.innerHTML = elem.innerText + `<i class="float-right mt-5 text-base fa-solid fa-chevron-up"></i>`
    }else{
        elem.innerHTML = elem.innerText + `<i class="float-right mt-5 text-base fa-solid fa-chevron-down"></i>`
    }
}

getAllWords()