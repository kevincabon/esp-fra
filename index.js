const loadingDivEl = document.getElementsByClassName("loading_div")[0]
const palabraDelDiaContent = document.getElementById("word-of-the-day")
const cardListEl = document.getElementById("card-list")

const cardArray = [
    { title: "Mots et phrases du jour", description: "Découvrez les mots et les phrases du jour.",
      icon: "newspaper", img: "5ea8c94a-4e16-4439-b4fb-8d7cab275de0.jpeg", path:"words-of-the-day"
    },
    { title: "Mots et expressions basique", description: "Les premiers mots indispensables pour apprendre l'espagnol et le français.",
      icon: "comment-dots", img: "aecc7c6a-2bcf-4a90-8f2d-b403e5103571.jpeg", path:"basics"
    },
    { title: "Prononciation des verbes français", description: "Écoutez la prononciation de plusieurs verbes du 1er et 2e groupe en français.",
      icon: "microphone", img: "ddfa37e9-6340-4bd3-8c8c-df96a7299b2a.jpeg", path:"verbs"
    },
    { title: "Prononciation des sons en français", description: "Écoutez la prononciation de plusieurs mots en français.",
      icon: "microphone-lines", img: "36c1ae92-0b0e-4373-b078-f631c0a41b1a.jpeg", path:"french-sounds"
    },
    { title: "Lecture de textes", description: "Plongez dans la lecture de plusieurs textes en espagnol et en français.",
      icon: "book", img: "5e995dd7-1f8f-47fd-b414-c3d881792902.jpeg", path:"reading"
    },
    { title: "Lecture de poèmes", description: "Une sélection de poèmes disponibles en français et en espagnol.",
      icon: "file-lines", img: "63ca2118-f653-4a8e-b887-27db15496284.jpeg", path:"poems"
    },
    { title: "Le français c'est facile", description: "Apprendre le français ? C'est un jeu d'enfant !",
      icon: "face-grimace", img: "7894db65-8f07-4201-9b8a-1996b4e7ac0d.jpeg", path:"virelangues"
    },
    { title: "Liens utiles", description: "Retrouvez une liste de liens utiles pour apprendre l'espagnol et le français.",
      icon: "link", img: "4f0f94e1-d52b-45a7-89b0-f6183a9a9620.jpeg", path:"links"
    },
  ]

const getWordOfTheDay = async () => {
    try{
        const [word] = await _GetRequest("getPalabraDelDia");
        palabraDelDiaContent.classList.remove("animate-pulse")
        if (new Date(word.date).toLocaleDateString() != new Date().toLocaleDateString()){
            palabraDelDiaContent.classList.add("text-sm", "md:text-base")
            return palabraDelDiaContent.innerHTML = innerHTML = `
                <div class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 py-4 xl:w-5/12 text-center shadow-md rounded-box bg-slate-300 dark:bg-gray-800 mx-auto">
                  <h2 class="text-2xl text-slate-800 dark:text-slate-200 text-center">Palabra, Frase y Cita del día</h2>
                  <span class="text-red-700">Aucun mot & aucune phrase disponible !</span>
                  <br>
                  <br>
                  <a href="./p/words-of-the-day.html" class="text-teal-700 hover:text-teal-600 dark:text-teal-600  hover:dark:text-teal-500">Voir les mots et les phrases des jours précédents.</a>
                </div>
              `
          }
        return palabraDelDiaContent.innerHTML = formatPalabraDelDia(word, "home")
    }catch(error){
        return palabraDelDiaContent.innerHTML = error
    }
}

const displayCards = () => {
    const cardListHtml = cardArray.map(item => {
      return `
          <div class="text-slate-700 dark:text-slate-300 rounded-box bg-slate-300 dark:bg-slate-700 hover:bg-gray-300 hover:dark:bg-gray-700 shadow-md overflow-hidden cursor-pointer">
              <a href="./p/${item.path}.html">
                  <div>
                      <img class="object-cover ${item.icon === "newspaper" ? "object-bottom" : "object-center"} h-48 w-96 shadow-md transition duration-300 ease-in-out hover:scale-105" src="./assets/img/${item.img}" alt="">
                  </div>
                  <div class="px-2 py-3">
                      <div class="font-bold text mt-1">
                          <i class="fa-solid fa-${item.icon}"></i> ${item.title}
                      </div>
                      <div class="mt-1 italic text-sm text-gray-500">
                        ${item.description}
                      </div>
                  </div>
              </a>
          </div>
      `
    }).join('')
    cardListEl.innerHTML = cardListHtml
  }

getWordOfTheDay();
displayCards();