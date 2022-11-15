let btnGuardar = document.getElementById("guardar")
let marker;
let iptNombre = document.getElementById("nombre")
let selectClientes = document.getElementById("obras");
function initMap() {
    const myLatlng = {
        lat: 6.217,
        lng: -75.567
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
        marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Click to zoom",
    });

    map.addListener("click", (e) => {
        ponerMarcador(e.latLng, map)
    })

    function ponerMarcador(LatLng, map) {
        marker.setPosition(LatLng);

    }

    marker.addListener("click", () => {
        map.setZoom(14);
        map.setCenter(marker.getPosition());
    });
}

btnGuardar.addEventListener("click", () => {
    let nombre = iptNombre.value;
    let id_empresa = selectClientes.value;
    let coordenadas = marker.getPosition().toString()
    creandoObra(nombre, id_empresa, coordenadas)
    alert("Obra agregada con exito")
    window.location.href = "./Clientes.html"
})
window.initMap = initMap;


(async function colcandoClientes(){
    let clientes = await trayendoClientes();
    console.log(clientes)
    for(let i = 0; i < clientes.length; i++){
        let option = document.createElement("option");
        option.setAttribute("value", clientes[i].id_empresa );
        option.innerHTML = clientes[i].nombre
        selectClientes.appendChild(option);
    }
})()

async function trayendoClientes(){
    const parametros = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return await fetch(`http://localhost:4000/traer/empresas`, parametros)
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

async function creandoObra(nombre,id_empresa, coordenadas){
    const obra = {
        nombre: nombre,
        id_empresa: id_empresa,
        coordenadas: coordenadas
    }
    const parametros = {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(obra),
        json: true
    }

    return await fetch(`http://localhost:4000/crear/obra`, parametros)
    .then(response =>{
        let json = response.json()
        return json
    })
    .then(data =>{
        
        return data
    })
    .catch(console.log)
}