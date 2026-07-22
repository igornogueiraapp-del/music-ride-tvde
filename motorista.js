// ==========================
// FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// CARREGAR PEDIDOS
// ==========================

const pedidosDiv = document.getElementById("pedidos");


db.collection("pedidos")
.orderBy("createdAt", "desc")
.onSnapshot(function(snapshot){


    pedidosDiv.innerHTML = "";


    if(snapshot.empty){

        pedidosDiv.innerHTML = "Nenhum pedido ainda.";

        return;

    }



    snapshot.forEach(function(doc){


        const pedido = doc.data();



        pedidosDiv.innerHTML += `


        <div class="music-card">


            <div class="music-info">


                <strong>${pedido.music}</strong>


                <span>${pedido.artist}</span>


                <small>Status: ${pedido.status || "Pendente"}</small>



                <br><br>



                <button onclick="openMusic('${pedido.link}')">

                    ▶️ Abrir música

                </button>



                <button onclick="acceptRequest('${doc.id}')">

                    ✅ Aceitar pedido

                </button>



            </div>


        </div>


        `;


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
