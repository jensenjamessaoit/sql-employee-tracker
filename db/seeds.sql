INSERT INTO department (name)
VALUES 
("developer"),
("marketing"),
("sales");

INSERT INTO role (title, salary, department_id)
VALUES
("full stack", 50000, 1),
("lead", 100000, 2),
("director",120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("JJ", "Saoit", 1, NULL),
("John", "Doe", 1, 1),
("Ethan", "Smith", 1, 1),
("Lebron", "James", 2, 1),
("Nick", "Bosa", 3, 1),
("Brandon", "Aiyuk", 3, 1);
