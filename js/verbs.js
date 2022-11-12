let getGrpVerbs = async (grpName) => {
    document.getElementById(grpName).innerHTML = `
        <div class="text-center animate-pulse">
            Chargement ... <i class="fa-solid fa-fan animate-spin"></i>
        </div>
        `
    let data = await _GetRequest(grpName);
    document.getElementById(grpName).innerHTML = null
    data.forEach(verbs => {
        let playAudio = ""
        if (verbs.audio_fr){
            playAudio = `<i class="fa-solid fa-circle-play" onclick="_LoadAudio('${verbs.audio_fr}')"></i> `
        }
        if (!verbs.es){
            verbs.es = ""
        }
        document.getElementById(grpName).innerHTML += `
            <div class="mt-2">${playAudio}<strong>${verbs.fr}</strong> - <span class="italic">${verbs.es}</span></div>
        `
    })
}

getGrpVerbs("first_grp_verb")
getGrpVerbs("second_grp_verb")