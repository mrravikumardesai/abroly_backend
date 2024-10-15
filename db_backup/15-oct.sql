-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 15, 2024 at 05:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abroly_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL DEFAULT uuid(),
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `user_type` enum('admin') DEFAULT 'admin',
  `otp` varchar(255) DEFAULT NULL,
  `otp_expire` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `uuid`, `username`, `phone_number`, `country_code`, `profile_image`, `user_type`, `otp`, `otp_expire`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '9624692001', '+91', NULL, 'admin', '', '0000-00-00 00:00:00', '2024-09-14 17:54:28', '2024-10-15 15:14:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL DEFAULT uuid(),
  `name` text DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_writing`
--

CREATE TABLE `content_writing` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_writing`
--

INSERT INTO `content_writing` (`id`, `uuid`, `name`, `description`, `key`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'f2643502-c124-47c6-bdae-245f94699a0a', 'SOP', 'Here you can edit', 'sop', '2024-09-15 11:21:55', '2024-10-04 03:01:34', NULL),
(2, 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', 'Motivation Letter', 'asdasd', 'motivation_letter', '2024-09-15 11:22:29', '2024-09-15 06:10:25', NULL),
(3, '3edc91d2-6766-4932-9607-0b0c98661c90', 'Cover Letter', 'asdasdasd', 'cover_letter', '2024-09-15 11:23:00', '2024-09-15 06:10:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content_writing_services_responses`
--

CREATE TABLE `content_writing_services_responses` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  `name` text DEFAULT NULL,
  `number` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `selected_type` enum('sop','motivation_letter','cover_letter') DEFAULT 'sop',
  `payment_status` enum('pending','rejected','paid') DEFAULT 'pending',
  `application_status` enum('pending','in_progress','rejected','accept','pdf_provided') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_writing_services_responses`
--

INSERT INTO `content_writing_services_responses` (`id`, `uuid`, `user_uuid`, `name`, `number`, `email`, `message`, `selected_type`, `payment_status`, `application_status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '45fcc88f-923d-402e-9fb6-8dc8eecd0140', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '213123123123', 'ravi@gmail.com', 'Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.', 'sop', 'paid', 'accept', '2024-09-21 05:01:16', '2024-10-04 03:01:40', NULL),
(2, '4d341011-e22f-430c-980d-41db74196c07', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Raj', 'raj@gmail.com', 'ravi@gmail.com', 'From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.From boarding passes to movie tickets, there\'s pretty much nothing you can\'t store with Preline.', 'motivation_letter', 'pending', 'pending', '2024-09-21 05:03:35', '2024-09-21 05:03:35', NULL),
(3, 'b8e3b9bd-c5a5-4451-af5d-ee92b44bd8d0', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Raj', 'Rasj@gmail.com', 'asdasd@gmaill.com', 'asdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:06', '2024-09-21 18:03:06', NULL),
(4, '3be415f1-f4f9-4a5b-8781-4dbfd88b2b8d', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Raj', 'Rasj@gmail.com', 'asdasd@gmaill.com', 'asdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:07', '2024-09-21 18:03:07', NULL),
(5, 'ded5ec5c-eb5a-455a-8999-95ddf92c8dba', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:32', '2024-09-21 18:03:32', NULL),
(6, '948e9f92-9ed2-4eea-9079-de9077fbd003', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:32', '2024-09-21 18:03:32', NULL),
(7, 'e696052c-2c73-4e41-9a80-a847c0a02bf4', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:32', '2024-09-21 18:03:32', NULL),
(8, '4faec7a7-633f-418b-a49f-37232f3aeb0c', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:32', '2024-09-21 18:03:32', NULL),
(9, 'e7dfb398-9e86-4eea-acdb-93ffefee4f1d', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:32', '2024-09-21 18:03:32', NULL),
(10, '794200fb-a1b0-43cf-b3da-8386f0d856da', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:33', '2024-09-21 18:03:33', NULL),
(11, '9acaf68a-c916-43be-b2d4-68c293179d89', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asxad', '9666666', 'asdasd@asd.com', 'asdasdasd', 'cover_letter', 'pending', 'pending', '2024-09-21 18:03:33', '2024-09-21 18:03:33', NULL),
(12, '62f46772-4693-4824-acb5-e45f6ac3a870', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:58', '2024-09-21 18:03:58', NULL),
(13, 'adb7594d-bfbd-43f1-ab94-9a7a6b2da311', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:58', '2024-09-21 18:03:58', NULL),
(14, '49359e6a-c265-485e-b107-a6bf4d43d129', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:58', '2024-09-21 18:03:58', NULL),
(15, '1c558c3a-89ae-4a82-9d9e-aac7636635b7', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:59', '2024-09-21 18:03:59', NULL),
(16, '1ae0c2e6-4583-46e3-9cd7-23b12ce35a55', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:59', '2024-09-21 18:03:59', NULL),
(17, '006da008-06e1-4c6a-b5cd-e17f25ac01d4', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:59', '2024-09-21 18:03:59', NULL),
(18, '03082c0f-253b-4b6e-aede-f3aff51bfa37', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasdasdasdas', '912391239', 'asd@fmai.com', 'asdasdasdasdasdasdasd', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:03:59', '2024-09-21 18:03:59', NULL),
(19, 'c9c3d45e-005e-4fe3-9223-91cc102fa063', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:04:16', '2024-09-21 18:04:16', NULL),
(20, 'dd39bbf0-2a29-49b2-9c05-dbf8eff1e093', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:04:16', '2024-09-21 18:04:16', NULL),
(21, '07d16da6-3c95-464c-b617-829e57b044c1', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:04:16', '2024-09-21 18:04:16', NULL),
(22, '4b44f0bb-e8f1-49cc-83c6-05a46ff935f9', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:04:17', '2024-09-21 18:04:17', NULL),
(23, '2a5ae897-9b9a-4723-ab1f-73c6e633a9bd', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pdf_provided', '2024-09-21 18:04:17', '2024-09-21 18:17:50', NULL),
(24, '0b2e8fb6-ee0f-465e-a2a6-9f68367f5699', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pdf_provided', '2024-09-21 18:04:17', '2024-09-21 18:24:22', NULL),
(25, '8079d6ec-d09a-41e1-8baa-cea85a3baaec', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '123123123', 'shrey@gmai.com', 'asdasdasdads', 'motivation_letter', 'pending', 'pdf_provided', '2024-09-21 18:04:17', '2024-09-21 18:21:09', NULL),
(26, '810c5880-91bf-4c09-a9a2-52398faa81d2', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:18', '2024-09-21 18:05:18', NULL),
(27, '2fa45b62-41cc-4272-a338-46291a693185', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:18', '2024-09-21 18:05:18', NULL),
(28, '8204c667-16f0-42b5-b983-6c486f74d373', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:18', '2024-09-21 18:05:18', NULL),
(29, 'eab66033-c103-4e02-8c63-9a65e43da654', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:19', '2024-09-21 18:05:19', NULL),
(30, 'cb1561e9-3094-4e0d-a119-77d63d26ded4', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:19', '2024-09-21 18:05:19', NULL),
(31, 'd38e9f89-1956-48cd-87eb-b391a7a4c880', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:19', '2024-09-21 18:05:19', NULL),
(32, 'bcf704cb-a2d4-4f41-80be-ada68ba6d17c', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'asdasd', '213123123123', 'ravi@gmail.com', 'asdasd', 'sop', 'pending', 'pending', '2024-09-21 18:05:19', '2024-09-21 18:05:19', NULL),
(33, '389ae03e-9e17-43b5-88ad-c1e9f2eed7e6', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'ravi desai', '345345345', 'ravi@gmail.com', '345werwerwer', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:06:11', '2024-09-21 18:06:11', NULL),
(34, '9abd8e42-d381-43ed-99d3-8e51ff6a8afe', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '9624692201', 'mrravikumar@gmail.com', 'sdasdasdasd', 'sop', 'pending', 'pending', '2024-10-03 15:01:14', '2024-10-03 15:01:14', NULL),
(35, '177f2f67-1514-4460-92e0-b3cd880cc6b6', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '99191919', 'ravi@gmail.com', 'asdasdasd', 'sop', 'pending', 'pending', '2024-10-04 03:06:04', '2024-10-04 03:06:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content_writing_services_responses_files`
--

CREATE TABLE `content_writing_services_responses_files` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `ref_uuid` varchar(255) DEFAULT NULL,
  `file_name` text DEFAULT NULL,
  `file_type` enum('pdf','image','other') DEFAULT 'pdf',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_writing_services_responses_files`
--

INSERT INTO `content_writing_services_responses_files` (`id`, `uuid`, `ref_uuid`, `file_name`, `file_type`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '1f177680-02fe-4b30-86aa-24795906b6fa', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', '1726938972879-1839.jpeg', 'image', '2024-09-21 17:16:12', '2024-09-21 17:16:12', NULL),
(2, '5727a0a4-25d6-4a14-98e4-465351a94929', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', '1726939239556-4970.pdf', 'pdf', '2024-09-21 17:20:39', '2024-09-21 17:20:39', NULL),
(3, 'd94a6f74-7e38-45fd-b6b1-986c563dfe37', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'apis_for_property_listing_application1726939369759-7101.pdf', 'pdf', '2024-09-21 17:22:49', '2024-09-21 17:22:49', NULL),
(4, '7af871ca-61ad-4440-a73c-e6f741913406', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'property_listing_apis1726939792985-3826.pdf', 'pdf', '2024-09-21 17:29:52', '2024-09-21 17:29:52', NULL),
(5, 'e8f5b5d6-fa9e-40bb-bce2-dbc84506cf7c', '2a5ae897-9b9a-4723-ab1f-73c6e633a9bd', 'property_listing_apis_(1)1726942393298-3156.pdf', 'pdf', '2024-09-21 18:13:13', '2024-09-21 18:13:13', NULL),
(6, '22c9c2a9-58fb-433f-a4f4-89fb5955bda9', '2a5ae897-9b9a-4723-ab1f-73c6e633a9bd', 'abroly1726942396247-6067.pdf', 'pdf', '2024-09-21 18:13:16', '2024-09-21 18:13:16', NULL),
(7, 'ffa033d2-52e4-4c29-96f7-f70eb6afe2dc', '2a5ae897-9b9a-4723-ab1f-73c6e633a9bd', 'abroly_â·_9.18pm_â·_09-16_(3)1726942677007-6131.jpeg', 'image', '2024-09-21 18:17:57', '2024-09-21 18:17:57', NULL),
(8, 'd4de646e-fb52-49e5-a142-509d613d7b9b', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'property_listing_apis_(1)1727199245724-1752.pdf', 'pdf', '2024-09-24 17:34:05', '2024-09-24 17:34:05', NULL),
(9, '884e265c-c496-4d15-a09c-ef09a7a7038d', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'screenshot_2024-09-30_at_11.31.00â¯pm1727967864053-8895.png', 'image', '2024-10-03 15:04:24', '2024-10-03 15:04:24', NULL),
(10, 'c2942709-5829-47fa-9a58-abdb6bc3051f', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'pexels-lara-jameson-88283131728010916030-1637.jpg', 'image', '2024-10-04 03:01:56', '2024-10-04 03:01:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content_writing_sub_points`
--

CREATE TABLE `content_writing_sub_points` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `content_writing_uuid` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `point_order` int(11) NOT NULL,
  `is_image` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_writing_sub_points`
--

INSERT INTO `content_writing_sub_points` (`id`, `uuid`, `content_writing_uuid`, `title`, `description`, `image`, `point_order`, `is_image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'e00df806-6341-4f76-a366-13c28d200cae', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:12:31', '2024-10-05 15:13:18', '2024-10-05 15:13:18'),
(2, '88267250-fae2-4c4d-85f5-11ac8b6cbbd8', 'f2643502-c124-47c6-bdae-245f94699a0a', '', '', NULL, 0, 0, '2024-10-05 15:13:18', '2024-10-05 15:14:44', '2024-10-05 15:14:44'),
(3, '2ca58888-fb6f-43d4-b0db-ad6350b1c5f7', 'f2643502-c124-47c6-bdae-245f94699a0a', 'sdfs', '<p>sdfsdf</p>', NULL, 2, 0, '2024-10-05 15:13:18', '2024-10-05 15:14:44', '2024-10-05 15:14:44'),
(4, '23634538-76ed-40ef-9c06-8f3837fa2063', 'f2643502-c124-47c6-bdae-245f94699a0a', 'sadfsdf', '<p>sdfsdfsdf</p>', NULL, 1, 0, '2024-10-05 15:13:18', '2024-10-05 15:14:44', '2024-10-05 15:14:44'),
(5, 'a9223e9a-31d9-4252-8713-9f9f84bd5f78', 'f2643502-c124-47c6-bdae-245f94699a0a', '', '', NULL, 0, 0, '2024-10-05 15:14:44', '2024-10-05 15:14:55', '2024-10-05 15:14:55'),
(6, 'fed08266-185f-45fd-b65f-9cdc247f4d94', 'f2643502-c124-47c6-bdae-245f94699a0a', 'ASdw3q2asd', '<p>123123asdasdasd</p>', NULL, 1, 0, '2024-10-05 15:14:55', '2024-10-05 15:15:07', '2024-10-05 15:15:07'),
(7, '78fb4e7c-ba40-4c63-acab-284b06e3b441', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasdasd</p><p>asd</p><p>a</p><p>sd</p><p>asd</p><p>as</p><p>da</p><p>sda</p><p>sd</p>', NULL, 0, 0, '2024-10-05 15:14:55', '2024-10-05 15:15:07', '2024-10-05 15:15:07'),
(8, 'fbab6277-c552-4989-8c6b-ffccd25fc9cf', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasdasd</p><p>asd</p><p>a</p><p>sd</p><p>asd</p><p>as</p><p>da</p><p>sda</p><p>sd</p>', NULL, 0, 0, '2024-10-05 15:15:07', '2024-10-05 15:16:09', '2024-10-05 15:16:09'),
(9, '346f5eb2-2195-4b93-87c2-ba6443dc0ce1', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:15:22', '2024-10-05 15:19:11', '2024-10-05 15:19:11'),
(10, '3a2b893c-daf9-47c0-ae9e-4ba85ba38ede', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:19:11', '2024-10-05 15:19:11', '2024-10-05 15:19:11'),
(11, '94efafd9-7d5a-49ca-8b5d-e3c409d8bd4c', '3edc91d2-6766-4932-9607-0b0c98661c90', 'Ravi', '<p>Desai</p>', NULL, 1, 0, '2024-10-05 15:19:11', '2024-10-05 15:19:11', '2024-10-05 15:19:11'),
(12, '0910a0dc-9d7a-49f6-97a3-31d0c5aaea50', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asads', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:19:15', '2024-10-05 15:19:15', '2024-10-05 15:19:15'),
(13, '234c6503-ad7b-44a4-a171-20dbbbb5605d', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asdasd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:19:20', '2024-10-05 15:19:20', '2024-10-05 15:19:20'),
(14, 'bfbd5a3d-5bb2-404f-a1ce-96a5febd90f7', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asdasd', '<p>asdasd</p>', NULL, 1, 0, '2024-10-05 15:19:20', '2024-10-05 15:19:20', '2024-10-05 15:19:20'),
(15, '3cec1674-75a0-43f3-9cf2-7c64223dfd1d', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-05 15:19:35', '2024-10-05 15:19:35', '2024-10-05 15:19:35'),
(16, '64497da6-b2e2-4441-ad79-fc0266886cf7', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasda</p>', NULL, 0, 0, '2024-10-05 15:19:58', '2024-10-05 15:19:58', '2024-10-05 15:19:58'),
(17, 'c19080ae-2a25-407d-9b41-a7f633a96027', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasdasd</p>', NULL, 1, 0, '2024-10-05 15:19:58', '2024-10-05 15:19:58', '2024-10-05 15:19:58'),
(18, '9ba2805e-a367-4156-9f1f-82d1c93a43bb', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasd', '<p>asdasdasd</p>', NULL, 3, 0, '2024-10-05 15:19:58', '2024-10-05 15:19:58', '2024-10-05 15:19:58'),
(19, '2f83cfb3-277b-4c4c-87d2-e36c35815603', 'f2643502-c124-47c6-bdae-245f94699a0a', 'asdasdas', '<p>dasdasdasd</p>', NULL, 2, 0, '2024-10-05 15:19:58', '2024-10-05 15:19:58', '2024-10-05 15:19:58'),
(20, '65b09f62-7c1b-485d-8ddc-10a14c19c936', 'f2643502-c124-47c6-bdae-245f94699a0a', 'sdf', '<p>sfd</p>', NULL, 0, 0, '2024-10-05 15:20:41', '2024-10-05 15:20:41', NULL),
(21, '260bb9e2-203c-47e9-a611-555e1b59f245', 'f2643502-c124-47c6-bdae-245f94699a0a', 'df', '<p>sdfsdf</p>', NULL, 1, 0, '2024-10-05 15:20:41', '2024-10-05 15:20:41', NULL),
(22, 'fc1a4a7d-3792-45ec-b970-bc3488cd152d', 'f2643502-c124-47c6-bdae-245f94699a0a', 'dfdf', '<p>sdfsdf</p><p><br></p>', NULL, 2, 0, '2024-10-05 15:20:41', '2024-10-05 15:20:41', NULL),
(23, '06165e02-5cec-4ff5-9215-976f922735d2', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 0, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(24, 'd53a25c0-7c3a-4497-a194-9ad9007ec979', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 1, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(25, '8e455fe4-7c3c-48ee-9c94-4820fefb133a', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 2, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(26, 'ee1617f8-63b5-4573-9eab-a31156a67529', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 5, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(27, 'a0fc6000-02bd-42ae-b744-4849e962fed2', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 3, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(28, '836a0359-3d8f-44dd-9c92-bb1c2b949823', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 4, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(29, 'b8c135fa-90a0-40bd-a777-5771f1b105b1', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 6, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(30, 'd0d64e9c-34b6-4c08-92f1-54040bdc5a93', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', '', '', NULL, 7, 0, '2024-10-05 15:26:06', '2024-10-05 15:26:16', '2024-10-05 15:26:16'),
(31, 'e9354f5f-28ab-490c-a530-c5372dab9b66', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', 'asd', '<p>asdasd</p>', NULL, 1, 0, '2024-10-13 13:20:28', '2024-10-13 13:20:33', '2024-10-13 13:20:33'),
(32, '6eaa566b-23d0-4018-97e3-ed13db9e3882', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', 'asdasd', '<p>asdasdasd</p>', NULL, 0, 0, '2024-10-13 13:20:28', '2024-10-13 13:20:33', '2024-10-13 13:20:33'),
(33, '51c15c95-133e-4c2c-afc3-fe2e5e38e0a1', 'bf2bf5b3-d34e-429c-8a08-3761f647e14f', 'asd', '<p>asdasd</p>', NULL, 0, 0, '2024-10-13 13:20:33', '2024-10-13 13:20:36', '2024-10-13 13:20:36'),
(34, 'a6e868a5-3c8c-41f4-952a-1adcc5e6fb10', '3edc91d2-6766-4932-9607-0b0c98661c90', 'asd', '<p>asd</p>', NULL, 0, 0, '2024-10-13 13:20:41', '2024-10-13 13:20:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` text DEFAULT NULL,
  `level` enum('beginner','intermediate','expert') DEFAULT 'beginner',
  `price` varchar(255) DEFAULT NULL,
  `banner_image` varchar(211) NOT NULL,
  `is_public` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `uuid`, `title`, `description`, `duration`, `level`, `price`, `banner_image`, `is_public`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '675272e4-da68-4c16-845c-6cd06f2f765c', 'French', '<p>French is a good language to start learning</p><p>here you will get enough to understood fundametals</p>', NULL, 'beginner', NULL, '1728192538809-9865.jpeg', 0, '2024-10-05 15:34:28', '2024-10-06 12:29:36', NULL),
(2, 'fde32c2c-1e42-4318-9f68-16a34d5c46ca', 'English', '<p>English</p>', NULL, 'beginner', NULL, '1728143477573-9306.png', 0, '2024-10-05 15:51:17', '2024-10-05 15:51:17', NULL),
(3, '5f85b8a4-b175-48bb-84ed-427928d3b4cf', 'Hindi', '<p>Hindi</p>', NULL, 'beginner', NULL, '1728193918351-7627.jpeg', 0, '2024-10-06 05:51:49', '2024-10-06 05:51:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_chapters`
--

CREATE TABLE `course_chapters` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `course_uuid` text DEFAULT NULL,
  `chapter_name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `level` enum('level1','level2','level3') NOT NULL DEFAULT 'level1',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_chapters`
--

INSERT INTO `course_chapters` (`id`, `uuid`, `course_uuid`, `chapter_name`, `description`, `level`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '53cc0a3b-9414-4835-aa9b-e53d078319ca', '675272e4-da68-4c16-845c-6cd06f2f765c', 'Chapter 0', '<p>0</p>', 'level1', '2024-10-06 12:54:24', '2024-10-06 13:32:25', NULL),
(2, 'fb7d8ea1-cab9-44a0-96a3-b9b4c302debc', '675272e4-da68-4c16-845c-6cd06f2f765c', 'Chapter 1', '<p>1</p>', 'level1', '2024-10-06 12:54:31', '2024-10-06 13:32:21', NULL),
(3, '5d81e6cd-8392-4d50-81d9-d66be23305f5', '675272e4-da68-4c16-845c-6cd06f2f765c', 'Chapter 2', '<p>2</p>', 'level1', '2024-10-06 12:55:01', '2024-10-06 13:32:32', NULL),
(4, 'edb12336-a343-4262-8fc5-23faf8c0c028', '675272e4-da68-4c16-845c-6cd06f2f765c', 'Chapter 1', '<p>Description</p>', 'level2', '2024-10-06 13:32:42', '2024-10-06 13:32:42', NULL),
(5, '6343ca9e-1b30-44fb-8eb0-e32b92fdd4d0', '675272e4-da68-4c16-845c-6cd06f2f765c', 'asdasd', '<p>asdasd</p>', 'level1', '2024-10-13 13:17:34', '2024-10-13 13:17:34', NULL),
(6, '6b03dfe7-2711-45d0-9cd0-1a1c97288d1e', 'fde32c2c-1e42-4318-9f68-16a34d5c46ca', 'sdf', '<p>sdfsdf</p>', 'level3', '2024-10-13 13:19:31', '2024-10-13 13:19:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_chapter_points`
--

CREATE TABLE `course_chapter_points` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `course_uuid` text DEFAULT NULL,
  `chapter_uuid` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `file_type` enum('pdf','image') DEFAULT 'pdf',
  `video_url` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_chapter_points`
--

INSERT INTO `course_chapter_points` (`id`, `uuid`, `course_uuid`, `chapter_uuid`, `title`, `short_description`, `file`, `file_type`, `video_url`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'd37bab05-cfd1-4809-854b-d68b5413c8fe', NULL, '53cc0a3b-9414-4835-aa9b-e53d078319ca', 'Demo', '<p>demo</p>', '1729005343388-7091.pdf', 'pdf', 'demo', '2024-10-15 15:15:43', '2024-10-15 15:15:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_images`
--

CREATE TABLE `course_images` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `course_uuid` text DEFAULT NULL,
  `access_image` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `uuid`, `question`, `answer`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '5ef2add1-467e-4cef-a7eb-56e9a247a978', 'Question Update', 'Question Update', '2024-09-14 17:04:07', '2024-09-14 17:17:32', '2024-09-14 17:17:32'),
(2, '0eb475df-909e-494d-be42-6791ca7068b9', 'sd', 'sd', '2024-09-14 17:10:40', '2024-09-14 17:10:42', '2024-09-14 17:10:42'),
(3, '0e5d1cf4-707a-48d1-a016-fd6473ffbfed', 'How do I create an account?', 'To create an account, simply click on the \"Sign Up\" button on our homepage and fill in the required details such as your name, email, and password. You’ll receive a confirmation email to verify your account.', '2024-09-14 17:17:40', '2024-09-14 17:17:40', NULL),
(4, '88b48069-e857-4f6a-9c9e-30a7a3327ced', ' Is this platform free to use?', 'Yes, this platform offers a free version that includes [mention any free features]. However, we also offer premium features for users who require [list premium features or services].', '2024-09-14 17:17:53', '2024-09-14 17:19:57', NULL),
(5, 'f977c948-9fdb-4e8d-80e2-d6aab75e5a13', 'How do I reset my password?', 'If you’ve forgotten your password, click on the \"Forgot Password\" link on the login page. Enter your email address, and we’ll send you a link to reset your password.', '2024-09-14 17:18:03', '2024-09-24 17:34:46', '2024-09-24 17:34:46'),
(6, 'fc0af363-0595-4d89-82c2-d43f89d7823f', 'Can I upgrade my account?', 'Yes! You can upgrade to our premium plan by visiting the \"Account Settings\" page and selecting the \"Upgrade\" option. You can choose from a variety of plans that suit your needs.', '2024-09-14 17:18:13', '2024-09-14 17:18:13', NULL),
(7, '8b3f8504-e96f-40cd-8b5c-b0c7719cea2c', 'How can I contact customer support?', 'You can reach out to our customer support team by visiting the \"Contact Us\" page. We offer support through email, live chat, and phone calls during business hours.', '2024-09-14 17:18:26', '2024-09-14 17:18:26', NULL),
(8, '56a97119-f2e8-4436-981e-79ee4d1d67a2', 'Is my data secure?', 'We take your data privacy seriously. All user data is encrypted, and we follow industry-standard security protocols to ensure your information is safe.', '2024-09-14 17:18:39', '2024-09-14 17:18:39', NULL),
(9, 'a62b5d73-5040-4975-bb0d-ee8c6bf58954', 'What payment methods do you accept?', 'We accept major credit/debit cards, UPI, and digital wallets for payments. We also use Razorpay to process payments securely.', '2024-09-14 17:18:55', '2024-09-14 17:18:55', NULL),
(10, '4d92069b-22c2-4ddb-a857-b6f07c3d3e94', 'Can I cancel my subscription?', 'Yes, you can cancel your subscription at any time by going to the \"Account Settings\" page. Once canceled, you will still have access to premium features until the end of the billing cycle.', '2024-09-14 17:19:06', '2024-09-14 17:19:06', NULL),
(11, '371034d7-d7fb-4bf5-976e-91bbbf7c4e26', 'How do I report an issue or bug?', 'If you encounter any issues or bugs while using our service, please report them through the \"Help Center\" or email us at [support email]. Our team will address the issue as soon as possible.', '2024-09-14 17:19:18', '2024-09-14 17:19:18', NULL),
(12, 'bafe5a0d-473a-4445-8810-d9e0eaa23c13', 'asdasd', 'asdasdasdasdasdds', '2024-10-03 15:06:00', '2024-10-03 15:06:06', '2024-10-03 15:06:06'),
(13, '4fd1a40d-85e6-4803-b376-62c2ca33bb0d', 'Question', ' Edut Answer', '2024-10-04 03:02:37', '2024-10-04 03:02:47', '2024-10-04 03:02:47');

-- --------------------------------------------------------

--
-- Table structure for table `health_in`
--

CREATE TABLE `health_in` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `name` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_in`
--

INSERT INTO `health_in` (`id`, `uuid`, `name`, `details`, `url`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '7fda2491-8f48-422e-a470-280ec95f156e', 'asdasd', 'asdasdasd', 'asdasd', '2024-10-15 15:30:04', '2024-10-15 15:30:16', '2024-10-15 15:30:16'),
(2, '05d3f160-8ad7-4775-a09c-6753f083b53b', 'asdasd', 'asdasd', 'https://www.acko.com/insurance/planning/?utm_source=partnership&utm_campaign=siteplug&utm_term=BBS134', '2024-10-15 15:30:08', '2024-10-15 21:04:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sim_cards`
--

CREATE TABLE `sim_cards` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `name` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sim_cards`
--

INSERT INTO `sim_cards` (`id`, `uuid`, `name`, `details`, `url`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'dc723b67-9ef8-4844-854d-7b9b65906d45', 'GlobalConnect SIM', 'Multi-country compatibility, supports 5G networks, dual SIM capability', 'https://example.com/globalconnect-sim', '2024-09-15 12:06:44', '2024-10-05 14:46:51', '2024-10-05 14:46:51'),
(2, 'e36f262a-36e0-44c5-8fd5-306641ecc884', 'SpeedMax SIM', 'Fast 4G/5G data, nano SIM format, ideal for heavy data users', 'https://example.com/speedmax-sim', '2024-09-15 12:07:05', '2024-09-15 15:04:55', NULL),
(3, '4a09fbd0-4b03-4608-bf44-b7da4d73d326', 'TravelBuddy SIM', 'International roaming, supports over 200 countries, prepaid with long validity', 'https://example.com/travelbuddy-sim', '2024-09-15 15:05:14', '2024-09-15 15:05:14', NULL),
(4, '2de97c0f-5ce7-4aaa-afd4-d3907aaaeefc', 'ConnectNow SIM', 'Ready for instant activation, eSIM compatible, wide network coverage', 'https://example.com/connectnow-sim', '2024-09-15 15:05:29', '2024-09-15 15:05:29', NULL),
(5, '23dfd305-87c2-454e-8429-e39fe415a4de', 'SmartChoice SIM', 'Embedded SIM option, supports multiple devices, excellent for IoT solutions', 'https://example.com/smartchoice-sim', '2024-09-15 15:05:44', '2024-09-15 15:05:44', NULL),
(6, '1d05f627-7c59-4ba7-8c86-5c1fb73d7fca', 'EasyLink SIM', 'Plug-and-play, triple cut (standard, micro, nano), supports 4G VoLTE', 'https://example.com/easylink-sim', '2024-09-15 15:06:02', '2024-09-15 15:06:02', NULL),
(7, 'd7400343-316c-4e54-8bfa-b8edab988a9c', 'sedfrsdf', 'sdfsdf', 'https://www.google.com', '2024-09-24 17:34:34', '2024-10-05 14:46:58', '2024-10-05 14:46:58'),
(8, 'd892b0c4-5953-4967-a98f-a8b15cafd6e2', 'asddasdfsa', 'asdsaxz', 'https://visainsiders.in/', '2024-10-03 15:05:13', '2024-10-05 14:46:56', '2024-10-05 14:46:56'),
(9, '040528d8-87a5-4c4b-a36e-9b71a1a30e2c', 'Airtel', 'Aritel 5g simcard', 'https/www.airtel.com', '2024-10-04 03:02:21', '2024-10-05 14:46:54', '2024-10-05 14:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `static_content`
--

CREATE TABLE `static_content` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL DEFAULT uuid(),
  `title` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `static_content`
--

INSERT INTO `static_content` (`id`, `uuid`, `title`, `url`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'def934bd-5676-48f4-a6b9-468a76b3799c', 'About Us', 'about_us', '<p><br></p><p>Manae About us</p>', '2024-09-16 02:11:08', '2024-10-04 03:02:59', NULL),
(2, 'c53c6f69-c5d5-453f-9de5-8c4aa890b00e', 'Terms & Conditions', 'tnc', '<h3>Terms and Conditions</h3><p>Welcome to <strong>Visa Insiders</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, you should not use our website or services.</p><h4>1. <strong>General</strong></h4><p>By using our website, you warrant that you are at least 18 years of age and that you agree to abide by all applicable laws and regulations. Visa Insiders reserves the right to modify these terms at any time without prior notice. Continued use of the website following any changes signifies your acceptance of the new terms.</p><h4>2. <strong>Services</strong></h4><p>Visa Insiders provides visa consultation, application assistance, and related services. We are not affiliated with any government agency or embassy, and we do not have the authority to issue visas. Our role is to assist clients with the visa application process by providing information and guidance. The decision to issue a visa is at the sole discretion of the relevant government authorities.</p><h4>3. <strong>Use of Information</strong></h4><p>The content provided on this website is for general information purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or suitability of the information contained on this website. Any reliance you place on such information is strictly at your own risk.</p><h4>4. <strong>User Responsibilities</strong></h4><p>As a user of our website, you agree:</p><ul><li>To provide accurate, current, and complete information when prompted by any registration form or during the use of our services.</li><li>Not to impersonate any person or entity or provide false information.</li><li>Not to use our website or services for illegal activities, including but not limited to fraud, hacking, or violating any laws in your jurisdiction.</li><li>To safeguard any account credentials and notify us immediately of any unauthorized use of your account.</li></ul><h4>5. <strong>Fees and Payments</strong></h4><p>Our services may require payment of fees. By using our services, you agree to pay all fees associated with the services you select. Payments must be made through the available payment methods provided on the website. Visa Insiders reserves the right to update fees or add new fees at any time, and you will be informed of such changes in advance.</p><h4>6. <strong>Refund Policy</strong></h4><p>Refunds for services provided by Visa Insiders will be considered on a case-by-case basis and are not guaranteed. Once a visa application has been submitted or services have been rendered, fees paid are generally non-refundable. Please contact us directly for refund inquiries.</p><h4>7. <strong>Intellectual Property</strong></h4><p>All content, logos, trademarks, and data displayed on this website, including text, images, and design, are the property of Visa Insiders or its licensors. You may not use, copy, distribute, or reproduce any materials from this website without prior written consent.</p><h4>8. <strong>Third-Party Links</strong></h4><p>Our website may contain links to third-party websites or services. These links are provided for convenience, and Visa Insiders is not responsible for the content or practices of any linked third-party sites. Accessing any third-party website from our platform is at your own risk.</p><h4>9. <strong>Limitation of Liability</strong></h4><p>Visa Insiders shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. We do not guarantee the accuracy, completeness, or reliability of any information provided and are not responsible for any errors or omissions.</p><h4>10. <strong>Indemnification</strong></h4><p>You agree to indemnify and hold harmless Visa Insiders, its affiliates, directors, employees, and agents from any claims, damages, or expenses (including legal fees) arising out of your use of our website or services, your violation of these Terms and Conditions, or your violation of any rights of a third party.</p><h4>11. <strong>Termination</strong></h4><p>Visa Insiders reserves the right to terminate your access to the website and services at any time, without notice, for any reason, including but not limited to a breach of these Terms and Conditions.</p><h4>12. <strong>Governing Law</strong></h4><p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles. Any legal disputes arising from your use of the website shall be resolved in the courts of [Your Jurisdiction].</p><h4>13. <strong>Contact Us</strong></h4><p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p><p><strong>Email</strong>: support@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:11:46', '2024-09-16 02:11:46', NULL),
(3, 'dc1a8b0d-6dd5-4ab9-b65a-26b04d8007fa', 'Privacy & Policy', 'pnp', '<p>At <strong>Visa Insiders</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services. By using our website, you agree to the collection and use of your information in accordance with this policy.</p><h4>1. <strong>Information We Collect</strong></h4><p>We collect several types of information to provide and improve our services to you, including:</p><ul><li><strong>Personal Information</strong>: When you register, fill out forms, or contact us, we may collect personal details such as your name, email address, phone number, nationality, and other relevant information necessary for visa application processing.</li><li><strong>Payment Information</strong>: If you use our paid services, we collect billing information such as your credit card details, which are processed through secure third-party payment gateways.</li><li><strong>Usage Data</strong>: We may collect information about how you access and use our website, such as your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.</li><li><strong>Cookies and Tracking</strong>: We use cookies and similar tracking technologies to monitor activity on our website and store certain information. You can modify your browser settings to refuse cookies or to alert you when cookies are being sent.</li></ul><h4>2. <strong>How We Use Your Information</strong></h4><p>We use the collected information for a variety of purposes, including:</p><ul><li><strong>Providing Services</strong>: To process visa applications, offer consultation services, and manage customer support.</li><li><strong>Payment Processing</strong>: To handle transactions securely and efficiently.</li><li><strong>Communication</strong>: To send you important updates, respond to inquiries, and provide relevant visa-related information.</li><li><strong>Improvement and Personalization</strong>: To improve our website’s functionality, provide personalized user experiences, and analyze website usage.</li><li><strong>Legal Compliance</strong>: To comply with any applicable laws, regulations, or legal processes.</li></ul><h4>3. <strong>How We Share Your Information</strong></h4><p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following situations:</p><ul><li><strong>Service Providers</strong>: We may share your personal information with trusted third-party service providers (e.g., payment processors, hosting services, and visa processing partners) to assist us in operating our website and providing services to you.</li><li><strong>Legal Obligations</strong>: We may disclose your personal information if required by law, such as in response to a subpoena, or to protect the rights, property, or safety of Visa Insiders or others.</li><li><strong>Business Transfers</strong>: If Visa Insiders is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li></ul><h4>4. <strong>Data Security</strong></h4><p>We take data security seriously and implement appropriate measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.</p><h4>5. <strong>Retention of Data</strong></h4><p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. When your personal data is no longer needed, we will securely delete or anonymize it.</p><h4>6. <strong>Your Privacy Rights</strong></h4><p>Depending on your location, you may have certain rights regarding your personal data, including:</p><ul><li><strong>Access</strong>: You can request access to the personal information we hold about you.</li><li><strong>Correction</strong>: You can ask us to correct or update your personal information if it’s inaccurate or incomplete.</li><li><strong>Deletion</strong>: You can request the deletion of your personal data under certain conditions.</li><li><strong>Opt-Out</strong>: You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those emails.</li></ul><p>To exercise any of these rights, please contact us at the email address provided below.</p><h4>7. <strong>Third-Party Links</strong></h4><p>Our website may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices of such websites, and we encourage you to review the privacy policies of any third-party sites you visit.</p><h4>8. <strong>Children’s Privacy</strong></h4><p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that a child under 18 has provided us with personal information, we will take steps to delete such data.</p><h4>9. <strong>Changes to This Privacy Policy</strong></h4><p>We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on our website. You are encouraged to review this Privacy Policy periodically for any updates.</p><h4>10. <strong>Contact Us</strong></h4><p>If you have any questions or concerns about this Privacy Policy, or if you would like to exercise any of your privacy rights, please contact us at:</p><p><strong>Email</strong>: privacy@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:12:34', '2024-09-16 02:12:34', NULL),
(4, 'c925e31e-775b-4a29-8946-2ddfdb55a95f', 'Return & Refund Policy', 'return_refund_policy', '<h3>Return and Refund Policy</h3><p>At <strong>Visa Insiders</strong>, we strive to provide exceptional service and customer satisfaction. However, we understand that there may be instances where you may request a refund. This Return and Refund Policy outlines the conditions under which refunds may be issued.</p><h4>1. <strong>Services and Non-Refundable Items</strong></h4><p>Due to the nature of the services we provide, <strong>Visa Insiders</strong> does not typically offer refunds once visa processing has commenced or services have been rendered. This includes:</p><ul><li>Consultation services</li><li>Visa application preparation and submission</li><li>Documentation review and advice</li><li>Any other professional services provided by Visa Insiders</li></ul><p>Once these services have been initiated or completed, refunds are generally not applicable.</p><h4>2. <strong>Eligibility for Refunds</strong></h4><p>Refunds may be considered on a case-by-case basis under the following conditions:</p><ul><li><strong>Payment Error</strong>: If you were charged incorrectly or for services you did not receive, we will refund the erroneous charge.</li><li><strong>Service Not Provided</strong>: If, due to unforeseen circumstances, Visa Insiders is unable to deliver the agreed-upon service, we will issue a refund for the unprovided service.</li><li><strong>Duplicate Payment</strong>: If you are accidentally charged multiple times for the same service, we will refund the duplicate charges.</li></ul><h4>3. <strong>Refund Request Process</strong></h4><p>To request a refund, please follow these steps:</p><ol><li><strong>Contact Us</strong>: Email us at refunds@visainsiders.com or call us at +[Phone Number] to submit your refund request. Please provide your full name, payment details, and a description of the issue.</li><li><strong>Review</strong>: Once we receive your request, we will review it within 7 business days. During this time, we may contact you for additional information if necessary.</li><li><strong>Approval</strong>: If your refund is approved, we will notify you via email and process the refund within 14 business days. Refunds will be issued to the original method of payment.</li></ol><h4>4. <strong>Refund Timeframe</strong></h4><p>After approval, refunds are typically processed within 14 business days. The exact time for the refund to reflect in your account depends on your payment provider. If the refund has not been credited within the expected timeframe, please check with your bank or credit card company before contacting us.</p><h4>5. <strong>Non-Refundable Circumstances</strong></h4><p>Please note that we cannot offer refunds in the following cases:</p><ul><li><strong>Visa Denial</strong>: We are not responsible for visa denial decisions made by embassies or consulates, and therefore, we cannot offer refunds for such outcomes.</li><li><strong>Client Errors</strong>: Refunds will not be provided if incorrect or incomplete information is supplied by the client, resulting in delays, errors, or visa denials.</li><li><strong>Change of Mind</strong>: If you change your mind after services have been initiated, refunds will not be applicable.</li></ul><h4>6. <strong>Dispute Resolution</strong></h4><p>If you believe your refund request was handled unfairly, you may reach out to our customer service team for further review. We are committed to ensuring that all disputes are resolved fairly and efficiently.</p><h4>7. <strong>Contact Us</strong></h4><p>If you have any questions regarding this Return and Refund Policy, or need assistance with a refund request, please contact us:</p><p><strong>Email</strong>: refunds@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:13:22', '2024-09-16 02:13:22', NULL),
(5, '86eda044-7de4-44a1-98c0-f9cba569795b', 'sdf', 'sdf', '<p>sdf</p>', '2024-09-16 02:13:29', '2024-09-16 02:13:31', '2024-09-16 02:13:31'),
(6, '20255911-db9e-4d30-91e5-e7a87255de08', 'US policy', 'us_policy', '<p>asdasdasd</p>', '2024-09-24 17:35:10', '2024-10-03 15:06:54', '2024-10-03 15:06:54'),
(7, '7e3bdc8a-70b4-4488-8a48-88e81822c5c5', 'US Policy', 'us_policy', '<p>US Policy regarding information</p>', '2024-10-04 03:03:17', '2024-10-04 03:03:22', '2024-10-04 03:03:22');

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `file_type` enum('image','video') DEFAULT 'video',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `uuid`, `name`, `description`, `file_url`, `file_type`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '75627c82-49fd-4751-a358-48668ca160ac', 'Ravi', 'Good Review', NULL, 'video', '2024-09-15 04:07:49', '2024-09-21 13:19:21', '2024-09-21 13:19:21'),
(2, '613d3b66-a497-4ad7-83a3-ea9b2abf50ad', 'asdasd', 'asdasdasd', '', 'video', '2024-09-15 04:11:51', '2024-09-15 04:13:55', '2024-09-15 04:13:55'),
(3, 'e2d1e1df-bb0b-412b-a577-d20c55a27c82', 'Shrey Patel', 'Incredible service! I’ve been using this platform for a few months now, and it has completely transformed the way I manage my business. Highly recommend!', '1726373573342-4135.mp4', 'video', '2024-09-15 04:12:53', '2024-09-15 04:12:53', NULL),
(4, '6c49ea7c-b3cb-4ccf-92b7-11d94bf99645', 'Smith', 'The user interface is smooth, and the features are exactly what I was looking for. Customer support was also quick to resolve my queries!', '1726373592992-8630.mp4', 'video', '2024-09-15 04:13:12', '2024-09-15 04:13:12', NULL),
(5, 'aa50d0fa-48bd-4e2a-8648-5dc69a672b02', 'Lisa R', 'I’ve tried several similar services, but this one stands out for its simplicity and effectiveness. Everything just works!', '1726373658542-4692.mp4', 'video', '2024-09-15 04:14:18', '2024-09-15 04:14:18', NULL),
(6, '21e924aa-616a-4ac8-beb7-ae30e60f15d2', 'David K', 'From the moment I signed up, I knew I had made the right choice. The tools available are top-notch and have helped me streamline my workflow.', '1726373690404-8559.mp4', 'video', '2024-09-15 04:14:50', '2024-09-15 04:14:50', NULL),
(7, 'e2a90b35-6b8d-4daa-84ba-87f246344ad2', 'Keval', 'keval', '1727199348512-7629.mp4', 'video', '2024-09-24 17:35:48', '2024-09-24 17:35:48', NULL),
(8, '2a4939c7-c816-4978-99a6-8fccc90c70bf', 'Ravi', 'Dea\';sda\\\'sd\nsdfsdfsdf', '1727968064411-4197.mp4', 'video', '2024-10-03 15:07:44', '2024-10-03 15:07:52', '2024-10-03 15:07:52'),
(9, '794afbb9-e680-4e06-8557-40884b0aeb38', 'Ravi', 'Good Information in platformasdasd', '1728011030985-1226.mp4', 'video', '2024-10-04 03:03:50', '2024-10-04 03:03:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `uuid` varchar(136) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `user_type` enum('user') DEFAULT 'user',
  `otp` varchar(255) DEFAULT NULL,
  `otp_expire` datetime DEFAULT NULL,
  `is_verified` tinyint(4) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uuid`, `username`, `email`, `password`, `phone_number`, `country_code`, `profile_image`, `status`, `user_type`, `otp`, `otp_expire`, `is_verified`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', 'ravi@gmail.com', NULL, '9999999991', '+91', NULL, 1, 'user', '', '0000-00-00 00:00:00', 1, '2024-09-14 17:54:28', '2024-10-15 15:34:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_devices`
--

CREATE TABLE `user_devices` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL DEFAULT uuid(),
  `user_uuid` varchar(131) DEFAULT NULL,
  `device_id` text DEFAULT NULL,
  `device_token` text DEFAULT NULL,
  `device_model` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_devices`
--

INSERT INTO `user_devices` (`id`, `uuid`, `user_uuid`, `device_id`, `device_token`, `device_model`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'bd4c115f-0562-4967-b3d0-8f7cbbc6dba0', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-14 13:16:39', '2024-09-14 13:16:39', NULL),
(2, 'fd2d9b14-57f0-4212-a6d4-36d9478d31d5', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-15 14:48:19', '2024-09-15 14:48:19', NULL),
(3, '5bc42f14-8b5e-4622-95be-c1b1ccc8e0ec', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-15 15:25:12', '2024-09-15 15:25:12', NULL),
(4, '11c4b13a-c098-4a46-bfde-a312919d4186', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-15 16:02:11', '2024-09-15 16:02:11', NULL),
(5, 'ef32458f-ee2d-4e2a-bc83-b6485c939b6c', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-20 17:16:22', '2024-09-20 17:16:22', NULL),
(6, 'c1dbe321-1b41-4523-99e2-96219fe937ac', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-21 17:48:44', '2024-09-21 17:48:44', NULL),
(7, 'cf442ae5-eb45-48e3-aec0-5b0d2c2b9a81', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-09-24 17:40:56', '2024-09-24 17:40:56', NULL),
(8, '69aeb67a-a1e0-49ab-a632-b87f7a7c39b2', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-02 15:52:32', '2024-10-02 15:52:32', NULL),
(9, '88647ad7-467a-4fed-af20-95889c2d61c0', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-03 14:55:59', '2024-10-03 14:55:59', NULL),
(10, 'dba4f362-884d-4edc-b63c-159e257e231a', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-03 15:10:37', '2024-10-03 15:10:37', NULL),
(11, '5d215986-15cb-4a2f-b703-ccc8012840a9', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-04 03:05:45', '2024-10-04 03:05:45', NULL),
(12, '8cf7b760-179a-4e66-9c72-8c70850fd1db', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-15 15:34:58', '2024-10-15 15:34:58', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `content_writing`
--
ALTER TABLE `content_writing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `content_writing_services_responses`
--
ALTER TABLE `content_writing_services_responses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `content_writing_services_responses_files`
--
ALTER TABLE `content_writing_services_responses_files`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `content_writing_sub_points`
--
ALTER TABLE `content_writing_sub_points`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `course_chapters`
--
ALTER TABLE `course_chapters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `course_chapter_points`
--
ALTER TABLE `course_chapter_points`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `course_images`
--
ALTER TABLE `course_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `health_in`
--
ALTER TABLE `health_in`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `sim_cards`
--
ALTER TABLE `sim_cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `static_content`
--
ALTER TABLE `static_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `user_devices`
--
ALTER TABLE `user_devices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `content_writing`
--
ALTER TABLE `content_writing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `content_writing_services_responses`
--
ALTER TABLE `content_writing_services_responses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `content_writing_services_responses_files`
--
ALTER TABLE `content_writing_services_responses_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `content_writing_sub_points`
--
ALTER TABLE `content_writing_sub_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course_chapters`
--
ALTER TABLE `course_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `course_chapter_points`
--
ALTER TABLE `course_chapter_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course_images`
--
ALTER TABLE `course_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `health_in`
--
ALTER TABLE `health_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sim_cards`
--
ALTER TABLE `sim_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `static_content`
--
ALTER TABLE `static_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_devices`
--
ALTER TABLE `user_devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
