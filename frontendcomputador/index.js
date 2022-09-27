let btniniciarPedido = document.getElementById("iniciarPedido");
let btnEditarPedido = document.getElementById("editarPedido")
async function crearPedido(fecha){
    const pedido = {
        "fecha_inicio": fecha
    }

    const parametros = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(pedido),
        json: true
    }

    return await fetch(`http://localhost:4000/crear/pedido`,parametros)
    .then(response =>{
        let json = response.json();
        if(response.ok){
            return json
        }else{
            return json.then(err => {

            })
        }
    })
}
async function validarNoHayaPedidoIniciado(){

    const parametros = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }, 
        
        json: true
    }

    return await fetch(`http://localhost:4000/traer/pedidos`, parametros)
    .then(response =>{
        let json = response.json()
        return json
        .then(resultado =>{
            //console.log(resultado, "soy los pedidos")
            return resultado
        })
    })
}




btniniciarPedido.addEventListener("click", async () => {
    const date = new Date();
    const [month, day, year] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
    console.log(month, day, year)
    let fecha = `${year}-${month}-${day}`
    console.log(fecha)
    /*let pedidosIniciados = await validarNoHayaPedidoIniciado()
    if(pedidosIniciados.length == 0){
        console.log("no hay nada")
        console.log(pedidosIniciados)
    }else{
        console.log("hay algo")
        console.log(pedidosIniciados)
    }*/
        
    let resultado = await crearPedido(fecha) // LLAMO A LA API PARA CREAR UN PEDIDO
    console.log(resultado, "xd")
    console.log(resultado.resultado[0], "perra") //DESCOMENTAR PARA  EXPONER
    sessionStorage.setItem("pedido", resultado.resultado[0]);
    window.location.href = "./pedido.html"
})

