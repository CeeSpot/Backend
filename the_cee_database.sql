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
  (0, 'The CeeSpot', 'A community like no other located in Enschede');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tags`
--

CREATE TABLE `tags` (
  `id` int(10) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `tags`
--

INSERT INTO `tags` (`id`, `description`) VALUES
  (1, 'PHP'),
  (2, 'JavaScript');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `prefix` varchar(5) DEFAULT NULL,
  `first_name` varchar(42) NOT NULL,
  `insertions` varchar(30) DEFAULT NULL,
  `last_name` varchar(42) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(125) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `phone` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `prefix`, `first_name`, `insertions`, `last_name`, `description`, `address`, `zipcode`, `city`, `country`, `active`, `phone`) VALUES
  (1, 'testuser@live.com', 'Superuserrr', 'testpassword', '', 'Test', NULL, 'User', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'teststraat', '1234AK', 'Testdorp', 'Testcountry', 1, 612345678),
  (2, 'password@pass.com', 'waro', '$2a$10$PQcm1jXJ/I51nvadw7H8Y.yfp/TEYFtE8ouoZsIdDFZ1jzJe68fr6', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (3, '123password@pass.com', 'waro123', '$2a$10$m6RxhGxk4696pV3/aw6A1u7H8t9UXKPSTwjhDkT3im.GcVp56dm1K', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (4, '123password@pass.com', 'waro1234', '$2a$10$zwOP9LwntTLZCJbunuYmNOGOMwMPjFtWyeuQDAvLJ4DLxnI.lrHzi', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (5, '123password@pass.com', 'waro12345', '$2a$10$BOCdAvC1k7m.mGRXMjySh.NJ6Vajupxtia3CSVSEiOw0PCFGGjhGK', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (6, '123password@pass.com', 'waro123456', '$2a$10$CdKgKBB8/Y8n72dLkeEyFe5oDf.BXpqXnvpcNwR6W2DKll87RvwVO', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (7, '123password@pass.com', 'waro1234567', '$2a$10$nmLBln74F45T1psqhK6R/enpPuP1p39UFSUpp/LsA/be5rK/ZcZrO', 'Dhr', 'Albert', NULL, 'Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.', 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (8, 'password@me.com', 'username', '$2a$10$iG4M9pq/Y1cRR.6z9b3EmOTmq8W4MNRbcXtpkznLzIuW0XXwu1Z6q', NULL, 'as', 'as', 'as', NULL, NULL, NULL, NULL, NULL, 0, NULL),
  (9, '123password@pass.com', 'waro12345678', '$2a$10$BqaqcAilkMqwojo.Ittnke58hejqHwckiLp7G9hXD4UgXEFoxi5kC', 'Dhr', 'Albert', NULL, 'Einstein', NULL, 'Quicksilverstreet 15', '1238 AB', 'Goor', 'The Netherlands', 0, NULL),
  (10, 'r.greven@saxion.nl', 'rgreven', '$2a$10$1RRXSdsAYdwYI9tQnwTkfuZvkaVbPI7LXKy7eYchTIq7T27ck31Yy', NULL, 'Ruud', '.', 'Greven', NULL, NULL, NULL, NULL, NULL, 0, NULL);

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
-- Tabelstructuur voor tabel `user_tags`
--

CREATE TABLE `user_tags` (
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user_tags`
--

INSERT INTO `user_tags` (`user_id`, `tag_id`) VALUES
  (6, 1),
  (6, 2),
  (8, 1);

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
  (7, 1000),
  (8, 1000),
  (9, 1000),
  (10, 1000);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `tags`
--
ALTER TABLE `tags`
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
-- AUTO_INCREMENT voor een tabel `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
