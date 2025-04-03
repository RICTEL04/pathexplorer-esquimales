-- Drop the database if it exists
DROP DATABASE IF EXISTS esk;

-- Create the database
CREATE DATABASE esk;

-- Connect to the esk database
\c esk;

CREATE TABLE "Departamento" (
  "ID_Departamento" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Descripcion" varchar
);

CREATE TABLE "Contacto" (
  "PK_Contacto" SERIAL PRIMARY KEY,
  "Email" varchar
);

CREATE TABLE "Telefono" (
  "ID_Telefono" SERIAL PRIMARY KEY,
  "Tipo" varchar,
  "Pais" varchar,
  "Num_Telefono" varchar,
  "ID_Contacto" SERIAL NOT NULL
);

CREATE TABLE "Usuario" (
  "ID_Usuario" SERIAL PRIMARY KEY,
  "Username" varchar,
  "Password" varchar
);  

CREATE TABLE "Empleado" (
  "ID_Empleado" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Rol" varchar,
  "ID_Departamento" SERIAL NOT NULL,
  "Nivel" varchar,
  "Cargabilidad" varchar,
  "ID_Contacto" SERIAL NOT NULL,
  "ID_CapabilityLead" SERIAL NOT NULL,
  "ID_Usuario" SERIAL NOT NULL
);

CREATE TABLE "People_lead" (
  "ID" SERIAL PRIMARY KEY,
  "ID_Contacto" SERIAL NOT NULL
);

CREATE TABLE "People_lead_Empleado" (
  "ID_People_lead" SERIAL NOT NULL,
  "ID_Empleado" SERIAL NOT NULL,
  PRIMARY Key("ID_People_lead","ID_Empleado")
);

CREATE TABLE "Certificados" (
  "ID_Certificado" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Fecha_caducidad" date,
  "Documento" varchar,
  "ID_Empleado" SERIAL NOT NULL
);

CREATE TABLE "Metas" (
  "ID_meta" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Tipo_Meta" varchar,
  "Plazo" varchar,
  "Descripcion" varchar,
  "Fecha_limite" date,
  "ID_Empleado" SERIAL NOT NULL,
  "ID_Revisor" SERIAL NOT NULL,
  "Registrada" bool,
  "Estado" varchar,
  "Self_Reflection" varchar
);

CREATE TABLE "Cursos" (
  "ID_Curso" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Progreso" varchar,
  "Status" varchar,
  "Fecha_fin_curso" date,
  "ID_Empleado" SERIAL NOT NULL
);

CREATE TABLE "Habilidades" (
  "ID_Habilidad" SERIAL PRIMARY KEY,
  "Tipo" varchar,
  "Descripcion" varchar
);

CREATE TABLE "Empleado_Habilidades" (
  "ID_Empleado" SERIAL NOT NULL,
  "ID_Habilidad" SERIAL NOT NULL,
  PRIMARY KEY("ID_Empleado","ID_Habilidad")
);

CREATE TABLE "Cliente" (
  "PK_Cliente" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "RFC" varchar,
  "ID_Contacto" SERIAL NOT NULL
);

CREATE TABLE "Direccion" (
  "PK_Direccion" SERIAL PRIMARY KEY,
  "Calle" varchar,
  "Estado" varchar,
  "Pais" varchar,
  "Ciudad" varchar,
  "Num_Casa" varchar,
  "ID_Cliente" SERIAL NOT NULL
);

CREATE TABLE "Delivery_Lead" (
  "ID_DeliveryLead" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "Rol" varchar,
  "Nivel" varchar,
  "ID_Contacto" SERIAL NOT NULL
);

CREATE TABLE "Proyectos" (
  "ID_Proyecto" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "ID_Cliente" SERIAL NOT NULL,
  "Descripcion" varchar,
  "Status" varchar,
  "ID_DeliveryLead" SERIAL NOT NULL
);

CREATE TABLE "Proyecto_Habilidades" (
  "ID_Proyecto" SERIAL NOT NULL,
  "ID_Habilidad" SERIAL NOT NULL,
  PRIMARY KEY("ID_Proyecto","ID_Habilidad")
);

