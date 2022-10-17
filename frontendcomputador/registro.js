
let inputNombre = document.getElementById("name-558c")
let inputColor = document.getElementById("text-aa53")
let inputTipo = document.getElementById("text-a447")
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
    
    fetch(`http://localhost:4000/agregarEquipo`, parametros)
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
                setTimeout(function () {
                    document.location.reload();
                }, 2000);
            }
        )
        .catch(error => {
            console.log(error, 'error')
        })
}


btnRegistrarEquipo.addEventListener("click", function () {
    guardarEquipo(inputNombre.value, inputColor.value, inputTipo.value)
})