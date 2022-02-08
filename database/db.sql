
USE colegiocambridge;
CREATE TABLE persona(
	IdPersona INT AUTO_INCREMENT,
    Documento VARCHAR(45) NOT NULL,
	Nombre VARCHAR(45) NOT NULL,
    TipoPersona VARCHAR(45) NOT NULL,
    TipoProfesor VARCHAR(45) NOT NULL,
	Area VARCHAR(45) NOT NULL,
    PRIMARY KEY (IdPersona),
	UNIQUE INDEX IdPersona_UNIQUE (IdPersona ASC) VISIBLE
  );
  
  drop table persona
  
  CREATE TABLE oficina(
	IdOficina INT AUTO_INCREMENT,
    CodOficina VARCHAR(45) NOT NULL,
    NombrePersona VARCHAR(45) NOT NULL,
    AreaO  VARCHAR(45) NOT NULL,
    PRIMARY KEY (IdOficina),
    UNIQUE INDEXIdOficina_UNIQUE (IdOficina ASC) VISIBLE
  );

  CREATE TABLE area(
	CodArea INT AUTO_INCREMENT,
    NombreArea VARCHAR(45) NOT NULL,
    PRIMARY KEY (CodArea),
	UNIQUE INDEX CodArea_UNIQUE (CodArea ASC) VISIBLE
  );
  
   CREATE TABLE salon(
	Consecutivo INT AUTO_INCREMENT,
    CodSalon VARCHAR(45) NOT NULL,
    PRIMARY KEY (CodSalon),
	UNIQUE INDEX Consecutivo_UNIQUE (Consecutivo ASC) VISIBLE
  );
  
  CREATE TABLE administrador(
	IdAdministrador VARCHAR(45) NOT NULL,
    Nombre VARCHAR(45) NOT NULL,
	Apellido VARCHAR(45) NOT NULL,
	Correo VARCHAR(45) NOT NULL,
    contraseña VARCHAR(45) NOT NULL,
    PRIMARY KEY (Correo),
	UNIQUE INDEX Correo_UNIQUE (Correo ASC) VISIBLE
);
  
SELECT*
FROM persona

SELECT*
FROM oficina

SELECT*
FROM area

SELECT*
FROM administrador

SELECT*
FROM salon

drop table oficina
drop table area
drop table administrador
drop table persona

SELECT AreaO ,count(AreaO) AS cuenta FROM oficina

INSERT INTO administrador
	(IdAdministrador,Nombre,Apellido,Correo,Contraseña)
	VALUES 
('1','valentina','Restrepo','valentina_restrepo82172@elpoli.edu.co','valentina05')

INSERT INTO administrador(IdAdministrador,Nombre,Apellido,Correo,Contraseña)
VALUES('2','Santiago','Quiceno','santiago_quiceno82171@elpoli.edu.co','password');

SELECT Nombre,Apellido,Correo,Contraseña FROM administrador WHERE administrador.Correo = 'valentina_restrepo82172@elpoli.edu.co'
SELECT Nombre,Apellido,Correo,Contraseña FROM administrador WHERE administrador.Correo = 'santiago_quiceno82171@elpoli.edu.co'

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
flush privileges;