INSERT INTO type (name) VALUES ('putnicko');
INSERT INTO type (name) VALUES ('auto');
INSERT INTO type (name) VALUES ('stambeno');

INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 50.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 100.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 150.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 200.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 250.00);
INSERT INTO price (end_date, start_date, value) VALUES ('11-11-2017 00:00:00', '11-11-2016 00:00:00', 300.00);

INSERT INTO risk (risk_name, price, risk_type) VALUES ('starost', 1, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('region', 4, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('trajanje', 2, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('sport', 3, 1);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('povrsina', 1, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('starost_stana', 2, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('procenjena_vrednost', 6, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('vrsta_osiguranja',1, 2);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('paket', 2, 3);
INSERT INTO risk (risk_name, price, risk_type) VALUES ('vrednost', 6, 1);

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
INSERT INTO subgroup (coefficient, subname, risk) VALUES (2, 'zemljotres', 8);
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

INSERT INTO comment_of_client (client_name, client_surname, comment) VALUES ('John', 'Doe', 'This was an amazing experience for me thanks to Bolt.');
INSERT INTO comment_of_client (client_name, client_surname, comment) VALUES ('Jane', 'Roe', 'We were so safe because of everything Bolt did.');
INSERT INTO comment_of_client (client_name, client_surname, comment) VALUES ('Dragan', 'Torbica', 'Fala ovoj osiguravajućoj kući ko bratu najrođenijem, pogotovo što nisam morao da plaćam u švajcarcima. Smilji, moja dva sina i dijete smo se super proveli i osjećali se sigurno kao u zavičaju.');

