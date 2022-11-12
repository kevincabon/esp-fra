let getData = async () => {
    document.getElementById("response").innerHTML = `
            <div class="text-center animate-pulse">
                Chargement ... <i class="fa-solid fa-fan animate-spin"></i>
            </div>
        `
    document.getElementById("response").hidden = false
    let data = await _GetRequest("basics")
    data.forEach(word => {
        let playAudio = ""
        if (word.audio_fr){
            playAudio = `<i class="fa-solid fa-circle-play" onclick="_LoadAudio('${word.audio_fr}')"></i>&nbsp;`
        }
        document.getElementById("basics--list").innerHTML += `
            <li class="mt-3">
                <span class="font-bold">${word.es}</span> - ${playAudio}<span class="italic">${word.fr}</span>
            </li>
        `
    });
    document.getElementById("response").innerHTML = null
    document.getElementById("response").hidden = true
    document.getElementsByClassName("basics__main")[0].hidden = false
}

getData()