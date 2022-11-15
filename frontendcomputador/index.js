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




btniniciarPedido.addEventListener("click", async () => {
    const date = new Date();
    const [month, day, year] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
    console.log(month, day, year)
    let fecha = `${year}-${month}-${day}`
    console.log(fecha)

    let resultado = await crearPedido(fecha) // LLAMO A LA API PARA CREAR UN PEDIDO
    console.log(resultado, "xd")
    console.log(resultado.resultado[0], "perra") //DESCOMENTAR PARA  EXPONER
    sessionStorage.setItem("pedido", resultado.resultado[0]);
    window.location.href = "./pedido.html"
})

