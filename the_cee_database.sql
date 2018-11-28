-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 23 nov 2018 om 14:38
-- Serverversie: 10.1.29-MariaDB
-- PHP-versie: 7.2.0

CREATE DATABASE the_cee_database;
USE the_cee_database;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql7267229`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `companies`
--

INSERT INTO `companies` (`id`, `name`, `description`) VALUES
  (1, 'The CeeSpot', 'A community like no other located in Enschede');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `prefix` varchar(5) NOT NULL,
  `first_name` varchar(42) NOT NULL,
  `insertions` varchar(30) DEFAULT NULL,
  `last_name` varchar(42) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(125) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `prefix`, `first_name`, `insertions`, `last_name`, `address`, `zipcode`, `city`, `country`, `active`) VALUES
  (2, 'password@pass.com', 'waro', '$2a$10$PQcm1jXJ/I51nvadw7H8Y.yfp/TEYFtE8ouoZsIdDFZ1jzJe68fr6', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0),
  (3, '123password@pass.com', 'waro123', '$2a$10$m6RxhGxk4696pV3/aw6A1u7H8t9UXKPSTwjhDkT3im.GcVp56dm1K', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0),
  (4, '123password@pass.com', 'waro1234', '$2a$10$zwOP9LwntTLZCJbunuYmNOGOMwMPjFtWyeuQDAvLJ4DLxnI.lrHzi', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0),
  (5, '123password@pass.com', 'waro12345', '$2a$10$BOCdAvC1k7m.mGRXMjySh.NJ6Vajupxtia3CSVSEiOw0PCFGGjhGK', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0),
  (6, '123password@pass.com', 'waro123456', '$2a$10$CdKgKBB8/Y8n72dLkeEyFe5oDf.BXpqXnvpcNwR6W2DKll87RvwVO', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0),
  (7, '123password@pass.com', 'waro1234567', '$2a$10$nmLBln74F45T1psqhK6R/enpPuP1p39UFSUpp/LsA/be5rK/ZcZrO', 'Dhr', 'Albert', NULL, 'Einstein', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_companies`
--

CREATE TABLE `user_companies` (
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user_companies`
--

INSERT INTO `user_companies` (`user_id`, `company_id`) VALUES
  (6, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user_roles`
--

INSERT INTO `user_roles` (`id`, `name`) VALUES
  (1000, 'guest user'),
  (2000, 'fellow'),
  (3000, 'partner'),
  (4000, 'standard user'),
  (5000, 'admin');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_user_roles`
--

CREATE TABLE `user_user_roles` (
  `user_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user_user_roles`
--

INSERT INTO `user_user_roles` (`user_id`, `user_role_id`) VALUES
  (2, 1000),
  (3, 1000),
  (4, 1000),
  (5, 1000),
  (6, 1000),
  (7, 1000);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
