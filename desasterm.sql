-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2024 at 03:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desasterm`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `img` varchar(255) NOT NULL,
  `id` int(100) NOT NULL,
  `discription` varchar(25) NOT NULL,
  `likes` int(20) NOT NULL DEFAULT 0,
  `sellerID` int(170) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`img`, `id`, `discription`, `likes`, `sellerID`) VALUES
('new.jpg', 0, 'nice', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `dadmin`
--

CREATE TABLE `dadmin` (
  `name` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dadmin`
--

INSERT INTO `dadmin` (`name`, `place`, `password`, `Image`, `id`) VALUES
('anaz', 'kollam', '123', 'new.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `disaster`
--

CREATE TABLE `disaster` (
  `place` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `userId` varbinary(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` int(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disaster`
--

INSERT INTO `disaster` (`place`, `photo`, `type`, `userId`, `userName`, `name`, `id`) VALUES
('kochi', 'Screenshot_26-2-2024_9344_edrawmax.wondershare.com.jpeg', 'Flood', 0x31, 'anaz', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `roots`
--

CREATE TABLE `roots` (
  `image` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skills` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skills`, `email`, `name`, `id`) VALUES
('jumbing', 'anazksunil2@gmail.com', '878787876', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(170) NOT NULL,
  `mobile` varchar(170) NOT NULL,
  `userName` varchar(170) NOT NULL,
  `place` varchar(170) NOT NULL,
  `id` int(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `cpassword` varchar(26) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `mobile`, `userName`, `place`, `id`, `password`, `cpassword`, `status`, `type`) VALUES
('anazksunil2@gmail.com', '878788900', 'anaz', 'kochi', 1, '123', '123', 'pending', 'user'),
('akashraveendran1611@gmail.com', '9099898767', 'akash', 'kochi', 3, '123', '123', 'pending', 'volunteer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dadmin`
--
ALTER TABLE `dadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disaster`
--
ALTER TABLE `disaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roots`
--
ALTER TABLE `roots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dadmin`
--
ALTER TABLE `dadmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `disaster`
--
ALTER TABLE `disaster`
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roots`
--
ALTER TABLE `roots`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
