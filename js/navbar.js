let navbar = `
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-44">
                <li><a href="/palabra-del-dia"><i class="fa-solid fa-newspaper"></i> Mots du jour</a></li>
                <li tabindex="0">
                <a class="justify-between">
                    <i class="fa-solid fa-microphone"></i> Prononciations
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-100">
                    <li><a href="./verbs.html"><i class="fa-solid fa-microphone"></i> Les Verbes</a></li>
                    <li><a href="./french-sounds.html"><i class="fa-solid fa-microphone-lines"></i> Les sons</a></li>
                </ul>
                </li>
                <li tabindex="0">
                <a class="justify-between">
                    <i class="fa-brands fa-readme"></i> Lecture
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-100">
                    <li><a href="./reading.html"><i class="fa-brands fa-readme"></i> Textes</a></li>
                    <li><a href="./poems.html"><i class="fa-solid fa-file-lines"></i> Poèmes</a></li>
                    <li><a href="./virelangues.html"><i class="fa-solid fa-face-grimace"></i> Virelangues</a></li>
                </ul>
                </li>
                <li tabindex="0">
                <a class="justify-between">
                    <i class="fa-solid fa-graduation-cap"></i> Apprendre
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-100">
                    <li><a href="./basics.html"><i class="fa-solid fa-comment-dots"></i> Basique</a></li>
                </ul>
                </li>
            </ul>
        </div>
        <a id="home-link-mobile" class="btn btn-ghost normal-case text-xl text-slate-700 dark:text-slate-200 lg:hidden" href="../index.html"><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Français - Español</a>
        <a id="home-link-standard" class="btn btn-ghost normal-case text-xl text-slate-700 dark:text-slate-200 hidden lg:flex" href="../index.html"><i class="fa-solid fa-house"></i>&nbsp;Accueil</a>
    </div>
    <div class="navbar-center hidden lg:flex text-slate-700 dark:text-slate-200">
        <ul class="menu menu-horizontal p-0">
            <li><a href="/palabra-del-dia"><i class="fa-solid fa-newspaper"></i> Mots du jour</a></li>
            <li tabindex="0">
                <a>
                    <i class="fa-solid fa-microphone"></i> Prononciations
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-200">
                    <li><a href="./verbs.html"><i class="fa-solid fa-microphone"></i> Prononciation des verbes</a></li>
                    <li disabled><a href="./french-sounds.html"><i class="fa-solid fa-microphone-lines"></i> Prononciation des sons</a></li>
                </ul>
            </li>
            <li tabindex="0">
                <a>
                    <i class="fa-brands fa-readme"></i> Lecture
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-200">
                    <li><a href="./reading.html"><i class="fa-brands fa-readme"></i> Lecture de textes</a></li>
                    <li><a href="./poems.html"><i class="fa-solid fa-file-lines"></i> Lecture de poèmes</a></li>
                    <li><a href="./virelangues.html"><i class="fa-solid fa-face-grimace"></i> Le français c'est facile</a></li>
                </ul>
            </li>
            <li tabindex="0">
                <a>
                    <i class="fa-solid fa-graduation-cap"></i> Apprendre
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                </a>
                <ul class="p-2 bg-base-200">
                    <li><a href="./basics.html"><i class="fa-solid fa-comment-dots"></i> Mots et expressions basique</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="navbar-end"></div>
`

document.getElementById("navBar").innerHTML = navbar