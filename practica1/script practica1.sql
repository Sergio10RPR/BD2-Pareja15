CREATE DATABASE practica1_db2;

USE practica1_db2;

CREATE TABLE Habitacion(
	idHabitacion INT PRIMARY KEY NOT NULL,
    habitacion VARCHAR(50) NOT NULL
);

CREATE TABLE Paciente(
	idPaciente INT PRIMARY KEY NOT NULL,
    edad INT NOT NULL,
    genero VARCHAR(20) NOT NULL
);

CREATE TABLE LogHabitacion(
	idHabitacion INT NOT NULL,
    timestampx VARCHAR(100) NOT NULL,
    statusx VARCHAR(45) NOT NULL,
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion (idHabitacion)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION       
);

CREATE TABLE LogActividades(
	idLogActividades INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    timestampx VARCHAR(100) NOT NULL,
    actividad VARCHAR(200) NOT NULL,
	idHabitacion INT NOT NULL,
	idPaciente INT NOT NULL,
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion (idHabitacion)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION   ,
    FOREIGN KEY (idPaciente) REFERENCES Paciente (idPaciente)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION   
);

SELECT * FROM Habitacion;
SELECT * FROM Paciente;
SELECT * FROM LogHabitacion;
SELECT * FROM LogActividades;

SELECT (SELECT COUNT(*) FROM Habitacion) as Habitacion,  
(SELECT COUNT(*) FROM Paciente) as Paciente,
(SELECT COUNT(*) FROM LogHabitacion) as LogHabitacion,
(SELECT COUNT(*) FROM LogActividades) as LogActividades;

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Pacientes.csv"
INTO TABLE Paciente
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(idPaciente,edad,genero);

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Habitaciones.csv"
INTO TABLE Habitacion
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(idHabitacion,habitacion);


#LOG HABITACIONES =======================================================================
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogHabitacion.csv"
INTO TABLE LogHabitacion
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(idHabitacion,timestampx,statusx);

#LogActividades1 ==========================================
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades1.csv"
INTO TABLE LogActividades
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(timestampx,actividad,idHabitacion,idPaciente);

#LogActividades2 ==========================================
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades2.csv"
INTO TABLE LogActividades
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(timestampx,actividad,idHabitacion,idPaciente);


#Eliminacion de datos==========================================
TRUNCATE TABLE LogActividades;
TRUNCATE TABLE LogHabitacion;
DELETE FROM Paciente WHERE idPaciente > 0;
DELETE FROM Habitacion where idHabitacion > 0;
