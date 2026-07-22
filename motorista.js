
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


            </div>


        </div>


        `;


    });



});
