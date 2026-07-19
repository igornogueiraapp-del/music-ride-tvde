let selectedMusic = null;

function openMusic(language){

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("musicScreen").style.display = "block";

    const backButton = document.querySelector(".back-button");
    const musicTitle = document.querySelector(".music-screen h2");
    const searchBox = document.querySelector(".search-box");
    const musicCategory = document.querySelector(".music-screen h3");
    const sendButton = document.querySelector(".send-button");

    selectedMusic = null;
    sendButton.disabled = true;
    sendButton.classList.remove("enabled");


    if(language === "en"){

        backButton.innerHTML = "← Back";
        musicTitle.innerHTML = "🎧 Choose your music";
        searchBox.placeholder = "🔎 Search music";
        musicCategory.innerHTML = "⭐ Most requested songs";
        sendButton.innerHTML = "🚗 Send to driver";

    }

    else if(language === "es"){

        backButton.innerHTML = "← Volver";
        musicTitle.innerHTML = "🎧 Elige tu música";
        searchBox.placeholder = "🔎 Buscar música";
        musicCategory.innerHTML = "⭐ Canciones más solicitadas";
        sendButton.innerHTML = "🚗 Enviar al conductor";

    }

    else if(language === "fr"){

        backButton.innerHTML = "← Retour";
        musicTitle.innerHTML = "🎧 Choisissez votre musique";
        searchBox.placeholder = "🔎 Rechercher une musique";
        musicCategory.innerHTML = "⭐ Musiques les plus demandées";
        sendButton.innerHTML = "🚗 Envoyer au conducteur";

    }

    else if(language === "it"){

        backButton.innerHTML = "← Indietro";
        musicTitle.innerHTML = "🎧 Scegli la tua musica";
        searchBox.placeholder = "🔎 Cerca musica";
        musicCategory.innerHTML = "⭐ Brani più richiesti";
        sendButton.innerHTML = "🚗 Invia al conducente";

    }

    else{

        backButton.innerHTML = "← Voltar";
        musicTitle.innerHTML = "🎧 Escolha sua música";
        searchBox.placeholder = "🔎 Buscar música";
        musicCategory.innerHTML = "⭐ Músicas mais pedidas";
        sendButton.innerHTML = "🚗 Enviar ao motorista";

    }


    // Música de teste

    document.getElementById("topHits").innerHTML = `

        <div class="music-card"
        onclick="selectMusic(this)"
        data-link="https://m.youtube.com/watch?v=qFLhGq0060w&list=RDqFLhGq0060w&start_radio=1">

            🎵 Música teste

        </div>

    `;

}



function goBack(){

    document.getElementById("musicScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";

}



function selectMusic(card){

    document.querySelectorAll(".music-card").forEach(function(item){

        item.classList.remove("selected");

    });


    card.classList.add("selected");

    selectedMusic = card;


    const sendButton = document.querySelector(".send-button");

    sendButton.disabled = false;
    sendButton.classList.add("enabled");

}




function sendMusic(){

    if(selectedMusic == null){

        return;

    }


    const youtubeLink = selectedMusic.getAttribute("data-link");


    if(youtubeLink){

        const demusLink = "demus://?url=" + encodeURIComponent(youtubeLink);


        window.location.href = demusLink;

    }

}
