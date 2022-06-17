START TRANSACTION;

TRUNCATE TABLE users;
TRUNCATE TABLE projects;
TRUNCATE TABLE assignments;

INSERT INTO `tense-lite`.users
(id, first_name, last_name, email, `enabled`)
VALUES(100, 'Davis', 'Piercy', 'dpiercy@jahnelgroup.com', false);
INSERT INTO `tense-lite`.users
(id, first_name, last_name, email, `enabled`)
VALUES(101, 'Dom', 'Favata', 'dfavata@jahnelgroup.com', false);
INSERT INTO `tense-lite`.users
(id, first_name, last_name, email, `enabled`)
VALUES(102, 'Jory', 'Hutchins', 'jhutchins@jahnelgroup.com', true);

INSERT INTO `tense-lite`.projects
(id, name, start_date, end_date, billable)
VALUES(1, 'Microsoft', '2022-06-15', '2023-06-15', 1);
INSERT INTO `tense-lite`.projects
(id, name, start_date, end_date, billable)
VALUES(2, 'Waste Management', '2022-06-06', '2022-06-15', 0);
INSERT INTO `tense-lite`.projects
(id, name, start_date, end_date, billable)
VALUES(3, 'NASA', '2019-01-01', '2024-12-31', 1);

INSERT INTO `tense-lite`.assignments
(user_id, project_id, hourly_rate)
VALUES(100, 1, 999);
INSERT INTO `tense-lite`.assignments
(user_id, project_id, hourly_rate)
VALUES(101, 2, 5);
INSERT INTO `tense-lite`.assignments
(user_id, project_id, hourly_rate)
VALUES(102, 3, 500);

COMMIT;
