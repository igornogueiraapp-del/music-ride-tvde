// ==========================
// FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// ELEMENTOS DA TELA
// ==========================

const pendentesDiv = document.getElementById("pendentes");


// ==========================
// CARREGAR PEDIDOS
// ==========================

db.collection("pedidos")
.orderBy("createdAt", "desc")
.onSnapshot(function(snapshot){

    pendentesDiv.innerHTML = "";

    if(snapshot.empty){

        pendentesDiv.innerHTML = "Nenhum pedido.";

        return;

    }

    snapshot.forEach(function(doc){

        const pedido = doc.data();

        if(pedido.status === "Aceito"){

            return;

        }

        pendentesDiv.innerHTML += `

        <div class="music-card">

            <div class="music-info">

                <strong>${pedido.music}</strong>

                <span>${pedido.artist}</span>

                <br><br>

                <button onclick="acceptRequest('${doc.id}','${pedido.link}')">

                    🎵 Aceitar música

                </button>

            </div>

        </div>

        `;

    });

});

// ==========================
// ACEITAR MÚSICA
// ==========================

async function acceptRequest(id, link){

    try{

        await db.collection("pedidos")
        .doc(id)
        .update({

            status: "Aceito"

        });

        // Abre a música no Demus
        window.location.href =
        "demus://?url=" + encodeURIComponent(link);

    }

    catch(error){

        console.error("Erro ao aceitar pedido:", error);

        alert("Erro ao aceitar a música.");

    }

}
