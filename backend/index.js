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

server.get("/traer/obras",jsonParser, (req,res)=>{
  sequelize.query("SELECT * FROM `obra`",{
    type: sequelize.QueryTypes.SELECT
  })
  .then(resultado =>{
    res.status(200).json(resultado)
  })
  .catch(error =>{
    console.log(error)
  })
})



server.get("/traer/pedidos", jsonParser, (req,res) =>{
  sequelize.query("SELECT * FROM `pedido`",{
    type: sequelize.QueryTypes.SELECT
  })
  .then(pedido =>{
    res.status(200).json(pedido)
  })
  .catch(error =>{
    console.log("error",error)
  })
})

server.get("/traer/pedido/activo", jsonParser, (req,res) =>{
  sequelize.query("SELECT * FROM `pedido` WHERE `estado` = 1",{
    type: sequelize.QueryTypes.SELECT
  })
  .then(pedido =>{
    res.status(200).json(pedido)
  })
  .catch(error =>{
    console.log("error",error)
  })
})

server.put("/confirmar/pedido", jsonParser, (req,res) =>{
  sequelize.query("UPDATE `pedido` SET `estado` = 2 WHERE `estado` = 1",{
    type: sequelize.QueryTypes.UPDATE
  })
  .then(() => {
    res.status(200).json({
      mensaje: "Pedido Confirmado"
    })
  })
  .catch(error => {
    console.log(error, 'error')
  })
})



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


function cancelarPedidosActivos(req,res ,next){
  sequelize.query("UPDATE `pedido` SET `estado` = 4 WHERE `estado` = 1",{
    type: sequelize.QueryTypes.UPDATE
  })
  next();
}

server.post("/crear/pedido", cancelarPedidosActivos, jsonParser, (req,res) =>{
  const {fecha_inicio} = req.body;

  //FUNCION PARA CREAR UN PEDIDO EN LA BASE DE DATOS 
  sequelize.query("INSERT INTO pedido (fecha_inicio, estado) VALUE(?,1)",{
    replacements: [fecha_inicio],
    type: sequelize.QueryTypes.INSERT
  })
  .then(pedido => {
    console.log(pedido)
    res.status(200).json({
      mensaje: "Pedido iniciado",
      resultado : pedido
    })
  })
  .catch(error => {
    console.log(error, 'error')
  })
})

server.post('/agregarEquipo', jsonParser, (req, res) => {
  console.log("si llego")
  const {
    nombre,
    color,
    tipo
  } = req.body;
  console.log(nombre,color,tipo,"xd")
  
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

server.post("/agregar/equipo/pedido", jsonParser, (req,res)=>{
  const {equipo, pedido} = req.body;
  sequelize.query("INSERT INTO `pedidosequipo`(id_pedido, id_equipo) VALUE(?,?)",{
    replacements: [pedido,equipo],
    type: sequelize.QueryTypes.INSERT
  }).then(equipos =>{
    res.status(200).json(equipos)
  })
  .catch(error =>{
    console.log(error, "error")
  })
})

server.post("/agregar/equipo/pedido/cantidad", jsonParser, (req,res)=>{
  const {equipo, pedido,cantidad} = req.body;
  sequelize.query("INSERT INTO `pedidosequipo`(id_pedido, id_equipo, cantidad_equipos) VALUE(?,?,?)",{
    replacements: [pedido,equipo,cantidad],
    type: sequelize.QueryTypes.INSERT
  }).then(equipos =>{
    res.status(200).json(equipos)
  })
  .catch(error =>{
    console.log(error, "error")
  })
})

server.get("/traer/equipos/pedido/:id", jsonParser, (req,res)=>{
 const {id} = req.params;
  sequelize.query("SELECT * FROM `pedidosequipo` WHERE `id_pedido` = ?",{
    replacements: [id], 
    type: sequelize.QueryTypes.SELECT
  })
  .then(equipos =>{
    res.status(200).json(equipos)
  })
  .catch(error =>{
    console.log(error, "error")
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
/*
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

server.post('/agregar/equipos/pedido/cantidad',jsonParser, (req, res) => {
  const {
    id_pedido,
    id_equipo,
    cantidad_equipos
  } = req.body;
  
  sequelize.query("INSERT INTO pedidosequipo (id_pedido, id_equipo, cantidad_equipos) VALUE(?,?,?)", {
      replacements: [id_pedido, id_equipo, cantidad_equipos],
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
})*/






server.listen(4000, "0.0.0.0" ,function () {
    console.log('ya estoy corriendo mi bro en el 4000')
});