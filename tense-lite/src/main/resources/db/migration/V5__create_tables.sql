START TRANSACTION;

DROP TABLE IF EXISTS users, projects, assignments, time_entries;

-- `tense-lite`.users definition

CREATE TABLE `users` (
  id INT NOT NULL auto_increment,
  uid varchar(50) NOT NULL,
  first_name varchar(120) NOT NULL,
  last_name varchar(120) NOT NULL,
  email varchar(255) NOT NULL,
  sec_group varchar(10) NOT NULL,
  enabled Boolean NULL,
  CONSTRAINT pkey_users_id PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.projects definition

CREATE TABLE `projects` (
  id int NOT NULL auto_increment,
  name varchar(100) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  billable Boolean NULL,
  enabled Boolean NOT NULL,
  CONSTRAINT pkey_projects_id PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.assignments definition

CREATE TABLE `assignments` (
  user_id int DEFAULT NULL,
  project_id int DEFAULT NULL,
  hourly_rate DOUBLE DEFAULT NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  enabled Boolean NOT NULL,
  CONSTRAINT fkey_assignments_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fkey_assignments_project_id FOREIGN KEY (project_id) REFERENCES projects(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `tense-lite`.time_entries definition

CREATE TABLE `time_entries` (
  id int NOT NULL auto_increment,
  user_id INT NULL,
  project_id INT NULL,
  entry_date DATE NULL,
  notes VARCHAR(2000) NULL,
  hours DOUBLE NULL,
  hourly_rate DOUBLE NULL,
  entry_value DOUBLE NULL,
  enabled Boolean NOT NULL,
  CONSTRAINT pkey_time_entries_id PRIMARY KEY (id),
  CONSTRAINT fkey_time_entries_users_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fkey_time_entries_projects_id FOREIGN KEY (project_id) REFERENCES projects(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;