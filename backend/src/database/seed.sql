TRUNCATE reserva, evento, telefono, cliente, agente, administrador, persona, ciudad, departamento, pais RESTART IDENTITY CASCADE;

INSERT INTO pais (nombre) VALUES
    ('Colombia'),
    ('México'),
    ('Argentina');

INSERT INTO departamento (id_pais, nombre) VALUES
    (1, 'Valle del Cauca'),
    (1, 'Antioquia'),
    (1, 'Cundinamarca'),
    (1, 'Santander'),
    (2, 'Jalisco'),
    (3, 'Buenos Aires');

INSERT INTO ciudad (id_departamento, nombre) VALUES
    (1, 'Tuluá'),
    (1, 'Cali'),
    (1, 'Palmira'),
    (2, 'Medellín'),
    (3, 'Bogotá'),
    (4, 'Bucaramanga'),
    (5, 'Guadalajara'),
    (6, 'Buenos Aires');

INSERT INTO persona (identificacion, nombre, email, clave, direccion, id_ciudad, rol) VALUES
    ('1000111222', 'Mónica Herrera', 'monica.herrera@palco.com', '123456', 'Calle 100 # 15-20', 5, 'administrador'),
    ('1144556677', 'Camila Torres', 'camila.torres@palco.com', '123456', 'Av. 6N # 23-10', 2, 'agente'),
    ('1033221100', 'Felipe Rojas', 'felipe.rojas@palco.com', '123456', 'Cra 7 # 72-30', 5, 'agente'),
    ('1055667788', 'Valentina Ruiz', 'valentina.ruiz@palco.com', '123456', 'Calle 10 # 43-12', 4, 'agente'),
    ('1112345678', 'Laura Gómez', 'laura.gomez@correo.com', '123456', 'Cra 25 # 10-45', 1, 'cliente'),
    ('1098765432', 'Andrés Ruiz', 'andres.ruiz@correo.com', '123456', 'Calle 5 # 38-12', 2, 'cliente'),
    ('1077889900', 'Sofía Vargas', 'sofia.vargas@correo.com', '123456', 'Cra 80 # 33-21', 4, 'cliente'),
    ('1066554433', 'Mateo Sánchez', 'mateo.sanchez@correo.com', '123456', 'Calle 45 # 15-30', 5, 'cliente');

INSERT INTO telefono (identificacion, numero) VALUES
    ('1000111222', '3005556677'),
    ('1144556677', '3002223344'),
    ('1033221100', '3014445566'),
    ('1055667788', '3123334455'),
    ('1112345678', '3101234567'),
    ('1098765432', '3159876543'),
    ('1098765432', '3201112233'),
    ('1077889900', '3187776655'),
    ('1066554433', '3046667788');

INSERT INTO administrador (identificacion, salario, horario) VALUES
    ('1000111222', 6500000, 'Lunes a viernes, 8:00 a 17:00');

INSERT INTO agente (identificacion, comision, experiencia) VALUES
    ('1144556677', 8, 'Cinco años en producción de conciertos'),
    ('1033221100', 10, 'Ocho años en teatro y artes escénicas'),
    ('1055667788', 12, 'Tres años en festivales de música');

INSERT INTO cliente (identificacion, puntos, publicidad) VALUES
    ('1112345678', 120, TRUE),
    ('1098765432', 45, TRUE),
    ('1077889900', 250, FALSE),
    ('1066554433', 75, TRUE);

