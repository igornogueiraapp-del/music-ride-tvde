// ==========================
// FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



// ==========================
// VARIÁVEIS DO APP
// ==========================

let selectedMusic = null;



// ==========================
// ABRIR TELA DE MÚSICA
// ==========================

function openMusic(language){

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("musicScreen").style.display = "block";


    const backButton = document.querySelector(".back-button");
    const musicTitle = document.getElementById("musicTitle");
    const searchBox = document.getElementById("musicSearch");
    const topHitsTitle = document.getElementById("topHitsTitle");
    const sendButton = document.getElementById("sendButton");


    selectedMusic = null;


    sendButton.disabled = true;
    sendButton.classList.remove("enabled");


    document.getElementById("searchResults").innerHTML = "";


    document.getElementById("topHits").style.display = "block";
    topHitsTitle.style.display = "block";



    if(language === "en"){

        backButton.innerHTML = "← Back";
        musicTitle.innerHTML = "🎧 Choose your music";
        searchBox.placeholder = "🔎 Search music";
        topHitsTitle.innerHTML = "⭐ Most requested songs";
        sendButton.innerHTML = "🚗 Send to driver";

    }


    else if(language === "es"){

        backButton.innerHTML = "← Volver";
        musicTitle.innerHTML = "🎧 Elige tu música";
        searchBox.placeholder = "🔎 Buscar música";
        topHitsTitle.innerHTML = "⭐ Canciones más solicitadas";
        sendButton.innerHTML = "🚗 Enviar al conductor";

    }


    else if(language === "fr"){

        backButton.innerHTML = "← Retour";
        musicTitle.innerHTML = "🎧 Choisissez votre musique";
        searchBox.placeholder = "🔎 Rechercher une musique";
        topHitsTitle.innerHTML = "⭐ Musiques les plus demandées";
        sendButton.innerHTML = "🚗 Envoyer au conducteur";

    }


    else if(language === "it"){

        backButton.innerHTML = "← Indietro";
        musicTitle.innerHTML = "🎧 Scegli la tua musica";
        searchBox.placeholder = "🔎 Cerca musica";
        topHitsTitle.innerHTML = "⭐ Brani più richiesti";
        sendButton.innerHTML = "🚗 Invia al conducente";

    }


    else{

        backButton.innerHTML = "← Voltar";
        musicTitle.innerHTML = "🎧 Escolha sua música";
        searchBox.placeholder = "🔎 Buscar música";
        topHitsTitle.innerHTML = "⭐ Músicas mais pedidas";
        sendButton.innerHTML = "🚗 Enviar ao motorista";

    }


    loadTopHits();

}// ==========================
// VOLTAR
// ==========================

function goBack(){

    document.getElementById("musicScreen").style.display = "none";

    document.getElementById("homeScreen").style.display = "block";

}




// ==========================
// MÚSICAS MAIS PEDIDAS
// ==========================

function loadTopHits(){


    document.getElementById("topHits").innerHTML = `


    <div class="music-card"
    onclick="selectMusic(this)"
    data-link="https://youtube.com/watch?v=qFLhGq0060w">


        <img src="https://i.ytimg.com/vi/qFLhGq0060w/hqdefault.jpg">


        <div class="music-info">

            <strong>Save Your Tears</strong>

            <span>The Weeknd</span>

        </div>


    </div>



    <div class="music-card"
    onclick="selectMusic(this)"
    data-link="https://www.youtube.com/watch?v=yKNxeF4KMsY">


        <img src="https://i.ytimg.com/vi/yKNxeF4KMsY/hqdefault.jpg">


        <div class="music-info">

            <strong>Yellow</strong>

            <span>Coldplay</span>

        </div>


    </div>



    <div class="music-card"
    onclick="selectMusic(this)"
    data-link="https://www.youtube.com/watch?v=7wtfhZwyrcc">


        <img src="https://i.ytimg.com/vi/7wtfhZwyrcc/hqdefault.jpg">


        <div class="music-info">

            <strong>Believer</strong>

            <span>Imagine Dragons</span>

        </div>


    </div>


    `;


}






// ==========================
// PESQUISA
// ==========================

document.addEventListener("DOMContentLoaded", function(){


    const input = document.getElementById("musicSearch");


    input.addEventListener("keypress", function(event){

        if(event.key === "Enter"){

            searchMusic();

        }

    });


});





async function searchMusic(){


    const query = document.getElementById("musicSearch").value;


    if(query.trim() === ""){

        return;

    }



    document.getElementById("topHits").style.display = "none";

    document.getElementById("topHitsTitle").style.display = "none";



    const url =

    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;



    const response = await fetch(url);


    const data = await response.json();



    const results = document.getElementById("searchResults");


    results.innerHTML = "";



    data.items.forEach(function(item){



        const videoId = item.id.videoId;


        results.innerHTML += `


        <div class="music-card"

        onclick="selectMusic(this)"

        data-link="https://youtube.com/watch?v=${videoId}">



            <img src="${item.snippet.thumbnails.medium.url}">



            <div class="music-info">


                <strong>${item.snippet.title}</strong>


                <span>${item.snippet.channelTitle}</span>


            </div>



        </div>



        `;



    });



}// ==========================
// SELEÇÃO
// ==========================

function selectMusic(card){


    document.querySelectorAll(".music-card").forEach(function(item){

        item.classList.remove("selected");

    });



    card.classList.add("selected");


    selectedMusic = card;



    const button = document.getElementById("sendButton");


    button.disabled = false;

    button.classList.add("enabled");


}




// ==========================
// SALVAR PEDIDO NO FIRESTORE
// ==========================

async function saveMusicRequest(){


    if(selectedMusic == null){

        return false;

    }



    const link = selectedMusic.getAttribute("data-link");


    const title = selectedMusic.querySelector("strong").innerText;


    const artist = selectedMusic.querySelector("span").innerText;



    try{


        await db.collection("pedidos").add({

            music: title,

            artist: artist,

            link: link,

            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        });



        return true;


    }


    catch(error){


        console.log("Erro ao salvar música:", error);


        return false;


    }


}





// ==========================
// ENVIAR AO MOTORISTA
// ==========================

async function sendMusic(){

    if(selectedMusic == null){

        return;

    }

    const saved = await saveMusicRequest();

    if(!saved){

        alert("Erro ao enviar música.");

        return;

    }

    alert("✅ Música enviada ao motorista!");

    // Limpa a seleção
    selectedMusic = null;

    document.querySelectorAll(".music-card").forEach(function(item){

        item.classList.remove("selected");

    });

    document.getElementById("musicSearch").value = "";
    document.getElementById("searchResults").innerHTML = "";

    document.getElementById("topHits").style.display = "block";
    document.getElementById("topHitsTitle").style.display = "block";

    loadTopHits();

    const button = document.getElementById("sendButton");

    button.disabled = true;
    button.classList.remove("enabled");

}
