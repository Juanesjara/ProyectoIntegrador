let pedido = sessionStorage.getItem("pedido")
let subtitulo = document.getElementById("subtitulo")

subtitulo.innerHTML = "Estas Creado el pedido #" + pedido
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