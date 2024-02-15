SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS CONTABILIDAD DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE CONTABILIDAD;

DROP TABLE IF EXISTS SALDOS;
DROP TABLE IF EXISTS CUENTAS;
DROP TABLE IF EXISTS GASTOS;
DROP TABLE IF EXISTS CONCEPTOS;

CREATE TABLE IF NOT EXISTS CONCEPTOS (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO CONCEPTOS (id, nombre) VALUES
    (1, 'Agua'),
    (2, 'Luz'),
    (3, 'Gas'),
    (5, 'Guardería'),
    (6, 'Comida'),
    (7, 'Ropa'),
    (8, 'Gasolina'),
    (10, 'Transporte'),
    (14, 'Seguros'),
    (21, 'Internet'),
    (28, 'Hipoteca'),
    (38, 'Nómina'),
    (39, 'Otros_Ingresos'),
    (44, 'Ocio'),
    (46, 'Viajes');

CREATE TABLE IF NOT EXISTS GASTOS (
    Id INT(11) NOT NULL AUTO_INCREMENT,
    Ingreso_gasto VARCHAR(7) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    Valor DECIMAL(10,2) NOT NULL,
    Descripcion VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    Fecha DATE NOT NULL,
    Id_concepto INT(11) NOT NULL,
    PRIMARY KEY (Id),
    KEY fk_conceptosIDIdx (Id_concepto),
    FOREIGN KEY (Id_concepto) REFERENCES CONCEPTOS (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO GASTOS (Id, Ingreso_gasto, Valor, Descripcion, Fecha, Id_concepto) 
VALUES
    (1, 'Ingreso', 120.12 , 'Devolución', '2022-01-22', 39),
    (2, 'Ingreso', 1200.12 , 'Devolución', '2022-01-22', 38),
    (3, 'Gasto', -120.12 , 'GastoXX', '2022-11-01', 3),
    (4, 'Gasto', -50.12 , 'GastoXX', '2022-11-01', 6),
    (5, 'Gasto', -60.12 , 'GastoXX', '2022-10-01', 7),
    (6, 'Gasto', -70.12 , 'GastoXX', '2022-10-01', 8),
    (7, 'Gasto', -220.12 , 'GastoXX', '2022-10-01', 6),
    (8, 'Gasto', -90.12 , 'GastoXX', '2022-11-11', 7);

CREATE TABLE IF NOT EXISTS CUENTAS (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO CUENTAS (id, nombre) VALUES 
    (1, 'BANCO-1'),
    (2,'BANCO-2');

CREATE TABLE IF NOT EXISTS SALDOS (
    Id INT(11) NOT NULL AUTO_INCREMENT,
    cuentaId INT(11) NOT NULL,
    Valor DECIMAL(10,2) NOT NULL,
    Fecha DATE NOT NULL,
    PRIMARY KEY (Id),
    KEY fk_cuentaIDIdx (cuentaId),
    FOREIGN KEY (cuentaId) REFERENCES CUENTAS (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO SALDOS (id, cuentaId, Valor, Fecha) 
VALUES
    (1, 1, 1000, '2022-12-01'),
    (2, 1, 900, '2022-11-01'),
    (3, 2, 900, '2022-10-01');

COMMIT;
