let valores = window.location.search;
console.log(valores)
const urlParams = new URLSearchParams(valores);
var numeroEquipo = urlParams.get('equipo');
//console.log(numeroEquipo) eso es null
let titulo = document.getElementById("titulo")
let divCantidad = document.getElementById("divCantidad")
let btnAgregar = document.getElementById("btnAgregar");
let iptCantidad = document.getElementById("iptCantidad");


async function traerEquipo(id){
    const parametros = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    return await fetch(`https://autopass.loca.lt/traer/equipo/${id}`, parametros)
        .then(response => {
            let json = response.json()
            return json
            .then(a =>{
                return a 
            })
            
        })
        .catch(console.log)
}

async function traerPedido(){
    const parametros = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    return await fetch(`https://autopass.loca.lt/traer/pedido/activo`, parametros)
        .then(response => {
            let json = response.json()
            return json
            .then(a =>{
                return a
            })
            
        })
        .catch(console.log)
}

async function agregarEquipoAlPedido(equipo,pedido){
    const pedidoEquipo = {
        "pedido": pedido,
        "equipo": equipo,
    }
    const parametros = {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(pedidoEquipo),
        json: true,
    }
    await fetch(`https://autopass.loca.lt/agregar/equipo/pedido`,parametros)
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
        ()=>{
            console.log("ya puse el equipo en el pedido")
        }
    )
}

async function agregarEquipoAlPedidoCantidad(equipo,pedido,cantidad_equipos){
    const pedidoEquipo = {
        "pedido": pedido,
        "equipo": equipo,
        "cantidad": cantidad_equipos
    }
    const parametros = {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(pedidoEquipo),
        json: true,
    }
    await fetch(`https://autopass.loca.lt/agregar/equipo/pedido/cantidad`,parametros)
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
        ()=>{
            console.log("ya puse el equipo en el pedido")
        }
    )
}

btnAgregar.addEventListener("click", async function (){
    let pedidos = await traerPedido();
    console.log(pedidos)
    let resultado = await traerEquipo(numeroEquipo);
    console.log(resultado)
    if(resultado[0].id_tipoEquipo == 1){
        agregarEquipoAlPedido(resultado[0].id_equipo, pedidos[0].id_pedido)
        alert("Equipo Ingresado")
    }else{
        agregarEquipoAlPedidoCantidad(resultado[0].id_equipo, pedidos[0].id_pedido, iptCantidad.value)
        alert("Equipo Ingresado")
       
    }

});



(async function(){
    let resultado = await traerEquipo(numeroEquipo)
    console.log(resultado)
    if(resultado.length > 0){
        titulo.innerHTML = 'Estas ingresando el equipo ' + resultado[0].nombre
    }
    else{
        console.log("estoy vacio")
        titulo.innerHTML = 'No estas ingresando ningun equipo'
    }
    //titulo.innerHTML = 'Estas ingresando el equipo ' + resultado[0].nombre
    if(resultado[0].id_tipoEquipo == 2){
       divCantidad.classList.remove('display-none');
    }

})()