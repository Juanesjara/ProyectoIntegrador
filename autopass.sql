-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2022 a las 08:02:44
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autopass`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `id_tipoEquipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id_equipo`, `nombre`, `color`, `id_tipoEquipo`) VALUES
(1, 'Concretadora', 'Verde', 1),
(2, 'Pulidora', 'Roja', 1),
(3, 'Cercha', 'roja', 2),
(4, 'Taladro', 'amarillo', 2),
(5, 'Ipad', 'Morado', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadospedido`
--

CREATE TABLE `estadospedido` (
  `id_estado` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadospedido`
--

INSERT INTO `estadospedido` (`id_estado`, `nombre`) VALUES
(1, 'iniciado'),
(2, 'activo'),
(3, 'finalizado'),
(4, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra`
--

CREATE TABLE `obra` (
  `id_obra` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `obra`
--

INSERT INTO `obra` (`id_obra`, `nombre`, `id_empresa`) VALUES
(1, 'Eafit ciencias', 1),
(2, 'cc viva envigado', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_obra` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_obra`, `fecha_inicio`, `fecha_fin`, `estado`) VALUES
(5, 0, '2022-08-06', '0000-00-00', 4),
(8, 0, '2022-08-06', '0000-00-00', 0),
(9, 0, '2022-08-06', '0000-00-00', 4),
(10, 0, '2022-08-06', '0000-00-00', 0),
(11, 0, '2022-08-06', '0000-00-00', 4),
(12, 0, '2022-08-06', '0000-00-00', 0),
(19, 0, '2022-08-12', '0000-00-00', 4),
(20, 0, '2022-08-12', '0000-00-00', 4),
(21, 0, '2022-09-13', '0000-00-00', 4),
(22, 0, '2022-09-25', '0000-00-00', 4),
(23, 0, '2022-09-26', '0000-00-00', 4),
(24, 0, '2022-09-26', '0000-00-00', 4),
(25, 0, '2022-09-26', '0000-00-00', 4),
(26, 0, '2022-09-26', '0000-00-00', 4),
(27, 0, '2022-10-12', '0000-00-00', 4),
(28, 0, '2022-10-16', '0000-00-00', 4),
(29, 0, '2022-10-16', '0000-00-00', 4),
(30, 0, '2022-10-16', '0000-00-00', 4),
(31, 0, '2022-10-16', '0000-00-00', 4),
(32, 0, '2022-10-17', '0000-00-00', 4),
(33, 0, '2022-10-17', '0000-00-00', 4),
(34, 0, '2022-10-17', '0000-00-00', 4),
(35, 0, '2022-10-18', '0000-00-00', 2),
(36, 0, '2022-10-18', '0000-00-00', 4),
(37, 0, '2022-10-18', '0000-00-00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosequipo`
--

CREATE TABLE `pedidosequipo` (
  `id_pedido` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `cantidad_equipos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidosequipo`
--

INSERT INTO `pedidosequipo` (`id_pedido`, `id_equipo`, `cantidad_equipos`) VALUES
(1, 2, NULL),
(1, 1, NULL),
(1, 2, NULL),
(1, 3, 5),
(1, 4, NULL),
(34, 1, NULL),
(34, 1, NULL),
(34, 3, 10),
(34, 5, 2),
(34, 2, NULL),
(34, 4, 5),
(35, 4, 5),
(35, 4, 5),
(35, 3, 10),
(35, 5, 7),
(37, 5, 80);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoequipo`
--

CREATE TABLE `tipoequipo` (
  `id_tipoEquipo` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipoequipo`
--

INSERT INTO `tipoequipo` (`id_tipoEquipo`, `nombre`) VALUES
(1, 'Enconfrado'),
(2, 'Electromecanico');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `estadospedido`
--
ALTER TABLE `estadospedido`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`id_obra`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `tipoequipo`
--
ALTER TABLE `tipoequipo`
  ADD PRIMARY KEY (`id_tipoEquipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estadospedido`
--
ALTER TABLE `estadospedido`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `obra`
--
ALTER TABLE `obra`
  MODIFY `id_obra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `tipoequipo`
--
ALTER TABLE `tipoequipo`
  MODIFY `id_tipoEquipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
