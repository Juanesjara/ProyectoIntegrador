
let inputNombre = document.getElementById("nombre")
let inputColor = document.getElementById("color")
let inputTipo = document.getElementById("tipoEquipo")
let btnRegistrarEquipo = document.getElementById("registrarEquipo")

function guardarEquipo(nombre, color, tipo) {
    const nuevoEquipo = {
        "nombre": nombre,
        "color": color,
        "tipo": tipo
    }
    const parametros = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEquipo),
        json: true,
    }
    
    fetch(`http://localhost:4000/agregarEquipos`, parametros)
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
                alertify.message(data.mensaje);
                let mensaje = document.getElementsByClassName("ajs-message")[0];
                mensaje.style.background = "#1D72C2"
                mensaje.style.color = "white"
                /*setTimeout(function () {
                    document.location.reload();
                }, 2000);*/
            }
        )
        .catch(error => {
            console.log(error, 'error')
            alertify.alert(error.mensaje);
        })
}


btnRegistrarEquipo.addEventListener("click", function () {
   
    guardarEquipo(inputNombre.value, inputColor.value, inputTipo.value)
})