CREATE TABLE "Puestos_proyecto" (
  "ID_Proyecto" SERIAL NOT NULL,
  "ID_Empleado" SERIAL NOT NULL,
  "Puesto" varchar,
  PRIMARY KEY("ID_Proyecto","ID_Empleado")
);

CREATE TABLE "FeedBack" (
  "ID_FeedBack" SERIAL PRIMARY KEY,
  "ID_People_lead" SERIAL NOT NULL,
  "ID_Empleado" SERIAL NOT NULL,
  "Descripcion" varchar,
  "AreaMejora" varchar,
  "Desempeno" varchar
);

CREATE TABLE "Capability_Lead" (
  "ID_CapabilityLead" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "ID_Departamento" SERIAL NOT NULL,
  "Rol" varchar,
  "Nivel" varchar,
  "ID_Empleado" SERIAL NOT NULL
);

CREATE TABLE "Talent_Lead" (
  "ID_TalentLead" SERIAL PRIMARY KEY,
  "Nombre" varchar,
  "ID_Departamento" SERIAL NOT NULL,
  "Rol" varchar,
  "Nivel" varchar,
  "ID_Contacto" SERIAL NOT NULL
);

CREATE TABLE "Talent_Discussion" (
  "ID_TalentDiscussion" SERIAL PRIMARY KEY,
  "Discussion" varchar,
  "ID_TalentLead" SERIAL NOT NULL,
  "ID_DeliveryLead" SERIAL NOT NULL,
  "ID_CapabilityLead" SERIAL NOT NULL,
  "ID_People_lead" SERIAL NOT NULL
);

ALTER TABLE "Telefono" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "Empleado" ADD FOREIGN KEY ("ID_Usuario") REFERENCES "Usuario" ("ID_Usuario");

ALTER TABLE "Empleado" ADD FOREIGN KEY ("ID_Departamento") REFERENCES "Departamento" ("ID_Departamento");

ALTER TABLE "Empleado" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "Empleado" ADD FOREIGN KEY ("ID_CapabilityLead") REFERENCES "Capability_Lead" ("ID_CapabilityLead");

ALTER TABLE "People_lead" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "People_lead_Empleado" ADD FOREIGN KEY ("ID_People_lead") REFERENCES "People_lead" ("ID");

ALTER TABLE "People_lead_Empleado" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Certificados" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Metas" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Metas" ADD FOREIGN KEY ("ID_Revisor") REFERENCES "People_lead" ("ID");

ALTER TABLE "Cursos" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Empleado_Habilidades" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Empleado_Habilidades" ADD FOREIGN KEY ("ID_Habilidad") REFERENCES "Habilidades" ("ID_Habilidad");

ALTER TABLE "Cliente" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "Direccion" ADD FOREIGN KEY ("ID_Cliente") REFERENCES "Cliente" ("PK_Cliente");

ALTER TABLE "Delivery_Lead" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "Proyectos" ADD FOREIGN KEY ("ID_Cliente") REFERENCES "Cliente" ("PK_Cliente");

ALTER TABLE "Proyectos" ADD FOREIGN KEY ("ID_DeliveryLead") REFERENCES "Delivery_Lead" ("ID_DeliveryLead");

ALTER TABLE "Proyecto_Habilidades" ADD FOREIGN KEY ("ID_Proyecto") REFERENCES "Proyectos" ("ID_Proyecto");

ALTER TABLE "Proyecto_Habilidades" ADD FOREIGN KEY ("ID_Habilidad") REFERENCES "Habilidades" ("ID_Habilidad");

ALTER TABLE "Puestos_proyecto" ADD FOREIGN KEY ("ID_Proyecto") REFERENCES "Proyectos" ("ID_Proyecto");

ALTER TABLE "Puestos_proyecto" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "FeedBack" ADD FOREIGN KEY ("ID_People_lead") REFERENCES "People_lead" ("ID");

