CREATE TABLE usuarios (
  usuario_id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  pais_residencia VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  acerca_de_mi TEXT,
  dob_dia INT,
  dob_mes INT,
  dob_año INT
);

CREATE TABLE ciudades (
  ciudad_id INT PRIMARY KEY AUTO_INCREMENT,
  ciudad VARCHAR(50) UNIQUE,
  descripcion TEXT,
  calif_general_ciu INT,
  seguridad_ciu INT,
  hospedaje_ciu INT,
  transporte_ciu INT,
  comida_ciu INT
);

CREATE TABLE atracciones (
  atraccion_id INT PRIMARY KEY AUTO_INCREMENT,
  ciudad_id INT,
  atraccion VARCHAR(50) UNIQUE,
  descripcion TEXT,
  calif_general_atr INT,
  seguridad_atr INT,
  hospedaje_atr INT,
  transporte_atr INT,
  comida_atr INT,
  FOREIGN KEY(ciudad_id) REFERENCES ciudades(ciudad_id)
);

CREATE TABLE visitados (
  visitado_id INT PRIMARY KEY AUTO_INCREMENT,
  atraccion_id INT,
  usuario_id INT,
  ya_visitado BOOL,
  FOREIGN KEY(atraccion_id) REFERENCES atracciones(atraccion_id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE reseñas (
  reseña_id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  atraccion_id INT,
  visitado INT,
  reseña TEXT,
  calif_general_res INT,
  cal_seguridad_res INT,
  cal_hospedaje_res INT ,
  cal_transporte_res INT,
  cal_comida_res INT,
  FOREIGN KEY(atraccion_id) REFERENCES atracciones(atraccion_id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
);



INSERT INTO usuarios (nombre, apellido, pais_residencia, email, acerca_de_mi, dob_dia, dob_mes, dob_año)
VALUES
    ('Cristhian', 'Rospigliosi','Brasil','cristhian.rospigliosi@','3 semestre en UCSP', 27,10,1999),
    ('Francisco', 'Cucho','Argentina','fran.cucho@','vivo en Buenos Aires', 12, 04, 2003),
    ('Fidel', 'Provincia','Canada','fidel.provincia@','de pasada por Peru', 03,2,2000),
    ('Mathias', 'Choquechambi','Chile','mathias.choquechambi@','Cumplí años hace poco', 22, 08, 2014);


INSERT INTO ciudades (ciudad, descripcion, calif_general_ciu, seguridad_ciu, hospedaje_ciu, transporte_ciu, comida_ciu)
VALUES
    ('Arequipa', 'Calles limpias y buena comida', 4, 4, 4, 3, 5),
    ('Lima', 'Tiene lugares bonitos y feos', 4, 2, 4, 3, 5),
    ('Cuzco', 'Increibles lugares para visitar', 4, 4, 5, 3, 3),
    ('Iquitos', 'Contacto cercano con la naturaleza', 4, 4, 4, 2, 4);

INSERT INTO atracciones (ciudad_id, atraccion, descripcion, calif_general_atr, seguridad_atr, hospedaje_atr, transporte_atr, comida_atr)
VALUES
    (1, 'Monasterio de Santa Catalina', 'Convento histórico con arquitectura colonial única en Arequipa.', 9, 8, 8, 7, 9),
	(3, 'Machu Picchu', 'Ciudadela inca en la cima de una montaña, maravilla del mundo.', 10, 9, 7, 6, 8),
	(2, 'Circuito Mágico del Agua', 'Parque con fuentes iluminadas y espectáculos nocturnos en Lima.', 8, 8, 9, 9, 8),
	(4, 'Reserva Nacional Pacaya Samiria', 'Selva amazónica con fauna exótica y paseos en bote en Iquitos.', 9, 7, 6, 6, 9),
	(1, 'Cañón del Colca', 'Imponente cañón donde se puede observar cóndores en vuelo.', 9, 8, 7, 6, 8),
	(3, 'Sacsayhuamán', 'Fortaleza ceremonial inca cerca de la ciudad del Cuzco.', 9, 9, 7, 7, 8);


INSERT INTO visitados (usuario_id, atraccion_id, ya_visitado)
VALUES
    (1, 1, 1),
    (1, 2, 1),
    (2, 1, 1);
    


INSERT INTO reseñas (usuario_id, atraccion_id, visitado, reseña, calif_general_res, cal_seguridad_res, cal_hospedaje_res, cal_transporte_res, cal_comida_res)
VALUES
    (1, 1, 1, 'lindo lugar', 5, 5, 5, 4, 5),
    (1, 3, 1, 'muy divertido', 5, 5, 5, 4, 5),
    (1, 6, 1, 'amazing sight, many old structures', 4, 5, 5, 3, 3);
    
    
INSERT INTO reseñas(usuario_id, atraccion_id, visitado, reseña, calif_general_res, cal_seguridad_res, cal_hospedaje_res, cal_transporte_res, cal_comida_res)
VALUES
    (2, 1, 1, 'the place was like going back on time', 5, 5, 4, 3, 5),
    (4, 1, 1, 'Really nice colors', 5, 5, 4, 3, 5);
    
INSERT INTO atracciones(ciudad_id, atraccion, descripcion, calif_general_atr)
VALUES
    (1, 'Mirador de Yanahuara', 'Vista unica de la ciudad blanca', 9);

-- ===================
-- SELECT QUERIES
-- ===================

SELECT * FROM usuarios;
SELECT * FROM ciudades;
SELECT * FROM atracciones;
SELECT * FROM reseñas;

-- usuarios que han visitado convento de arequipa

SELECT reseña_id, nombre, apellido, atraccion, reseña
FROM reseñas INNER JOIN atracciones
ON reseñas.atraccion_id = atracciones.atraccion_id
AND reseñas.atraccion_id = 1
INNER JOIN usuarios
ON reseñas.usuario_id = usuarios.usuario_id;

-- atracciones turisticas en arequipa
SELECT atraccion_id, ciudad, atraccion, calif_general_atr, seguridad_atr, hospedaje_atr, transporte_atr, comida_atr
FROM atracciones INNER JOIN ciudades
ON atracciones.ciudad_id = ciudades.ciudad_id
AND ciudades.ciudad = 'Arequipa';

-- Visitado?
SELECT visitado_id, nombre, apellido, atraccion, ya_visitado
FROM visitados INNER JOIN atracciones
ON visitados.atraccion_id = atracciones.atraccion_id
INNER JOIN usuarios
ON usuarios.usuario_id = visitados.usuario_id
AND usuarios.usuario_id = 1;














