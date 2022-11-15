let parent = document.getElementById("parent");
let anadir = document.getElementById("anadir");
let botones = document.getElementsByClassName("boton");

async function traerEmpresas(){
    const parametros = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        json: true
    }
    return await fetch(`http://localhost:4000/traer/empresas`, parametros)
        .then(response => {
            let json = response.json()
          
            return json
            .then(a =>{
                return a 
            })
            
        })
        .catch(console.log)
}

async function traerObra(id){
    const empresa = {
        id_empresa : id
    }
    const parametros = {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(empresa),
        json: true
    }

    return await fetch(`http://localhost:4000/traer/obras`,parametros)
        .then(response =>{
            let json = response.json()
          
            return json
            .then(a =>{
                
                return a
            })
        })
        .catch(console.log)
}

(async function colocandoEmpresasObras(){
    let empresas = await traerEmpresas();
    console.log(empresas)
    for(let i = 0 ; i < empresas.length ; i++){
        let empresadiv = document.createElement("div")
        empresadiv.classList.add("empresa")
        let tituloEmpresa = document.createElement("h4")
        tituloEmpresa.innerHTML = empresas[i].nombre
        let linea = document.createElement("div")
        linea.classList.add("linea")
        let ulEmpresa = document.createElement("ul")
        
        let obras = await traerObra(empresas[i].id_empresa);
     
        for(let j = 0 ; j < obras.length ; j++){
            let liObra = document.createElement("li")
            liObra.innerHTML = obras[j].nombre
            ulEmpresa.appendChild(liObra)
        }
        let boton = document.createElement("button")
        boton.classList.add("boton")
        boton.setAttribute("data", empresas[i].id_empresa)
        boton.innerHTML = "Añadir otra Obra"
        boton.addEventListener("click",accionBotonObra)
        empresadiv.appendChild(tituloEmpresa)
        empresadiv.appendChild(linea)
        empresadiv.appendChild(ulEmpresa)
        empresadiv.appendChild(boton)
        parent.insertBefore(empresadiv, anadir )


    }
})()

function accionBotonObra(){
    window.location.href = "./ingresarObra.html"
}