// ==========================
// FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// ELEMENTOS DA TELA
// ==========================

const pendentesDiv = document.getElementById("pendentes");
const aceitosDiv = document.getElementById("aceitos");
const concluidosDiv = document.getElementById("concluidos");


// ==========================
// CARREGAR PEDIDOS
// ==========================

db.collection("pedidos")
.orderBy("createdAt", "desc")
.onSnapshot(function(snapshot){

    pendentesDiv.innerHTML = "";
    aceitosDiv.innerHTML = "";
    concluidosDiv.innerHTML = "";

    if(snapshot.empty){

        pendentesDiv.innerHTML = "Nenhum pedido.";
        aceitosDiv.innerHTML = "Nenhum pedido.";
        concluidosDiv.innerHTML = "Nenhum pedido.";

        return;

    }

    snapshot.forEach(function(doc){

        const pedido = doc.data();
        const status = pedido.status || "Pendente";

        const card = `

        <div class="music-card">

            <div class="music-info">

                <strong>${pedido.music}</strong>

                <span>${pedido.artist}</span>

                <small>Status: ${status}</small>

                <br><br>

                <button onclick="openMusic('${pedido.link}')">
                    ▶️ Abrir música
                </button>

                <button onclick="acceptRequest('${doc.id}')">
                    ✅ Aceitar pedido
                </button>

                <button onclick="completeRequest('${doc.id}')">
                    ✔️ Concluir pedido
                </button>

            </div>

        </div>

        `;

        if(status === "Pendente"){

            pendentesDiv.innerHTML += card;

        }
        else if(status === "Aceito"){

            aceitosDiv.innerHTML += card;

        }
        else{

            concluidosDiv.innerHTML += card;

        }

    });

});

// ==========================
// ABRIR MÚSICA
// ==========================

function openMusic(link){

    window.open(link, "_blank");

}


// ==========================
// ACEITAR PEDIDO
// ==========================

function acceptRequest(id){

    db.collection("pedidos")
    .doc(id)
    .update({

        status: "Aceito"

    });

}


// ==========================
// CONCLUIR PEDIDO
// ==========================

function completeRequest(id){

    db.collection("pedidos")
    .doc(id)
    .update({

        status: "Concluído"

    });

}
