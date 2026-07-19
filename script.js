let selectedMusic = null;


// ABRIR TELA DE MÚSICA

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

    else{

        backButton.innerHTML = "← Voltar";
        musicTitle.innerHTML = "🎧 Escolha sua música";
        searchBox.placeholder = "🔎 Buscar música";
        musicCategory.innerHTML = "⭐ Músicas mais pedidas";
        sendButton.innerHTML = "🚗 Enviar ao motorista";

    }


    loadTopHits();

}



// MÚSICAS INICIAIS

function loadTopHits(){

    document.getElementById("topHits").innerHTML = `

        <div class="music-card"
        onclick="selectMusic(this)"
        data-link="https://m.youtube.com/watch?v=qFLhGq0060w">

            <img src="https://i.ytimg.com/vi/qFLhGq0060w/hqdefault.jpg">

            <div>
                <strong>Save Your Tears</strong>
                <br>
                <span>The Weeknd</span>
            </div>

        </div>

    `;

}



// BUSCAR MÚSICA

document.addEventListener("DOMContentLoaded", function(){


    const search = document.getElementById("musicSearch");


    search.addEventListener("keypress", function(event){

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


    const url =
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;


    const response = await fetch(url);


    const data = await response.json();


    const results = document.getElementById("searchResults");


    results.innerHTML = "";


    data.items.forEach(function(item){


        const videoId = item.id.videoId;

        const title = item.snippet.title;

        const channel = item.snippet.channelTitle;

        const image = item.snippet.thumbnails.medium.url;


        results.innerHTML += `

        <div class="music-card"
        onclick="selectMusic(this)"
        data-link="https://youtube.com/watch?v=${videoId}">


            <img src="${image}">


            <div class="music-info">

                <strong>${title}</strong>

                <br>

                <span>${channel}</span>

            </div>


        </div>

        `;


    });


}





// SELECIONAR MÚSICA

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





// ENVIAR PARA O DEMUS

function sendMusic(){


    if(selectedMusic == null){

        return;

    }


    const youtubeLink = selectedMusic.getAttribute("data-link");


    const demusLink =
    "demus://?url=" + encodeURIComponent(youtubeLink);


    window.location.href = demusLink;


}