INSERT INTO evento (id_agente, id_ciudad, nombre, descripcion, teatro, fecha_inicio, fecha_fin, capacidad, precio, observaciones, estado, causa_cancelacion) VALUES
    ('1144556677', 2, 'Noche de Salsa Sinfónica', 'Orquesta sinfónica y grupo de salsa en un mismo escenario.', 'Teatro Jorge Isaacs', '2026-11-21 20:00', '2026-11-21 23:00', 1200, 85000, 'Apertura de puertas una hora antes.', 'En Boletería', NULL),
    ('1033221100', 5, 'Hamlet', 'Montaje de la Compañía Nacional de Teatro.', 'Teatro Colón', '2026-12-05 19:30', '2026-12-05 22:00', 800, 120000, 'No se permite el ingreso una vez iniciada la función.', 'Programado', NULL),
    ('1144556677', 1, 'Stand Up: Risas sin Filtro', 'Noche de comedia con cuatro humoristas invitados.', 'Teatro Municipal de Tuluá', '2026-11-15 20:00', '2026-11-15 22:00', 450, 45000, 'Recomendado para mayores de 16 años.', 'En Vivo', NULL),
    ('1055667788', 4, 'Concierto Filarmónico de Otoño', 'Repertorio clásico con la Orquesta Filarmónica.', 'Teatro Pablo Tobón Uribe', '2026-12-12 18:00', '2026-12-12 20:30', 900, 95000, 'Vestimenta formal sugerida.', 'Programado', NULL),
    ('1144556677', 2, 'El Cascanueces', 'Ballet clásico en dos actos.', 'Teatro Municipal Enrique Buenaventura', '2026-08-22 17:00', '2026-08-22 19:30', 700, 70000, 'Función familiar.', 'Finalizado', NULL),
    ('1033221100', 6, 'Gira Reggae Roots', 'Tres bandas de reggae en una sola noche.', 'Teatro Santander', '2026-09-12 19:00', '2026-09-12 23:00', 1000, 60000, 'Evento cancelado.', 'Cancelado', 'Cierre del escenario por mantenimiento'),
    ('1055667788', 4, 'Festival de Jazz del Pacífico', 'Jornada de jazz con artistas nacionales e invitados.', 'Teatro al Aire Libre Los Cristales', '2026-05-16 18:00', '2026-05-16 23:00', 1500, 80000, 'Evento al aire libre.', 'Finalizado', NULL),
    ('1033221100', 5, 'Rock al Parque Local', 'Festival con bandas de rock de la ciudad.', 'Teatro Jorge Eliécer Gaitán', '2026-03-28 18:00', '2026-03-28 23:00', 2000, 65000, 'Se recomienda llegar temprano.', 'Finalizado', NULL);

INSERT INTO reserva (id_cliente, codigo_evento, fecha, entradas, total, observaciones, estado, causa_cancelacion) VALUES
    ('1112345678', 8, '2026-03-10 11:00', 2, 130000, '', 'Confirmada', NULL),
    ('1098765432', 8, '2026-03-12 15:30', 3, 195000, '', 'Confirmada', NULL),
    ('1077889900', 8, '2026-03-20 09:15', 1, 65000, '', 'Confirmada', NULL),
    ('1112345678', 7, '2026-05-02 10:00', 2, 160000, '', 'Confirmada', NULL),
    ('1066554433', 7, '2026-05-05 14:20', 4, 320000, 'Grupo de amigos', 'Confirmada', NULL),
    ('1098765432', 7, '2026-05-09 17:45', 1, 80000, '', 'Cancelada', 'El cliente no pudo asistir'),
    ('1098765432', 5, '2026-07-30 11:00', 2, 140000, '', 'Confirmada', NULL),
    ('1077889900', 5, '2026-08-03 16:10', 3, 210000, 'Función familiar', 'Confirmada', NULL),
    ('1112345678', 5, '2026-08-10 12:30', 2, 140000, '', 'Confirmada', NULL),
    ('1112345678', 6, '2026-08-20 15:10', 2, 120000, '', 'Cancelada', 'Evento cancelado por el organizador'),
    ('1066554433', 6, '2026-08-25 18:00', 1, 60000, '', 'Cancelada', 'Evento cancelado por el organizador'),
    ('1112345678', 1, '2026-10-02 10:15', 2, 170000, 'Silletería central', 'Confirmada', NULL),
    ('1098765432', 1, '2026-10-05 16:40', 4, 340000, '', 'Reservada', NULL),
    ('1077889900', 1, '2026-11-03 13:25', 2, 170000, '', 'Confirmada', NULL),
    ('1112345678', 2, '2026-10-08 09:05', 2, 240000, 'Cerca al pasillo', 'Reservada', NULL),
    ('1098765432', 2, '2026-10-12 19:45', 5, 600000, 'Grupo familiar', 'Confirmada', NULL),
    ('1066554433', 2, '2026-11-01 20:10', 2, 240000, '', 'Confirmada', NULL),
    ('1098765432', 3, '2026-10-10 12:30', 3, 135000, '', 'Confirmada', NULL),
    ('1077889900', 3, '2026-11-10 17:00', 2, 90000, '', 'Confirmada', NULL),
    ('1112345678', 4, '2026-10-11 18:20', 1, 95000, '', 'Cancelada', 'El cliente no pudo asistir'),
    ('1066554433', 4, '2026-11-05 11:35', 2, 190000, '', 'Reservada', NULL);
