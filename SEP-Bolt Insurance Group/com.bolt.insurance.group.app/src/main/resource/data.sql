INSERT INTO type (name) VALUES ('putnicko');
INSERT INTO type (name) VALUES ('auto');
INSERT INTO type (name) VALUES ('stambeno');

INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 50.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 1000.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 250.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 1100.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 530.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 1700.00);

INSERT INTO risk (risk_name, price, risk_type) VALUES ('starost', 1, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('region', 5, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('trajanje', 2, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('sport', 3, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('povrsina', 2, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('starost_stana', 4, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('procenjena_vrednost', 6, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('vrsta_osiguranja', 5, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('paket', 4, 3);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('vrednost', 4, 1);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'do 18', 1);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (1.5, '18 do 60', 1);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'preko 60', 1);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'EUNA', 2);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'EUNAA', 2);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'WHOLEWORLD', 2);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'Fudbal', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'Biciklizam', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (9, 'Alpinizam', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (6, 'Dzudo', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (5, 'Plivanje', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (5, 'Atletika', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (7, 'Kajak', 4);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (9, 'Paraglajding', 4);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'do 30m2', 5);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, '30m2 do 60m2', 5);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'preko 60m2', 5);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'do 10', 6);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, '10 do 20', 6);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'preko 20', 6);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'do 25000', 7);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, '25000 do 50000', 7);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'preko 50000', 7);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'poplave', 8);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (4, 'zemljotres', 8);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'pljacka', 8);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (4, 'pozar', 8);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'slepanje', 9);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3, 'popravka', 9);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'smestaj', 9);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, 'prevoz', 9);

INSERT INTO subgroup (coefficient, subname, risk) VALUES (1, '10000', 10);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (1.8, '18000', 10);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2.6, '26000', 10);
INSERT INTO subgroup (coefficient, subname, risk) VALUES (3.4, '34000', 10);

INSERT INTO vehicle_type (name) VALUES ('SUV');
INSERT INTO vehicle_type (name) VALUES ('kupe');
INSERT INTO vehicle_type (name) VALUES ('limuzina');
INSERT INTO vehicle_type (name) VALUES ('hecbek');

INSERT INTO insurance_user(address, firstname, jmbg, mail, passport, phone, surname) VALUES ('SS 1', 'Petar', '0802993880018', 'pera@mail.com', '123456789', '1231568', 'Petrovic');
INSERT INTO insurance_user(address, firstname, jmbg, mail, passport, phone, surname) VALUES ('SS 1', 'Marko', '0802000880018', 'marko@mail.com', '133456789', '12901568', 'Petrovic');
INSERT INTO insurance_user(address, firstname, jmbg, mail, passport, phone, surname) VALUES ('SS 1', 'Djoka', '0802943880018', 'djoka@mail.com', '123456389', '12315468', 'Petrovic');

INSERT INTO vehicle(owner_address, brand, chassis, owner_jmbg, owner_name, registration, owner_surname, year_of_production, type) VALUES ('SS 1', 'BMW', '213few','0802993880018', 'Pera', 'RU432', 'Petrovic', 2010, 2);

INSERT INTO home(address, owner_jmbg, owner_name, owner_surname) VALUES ('SS 1', '080993880018', 'Pera', 'Petrovic');
