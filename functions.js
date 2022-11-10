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
let formatGenderOfWord = (gender) => {
    if (!gender){
        return ""
    }
    if (gender == "m" || gender == "f" || gender == "m/f"){ return `(n.${gender})` }
    else{ return `(${gender})` }
}