ALTER TABLE "FeedBack" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Capability_Lead" ADD FOREIGN KEY ("ID_Departamento") REFERENCES "Departamento" ("ID_Departamento");

ALTER TABLE "Capability_Lead" ADD FOREIGN KEY ("ID_Empleado") REFERENCES "Empleado" ("ID_Empleado");

ALTER TABLE "Talent_Lead" ADD FOREIGN KEY ("ID_Departamento") REFERENCES "Departamento" ("ID_Departamento");

ALTER TABLE "Talent_Lead" ADD FOREIGN KEY ("ID_Contacto") REFERENCES "Contacto" ("PK_Contacto");

ALTER TABLE "Talent_Discussion" ADD FOREIGN KEY ("ID_TalentLead") REFERENCES "Talent_Lead" ("ID_TalentLead");

ALTER TABLE "Talent_Discussion" ADD FOREIGN KEY ("ID_DeliveryLead") REFERENCES "Delivery_Lead" ("ID_DeliveryLead");

ALTER TABLE "Talent_Discussion" ADD FOREIGN KEY ("ID_CapabilityLead") REFERENCES "Capability_Lead" ("ID_CapabilityLead");

ALTER TABLE "Talent_Discussion" ADD FOREIGN KEY ("ID_People_lead") REFERENCES "People_lead" ("ID");

ALTER TABLE "Capability_Lead" ALTER COLUMN "ID_Empleado" DROP NOT NULL;

ALTER TABLE "Empleado" DROP CONSTRAINT "Empleado_ID_CapabilityLead_fkey";

-- Insert into Departamento
INSERT INTO "Departamento" ("Nombre", "Descripcion")
VALUES 
('IT', 'Information Technology'),
('HR', 'Human Resources');

-- Insert into Contacto
INSERT INTO "Contacto" ("Email")
VALUES 
('john.doe@example.com'),
('jane.smith@example.com');

-- Insert into Telefono
INSERT INTO "Telefono" ("Tipo", "Pais", "Num_Telefono", "ID_Contacto")
VALUES 
('Mobile', 'USA', '1234567890', 1),
('Home', 'USA', '0987654321', 2);

-- Insert into Usuario
INSERT INTO "Usuario" ("Username", "Password") VALUES
('User1', 'password1'),
('User2', 'password2');

-- Insert into Empleado
INSERT INTO "Empleado" ("Nombre", "Rol", "ID_Departamento", "Nivel", "Cargabilidad", "ID_Contacto", "ID_CapabilityLead", "ID_Usuario")
VALUES 
('John Doe', 'Developer', 1, 'Senior', '80%', 1, 1, 1),
('Jane Smith', 'HR Manager', 2, 'Manager', '100%', 2, 2, 2);

-- Insert into Capability_Lead
INSERT INTO "Capability_Lead" ("Nombre", "ID_Departamento", "Rol", "Nivel", "ID_Empleado")
VALUES 
('Charlie Green', 1, 'Capability Manager', 'Senior', 1),
('Diana White', 2, 'Capability Lead', 'Mid', 2);

-- Insert into People_lead
INSERT INTO "People_lead" ("ID_Contacto")
VALUES 
(1),
(2);

-- Insert into People_lead_Empleado
INSERT INTO "People_lead_Empleado" ("ID_People_lead", "ID_Empleado")
VALUES 
(1, 1),
(2, 2);

-- Insert into Certificados
INSERT INTO "Certificados" ("Nombre", "Fecha_caducidad", "Documento", "ID_Empleado")
VALUES 
('AWS Certified Developer', '2025-12-31', 'aws_cert.pdf', 1),
('HR Management Certification', '2026-06-30', 'hr_cert.pdf', 2);

-- Insert into Metas
INSERT INTO "Metas" ("Nombre", "Tipo_Meta", "Plazo", "Descripcion", "Fecha_limite", "ID_Empleado", "ID_Revisor", "Registrada", "Estado", "Self_Reflection")
VALUES 
('Complete Project A', 'Short-term', '3 months', 'Deliver Project A on time', '2025-06-30', 1, 1, TRUE, 'In Progress', 'Need to improve time management'),
('Hire 5 Employees', 'Long-term', '6 months', 'Expand the HR team', '2025-12-31', 2, 2, TRUE, 'Not Started', 'Focus on recruitment strategies');

