-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2025 at 03:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sketchhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(3, 5, 2, 1, '2025-04-29 07:50:36', '2025-04-29 07:50:36'),
(4, 5, 1, 1, '2025-04-29 07:50:45', '2025-04-29 07:50:45'),
(5, 5, 5, 1, '2025-04-29 07:50:50', '2025-04-29 07:50:50'),
(6, 5, 9, 1, '2025-04-29 07:50:56', '2025-04-29 07:50:56'),
(7, 5, 3, 1, '2025-04-29 08:26:05', '2025-04-29 08:26:05'),
(13, 1, 1, 1, '2025-05-14 08:32:30', '2025-05-14 08:32:30'),
(14, 1, 10, 2, '2025-05-14 08:32:40', '2025-05-14 08:32:40'),
(15, 1, 5, 3, '2025-05-14 08:32:58', '2025-05-14 08:32:58'),
(16, 1, 2, 1, '2025-05-21 14:54:25', '2025-05-21 14:54:25');

-- --------------------------------------------------------

--
-- Table structure for table `images_path`
--

CREATE TABLE `images_path` (
  `id` int(11) NOT NULL,
  `image_name` longtext NOT NULL,
  `image_path` longtext NOT NULL,
  `price` float DEFAULT NULL,
  `disc_price` float DEFAULT NULL,
  `add_by` int(11) NOT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `stock` int(11) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images_path`
--

INSERT INTO `images_path` (`id`, `image_name`, `image_path`, `price`, `disc_price`, `add_by`, `added`, `stock`, `is_featured`) VALUES
(1, 'Oil Painting', 'Images/digital-art-style-illustration-river-nature.jpg', 1000, 999, 2, '2025-04-29 06:04:32', 2, 1),
(2, 'Digital Art', 'Images/digital-art-style-illustration-river-nature (1).jpg', 500, 499, 2, '2025-04-29 06:04:53', 5, 1),
(3, 'Water Color', 'Images/digital-art-style-illustration-river-nature (2).jpg', 1500, 1400, 2, '2025-04-29 06:05:26', 3, 1),
(4, 'Peacock Painting', 'Images/beautiful-floral-composition_23-2150969177.jpg', 500, 400, 1, '2025-04-29 06:08:09', 3, 1),
(5, 'Art', 'Images/peafowl-painting-yellow-background-showcasing-its-vivid-feathers_245187-3274.avif', 300, 200, 1, '2025-04-29 06:08:31', 4, 1),
(6, 'Mandala Art', 'Images/poster-love-india_896292-3.avif', 1000, 900, 4, '2025-04-29 06:38:04', 2, 0),
(7, 'Flower Art', 'Images/beautiful-floral-composition_23-2150969067.jpg', 500, 600, 4, '2025-04-29 06:38:35', 3, 0),
(8, 'Couple Art', 'Images/intersectional-dialogue-wallpaper_987764-164967.jpg', 500, 400, 4, '2025-04-29 06:39:21', 3, 1),
(9, 'Bottal Art', 'Images/close-up-painted-urns-sale_1048944-19376623.avif', 600, 500, 5, '2025-04-29 06:40:36', 2, 1),
(10, 'Kanhaiya', 'Images/painting-representing-krishna.jpg', 500, 400, 5, '2025-04-29 06:40:58', 3, 1),
(11, 'painting', 'Images/village-procession-honoring-gurus-wisdom-background_987764-132868.jpg', 500, 450, 5, '2025-04-29 07:48:44', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `txn_id` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `product_id`, `payment_method`, `total_amount`, `order_date`, `txn_id`, `status`, `quantity`) VALUES
(5, 2, 9, 'COD', 500.00, '2025-05-01 22:53:11', 'N/A', 'Pending', 1),
(6, 2, 8, 'COD', 400.00, '2025-05-01 22:53:11', 'N/A', 'Pending', 1),
(10, 1, 1, 'COD', 999.00, '2025-05-04 11:57:53', 'N/A', 'Pending', 1),
(11, 1, 8, 'COD', 400.00, '2025-05-04 11:58:03', 'N/A', 'Pending', 1),
(12, 1, 8, 'COD', 400.00, '2025-05-04 12:00:20', 'N/A', 'Pending', 1),
(13, 1, 8, 'COD', 400.00, '2025-05-04 12:01:24', 'N/A', 'Pending', 1),
(15, 1, 8, 'COD', 1200.00, '2025-05-14 13:22:59', 'N/A', 'Pending', 3),
(16, 1, 2, 'COD', 499.00, '2025-05-14 13:22:59', 'N/A', 'Pending', 1),
(17, 1, 2, 'COD', 1996.00, '2025-05-14 13:23:39', 'N/A', 'Pending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `NAME` varchar(150) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `PASSWORD` varchar(200) DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(15) DEFAULT NULL,
  `address` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `NAME`, `email`, `PASSWORD`, `profile_pic`, `role`, `created_at`, `phone`, `address`) VALUES
(1, 'Kavya', 'kavya@gmail.com', '$2y$10$7lRaREDY4BVtRIXHlCxWi.W1ZLgCLhybR8vmCg90IjWwCV8d5kfJe', 'profile_68106e967b5f53.70390634.jpg', 'user', '2025-04-29 05:37:25', '0987654324', 'Shyam Nagar'),
(2, 'Nandini', 'nandini@gmail.com', '$2y$10$jfz/.2sjKlrmP6jx5ueHCOsL3hA2naub3Le3SEOfZZ4/ZraAlcDla', 'profile_68107319499b91.45380345.jpg', 'user', '2025-04-29 05:40:35', '8765456789', 'Farrukhabad\r\n'),
(3, 'admin', 'admin@gmail.com', '$2y$10$SGEpDefHCwosEcf4vYaIG.hmOaauYXGm1eDOWpaRlnupnVxReuu66', NULL, 'admin', '2025-04-29 06:17:10', '343534545', 'fbd'),
(4, 'Neha', 'neha@gmail.com', '$2y$10$y8DwRBxjECSb9CTXnPIfE.9tVDLZ48iIs9qyenL9Am3d62UEwAL4.', 'profile_681073ac2dde23.83700540.jpg', 'user', '2025-04-29 06:32:08', '987889898', 'null'),
(5, 'Kartik', 'kartik@gmail.com', '$2y$10$jqc.CatEdkOOT9Pvl7k54eP0Cxl23KyjUcdFXI5OrlqK4ZVS7..2W', 'profile_68107443e74b62.52861677.jpg', 'user', '2025-04-29 06:32:54', '9670216713', 'FBD'),
(6, 'priya', 'priya@gmail.com', NULL, NULL, 'user', '2025-05-21 15:39:50', '98789788', 'hathras'),
(7, 'Oli', 'oli@gmail.com', '$2y$10$ghWGnnCmECduZHMSADRUb.XdlqO6HIGbvuHH9I7.QVC3A748iwAKS', 'uploads/profile_pics/1747842662_WhatsApp Image 2025-03-04 at 13.05.34_9f297099.jpg', 'user', '2025-05-21 15:51:02', '987878978', 'hathras'),
(8, 'Rama', 'rama@gmail.com', '$2y$10$7g9nRn74JT6jCqi677pgXel3V746l9bjlW9PioTxqS5V59FsrwgVS', '', 'user', '2025-05-21 16:14:41', '8765334452', 'fbd');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 5, 3, '2025-04-29 07:49:32', '2025-04-29 07:49:32'),
(2, 5, 3, '2025-04-29 07:49:32', '2025-04-29 07:49:32'),
(3, 2, 8, '2025-05-01 17:01:22', '2025-05-01 17:01:22'),
(4, 2, 10, '2025-05-01 17:01:26', '2025-05-01 17:01:26'),
(5, 2, 5, '2025-05-01 17:01:44', '2025-05-01 17:01:44'),
(6, 2, 1, '2025-05-01 17:01:50', '2025-05-01 17:01:50'),
(11, 1, 1, '2025-05-21 14:59:26', '2025-05-21 14:59:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `images_path`
--
ALTER TABLE `images_path`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `images_path`
--
ALTER TABLE `images_path`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `images_path` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `images_path` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `images_path` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
