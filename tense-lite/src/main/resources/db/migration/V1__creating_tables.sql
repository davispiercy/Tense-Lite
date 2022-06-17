START TRANSACTION;

DROP TABLE IF EXISTS users, projects, assignments, time_entries;

-- `tense-lite`.users definition

CREATE TABLE `users` (
  `id` int DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `enabled` Boolean DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.projects definition

CREATE TABLE `projects` (
  `id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `billable` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.assignments definition

CREATE TABLE `assignments` (
  `user_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `hourly_rate` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.time_entries definition

CREATE TABLE `time_entries` (
  `user_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `description` text,
  `hours` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;