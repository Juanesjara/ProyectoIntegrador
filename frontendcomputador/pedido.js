
let pedido = sessionStorage.getItem("pedido");
let subtitulo = document.getElementById("subtitulo");
let selectObras = document.getElementById("obras");
subtitulo.innerHTML = "Estas Creado el pedido #" + pedido;
let parent = document.getElementById("parent")
let equiposPuestos = []
let btnConfirmar = document.getElementById("btnConfirmar");

async function confirmarPedido(){
    const parametros = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    return await fetch(`http://localhost:4000/confirmar/pedido`,parametros)
        .then(response => {
            let json = response.json()
            return json
            .then(a =>{
                return a 
            })
            
        })
        .catch(console.log)
}

btnConfirmar.addEventListener("click", async function(){
    let respuesta = await confirmarPedido();
    alert(respuesta.mensaje)
    window.location.href = "./principal.html"

})



async function traerEquipo(id){
    const parametros = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    return await fetch(`http://localhost:4000/traer/equipo/${id}`, parametros)
        .then(response => {
            let json = response.json()
            return json
            .then(a =>{
                return a 
            })
            
        })
        .catch(console.log)
}

async function traerEquiposPedido(id){
    const parametros = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return await fetch(`http://localhost:4000/traer/equipos/pedido/${id}`, parametros)
        .then(response => {
            let json = response.json()
           
            return json
        })
        .then(data => {
                console.log(data)
                return data
            }
        )
        .catch(error => {
            console.log(error, 'error')
            
        })
}

async function colocandoEquiposPedido(){
    let equipos = await traerEquiposPedido(pedido);
    if(equiposPuestos.join() != equipos.join()){
        parent.innerHTML = ""
        equiposPuestos = []
        for(let i = 0 ; i <equipos.length ; i++){
            let equipo = await traerEquipo(equipos[i].id_equipo)
            console.log("soy el equipo", equipo)
            let h3 = document.createElement("h3");
            h3.innerHTML = equipo[0].nombre
            parent.appendChild(h3)
            let p = document.createElement("p");
            if(equipos[i].cantidad_equipos == null){
                p.innerHTML  = "1"
            }else{
                p.innerHTML = equipos[i].cantidad_equipos
            }
            parent.appendChild(p)
            let a = document.createElement("a");
            a.classList.add("perso","u-border-none", "u-btn","u-btn-round", "u-button-style", "u-custom-item","u-hover-palette-1-light-1","u-palette-2-base", "u-radius-50","u-btn-2")
            let b = document.createElement("b");
            b.innerHTML = "X"
            a.appendChild(b)
            parent.appendChild(a)
            equiposPuestos.push(equipos[i])
        }
    }else{
        console.log("ya puse todos los equipos")
    }
}








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

setInterval(colocandoEquiposPedido,2000);