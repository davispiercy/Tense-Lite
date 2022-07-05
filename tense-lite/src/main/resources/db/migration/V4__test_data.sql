START TRANSACTION;

INSERT INTO `tense-lite`.users
(id, first_name, last_name, email, enabled)
VALUES (1, 'Davis', 'Piercy', 'dpiercy@jahnelgroup.com', false),
(2, 'Dom', 'Favata', 'dfavata@jahnelgroup.com', false),
(3, 'Jory', 'Hutchins', 'jhutchins@jahnelgroup.com', true);

INSERT INTO `tense-lite`.projects
(id, name, start_date, end_date, billable, enabled)
VALUES (1, 'Microsoft', '2022-06-15', '2023-06-15', true, true),
(2, 'Waste Management', '2022-06-06', '2022-06-15', false, true),
(3, 'NASA', '2019-01-01', '2024-12-31', true, true);

INSERT INTO `tense-lite`.assignments
(user_id, project_id, hourly_rate, start_date, end_date, enabled)
VALUES (1, 1, 999.0, '2022-06-15', '2022-07-05', true),
(2, 2, 5.0, '2022-06-06', '2022-06-15', false),
(3, 3, 500.0, '2020-06-15', '2022-07-05', true);

INSERT INTO `tense-lite`.time_entries
(id, user_id, project_id, entry_date, notes, hours, hourly_rate, entry_value, billable, enabled)
VALUES (1,1,1,'2022-06-15', 'Worked on bugs', 8.0, 100.0, 800.0, true, true),
(2,1,1,'2022-06-16', 'Wrote all the code', 7.0, 100.0, 700.0, true, true),
(3,1,1,'2022-06-17', 'Made fun of Dom', 3.0, 100.0, 300.0, true, true);

COMMIT;
