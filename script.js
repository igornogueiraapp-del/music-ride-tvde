let selectedMusic = null;

function openMusic(language){

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("musicScreen").style.display = "block";

    const backButton = document.querySelector(".back-button");
    const musicTitle = document.querySelector(".music-screen h2");
    const searchBox = document.querySelector(".search-box");
    const musicCategory = document.querySelector(".music-screen h3");
    const sendButton = document.querySelector(".send-button");

    // Sempre inicia desativado
    selectedMusic = null;
    sendButton.disabled = true;
    sendButton.classList.remove("enabled");

    if(language === "en"){

        backButton.innerHTML = "← Back";
        musicTitle.innerHTML = "🎧 Choose your music";
        searchBox.innerHTML = "🔎 Search music";
        musicCategory.innerHTML = "⭐ Most requested songs";
        sendButton.innerHTML = "🚗 Send to driver";

    }

    else if(language === "es"){

        backButton.innerHTML = "← Volver";
        musicTitle.innerHTML = "🎧 Elige tu música";
        searchBox.innerHTML = "🔎 Buscar música";
        musicCategory.innerHTML = "⭐ Canciones más solicitadas";
        sendButton.innerHTML = "🚗 Enviar al conductor";

    }

    else if(language === "fr"){

        backButton.innerHTML = "← Retour";
        musicTitle.innerHTML = "🎧 Choisissez votre musique";
        searchBox.innerHTML = "🔎 Rechercher une musique";
        musicCategory.innerHTML = "⭐ Musiques les plus demandées";
        sendButton.innerHTML = "🚗 Envoyer au conducteur";

    }

    else if(language === "it"){

        backButton.innerHTML = "← Indietro";
        musicTitle.innerHTML = "🎧 Scegli la tua musica";
        searchBox.innerHTML = "🔎 Cerca musica";
        musicCategory.innerHTML = "⭐ Brani più richiesti";
        sendButton.innerHTML = "🚗 Invia al conducente";

    }

    else{

        backButton.innerHTML = "← Voltar";
        musicTitle.innerHTML = "🎧 Escolha sua música";
        searchBox.innerHTML = "🔎 Buscar música";
        musicCategory.innerHTML = "⭐ Músicas mais pedidas";
        sendButton.innerHTML = "🚗 Enviar ao motorista";

    }

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

    alert("✅ Pedido enviado ao motorista!");

}