-- Insert into Cursos
INSERT INTO "Cursos" ("Nombre", "Progreso", "Status", "Fecha_fin_curso", "ID_Empleado")
VALUES 
('React Development', '50%', 'Ongoing', '2025-05-15', 1),
('Leadership Training', '100%', 'Completed', '2025-03-01', 2);

-- Insert into Habilidades
INSERT INTO "Habilidades" ("Tipo", "Descripcion")
VALUES 
('Technical', 'JavaScript Development'),
('Soft Skill', 'Team Leadership');

-- Insert into Empleado_Habilidades
INSERT INTO "Empleado_Habilidades" ("ID_Empleado", "ID_Habilidad")
VALUES 
(1, 1),
(2, 2);

-- Insert into Cliente
INSERT INTO "Cliente" ("Nombre", "RFC", "ID_Contacto")
VALUES 
('Acme Corp', 'ACM123456', 1),
('Globex Inc', 'GLB654321', 2);

-- Insert into Direccion
INSERT INTO "Direccion" ("Calle", "Estado", "Pais", "Ciudad", "Num_Casa", "ID_Cliente")
VALUES 
('123 Main St', 'California', 'USA', 'Los Angeles', '101', 1),
('456 Elm St', 'New York', 'USA', 'New York City', '202', 2);

-- Insert into Delivery_Lead
INSERT INTO "Delivery_Lead" ("Nombre", "Rol", "Nivel", "ID_Contacto")
VALUES 
('Alice Johnson', 'Delivery Manager', 'Senior', 1),
('Bob Brown', 'Delivery Lead', 'Mid', 2);

-- Insert into Proyectos
INSERT INTO "Proyectos" ("Nombre", "ID_Cliente", "Descripcion", "Status", "ID_DeliveryLead")
VALUES 
('Project Alpha', 1, 'Develop a new web application', 'In Progress', 1),
('Project Beta', 2, 'Implement HR software', 'Completed', 2);

-- Insert into Proyecto_Habilidades
INSERT INTO "Proyecto_Habilidades" ("ID_Proyecto", "ID_Habilidad")
VALUES 
(1, 1),
(2, 2);

-- Insert into Puestos_proyecto
INSERT INTO "Puestos_proyecto" ("ID_Proyecto", "ID_Empleado", "Puesto")
VALUES 
(1, 1, 'Developer'),
(2, 2, 'HR Specialist');

-- Insert into FeedBack
INSERT INTO "FeedBack" ("ID_People_lead", "ID_Empleado", "Descripcion", "AreaMejora", "Desempeno")
VALUES 
(1, 1, 'Great work on the project', 'Time management', 'Excellent'),
(2, 2, 'Good leadership skills', 'Recruitment strategies', 'Good');

-- Insert into Talent_Lead
INSERT INTO "Talent_Lead" ("Nombre", "ID_Departamento", "Rol", "Nivel", "ID_Contacto")
VALUES 
('Eve Black', 1, 'Talent Manager', 'Senior', 1),
('Frank Gray', 2, 'Talent Lead', 'Mid', 2);

-- Insert into Talent_Discussion
INSERT INTO "Talent_Discussion" ("Discussion", "ID_TalentLead", "ID_DeliveryLead", "ID_CapabilityLead", "ID_People_lead")
VALUES 
('Discussing employee performance', 1, 1, 1, 1),
('Planning recruitment strategies', 2, 2, 2, 2);

ALTER TABLE "Capability_Lead" ALTER COLUMN "ID_Empleado" SET NOT NULL;

ALTER TABLE "Empleado"
ADD CONSTRAINT "Empleado_ID_CapabilityLead_fkey"
FOREIGN KEY ("ID_CapabilityLead") REFERENCES "Capability_Lead" ("ID_CapabilityLead");