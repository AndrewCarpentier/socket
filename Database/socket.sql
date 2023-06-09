-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 27 juin 2023 à 10:52
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
  `img` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `channel`
--

INSERT INTO `channel` (`id`, `name`, `img`, `idUser`) VALUES
(1, 'CDA23', 'https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg', 1),
(2, 'test', 'https://images.prismic.io/mystique/5d7c09b9-40e5-4254-ae1c-2c1cb59aa898_IMG3.jpg?auto=compress,format', 1),
(3, 'test2', 'https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg', 1),
(8, 'test3', 'https://images.prismic.io/mystique/5d7c09b9-40e5-4254-ae1c-2c1cb59aa898_IMG3.jpg?auto=compress,format', 1),
(11, 'test4', 'https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg', 1),
(13, 'test5', 'https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg', 1),
(14, 'test6', 'https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg', 1),
(30, 'zen', 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80', 1);

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
(157, 'test', '2023-06-13 10:35:19', 0, 1, 16, 0),
(158, 'dsqdq', '2023-06-13 10:37:05', 0, 1, 15, 0),
(159, 'dqdq', '2023-06-13 10:37:12', 0, 1, 19, 0),
(160, 'test', '2023-06-13 10:48:24', 0, 1, 8, 1),
(161, 'test', '2023-06-13 10:59:04', 0, 1, 25, 0),
(162, 'test', '2023-06-13 10:59:21', 0, 1, 26, 0),
(163, 'qq', '2023-06-13 10:59:26', 0, 1, 26, 0),
(164, 'test', '2023-06-13 11:03:19', 0, 1, 27, 0),
(165, 'test', '2023-06-13 11:06:26', 0, 10, 10, 1),
(166, 'test', '2023-06-15 09:00:29', 0, 2, 9, 1),
(167, 'test', '2023-06-15 09:00:29', 0, 2, 9, 1),
(168, 'test', '2023-06-15 09:00:29', 0, 2, 9, 1),
(169, 'test', '2023-06-15 09:00:29', 0, 2, 9, 1),
(170, 'a', '2023-06-15 09:00:34', 0, 2, 9, 1),
(171, 'a', '2023-06-15 09:00:34', 0, 2, 9, 1),
(172, 'a', '2023-06-15 09:00:34', 0, 2, 9, 1),
(173, 'a', '2023-06-15 09:00:34', 0, 2, 9, 1),
(174, 'h', '2023-06-15 09:00:44', 0, 2, 9, 1),
(175, 'h', '2023-06-15 09:00:44', 0, 2, 9, 1),
(176, 'fd', '2023-06-15 09:00:49', 0, 2, 1, 0),
(177, 'fd', '2023-06-15 09:00:49', 0, 2, 1, 0),
(178, 'g', '2023-06-15 09:00:56', 0, 2, 1, 0),
(179, 'a', '2023-06-15 09:00:59', 0, 2, 1, 0),
(180, 'dqsdq', '2023-06-15 09:01:02', 0, 2, 23, 0),
(181, 'test', '2023-06-15 09:01:09', 0, 2, 2, 1),
(182, 'test', '2023-06-15 09:01:09', 0, 2, 2, 1),
(183, 'test', '2023-06-15 09:01:14', 0, 2, 23, 0),
(184, 'test', '2023-06-15 09:01:14', 0, 2, 23, 0),
(185, 'a', '2023-06-15 09:02:00', 0, 2, 1, 0),
(186, 'a', '2023-06-15 09:02:00', 0, 2, 1, 0),
(187, 'a', '2023-06-15 09:03:27', 0, 2, 1, 0),
(188, 'andrew', '2023-06-15 09:03:32', 0, 2, 2, 1),
(189, 'test', '2023-06-15 10:11:10', 0, 2, 11, 0),
(190, 'test', '2023-06-15 10:11:15', 0, 2, 2, 1),
(191, 'dsqdsq', '2023-06-15 10:11:20', 0, 2, 11, 0),
(192, 'dada', '2023-06-15 10:11:26', 0, 2, 2, 1),
(193, 'daa', '2023-06-15 10:11:30', 0, 2, 1, 0),
(194, 'da', '2023-06-15 10:11:41', 0, 2, 1, 0),
(195, 'da', '2023-06-15 10:11:41', 0, 2, 1, 0),
(196, 'a', '2023-06-15 10:13:44', 0, 2, 1, 0),
(197, 'fsdfs', '2023-06-15 10:13:54', 0, 2, 1, 0),
(198, 'fsdfs', '2023-06-15 10:13:54', 0, 2, 1, 0),
(199, 'dsdq', '2023-06-15 10:14:16', 0, 2, 1, 0),
(200, 'gf', '2023-06-15 10:14:24', 0, 2, 1, 0),
(201, 'fdsfsd', '2023-06-15 10:14:58', 0, 2, 1, 0),
(202, 'https://media.tenor.com/Aind6W80t_4AAAAC/cat-kitty.gif', '2023-06-15 10:25:44', 1, 2, 2, 0),
(203, 'https://media.tenor.com/4DPkcnxDPHYAAAAC/oh-wow.gif', '2023-06-15 10:26:42', 1, 2, 16, 0),
(204, 'test', '2023-06-15 11:06:44', 0, 2, 27, 0),
(205, 'dsqdsq', '2023-06-15 11:06:47', 0, 2, 27, 0),
(206, 'test', '2023-06-15 11:15:31', 0, 2, 12, 1),
(207, 'test', '2023-06-15 11:16:24', 0, 2, 13, 1),
(208, 'test', '2023-06-15 11:16:24', 0, 2, 13, 1),
(209, 'a', '2023-06-15 11:16:33', 0, 2, 1, 0),
(210, 'h', '2023-06-15 11:16:40', 0, 2, 13, 1),
(211, 'h', '2023-06-15 11:16:40', 0, 2, 13, 1),
(212, 'h', '2023-06-15 11:16:40', 0, 2, 13, 1),
(213, 'test', '2023-06-15 11:21:10', 0, 2, 13, 1),
(214, 'test', '2023-06-15 11:21:10', 0, 2, 13, 1),
(215, 'test', '2023-06-15 11:21:30', 0, 2, 13, 1),
(216, 'test', '2023-06-15 11:21:30', 0, 2, 13, 1),
(217, 'a', '2023-06-15 11:21:45', 0, 2, 13, 1),
(218, 'test', '2023-06-15 11:23:07', 0, 2, 13, 1),
(219, 'test', '2023-06-15 11:23:07', 0, 2, 13, 1),
(220, 'a', '2023-06-15 11:23:12', 0, 2, 1, 0),
(221, 'test', '2023-06-15 11:24:34', 0, 2, 13, 1),
(222, 'test', '2023-06-15 11:24:42', 0, 2, 15, 1),
(223, 'test', '2023-06-15 11:24:54', 0, 2, 17, 0),
(224, 'dsqdsq', '2023-06-15 11:24:57', 0, 2, 17, 0),
(225, 'andrew', '2023-06-15 11:25:05', 0, 2, 29, 0),
(226, 'dsq', '2023-06-15 11:26:56', 0, 2, 1, 0),
(227, 'dsq', '2023-06-15 11:26:59', 0, 2, 12, 1),
(228, 'dsq', '2023-06-15 11:27:04', 0, 2, 11, 1),
(229, 'dsqdq', '2023-06-15 11:27:12', 0, 2, 21, 0),
(230, 'dsq', '2023-06-15 11:48:32', 0, 2, 1, 0),
(231, 'dsq', '2023-06-15 11:48:37', 0, 2, 16, 1),
(232, 'dsd', '2023-06-15 11:48:42', 0, 2, 2, 1),
(233, 'dqsdq', '2023-06-15 11:48:48', 0, 2, 18, 0),
(234, 'eae', '2023-06-15 11:48:52', 0, 2, 18, 0),
(235, 'aa', '2023-06-15 11:48:57', 0, 2, 18, 0),
(236, 'test', '2023-06-15 11:49:03', 0, 2, 20, 0),
(237, 'test', '2023-06-15 11:52:53', 0, 2, 22, 0),
(238, 'test', '2023-06-15 11:59:44', 0, 2, 24, 0),
(239, 'test', '2023-06-27 09:02:15', 0, 1, 4, 1),
(240, 'test', '2023-06-27 09:03:46', 0, 1, 1, 0),
(241, 'eez', '2023-06-27 09:08:13', 0, 11, 1, 0),
(242, 'test', '2023-06-27 09:11:18', 0, 1, 6, 1),
(243, 'test', '2023-06-27 10:29:46', 0, 12, 1, 0);

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
(8, 1, 10),
(9, 10, 2),
(10, 10, 7),
(11, 2, 8),
(12, 2, 6),
(13, 2, 7),
(14, 2, 5),
(15, 2, 9),
(16, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `idSocket` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `pseudo`, `password`, `img`, `idSocket`) VALUES
(1, 'test@test.fr', 'test', '$2b$10$4DYXf2jMelBy.xBiAEs.bubWh6rq/YZSN/pYPQ0fjOv6amAnns.3i', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFrulB6fJD8ypW94qO4gfj-qqxPtTjDznsZA&usqp=CAU', 'rG0DFY-rIuTpYdKkAAAN'),
(2, 'test2@test.fr', 'test', '$2b$10$vZ9tyJlfuYztzWYeQfoY1ur1ndE72DGBRVXv19gQLgsdN14qdoAG2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFrulB6fJD8ypW94qO4gfj-qqxPtTjDznsZA&usqp=CAU', ''),
(3, 'test3@test.fr', 'test', '$2b$10$iYd9CC0HK.HFM44flb/Uku/NRwBa/HIWbybVVgq.Jq2ErEPS/xRIq', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFrulB6fJD8ypW94qO4gfj-qqxPtTjDznsZA&usqp=CAU', ''),
(11, 'jesaispas@gmail.com', 'jesaispas', '$2b$10$ylERN8u8n71ldRTd6CeJvecNuOcpGtdm7au1wm6yIQ/nI9Lw7SRxK', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwMOK_rWQpMmrx_KoW_8paYUkpc7f-EmakQ&usqp=CAU', ''),
(12, 'andrew2@gmail.com', 'andr3w', '$2b$10$CGI6gH55w.VXtZ6fuovnR.U/6KAVjytBxADjgDr6g/bnvYRXzsKdm', 'https://www.google.fr/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png', '');

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
(2, 2, 1),
(3, 3, 1),
(4, 5, 1),
(5, 6, 1),
(6, 7, 1),
(7, 8, 1),
(8, 9, 1),
(9, 1, 2),
(10, 1, 3),
(11, 10, 1),
(12, 1, 11),
(13, 1, 12),
(14, 1, 13),
(15, 1, 14),
(16, 1, 15),
(17, 1, 16),
(18, 1, 17),
(19, 1, 18),
(20, 1, 19),
(21, 1, 20),
(22, 1, 21),
(23, 1, 22),
(24, 1, 23),
(25, 1, 24),
(26, 1, 25),
(27, 1, 26),
(28, 1, 27),
(29, 1, 8),
(30, 1, 28),
(31, 1, 29),
(32, 2, 23),
(33, 2, 11),
(34, 2, 3),
(35, 2, 19),
(36, 2, 13),
(37, 2, 8),
(38, 2, 14),
(39, 2, 2),
(40, 2, 15),
(41, 2, 16),
(42, 2, 27),
(43, 2, 17),
(44, 2, 29),
(45, 2, 21),
(46, 2, 18),
(47, 2, 20),
(48, 2, 22),
(49, 2, 24),
(50, 11, 1),
(51, 1, 30),
(52, 12, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT pour la table `private_channel`
--
ALTER TABLE `private_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `user_channel`
--
ALTER TABLE `user_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
