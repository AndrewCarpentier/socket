-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 26 juin 2023 à 20:24
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `socket`
--

-- --------------------------------------------------------

--
-- Structure de la table `channel`
--

CREATE TABLE `channel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `channel`
--

INSERT INTO `channel` (`id`, `name`, `idUser`) VALUES
(1, 'CDA23', 1),
(2, 'test', 1),
(3, 'test2', 1),
(38, 'kxso', 1);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `creationDate` datetime NOT NULL,
  `gif` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idChannel` int(11) NOT NULL,
  `private` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `message`, `creationDate`, `gif`, `idUser`, `idChannel`, `private`) VALUES
(24, 'https://media.tenor.com/pioJTCSFe78AAAAC/the-simpsons-homer.gif', '2023-06-08 15:31:27', 1, 1, 1, 0),
(86, 'https://media.tenor.com/3QhOPLGp9sUAAAAC/tennisgifs-tennis.gif', '2023-06-12 09:54:11', 1, 1, 1, 0),
(87, 'test', '2023-06-12 09:54:14', 0, 1, 1, 0),
(88, 'test', '2023-06-12 09:55:32', 0, 1, 1, 0),
(89, 'https://media.tenor.com/hrg1biY9FbsAAAAC/awesome-minions.gif', '2023-06-12 09:55:41', 1, 1, 1, 0),
(90, 'test', '2023-06-12 09:56:25', 0, 1, 1, 0),
(91, 'test', '2023-06-12 09:56:45', 0, 1, 2, 0),
(92, 'test', '2023-06-12 10:01:31', 0, 1, 1, 0),
(93, 'andrew', '2023-06-12 10:01:35', 0, 1, 2, 0),
(94, 'test', '2023-06-12 10:45:20', 0, 1, 1, 0),
(95, 'dsqdsq', '2023-06-12 10:46:11', 0, 1, 1, 0),
(96, 'test', '2023-06-12 11:18:42', 0, 1, 2, 0),
(97, 'test', '2023-06-12 11:44:24', 0, 1, 2, 1),
(98, 'test', '2023-06-12 11:49:08', 0, 1, 1, 0),
(99, 'andrew', '2023-06-12 11:49:14', 0, 1, 2, 0),
(100, 'test', '2023-06-12 11:50:10', 0, 1, 2, 0),
(101, 'dqdqds', '2023-06-12 11:50:30', 0, 1, 2, 0),
(102, 'test', '2023-06-12 11:52:33', 0, 1, 1, 0),
(103, 'test', '2023-06-12 11:52:36', 0, 1, 2, 0),
(104, 'test', '2023-06-12 11:55:17', 0, 1, 1, 0),
(105, 'test', '2023-06-12 11:55:21', 0, 1, 2, 0),
(106, 'andrew', '2023-06-12 11:55:52', 0, 1, 1, 0),
(107, 'test', '2023-06-12 12:56:35', 0, 1, 2, 1),
(108, 'test', '2023-06-12 12:56:54', 0, 1, 3, 1),
(109, 'test', '2023-06-12 12:57:19', 0, 1, 4, 1),
(110, 'test', '2023-06-12 12:57:31', 0, 1, 4, 1),
(111, 'andrew', '2023-06-12 12:57:47', 0, 1, 2, 1),
(112, 'andrex', '2023-06-12 12:58:42', 0, 2, 2, 1),
(113, 'test', '2023-06-12 12:59:36', 0, 2, 2, 1),
(114, 'test', '2023-06-12 12:59:39', 0, 1, 2, 1),
(115, 'andrew', '2023-06-12 12:59:44', 0, 1, 2, 1),
(116, 'test', '2023-06-12 13:05:28', 0, 1, 2, 1),
(117, 'andrew', '2023-06-12 13:05:47', 0, 2, 2, 1),
(118, 'test', '2023-06-12 13:05:56', 0, 2, 2, 1),
(119, 'test', '2023-06-12 13:05:59', 0, 1, 2, 1),
(120, 'andrew', '2023-06-12 13:06:05', 0, 1, 2, 1),
(121, 'test', '2023-06-12 13:06:20', 0, 2, 2, 1),
(122, 'test', '2023-06-12 15:34:58', 0, 1, 2, 1),
(123, 'test', '2023-06-12 15:36:30', 0, 1, 1, 0),
(124, 'andrew', '2023-06-12 15:36:33', 0, 1, 1, 0),
(125, 'test', '2023-06-12 15:36:51', 0, 1, 2, 1),
(126, 'test', '2023-06-12 15:37:18', 0, 1, 6, 1),
(127, 'test', '2023-06-12 15:40:49', 0, 1, 4, 1),
(128, 'test', '2023-06-12 15:41:48', 0, 1, 3, 1),
(129, 'test', '2023-06-12 15:42:05', 0, 1, 3, 0),
(130, 'test', '2023-06-12 15:43:18', 0, 1, 1, 0),
(131, 'test', '2023-06-12 15:43:21', 0, 1, 3, 0),
(132, 'andrew', '2023-06-12 15:43:27', 0, 1, 2, 1),
(133, 'tet', '2023-06-12 15:47:15', 0, 1, 2, 1),
(134, 'test', '2023-06-12 15:47:21', 0, 1, 6, 1),
(135, 'ad', '2023-06-12 15:47:23', 0, 1, 6, 1),
(136, 'andrew', '2023-06-12 15:51:40', 0, 2, 2, 1),
(137, 'test', '2023-06-12 15:51:55', 0, 1, 2, 1),
(138, 'andrew', '2023-06-12 15:55:07', 0, 2, 2, 1),
(139, 'test', '2023-06-12 15:55:36', 0, 2, 2, 1),
(140, 'aa', '2023-06-12 15:55:51', 0, 2, 2, 1),
(141, 'test', '2023-06-12 16:00:57', 0, 2, 2, 1),
(142, 'andrew', '2023-06-12 16:01:18', 0, 1, 2, 1),
(143, 'test', '2023-06-12 16:02:22', 0, 2, 2, 1),
(144, 'abdrew', '2023-06-12 16:02:32', 0, 1, 2, 1),
(145, 'hfdgdf', '2023-06-12 16:02:49', 0, 1, 2, 1),
(146, 'dsqdqs', '2023-06-12 16:04:11', 0, 2, 2, 1),
(147, 'dsqdq', '2023-06-12 16:04:17', 0, 1, 2, 1),
(148, 'aaa', '2023-06-12 16:04:20', 0, 1, 2, 1),
(149, 'qdqd', '2023-06-12 16:04:26', 0, 1, 2, 1),
(150, 'qq', '2023-06-12 16:04:30', 0, 1, 2, 1),
(151, 'qq', '2023-06-12 16:04:32', 0, 2, 2, 1),
(152, 'dgdfg', '2023-06-12 16:04:43', 0, 1, 2, 1),
(153, 'https://media.tenor.com/XUAONVsG6qIAAAAC/leonardo-dicaprio-clapping.gif', '2023-06-12 16:05:54', 1, 1, 2, 0),
(154, 'https://media.tenor.com/93e_69nL7JYAAAAC/clap.gif', '2023-06-12 16:11:33', 1, 2, 1, 0),
(155, 'https://media.tenor.com/XUAONVsG6qIAAAAC/leonardo-dicaprio-clapping.gif', '2023-06-12 16:12:44', 1, 2, 2, 1),
(156, 'https://media.tenor.com/eakdFd6OoHcAAAAC/frickin-awesome.gif', '2023-06-12 16:12:55', 1, 2, 1, 0),
(157, 'fdsqfds', '2023-06-15 01:49:14', 0, 1, 4, 0),
(158, 'ad', '2023-06-26 14:50:59', 0, 1, 6, 1),
(159, 'test', '2023-06-26 14:51:01', 0, 1, 6, 1),
(160, 'test', '2023-06-26 14:54:44', 0, 6, 1, 0),
(161, 'tst', '2023-06-26 17:20:11', 0, 6, 6, 1),
(162, 'sd', '2023-06-26 17:20:44', 0, 6, 11, 1),
(163, 'andrew', '2023-06-26 17:31:32', 0, 1, 6, 1),
(164, 'test', '2023-06-26 18:46:00', 0, 1, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `private_channel`
--

CREATE TABLE `private_channel` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idUser2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `private_channel`
--

INSERT INTO `private_channel` (`id`, `idUser`, `idUser2`) VALUES
(2, 2, 1),
(3, 1, 3),
(4, 1, 5),
(5, 1, 7),
(6, 1, 6),
(7, 1, 8),
(8, 6, 3),
(9, 6, 5),
(10, 1, 9),
(11, 6, 9);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idSocket` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `pseudo`, `password`, `idSocket`) VALUES
(1, 'test@test.fr', 'test', '$2b$10$4DYXf2jMelBy.xBiAEs.bubWh6rq/YZSN/pYPQ0fjOv6amAnns.3i', ''),
(2, 'test2@test.fr', 'test2', '$2b$10$vZ9tyJlfuYztzWYeQfoY1ur1ndE72DGBRVXv19gQLgsdN14qdoAG2', ''),
(3, 'test3@test.fr', 'test3', '$2b$10$iYd9CC0HK.HFM44flb/Uku/NRwBa/HIWbybVVgq.Jq2ErEPS/xRIq', ''),
(5, 'test4@test.fr', 'test4', '$2b$10$IGpl5YD8bc6hDQ69z3udv.YGJ7qEKgbXj8BzlFdQtiYpga0phe0Hu', ''),
(6, 'andrew@gmail.com', 'andrew', '$2b$10$KDJdOeKAcLBu2uvWpoprZ.qHhyizblfcvxA9W2qyJbTJJzpuenfUO', ''),
(7, 'g@g.f', 'guillaume', '$2b$10$UX7QaYvfTUp25.ZcyUBTye/ko7ESuS7nrKcWX3zeBqWFmGMytNUtO', ''),
(8, 'tyra@tyra', 'Tyra', '$2b$10$Mt54cwOSAFUPz8In9MxuwOZjTGXZgNsc8kHEM.dFeOPM7Aj1VH.v6', ''),
(9, 'test26@test', 'Stavy', '$2b$10$tQCFzFchtW9IEzgsRXJ/peVdagqk6lndEYVslwyorKK2frJh5g6dG', '');

-- --------------------------------------------------------

--
-- Structure de la table `user_channel`
--

CREATE TABLE `user_channel` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idChannel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_channel`
--

INSERT INTO `user_channel` (`id`, `idUser`, `idChannel`) VALUES
(1, 1, 1),
(3, 3, 1),
(4, 5, 1),
(5, 6, 1),
(6, 7, 1),
(7, 8, 1),
(8, 9, 1),
(9, 1, 2),
(10, 1, 3),
(11, 1, 4),
(12, 1, 5),
(13, 1, 6),
(14, 1, 10),
(15, 1, 8),
(16, 1, 9),
(17, 1, 11),
(18, 1, 12),
(19, 1, 13),
(20, 1, 14),
(21, 1, 15),
(22, 1, 16),
(23, 1, 17),
(24, 1, 18),
(25, 1, 19),
(26, 1, 20),
(27, 1, 21),
(28, 1, 22),
(29, 1, 23),
(30, 1, 24),
(31, 1, 38);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `private_channel`
--
ALTER TABLE `private_channel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_channel`
--
ALTER TABLE `user_channel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `channel`
--
ALTER TABLE `channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT pour la table `private_channel`
--
ALTER TABLE `private_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `user_channel`
--
ALTER TABLE `user_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
