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
const copyRichText = async (elem) => {
    elem.blur()
    const content = elem.closest("article").innerHTML
    const blob = new Blob([content], { type: "text/html" });
    const richTextInput = new ClipboardItem({ "text/html": blob });
    await navigator.clipboard.write([richTextInput]);
    elem.classList.add("btn-accent")
    elem.innerHTML = `<i class="fa-solid fa-check"></i>`
    setTimeout(() => {
        elem.classList.remove("btn-accent")
        elem.innerHTML = `<i class="fa-regular fa-clipboard"></i>`
    }, 1200);
};