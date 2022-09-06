const express = require('express');
const compression = require('compression');
const server = express();
const sequelize = require('./connection.js');
const cors = require('cors');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

server.use(express.static("./../celular"))

server.use("/imagenes",express.static("./../imagenes"))

server.put("/finalizar/pedido", jsonParser, (req,res) =>{
  const {id_pedido,fecha_fin} = req.body;

  sequelize.query("UPDATE `pedido` SET `fecha_fin` = ? WHERE `pedido`.`id_pedido` = ?",{
    replacements: [fecha_fin, id_pedido],
    type: sequelize.QueryTypes.UPDATE
  })
  .then(() => {
    res.status(200).json({
      mensaje: "Pedido iniciado"
    })
  })
  .catch(error => {
    console.log(error, 'error')
  })
})


server.post("/crear/pedido", jsonParser, (req,res) =>{
  const {id_obra,fecha_inicio} = req.body;

  sequelize.query("INSERT INTO pedido (id_obra, fecha_inicio) VALUE(?,?)",{
    replacements: [id_obra,fecha_inicio],
    type: sequelize.QueryTypes.INSERT
  })
  .then(() => {
    res.status(200).json({
      mensaje: "Pedido iniciado"
    })
  })
  .catch(error => {
    console.log(error, 'error')
  })
})

server.post('/agregarEquipo',jsonParser, (req, res) => {
  const {
    nombre,
    color,
    tipo
  } = req.body;
  
  sequelize.query("INSERT INTO equipo (nombre, color, id_tipoEquipo) VALUE(?,?,?)", {
      replacements: [nombre, color, tipo],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto equipo ingresado"
      })
    })
    .catch(error => {
      console.log(error, 'error')
     
  })
})

server.get("/traer/equipo/:id",jsonParser, (req, res) => {
  const{
    id
  } = req.params;
  sequelize.query("SELECT * FROM `equipo` WHERE `id_equipo` = ? ",{
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  })
  .then(equipo =>{
    res.status(200).json(equipo)
  })
  .catch(error =>{
    console.log(error, "error")
  })

})

server.post('/agregar/equipos/pedido',jsonParser, (req, res) => {
    const {
      id_pedido,
      id_equipo
    } = req.body;
    
    sequelize.query("INSERT INTO pedidosequipo (id_pedido, id_equipo) VALUE(?,?)", {
        replacements: [id_pedido, id_equipo],
        type: sequelize.QueryTypes.INSERT
      })
      .then(() => {
        res.status(200).json({
          mensaje: "Equipo puesto en el pedido"
        })
      })
      .catch(error => {
        console.log(error, 'error')
       
    })
})






server.listen(4000, "0.0.0.0" ,function () {
    console.log('ya estoy corriendo mi bro en el 4000')
});