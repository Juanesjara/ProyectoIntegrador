let pedido = sessionStorage.getItem("pedido");
let subtitulo = document.getElementById("subtitulo");
let selectObras = document.getElementById("obras");
subtitulo.innerHTML = "Estas Creado el pedido #" + pedido;

(async function colcandoObras(){
    let obras = await trayendoObras();
    console.log(obras)
    for(let i = 0; i < obras.length; i++){
        let option = document.createElement("option");
        option.setAttribute("value", obras[i].id_obra );
        option.innerHTML = obras[i].nombre
        selectObras.appendChild(option);
    }
})()

async function trayendoObras(){
    const parametros = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return await fetch(`http://localhost:4000/traer/obras`, parametros)
        .then(response => {
            let json = response.json()
            return json
        })
        .then(data => {
                return data
            }
        )
        .catch(error => {
            console.log(error, 'error')
            
        })
}


//debo verificar que haya un pedido en estado abierto para agregar pedidos al equipo
function agregarEquiposAlPedido(id_pedido,id_equipo) {
    const pedidoEquipo = {
        "id_pedido" : id_pedido,
        "id_equipo" : id_equipo
    }
    const parametros = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoEquipo),
        json: true,
    }
    
    fetch(`http://localhost:4000/agregar/equipos/pedido`, parametros)
        .then(response => {
            let json = response.json()
            if (response.ok) {
                return json
            } else {
                return json.then(err => {
                    throw err
                })
            }
        })
        .then(
            (data) => {
                console.log(data, 'soy data');
                /*setTimeout(function () {
                    document.location.reload();
                }, 2000);*/
            }
        )
        .catch(error => {
            console.log(error, 'error')
            
        })
}

//agregarEquiposAlPedido("1", "2")