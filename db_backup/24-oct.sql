-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2024 at 09:18 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

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
(1, '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '9624692001', '+91', NULL, 'admin', '', '0000-00-00 00:00:00', '2024-09-14 17:54:28', '2024-10-23 07:20:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `uuid` varchar(136) NOT NULL,
  `profile_image` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `role` enum('agent','sub-agent','visa-agent','tour-agent') DEFAULT NULL,
  `is_verified` tinyint(4) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`id`, `uuid`, `profile_image`, `username`, `email`, `phone_number`, `country_code`, `otp`, `status`, `role`, `is_verified`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'b4f39817-8830-4f9c-9e26-f0eaf745ca5d', '', 'Ravi', 'ravi@gmail.com', '9999999991', '+91', '', 'active', 'agent', 1, '2024-10-17 07:36:22', '2024-10-24 04:38:23', NULL),
(2, 'a1f4bfd0-a91b-44cc-8b83-f26a35a206c0', '', 'Ravi', 'ravi@gmail.com', '9999999992', '+91', '', 'active', 'agent', 1, '2024-10-18 07:25:39', '2024-10-21 03:43:53', NULL),
(3, 'a3942e3c-e49c-4a8b-b452-db44276ff008', '', 'pankaj JI', 'pankaj@gmail.com', '9966666669', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:29:01', '2024-10-18 09:04:31', NULL),
(4, '4dddd12b-7a31-42bc-8787-a08843b737b8', '', 'Shreay Patel', 'Shreay@gmail.com', '9966554499', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:29:16', '2024-10-18 07:58:10', NULL),
(5, '87c6de06-965e-4339-b1d1-4194552d4461', '', 'Smith', 'Smith', '9999999993', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:29:48', '2024-10-18 07:29:48', NULL),
(6, 'a8796057-d46c-4006-b8f1-87c0b417f428', '', 'shri', 'Shri@gmail.com', '9999999994', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:30:02', '2024-10-18 07:58:02', NULL),
(7, '7cda18b7-aff7-4116-9dbc-2bc577b88b9c', '', 'Jay', 'Jay@gmail.com', '9999999995', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:30:17', '2024-10-18 07:30:17', NULL),
(8, '941aeb40-2aa6-437b-97b4-22b944b6e845', '', 'asd', 'asdasd@gmai.com', '9999999997', '+91', NULL, 'active', 'agent', 0, '2024-10-18 07:30:52', '2024-10-18 07:30:52', NULL);

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
(1, 'f2643502-c124-47c6-bdae-245f94699a0a', 'SOP', 'asdasdsad', 'sop', '2024-09-15 11:21:55', '2024-09-24 17:33:40', NULL),
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
(1, '45fcc88f-923d-402e-9fb6-8dc8eecd0140', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', '213123123123', 'ravi@gmail.com', 'Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.Why Choose Abroly?\nAbroly offers personalized visa solutions with expert guidance at every step. We simplify the process, ensuring a smooth and hassle-free journey for students and travelers alike.', 'sop', 'paid', 'accept', '2024-09-21 05:01:16', '2024-09-24 17:34:01', NULL),
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
(33, '389ae03e-9e17-43b5-88ad-c1e9f2eed7e6', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'ravi desai', '345345345', 'ravi@gmail.com', '345werwerwer', 'motivation_letter', 'pending', 'pending', '2024-09-21 18:06:11', '2024-09-21 18:06:11', NULL);

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
(8, 'd4de646e-fb52-49e5-a142-509d613d7b9b', '45fcc88f-923d-402e-9fb6-8dc8eecd0140', 'property_listing_apis_(1)1727199245724-1752.pdf', 'pdf', '2024-09-24 17:34:05', '2024-09-24 17:34:05', NULL);

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
  `is_public` tinyint(4) NOT NULL DEFAULT 0,
  `banner_image` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `uuid`, `title`, `description`, `duration`, `level`, `price`, `is_public`, `banner_image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '8bd82534-7a74-43ed-9918-678a0b6fe431', 'French', '<p>asd</p>', NULL, 'beginner', NULL, 0, '1728973257962-3083.png', '2024-10-15 06:20:57', '2024-10-15 06:21:05', NULL),
(2, '870139e0-73de-41d3-ba94-0d3328622127', 'English', '<p>Prepare to master the English language with our<strong> comprehensive English Languag</strong>e Preparation Module. This course is designed for learners of all levels, providing essential tools to enhance your speaking, listening, readin<em>g, and writing skills. W</em>hether you’re aiming for academic success, professional advancement, or personal growth, our interactive<u> lessons and practical ex</u>ercises will guide you in achieving fluency and confidence in <strong>English</strong>.</p>', NULL, 'beginner', NULL, 1, '1728992589817-8280.jpg', '2024-10-15 11:43:09', '2024-10-15 17:25:29', NULL);

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
  `order_number` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_chapters`
--

INSERT INTO `course_chapters` (`id`, `uuid`, `course_uuid`, `chapter_name`, `description`, `level`, `order_number`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '58729156-2e94-4d45-9c12-6203eab717c1', '8bd82534-7a74-43ed-9918-678a0b6fe431', 'Chapter 1', '<p>chapter 1</p>', 'level3', 0, '2024-10-15 06:21:43', '2024-10-15 09:27:19', '2024-10-15 09:27:19'),
(2, 'f9ecdef4-b63b-414a-96e8-f65ed7c03f2e', '8bd82534-7a74-43ed-9918-678a0b6fe431', 'Chapter 1', '<p>chapter one content</p><p><br></p>', 'level1', 0, '2024-10-15 06:21:57', '2024-10-15 09:26:43', '2024-10-15 09:26:43'),
(3, 'f82f91d8-6cd8-42ca-948a-3e9b238f2aac', '8bd82534-7a74-43ed-9918-678a0b6fe431', 'Information about security', '<p>sdfsdf</p>', 'level2', 0, '2024-10-15 07:44:57', '2024-10-15 09:27:23', '2024-10-15 09:27:23'),
(4, '644f83ff-2fa9-41f6-805d-8e5fa3746a29', '8bd82534-7a74-43ed-9918-678a0b6fe431', 'asd', '<p>ads</p>', 'level1', 0, '2024-10-15 09:26:52', '2024-10-15 09:27:11', '2024-10-15 09:27:11'),
(5, '141d4ee6-1378-4045-9998-7891856b377b', '8bd82534-7a74-43ed-9918-678a0b6fe431', 'dfg', '<p>dfg</p>', 'level1', 0, '2024-10-15 09:28:21', '2024-10-15 09:28:21', NULL),
(6, 'e5c31992-b8d4-4880-9a15-fa4cb7a323fc', '870139e0-73de-41d3-ba94-0d3328622127', 'Introduction to English Language Learning', '<p>Discover the significance of learning English in today’s world. Explore the course objectives and learn about the various dialects and variations of English spoken globally.</p>', 'level1', 1, '2024-10-15 11:43:30', '2024-10-16 09:11:16', NULL),
(7, '719e55d6-3371-41ba-b2c5-7982fa0e7448', '870139e0-73de-41d3-ba94-0d3328622127', 'English Grammar Essentials', '<p>Familiarize yourself with the fundamental rules of English grammar, including sentence structure, verb tenses, and parts of speech. This chapter lays the groundwork for effective communication.</p>', 'level1', 2, '2024-10-15 11:43:44', '2024-10-16 09:11:24', NULL),
(8, 'db3c304d-e3eb-454c-9d56-7e2ccc960d7f', '870139e0-73de-41d3-ba94-0d3328622127', 'Expanding Vocabulary', '<p>Learn techniques for building your English vocabulary. Explore thematic word lists, idiomatic expressions, and strategies for remembering new words through context and usage.</p>', 'level1', 3, '2024-10-15 11:44:01', '2024-10-16 09:11:27', NULL),
(9, '4327f885-0411-4d10-bf8b-e74fa95437a8', '870139e0-73de-41d3-ba94-0d3328622127', 'Mastering Pronunciation', '<p>Improve your pronunciation with targeted exercises focusing on difficult sounds and word stress. Engage in listening activities to develop your ability to recognize and reproduce accurate pronunciation.</p>', 'level1', 4, '2024-10-15 11:44:16', '2024-10-16 09:11:30', NULL),
(10, 'c40d05be-655d-4b39-a026-40c2e4c5a948', '870139e0-73de-41d3-ba94-0d3328622127', 'Developing Conversational Skills', '<p>Practice everyday conversations and dialogues to enhance your speaking skills. Focus on greetings, small talk, asking questions, and expressing opinions in various social contexts.</p>', 'level1', 5, '2024-10-15 11:44:29', '2024-10-16 09:11:42', NULL),
(11, '58bd1583-642b-43bc-84a7-89d63691efed', '870139e0-73de-41d3-ba94-0d3328622127', 'Listening Comprehension Strategies', '<p>Enhance your listening skills with exercises featuring diverse audio clips. Learn to understand different accents, speeds, and contexts through guided practice.</p>', 'level2', 1, '2024-10-15 11:44:46', '2024-10-16 09:11:50', NULL),
(12, '153e262a-b0e5-4ec5-93d7-551374b29470', '870139e0-73de-41d3-ba94-0d3328622127', 'Reading and Comprehension Techniques', '<p>Develop effective reading strategies to improve comprehension. Practice skimming, scanning, and analyzing various texts, including articles, stories, and reports.</p>', 'level2', 2, '2024-10-15 11:45:00', '2024-10-16 09:12:01', NULL),
(13, '2bcc3566-8c3d-4258-baed-f6b1c10a4816', '870139e0-73de-41d3-ba94-0d3328622127', 'Writing Skills Development', '<p>Learn the essentials of writing in English, from crafting sentences to structuring paragraphs and essays. Focus on clarity, coherence, and the writing process, including drafting and editing.</p>', 'level3', 1, '2024-10-15 11:45:16', '2024-10-16 09:12:07', NULL),
(14, '66a181a8-9a95-4118-ba55-14d938c32692', '870139e0-73de-41d3-ba94-0d3328622127', 'Understanding English Culture and Context', '<p>Explore cultural nuances and social norms in English-speaking countries. Understand the significance of context, idioms, and references that influence communication.</p>', 'level3', 2, '2024-10-15 11:45:32', '2024-10-16 09:12:24', NULL);

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
  `order_number` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_chapter_points`
--

INSERT INTO `course_chapter_points` (`id`, `uuid`, `course_uuid`, `chapter_uuid`, `title`, `short_description`, `file`, `file_type`, `video_url`, `order_number`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'd73895dc-a478-4703-bae5-06829732238f', NULL, 'f9ecdef4-b63b-414a-96e8-f65ed7c03f2e', 'Information About Technology', '<p>About Information Technology</p>', '', 'pdf', 'https://www.youtube.com/watch?v=SqcY0GlETPk', 0, '2024-10-15 07:24:26', '2024-10-15 07:56:53', '2024-10-15 07:56:53'),
(2, '1ea4e217-0a8a-4554-bc2a-c15afa044320', NULL, 'f9ecdef4-b63b-414a-96e8-f65ed7c03f2e', 'Attechment to learn new', '<p>sdfsdf</p>', '1728977448698-1571.pdf', 'pdf', '', 0, '2024-10-15 07:30:48', '2024-10-15 07:43:41', '2024-10-15 07:43:41'),
(3, '78db9991-c58b-4fe6-a1af-8cca65071d0f', NULL, '58729156-2e94-4d45-9c12-6203eab717c1', 'sdf', '<p>sdf</p>', '', 'pdf', 'sdf', 0, '2024-10-15 07:45:28', '2024-10-15 07:45:52', '2024-10-15 07:45:52'),
(4, '5084c986-126d-47e7-91ea-252e65ca58e0', NULL, '58729156-2e94-4d45-9c12-6203eab717c1', 'sdf', '<p>sdf</p>', '1728978343907-5080.pdf', 'pdf', '', 0, '2024-10-15 07:45:43', '2024-10-15 07:45:48', '2024-10-15 07:45:48'),
(5, 'dbb47ed9-8326-454f-a72d-b98c0007be9b', NULL, '58729156-2e94-4d45-9c12-6203eab717c1', 'asd', '<p>asd</p>', '1728978632351-5422.pdf', 'pdf', 'asd', 0, '2024-10-15 07:50:32', '2024-10-15 07:57:07', '2024-10-15 07:57:07'),
(6, '4503fbe4-a9ff-4570-b7c0-eb458f7bc263', NULL, 'f9ecdef4-b63b-414a-96e8-f65ed7c03f2e', 'sdf', '<p>sdf</p>', '1728979003490-9805.pdf', 'pdf', '', 0, '2024-10-15 07:56:43', '2024-10-15 07:56:48', '2024-10-15 07:56:48'),
(7, 'dcc7e977-c560-4b13-a401-b59dba3a6f16', NULL, '644f83ff-2fa9-41f6-805d-8e5fa3746a29', 'asd', '<p>asd</p>', '1728984422586-9384.pdf', 'pdf', 'asd', 0, '2024-10-15 09:27:02', '2024-10-15 09:27:11', '2024-10-15 09:27:11'),
(8, '7d67eda6-3b8d-45cb-9201-413901642489', NULL, '141d4ee6-1378-4045-9998-7891856b377b', 'df', '<p>df</p>', '', 'pdf', 'dfg', 1, '2024-10-15 09:28:27', '2024-10-16 11:45:32', NULL),
(9, 'ae7c9b12-96ba-4af6-a670-034a661ca6d0', NULL, '141d4ee6-1378-4045-9998-7891856b377b', 'sdf', '<p>dsfsdf</p>', '', 'pdf', 'fsd', 0, '2024-10-15 09:28:32', '2024-10-15 09:28:35', '2024-10-15 09:28:35'),
(10, '8d8dc507-4d1e-4390-8421-f7ed24b343a5', NULL, '141d4ee6-1378-4045-9998-7891856b377b', 'sdf', '<p>asd</p>', '1729079122898-8241.pdf', 'pdf', '', 2, '2024-10-16 11:45:22', '2024-10-16 11:45:36', NULL);

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
(11, '371034d7-d7fb-4bf5-976e-91bbbf7c4e26', 'How do I report an issue or bug?', 'If you encounter any issues or bugs while using our service, please report them through the \"Help Center\" or email us at [support email]. Our team will address the issue as soon as possible.', '2024-09-14 17:19:18', '2024-09-14 17:19:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_applicants`
--

CREATE TABLE `job_applicants` (
  `id` int(11) NOT NULL,
  `uuid` varchar(131) NOT NULL DEFAULT uuid(),
  `job_post_uuid` varchar(255) NOT NULL,
  `user_uuid` varchar(255) DEFAULT NULL,
  `status` enum('pending','accept','reject') DEFAULT 'pending',
  `reason` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applicants`
--

INSERT INTO `job_applicants` (`id`, `uuid`, `job_post_uuid`, `user_uuid`, `status`, `reason`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '69d402c0-a4da-4627-ab20-c8589a6c6d7e', '6068bac4-4487-4575-aa2b-ca46c37ff663', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'pending', '', '2024-10-24 06:28:00', '2024-10-24 06:28:00', NULL),
(2, 'f87ed1ea-2b50-4185-9f22-8520f00ad730', '6d099378-d4df-40f7-8e10-1af59db8fcde', '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'pending', '', '2024-10-24 06:47:49', '2024-10-24 06:47:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `id` int(11) NOT NULL,
  `uuid` varchar(211) NOT NULL,
  `agent_uuid` varchar(211) NOT NULL,
  `jobType` enum('Full-time','Part-time','Temporary/Contract','Internship') DEFAULT 'Full-time',
  `country` varchar(255) DEFAULT NULL,
  `jobRole` varchar(255) DEFAULT NULL,
  `salaryMin` int(11) DEFAULT NULL,
  `salaryMax` int(11) DEFAULT NULL,
  `experienceRequired` int(11) DEFAULT NULL,
  `educationLevel` varchar(255) DEFAULT NULL,
  `workPermit` enum('Employment Visa (ECR)','Employment Visa (ECNR)') DEFAULT NULL,
  `overtime` tinyint(1) DEFAULT NULL,
  `accommodation` tinyint(1) DEFAULT NULL,
  `transportation` tinyint(1) DEFAULT NULL,
  `food` varchar(255) DEFAULT NULL,
  `medicalInsurance` tinyint(1) DEFAULT NULL,
  `workHours` varchar(255) DEFAULT NULL,
  `agentCharges` varchar(255) DEFAULT NULL,
  `skillsRequired` varchar(255) DEFAULT NULL,
  `applicationDeadline` date DEFAULT NULL,
  `job_post_end_date` datetime NOT NULL,
  `description` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`id`, `uuid`, `agent_uuid`, `jobType`, `country`, `jobRole`, `salaryMin`, `salaryMax`, `experienceRequired`, `educationLevel`, `workPermit`, `overtime`, `accommodation`, `transportation`, `food`, `medicalInsurance`, `workHours`, `agentCharges`, `skillsRequired`, `applicationDeadline`, `job_post_end_date`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '6068bac4-4487-4575-aa2b-ca46c37ff663', 'b4f39817-8830-4f9c-9e26-f0eaf745ca5d', 'Full-time', 'Canada', 'Professor', 2400, 2500, 2, 'PHD', 'Employment Visa (ECR)', 1, 1, 1, 'As Per Laber law', 1, '120', '20 Dollers', 'Communications', '2024-10-31', '2024-10-24 13:00:00', '<p>Need Skilled Person for provide tuitions of physics </p>', '2024-10-24 05:22:08', '2024-10-24 07:14:19', NULL),
(2, '6d099378-d4df-40f7-8e10-1af59db8fcde', 'b4f39817-8830-4f9c-9e26-f0eaf745ca5d', 'Full-time', 'Canada', 'Software Deveoper', 55, 65, 12, 'PHD', 'Employment Visa (ECR)', 0, 1, 1, 'As Per Law', 1, '240', '00', 'Data Management', '2024-12-12', '2024-11-12 00:00:00', '<p>Role for data management</p>', '2024-10-24 05:44:46', '2024-10-24 05:44:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id` int(11) NOT NULL,
  `uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` enum('consultant','tours_travels','job_post') DEFAULT 'consultant',
  `leadLimit` varchar(211) DEFAULT NULL,
  `teamLimit` varchar(211) DEFAULT NULL,
  `jobPostLimit` varchar(211) DEFAULT '0',
  `job_post_days` varchar(211) NOT NULL DEFAULT '0',
  `price` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`id`, `uuid`, `name`, `description`, `category`, `leadLimit`, `teamLimit`, `jobPostLimit`, `job_post_days`, `price`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'c59ea2eb-a47d-4dcb-932f-5456eb496d54', 'Basic Package', 'Basic package with 20 leads ', 'consultant', '20', NULL, NULL, '0', '2000.00', '2024-10-23 03:49:43', '2024-10-23 06:56:48', '2024-10-23 06:56:48'),
(2, '90ffd82a-c11f-46b3-b161-699ef28dd5d2', 'Information', 'infop', 'consultant', '30', NULL, NULL, '0', '12000.00', '2024-10-23 04:03:05', '2024-10-23 07:00:04', '2024-10-23 07:00:04'),
(3, '9dd66ebd-bd66-4063-ab70-bb779bea4afd', 'asd', 'asd', 'job_post', '23', '3', '12', '25', '120.00', '2024-10-23 05:10:38', '2024-10-23 07:00:10', '2024-10-23 07:00:10'),
(4, 'ef78613e-5ea5-4fba-8c5a-c002b873e2ed', 'asd', 'asd', 'job_post', '22', NULL, '0', '0', '0.00', '2024-10-23 05:20:59', '2024-10-23 07:00:02', '2024-10-23 07:00:02'),
(5, '13ba0dcf-f12b-4364-9336-6047df742c45', 'LOL', 'LOL', 'job_post', '222', '1', '23', '50', '230.00', '2024-10-23 05:21:50', '2024-10-23 06:56:51', '2024-10-23 06:56:51'),
(6, '2753d7f9-a87a-49c6-9fdc-1ec611b45d1e', 'Intro Pack', 'Introduction pack', 'consultant', '20', '4', '20', '120', '0.00', '2024-10-23 06:34:51', '2024-10-23 07:00:07', '2024-10-23 07:00:07'),
(7, '80c5d78e-1007-4def-9364-36c01d577c0a', 'asd', '23', 'consultant', '23', '23', '23', '23', '0.00', '2024-10-23 06:35:11', '2024-10-23 07:00:11', '2024-10-23 07:00:11'),
(8, '593920df-fdcd-468c-98a9-a36e93b43e81', 'asd', '23', 'consultant', '23', '23', '23', '23', '0.00', '2024-10-23 06:36:11', '2024-10-23 06:56:54', '2024-10-23 06:56:54'),
(9, '7cd4fe5a-37f6-4f20-a823-aa874054834b', 'Intro Pack', 'Basic intro pack', 'consultant', '50', '0', '0', '', '200.00', '2024-10-23 07:00:48', '2024-10-23 07:05:33', '2024-10-23 07:05:33'),
(10, '6f4fa991-1d9f-45b8-9410-34e5f8a65e5d', 'ss', '22', 'consultant', '22', '22', '22', '22', '0.00', '2024-10-23 07:03:18', '2024-10-23 07:05:34', '2024-10-23 07:05:34'),
(11, '3e9f2ca2-e8df-41cb-93ad-28ee8cfd7d73', 'Sweet Twenty', 'Sweet Twenty', 'consultant', '20', '20', '20', '20', '22', '2024-10-23 07:06:05', '2024-10-23 07:11:08', NULL),
(12, '9aa9c8b0-c48b-44e0-b261-f4f79f8fc390', 's', '2', 'consultant', '2', '2', '2', '2', '2', '2024-10-23 07:09:47', '2024-10-23 07:09:51', '2024-10-23 07:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `uuid` varchar(211) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `options` text DEFAULT NULL,
  `right_answer` enum('a','b','c','d') DEFAULT NULL,
  `quiz_uuid` varchar(255) DEFAULT NULL,
  `course_uuid` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `level` enum('level1','level2','level3') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `uuid`, `question_text`, `options`, `right_answer`, `quiz_uuid`, `course_uuid`, `createdAt`, `updatedAt`, `deletedAt`, `level`, `created_at`, `updated_at`) VALUES
(2, '7eba1b45-a178-4d9d-965b-3248a5670a4b', 'asd', '{\"a\":\"asd\",\"b\":\"asd\",\"c\":\"asd\",\"d\":\"asd\"}', 'a', NULL, '870139e0-73de-41d3-ba94-0d3328622127', '2024-10-16 10:14:18', '2024-10-16 10:14:18', NULL, 'level2', '2024-10-16 10:14:18', '2024-10-16 10:14:18'),
(4, 'b28341ec-b357-4f86-aef0-fcdc482a0b87', 'In which language is Node.js written?', '{\"a\":\"JavaScript\",\"b\":\"C\",\"c\":\"C++\",\"d\":\"All of the above\"}', 'b', NULL, '870139e0-73de-41d3-ba94-0d3328622127', '2024-10-16 10:31:29', '2024-10-16 10:31:29', NULL, 'level1', '2024-10-16 10:31:29', '2024-10-16 10:31:29'),
(6, '424e5cf7-d2e7-4246-a5b7-cba0bec22566', 'Which of the following extension is used to save the Node.js files?', '{\"a\":\".js\",\"b\":\".node\",\"c\":\".java\",\"d\":\".txt\"}', 'c', NULL, '870139e0-73de-41d3-ba94-0d3328622127', '2024-10-16 10:35:34', '2024-10-16 10:36:23', '2024-10-16 10:36:23', 'level1', '2024-10-16 10:35:34', '2024-10-16 10:36:23');

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
(1, 'dc723b67-9ef8-4844-854d-7b9b65906d45', 'GlobalConnect SIM', 'Multi-country compatibility, supports 5G networks, dual SIM capability', 'https://example.com/globalconnect-sim', '2024-09-15 12:06:44', '2024-09-15 15:04:37', NULL),
(2, 'e36f262a-36e0-44c5-8fd5-306641ecc884', 'SpeedMax SIM', 'Fast 4G/5G data, nano SIM format, ideal for heavy data users', 'https://example.com/speedmax-sim', '2024-09-15 12:07:05', '2024-09-15 15:04:55', NULL),
(3, '4a09fbd0-4b03-4608-bf44-b7da4d73d326', 'TravelBuddy SIM', 'International roaming, supports over 200 countries, prepaid with long validity', 'https://example.com/travelbuddy-sim', '2024-09-15 15:05:14', '2024-09-15 15:05:14', NULL),
(4, '2de97c0f-5ce7-4aaa-afd4-d3907aaaeefc', 'ConnectNow SIM', 'Ready for instant activation, eSIM compatible, wide network coverage', 'https://example.com/connectnow-sim', '2024-09-15 15:05:29', '2024-09-15 15:05:29', NULL),
(5, '23dfd305-87c2-454e-8429-e39fe415a4de', 'SmartChoice SIM', 'Embedded SIM option, supports multiple devices, excellent for IoT solutions', 'https://example.com/smartchoice-sim', '2024-09-15 15:05:44', '2024-09-15 15:05:44', NULL),
(6, '1d05f627-7c59-4ba7-8c86-5c1fb73d7fca', 'EasyLink SIM', 'Plug-and-play, triple cut (standard, micro, nano), supports 4G VoLTE', 'https://example.com/easylink-sim', '2024-09-15 15:06:02', '2024-09-15 15:06:02', NULL),
(7, 'd7400343-316c-4e54-8bfa-b8edab988a9c', 'sedfrsdf', 'sdfsdf', 'https://www.google.com', '2024-09-24 17:34:34', '2024-10-16 11:35:19', '2024-10-16 11:35:19');

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
(1, 'def934bd-5676-48f4-a6b9-468a76b3799c', 'About Us', 'about_us', '<h3>About Us</h3><p>At <strong>Visa Insiders</strong>, we are dedicated to simplifying the visa application process for travelers, professionals, and families. With years of experience in the immigration and travel industry, our team of experts provides personalized guidance and up-to-date information to help you navigate the often complex and confusing visa procedures.</p><p>Whether you\'re planning a vacation, moving abroad for work, or seeking educational opportunities in another country, we are here to ensure a smooth and hassle-free experience. Our services are designed to cater to individuals, businesses, and educational institutions, offering tailored visa solutions based on your unique needs.</p><p>We pride ourselves on delivering exceptional customer service, providing accurate visa information, and assisting with document preparation to ensure your application is successful. Our user-friendly platform allows you to explore visa options, submit your documents, and track your application status effortlessly.</p><p>At <strong>Visa Insiders</strong>, we believe in transparency, efficiency, and reliability. Our mission is to make international travel and relocation accessible to everyone, no matter your destination.</p><p><strong>Why Choose Us?</strong></p><ul><li><strong>Expert Guidance</strong>: Our team of visa specialists offers comprehensive support every step of the way.</li><li><strong>Personalized Solutions</strong>: We customize our services based on your specific requirements and destination.</li><li><strong>Up-to-date Information</strong>: We stay informed on the latest visa regulations to ensure you have the most accurate information.</li><li><strong>Seamless Experience</strong>: From application submission to approval, we streamline the entire process for you.</li></ul><p>Let us take the stress out of your visa application, so you can focus on your journey ahead.</p><p><strong>Contact Us</strong> today to begin your visa process with the experts at <strong>Visa Insiders</strong>.</p>', '2024-09-16 02:11:08', '2024-09-16 02:11:08', NULL),
(2, 'c53c6f69-c5d5-453f-9de5-8c4aa890b00e', 'Terms & Conditions', 'tnc', '<h3>Terms and Conditions</h3><p>Welcome to <strong>Visa Insiders</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, you should not use our website or services.</p><h4>1. <strong>General</strong></h4><p>By using our website, you warrant that you are at least 18 years of age and that you agree to abide by all applicable laws and regulations. Visa Insiders reserves the right to modify these terms at any time without prior notice. Continued use of the website following any changes signifies your acceptance of the new terms.</p><h4>2. <strong>Services</strong></h4><p>Visa Insiders provides visa consultation, application assistance, and related services. We are not affiliated with any government agency or embassy, and we do not have the authority to issue visas. Our role is to assist clients with the visa application process by providing information and guidance. The decision to issue a visa is at the sole discretion of the relevant government authorities.</p><h4>3. <strong>Use of Information</strong></h4><p>The content provided on this website is for general information purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or suitability of the information contained on this website. Any reliance you place on such information is strictly at your own risk.</p><h4>4. <strong>User Responsibilities</strong></h4><p>As a user of our website, you agree:</p><ul><li>To provide accurate, current, and complete information when prompted by any registration form or during the use of our services.</li><li>Not to impersonate any person or entity or provide false information.</li><li>Not to use our website or services for illegal activities, including but not limited to fraud, hacking, or violating any laws in your jurisdiction.</li><li>To safeguard any account credentials and notify us immediately of any unauthorized use of your account.</li></ul><h4>5. <strong>Fees and Payments</strong></h4><p>Our services may require payment of fees. By using our services, you agree to pay all fees associated with the services you select. Payments must be made through the available payment methods provided on the website. Visa Insiders reserves the right to update fees or add new fees at any time, and you will be informed of such changes in advance.</p><h4>6. <strong>Refund Policy</strong></h4><p>Refunds for services provided by Visa Insiders will be considered on a case-by-case basis and are not guaranteed. Once a visa application has been submitted or services have been rendered, fees paid are generally non-refundable. Please contact us directly for refund inquiries.</p><h4>7. <strong>Intellectual Property</strong></h4><p>All content, logos, trademarks, and data displayed on this website, including text, images, and design, are the property of Visa Insiders or its licensors. You may not use, copy, distribute, or reproduce any materials from this website without prior written consent.</p><h4>8. <strong>Third-Party Links</strong></h4><p>Our website may contain links to third-party websites or services. These links are provided for convenience, and Visa Insiders is not responsible for the content or practices of any linked third-party sites. Accessing any third-party website from our platform is at your own risk.</p><h4>9. <strong>Limitation of Liability</strong></h4><p>Visa Insiders shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. We do not guarantee the accuracy, completeness, or reliability of any information provided and are not responsible for any errors or omissions.</p><h4>10. <strong>Indemnification</strong></h4><p>You agree to indemnify and hold harmless Visa Insiders, its affiliates, directors, employees, and agents from any claims, damages, or expenses (including legal fees) arising out of your use of our website or services, your violation of these Terms and Conditions, or your violation of any rights of a third party.</p><h4>11. <strong>Termination</strong></h4><p>Visa Insiders reserves the right to terminate your access to the website and services at any time, without notice, for any reason, including but not limited to a breach of these Terms and Conditions.</p><h4>12. <strong>Governing Law</strong></h4><p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles. Any legal disputes arising from your use of the website shall be resolved in the courts of [Your Jurisdiction].</p><h4>13. <strong>Contact Us</strong></h4><p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p><p><strong>Email</strong>: support@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:11:46', '2024-09-16 02:11:46', NULL),
(3, 'dc1a8b0d-6dd5-4ab9-b65a-26b04d8007fa', 'Privacy & Policy', 'pnp', '<p>At <strong>Visa Insiders</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services. By using our website, you agree to the collection and use of your information in accordance with this policy.</p><h4>1. <strong>Information We Collect</strong></h4><p>We collect several types of information to provide and improve our services to you, including:</p><ul><li><strong>Personal Information</strong>: When you register, fill out forms, or contact us, we may collect personal details such as your name, email address, phone number, nationality, and other relevant information necessary for visa application processing.</li><li><strong>Payment Information</strong>: If you use our paid services, we collect billing information such as your credit card details, which are processed through secure third-party payment gateways.</li><li><strong>Usage Data</strong>: We may collect information about how you access and use our website, such as your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.</li><li><strong>Cookies and Tracking</strong>: We use cookies and similar tracking technologies to monitor activity on our website and store certain information. You can modify your browser settings to refuse cookies or to alert you when cookies are being sent.</li></ul><h4>2. <strong>How We Use Your Information</strong></h4><p>We use the collected information for a variety of purposes, including:</p><ul><li><strong>Providing Services</strong>: To process visa applications, offer consultation services, and manage customer support.</li><li><strong>Payment Processing</strong>: To handle transactions securely and efficiently.</li><li><strong>Communication</strong>: To send you important updates, respond to inquiries, and provide relevant visa-related information.</li><li><strong>Improvement and Personalization</strong>: To improve our website’s functionality, provide personalized user experiences, and analyze website usage.</li><li><strong>Legal Compliance</strong>: To comply with any applicable laws, regulations, or legal processes.</li></ul><h4>3. <strong>How We Share Your Information</strong></h4><p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following situations:</p><ul><li><strong>Service Providers</strong>: We may share your personal information with trusted third-party service providers (e.g., payment processors, hosting services, and visa processing partners) to assist us in operating our website and providing services to you.</li><li><strong>Legal Obligations</strong>: We may disclose your personal information if required by law, such as in response to a subpoena, or to protect the rights, property, or safety of Visa Insiders or others.</li><li><strong>Business Transfers</strong>: If Visa Insiders is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li></ul><h4>4. <strong>Data Security</strong></h4><p>We take data security seriously and implement appropriate measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.</p><h4>5. <strong>Retention of Data</strong></h4><p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. When your personal data is no longer needed, we will securely delete or anonymize it.</p><h4>6. <strong>Your Privacy Rights</strong></h4><p>Depending on your location, you may have certain rights regarding your personal data, including:</p><ul><li><strong>Access</strong>: You can request access to the personal information we hold about you.</li><li><strong>Correction</strong>: You can ask us to correct or update your personal information if it’s inaccurate or incomplete.</li><li><strong>Deletion</strong>: You can request the deletion of your personal data under certain conditions.</li><li><strong>Opt-Out</strong>: You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those emails.</li></ul><p>To exercise any of these rights, please contact us at the email address provided below.</p><h4>7. <strong>Third-Party Links</strong></h4><p>Our website may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices of such websites, and we encourage you to review the privacy policies of any third-party sites you visit.</p><h4>8. <strong>Children’s Privacy</strong></h4><p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that a child under 18 has provided us with personal information, we will take steps to delete such data.</p><h4>9. <strong>Changes to This Privacy Policy</strong></h4><p>We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on our website. You are encouraged to review this Privacy Policy periodically for any updates.</p><h4>10. <strong>Contact Us</strong></h4><p>If you have any questions or concerns about this Privacy Policy, or if you would like to exercise any of your privacy rights, please contact us at:</p><p><strong>Email</strong>: privacy@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:12:34', '2024-09-16 02:12:34', NULL),
(4, 'c925e31e-775b-4a29-8946-2ddfdb55a95f', 'Return & Refund Policy', 'return_refund_policy', '<h3>Return and Refund Policy</h3><p>At <strong>Visa Insiders</strong>, we strive to provide exceptional service and customer satisfaction. However, we understand that there may be instances where you may request a refund. This Return and Refund Policy outlines the conditions under which refunds may be issued.</p><h4>1. <strong>Services and Non-Refundable Items</strong></h4><p>Due to the nature of the services we provide, <strong>Visa Insiders</strong> does not typically offer refunds once visa processing has commenced or services have been rendered. This includes:</p><ul><li>Consultation services</li><li>Visa application preparation and submission</li><li>Documentation review and advice</li><li>Any other professional services provided by Visa Insiders</li></ul><p>Once these services have been initiated or completed, refunds are generally not applicable.</p><h4>2. <strong>Eligibility for Refunds</strong></h4><p>Refunds may be considered on a case-by-case basis under the following conditions:</p><ul><li><strong>Payment Error</strong>: If you were charged incorrectly or for services you did not receive, we will refund the erroneous charge.</li><li><strong>Service Not Provided</strong>: If, due to unforeseen circumstances, Visa Insiders is unable to deliver the agreed-upon service, we will issue a refund for the unprovided service.</li><li><strong>Duplicate Payment</strong>: If you are accidentally charged multiple times for the same service, we will refund the duplicate charges.</li></ul><h4>3. <strong>Refund Request Process</strong></h4><p>To request a refund, please follow these steps:</p><ol><li><strong>Contact Us</strong>: Email us at refunds@visainsiders.com or call us at +[Phone Number] to submit your refund request. Please provide your full name, payment details, and a description of the issue.</li><li><strong>Review</strong>: Once we receive your request, we will review it within 7 business days. During this time, we may contact you for additional information if necessary.</li><li><strong>Approval</strong>: If your refund is approved, we will notify you via email and process the refund within 14 business days. Refunds will be issued to the original method of payment.</li></ol><h4>4. <strong>Refund Timeframe</strong></h4><p>After approval, refunds are typically processed within 14 business days. The exact time for the refund to reflect in your account depends on your payment provider. If the refund has not been credited within the expected timeframe, please check with your bank or credit card company before contacting us.</p><h4>5. <strong>Non-Refundable Circumstances</strong></h4><p>Please note that we cannot offer refunds in the following cases:</p><ul><li><strong>Visa Denial</strong>: We are not responsible for visa denial decisions made by embassies or consulates, and therefore, we cannot offer refunds for such outcomes.</li><li><strong>Client Errors</strong>: Refunds will not be provided if incorrect or incomplete information is supplied by the client, resulting in delays, errors, or visa denials.</li><li><strong>Change of Mind</strong>: If you change your mind after services have been initiated, refunds will not be applicable.</li></ul><h4>6. <strong>Dispute Resolution</strong></h4><p>If you believe your refund request was handled unfairly, you may reach out to our customer service team for further review. We are committed to ensuring that all disputes are resolved fairly and efficiently.</p><h4>7. <strong>Contact Us</strong></h4><p>If you have any questions regarding this Return and Refund Policy, or need assistance with a refund request, please contact us:</p><p><strong>Email</strong>: refunds@visainsiders.com</p><p><strong>Phone</strong>: +[Phone Number]</p><p><strong>Address</strong>: [Your Company Address]</p>', '2024-09-16 02:13:22', '2024-09-16 02:13:22', NULL),
(5, '86eda044-7de4-44a1-98c0-f9cba569795b', 'sdf', 'sdf', '<p>sdf</p>', '2024-09-16 02:13:29', '2024-09-16 02:13:31', '2024-09-16 02:13:31'),
(6, '20255911-db9e-4d30-91e5-e7a87255de08', 'US policy', 'us_policy', '<p>asdasdasd</p>', '2024-09-24 17:35:10', '2024-09-24 17:35:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_basic_details`
--

CREATE TABLE `student_basic_details` (
  `id` int(11) NOT NULL,
  `uuid` varchar(211) NOT NULL DEFAULT uuid(),
  `student_uuid` varchar(211) NOT NULL,
  `study_abroad_intentions` enum('Yes','No') DEFAULT NULL,
  `study_abroad_reasons` text DEFAULT NULL,
  `field_of_study` varchar(255) DEFAULT NULL,
  `degree_level` enum('Bachelor''s','Master''s','Ph.D.') DEFAULT NULL,
  `career_goals` text DEFAULT NULL,
  `preferred_job_roles` text DEFAULT NULL,
  `course_selection` varchar(255) DEFAULT NULL,
  `program_duration` varchar(255) DEFAULT NULL,
  `test_scores` tinyint(1) DEFAULT 0,
  `test_score_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_score_details`)),
  `preferred_country` varchar(255) DEFAULT NULL,
  `university_preferences` text DEFAULT NULL,
  `scholarship_requirements` tinyint(1) DEFAULT 0,
  `scholarship_preferences` text DEFAULT NULL,
  `budget` varchar(255) DEFAULT NULL,
  `academic_performance` varchar(255) DEFAULT NULL,
  `language_proficiency_scores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`language_proficiency_scores`)),
  `work_experience` tinyint(1) DEFAULT 0,
  `work_experience_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`work_experience_details`)),
  `interested_in_internships` tinyint(1) DEFAULT 0,
  `preferred_internship_roles` text DEFAULT NULL,
  `visa_type` enum('Student Visa','Work Visa') DEFAULT NULL,
  `accommodation_needs` tinyint(1) DEFAULT 0,
  `accommodation_preferences` text DEFAULT NULL,
  `health_insurance_needs` tinyint(1) DEFAULT 0,
  `extracurricular_interests` text DEFAULT NULL,
  `previous_applications` tinyint(1) DEFAULT 0,
  `previous_application_details` text DEFAULT NULL,
  `interested_in_part_time_jobs` tinyint(1) DEFAULT 0,
  `interested_in_language_courses` tinyint(1) DEFAULT 0,
  `application_documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`application_documents`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `uuid` char(36) DEFAULT uuid(),
  `agent_uuid` char(36) NOT NULL,
  `package_uuid` char(36) NOT NULL,
  `leads_remaining` int(11) DEFAULT 0,
  `team_member_limit` int(11) DEFAULT 1,
  `job_post_limit` int(11) DEFAULT 0,
  `job_post_start_date` date NOT NULL,
  `job_post_end_date` datetime NOT NULL,
  `subscription_start_date` datetime DEFAULT current_timestamp(),
  `status` enum('active','expired') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `uuid`, `agent_uuid`, `package_uuid`, `leads_remaining`, `team_member_limit`, `job_post_limit`, `job_post_start_date`, `job_post_end_date`, `subscription_start_date`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'fe6088fc-f229-47f5-924b-db1b83321176', 'b4f39817-8830-4f9c-9e26-f0eaf745ca5d', '3e9f2ca2-e8df-41cb-93ad-28ee8cfd7d73', 20, 1, 1, '2024-10-23', '2024-10-24 04:00:00', '2024-10-23 07:20:36', 'active', '2024-10-23 07:20:36', '2024-10-24 06:13:17', NULL);

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
(7, 'e2a90b35-6b8d-4daa-84ba-87f246344ad2', 'Keval', 'keval', '1727199348512-7629.mp4', 'video', '2024-09-24 17:35:48', '2024-09-24 17:35:48', NULL);

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
(1, '8373f0bb-19bc-4558-80f8-735c418dc2fc', 'Ravi', 'ravi@gmail.com', NULL, '9999999991', '+91', NULL, 1, 'user', '', '0000-00-00 00:00:00', 1, '2024-09-14 17:54:28', '2024-10-24 06:17:32', NULL),
(2, 'cec75014-ae77-44c8-8ed7-76dd97ff9e18', 'Ravi', 'ravi@gmail.com', NULL, '9999999992', '+91', NULL, 1, 'user', '', '0000-00-00 00:00:00', 1, '2024-10-16 12:12:54', '2024-10-16 12:18:47', NULL);

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
(8, '5af64a60-c81d-495b-adfc-27787828afbf', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-15 09:41:36', '2024-10-15 09:41:36', NULL),
(9, '49cd972e-2de9-4660-b10a-b2fc4a799bd9', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-15 09:52:13', '2024-10-15 09:52:13', NULL),
(10, 'd8be65b4-38ce-4e5a-b2fe-081014af17c6', '8373f0bb-19bc-4558-80f8-735c418dc2fc', NULL, NULL, NULL, '2024-10-15 11:46:29', '2024-10-15 11:46:29', NULL);

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
-- Indexes for table `agent`
--
ALTER TABLE `agent`
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
-- Indexes for table `job_applicants`
--
ALTER TABLE `job_applicants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `student_basic_details`
--
ALTER TABLE `student_basic_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
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
-- AUTO_INCREMENT for table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `content_writing_services_responses_files`
--
ALTER TABLE `content_writing_services_responses_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_chapters`
--
ALTER TABLE `course_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `course_chapter_points`
--
ALTER TABLE `course_chapter_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `course_images`
--
ALTER TABLE `course_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `job_applicants`
--
ALTER TABLE `job_applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sim_cards`
--
ALTER TABLE `sim_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `static_content`
--
ALTER TABLE `static_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_basic_details`
--
ALTER TABLE `student_basic_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_devices`
--
ALTER TABLE `user_devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
