

INSERT INTO home(id, address, owner_jmbg, owner_name, owner_surname) VALUES (1, 'Nikolajevska 2', 2301453678396, 'Sasa', 'Matic');
INSERT INTO home(id, address, owner_jmbg, owner_name, owner_surname) VALUES (2, 'Nikolajevska 3', 2301453678323, 'Dejan', 'Matic');
INSERT INTO home(id, address, owner_jmbg, owner_name, owner_surname) VALUES (3, 'Nikolajevska 4', 2301453678334, 'Nikola', 'Matic');

INSERT INTO type(id, name) VALUES (1, 'Putno osiguranje');
INSERT INTO type(id, name) VALUES (2, 'Osiguranje stana i kuce');
INSERT INTO type(id, name) VALUES (3, 'Pomoc na putu');

INSERT INTO price(id, value, end_date, start_date)VALUES (1, 250, '2017-11-26', '2016-11-26');
INSERT INTO price(id, value, end_date, start_date)VALUES (2, 300, '2017-11-26', '2016-11-26');
INSERT INTO price(id, value, end_date, start_date)VALUES (3, 400, '2017-11-26', '2016-11-26');

INSERT INTO risk(id, risk_name, price, risk_type) VALUES (1, 'Region', 1, 1);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (2, 'Starost', 1, 1);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (3, 'Broj osoba', 2, 1);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (4, 'Sport', 3, 1);

INSERT INTO risk(id, risk_name, price, risk_type) VALUES (5, 'Povrsina stana', 1, 2);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (6, 'Starost stana', 1, 2);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (7, 'Procenjena vrednost stana', 1, 2);
INSERT INTO risk(id, risk_name, price, risk_type) VALUES (8, 'Od cega se osigurava', 2, 2);

INSERT INTO risk(id, risk_name, price, risk_type) VALUES (9, 'Paket koji se zeli kupiti', 3, 3);


INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (1, 0.35, 'Evropa i Severna Amerika', 1);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (2, 0.60, 'Evropa, Severna Amerika i Azija', 1);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (3, 0.80, 'Ceo svet', 1);

INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (4, 0.35, 'Do 18 godina', 2);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (5, 0.60, 'Od 18 do 60 godina', 2);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (6, 0.80, 'Preko 60 godina', 2);

INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (7, 0.80, 'Alpsko skijanje', 3);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (8, 0.80, 'Privanje', 3);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (9, 0.80, 'Dzudo', 3);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (10, 0.80, 'Boks', 3);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (11, 0.80, 'Kosarka', 3);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (12, 0.80, 'Fudbal', 3);

INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (13, 0.80, 'Pozar', 8);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (14, 0.80, 'Kradja', 8);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (15, 0.80, 'Poplava', 8);

INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (16, 0.80, 'Slepovanje do odredjene kilometraze', 9);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (17, 0.80, 'Popravka do odredjene cene', 9);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (18, 0.80, 'Smestaj u hotelu', 9);
INSERT INTO subgroup(id, coefficient, subname, risk)VALUES (19, 0.80, 'Alternativni prevoz', 9);

INSERT INTO vehicle_type(id, name)VALUES (1, 'Mercedes');
INSERT INTO vehicle_type(id, name)VALUES (2, 'BMW');
INSERT INTO vehicle_type(id, name)VALUES (3, 'Fiat');
INSERT INTO vehicle_type(id, name)VALUES (4, 'Zastava');
INSERT INTO vehicle_type(id, name)VALUES (5, 'Audi');

    