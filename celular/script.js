let valores = window.location.search;
console.log(valores)
const urlParams = new URLSearchParams(valores);
var numeroEquipo = urlParams.get('equipo');
console.log(numeroEquipo)


function traerEquipo(id){
    const parametros = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    fetch(`https://autopass.loca.lt/traer/equipo/${id}`, parametros)
        .then(response => {
            let json = response.json()
            .then(a =>{
                if (response.ok) {
                    console.log(a)
                    return a
                } else {
                    return json.then(err => {
                        console.log(err)
                        throw err
                    })
                }
            })
            
        })
        .catch(console.log)
}


traerEquipo(numeroEquipo)