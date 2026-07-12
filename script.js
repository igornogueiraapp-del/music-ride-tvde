// Abre a tela de músicas
function openMusic() {
    document.getElementById("languageScreen").style.display = "none";
    document.getElementById("musicScreen").style.display = "block";
}

// Seleciona uma música
function selectMusic(card) {

    // Remove a seleção de todos os cards
    const cards = document.querySelectorAll(".music-card");

    cards.forEach(function(item) {
        item.classList.remove("selected");
    });

    // Marca apenas o card clicado
    card.classList.add("selected");
}
