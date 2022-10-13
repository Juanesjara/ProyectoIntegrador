let valores = window.location.search;
console.log(valores)
const urlParams = new URLSearchParams(valores);
var numeroEquipo = urlParams.get('equipo');
//console.log(numeroEquipo) eso es null
let titulo = document.getElementById("titulo")
let divCantidad = document.getElementById("divCantidad")
let btnAgregar = document.getElementById("btnAgregar");



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
                console.log(a)
                return a
            })
            
        })
        .catch(console.log,)
}


btnAgregar.addEventListener("click", async function (){
    let pedidos = await traerPedido();
    console.log(pedidos)
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