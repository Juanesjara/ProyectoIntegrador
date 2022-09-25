-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2022 at 08:03 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autopass`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipo`
--

CREATE TABLE `equipo` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `id_tipoEquipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipo`
--

INSERT INTO `equipo` (`id_equipo`, `nombre`, `color`, `id_tipoEquipo`) VALUES
(1, 'Concretadora', 'Verde', 1),
(2, 'Pulidora', 'Roja', 1),
(3, 'cercha', 'roja', 2);

-- --------------------------------------------------------

--
-- Table structure for table `estadospedido`
--

CREATE TABLE `estadospedido` (
  `id_estado` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estadospedido`
--

INSERT INTO `estadospedido` (`id_estado`, `nombre`) VALUES
(1, 'iniciado'),
(2, 'activo'),
(3, 'finalizado'),
(4, 'Cancelado');

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_obra` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_obra`, `fecha_inicio`, `fecha_fin`, `estado`) VALUES
(5, 0, '2022-08-06', '0000-00-00', 0),
(8, 0, '2022-08-06', '0000-00-00', 0),
(9, 0, '2022-08-06', '0000-00-00', 0),
(10, 0, '2022-08-06', '0000-00-00', 0),
(11, 0, '2022-08-06', '0000-00-00', 0),
(12, 0, '2022-08-06', '0000-00-00', 0),
(19, 0, '2022-08-12', '0000-00-00', 4),
(20, 0, '2022-08-12', '0000-00-00', 4),
(21, 0, '2022-09-13', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pedidosequipo`
--

CREATE TABLE `pedidosequipo` (
  `id_pedido` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `cantidad_equipos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pedidosequipo`
--

INSERT INTO `pedidosequipo` (`id_pedido`, `id_equipo`, `cantidad_equipos`) VALUES
(1, 2, NULL),
(1, 2, NULL),
(1, 2, NULL),
(1, 2, NULL),
(1, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tipoequipo`
--

CREATE TABLE `tipoequipo` (
  `id_tipoEquipo` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indexes for table `estadospedido`
--
ALTER TABLE `estadospedido`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indexes for table `tipoequipo`
--
ALTER TABLE `tipoequipo`
  ADD PRIMARY KEY (`id_tipoEquipo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `estadospedido`
--
ALTER TABLE `estadospedido`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tipoequipo`
--
ALTER TABLE `tipoequipo`
  MODIFY `id_tipoEquipo` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
