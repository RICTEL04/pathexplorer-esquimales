

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    DELETE FROM public."Empleado"
    WHERE "ID_Empleado" = p_id_empleado;
END;
$$;


ALTER FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_empleado"("p_id_empleado" "uuid", "p_nombre" "text", "p_rol" "text", "p_id_departamento" "uuid", "p_nivel" "text", "p_cargabilidad" "text", "p_fecha_contratacion" "date", "p_fecha_ult_nivel" "date", "p_biografia" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    INSERT INTO public."Empleado" (
        "ID_Empleado",
        "Nombre",
        "Rol",
        "ID_Departamento",
        "Nivel",
        "Cargabilidad",
        "FechaContratacion",
        "FechaUltNivel",
        "Biografia"
    ) VALUES (
        p_id_empleado,
        p_nombre,
        p_rol,
        p_id_departamento,
        p_nivel,
        p_cargabilidad,
        p_fecha_contratacion,
        p_fecha_ult_nivel,
        p_biografia
    );
END;
$$;


ALTER FUNCTION "public"."insert_empleado"("p_id_empleado" "uuid", "p_nombre" "text", "p_rol" "text", "p_id_departamento" "uuid", "p_nivel" "text", "p_cargabilidad" "text", "p_fecha_contratacion" "date", "p_fecha_ult_nivel" "date", "p_biografia" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."select_empleado"("p_id_empleado" "uuid") RETURNS TABLE("ID_Empleado" "uuid", "Nombre" "text", "Rol" "text", "ID_Departamento" "uuid", "Nivel" "text", "Cargabilidad" "text", "FechaContratacion" "date", "FechaUltNivel" "date", "Biografia" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        "ID_Empleado",
        "Nombre",
        "Rol",
        "ID_Departamento",
        "Nivel",
        "Cargabilidad",
        "FechaContratacion",
        "FechaUltNivel",
        "Biografia"
    FROM public."Empleado"
    WHERE "ID_Empleado" = p_id_empleado;
END;
$$;


ALTER FUNCTION "public"."select_empleado"("p_id_empleado" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_empleado"("p_id_empleado" "uuid", "p_nombre" "text", "p_rol" "text", "p_id_departamento" "uuid", "p_nivel" "text", "p_cargabilidad" "text", "p_fecha_contratacion" "date", "p_fecha_ult_nivel" "date", "p_biografia" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE public."Empleado"
    SET 
        "Nombre" = p_nombre,
        "Rol" = p_rol,
        "ID_Departamento" = p_id_departamento,
        "Nivel" = p_nivel,
        "Cargabilidad" = p_cargabilidad,
        "FechaContratacion" = p_fecha_contratacion,
        "FechaUltNivel" = p_fecha_ult_nivel,
        "Biografia" = p_biografia
    WHERE "ID_Empleado" = p_id_empleado;
END;
$$;


ALTER FUNCTION "public"."update_empleado"("p_id_empleado" "uuid", "p_nombre" "text", "p_rol" "text", "p_id_departamento" "uuid", "p_nivel" "text", "p_cargabilidad" "text", "p_fecha_contratacion" "date", "p_fecha_ult_nivel" "date", "p_biografia" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Administrador" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."Administrador" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Capability_Lead" (
    "ID_CapabilityLead" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ID_Departamento" "uuid",
    "ID_Empleado" "uuid"
);


ALTER TABLE "public"."Capability_Lead" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Certificados" (
    "ID_Certificado" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Fecha_caducidad" "date",
    "Documento" character varying,
    "ID_Empleado" "uuid" NOT NULL,
    "Verificacion" boolean,
    "Descripcion" character varying DEFAULT ''::character varying
);


ALTER TABLE "public"."Certificados" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Cliente" (
    "PK_Cliente" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "RFC" character varying,
    "ID_Contacto" "uuid" NOT NULL
);


ALTER TABLE "public"."Cliente" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Contacto" (
    "PK_Contacto" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Email" character varying,
    "Num_Telefono" character varying,
    "ID_empleado" "uuid",
    "Estado" character varying,
    "Pais" character varying
);


ALTER TABLE "public"."Contacto" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Contacto"."Estado" IS 'Estado donde trabaja la persona';



COMMENT ON COLUMN "public"."Contacto"."Pais" IS 'Pais donde trabaja la persona';



CREATE TABLE IF NOT EXISTS "public"."Cursos" (
    "ID_Curso" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Fecha_fin_curso" "date",
    "link" "text",
    "Descripcion" "text"
);


ALTER TABLE "public"."Cursos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Cursos_Habilidades" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "ID_Curso" "uuid" NOT NULL,
    "ID_Habilidad" "uuid" NOT NULL
);


ALTER TABLE "public"."Cursos_Habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Delivery_Lead" (
    "ID_DeliveryLead" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Rol" character varying,
    "ID_Empleado" "uuid"
);


ALTER TABLE "public"."Delivery_Lead" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Departamento" (
    "ID_Departamento" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Descripcion" character varying
);


ALTER TABLE "public"."Departamento" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Empleado" (
    "ID_Empleado" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Rol" character varying,
    "ID_Departamento" "uuid",
    "Nivel" character varying,
    "Cargabilidad" character varying,
    "FechaContratacion" "date",
    "FechaUltNivel" "date",
    "ID_PeopleLead" "uuid",
    "Biografia" character varying
);


ALTER TABLE "public"."Empleado" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Empleado"."Biografia" IS 'Biografia del empleado(como la del face)';



CREATE TABLE IF NOT EXISTS "public"."Empleado_Habilidades" (
    "ID_Empleado" "uuid" NOT NULL,
    "ID_Habilidad" "uuid" NOT NULL,
    "Estado" character varying
);


ALTER TABLE "public"."Empleado_Habilidades" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Empleado_Habilidades"."Estado" IS 'Estado de la habilidad(aceptada, en espera, rechazada)';



CREATE TABLE IF NOT EXISTS "public"."Empleado_Proyectos" (
    "ID_Empleado" "uuid" NOT NULL,
    "ID_Proyecto" "uuid" NOT NULL,
    "isApproved" boolean DEFAULT false,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."Empleado_Proyectos" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Empleado_Proyectos"."isApproved" IS 'determines wether an employee is approved to a project or still on the postulation process';



CREATE TABLE IF NOT EXISTS "public"."FeedBack" (
    "ID_FeedBack" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ID_People_lead" "uuid" NOT NULL,
    "ID_Empleado" "uuid" NOT NULL,
    "Descripcion" character varying,
    "AreaMejora" character varying,
    "Desempeno" character varying
);


ALTER TABLE "public"."FeedBack" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Habilidades" (
    "ID_Habilidad" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Tipo" character varying,
    "Descripcion" character varying
);


ALTER TABLE "public"."Habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Intereses" (
    "ID_Interes" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Descripcion" character varying,
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."Intereses" OWNER TO "postgres";


COMMENT ON TABLE "public"."Intereses" IS 'Tabla con todos los intereses de los empleados';



CREATE TABLE IF NOT EXISTS "public"."Metas" (
    "ID_meta" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" character varying,
    "Tipo_Meta" character varying,
    "Plazo" character varying,
    "Descripcion" character varying,
    "Fecha_limite" "date",
    "ID_Empleado" "uuid" NOT NULL,
    "ID_Revisor" "uuid" NOT NULL,
    "Registrada" boolean,
    "Estado" character varying,
    "Self_Reflection" character varying
);


ALTER TABLE "public"."Metas" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."People_lead" (
    "ID" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ID_Empleado" "uuid"
);


ALTER TABLE "public"."People_lead" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Proyecto_Habilidades" (
    "ID_Proyecto" "uuid" NOT NULL,
    "ID_Habilidad" "uuid" NOT NULL
);


ALTER TABLE "public"."Proyecto_Habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Proyectos" (
    "ID_Proyecto" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" "text" NOT NULL,
    "ID_Cliente" "uuid",
    "Descripcion" "text",
    "Status" "text",
    "ID_DeliveryLead" "uuid",
    "fecha_inicio" "date",
    "fecha_fin" "date"
);


ALTER TABLE "public"."Proyectos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Puesto_proyecto" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" "date" NOT NULL,
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Proyecto" "uuid" DEFAULT "gen_random_uuid"(),
    "Puesto" character varying
);


ALTER TABLE "public"."Puesto_proyecto" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Revisor_Meta" (
    "ID_Revisor" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_EmpleadoRevisor" "uuid",
    "ID_meta" "uuid",
    "ID_empleado" "uuid",
    "Retroalimentacion" character varying
);


ALTER TABLE "public"."Revisor_Meta" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role_name" "text" DEFAULT 'name'::"text" NOT NULL,
    "Proyecto_id" "uuid" NOT NULL,
    "cantidad" smallint
);


ALTER TABLE "public"."Roles" OWNER TO "postgres";


COMMENT ON TABLE "public"."Roles" IS 'roles para proyectos';



CREATE TABLE IF NOT EXISTS "public"."Talent_Discussion" (
    "ID_TalentDiscussion" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Discussion" character varying,
    "ID_TalentLead" "uuid" NOT NULL,
    "ID_DeliveryLead" "uuid" NOT NULL,
    "ID_CapabilityLead" "uuid" NOT NULL,
    "ID_People_lead" "uuid" NOT NULL
);


ALTER TABLE "public"."Talent_Discussion" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Talent_Lead" (
    "ID_TalentLead" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ID_Departamento" "uuid",
    "Rol" character varying,
    "ID_Empleado" "uuid"
);


ALTER TABLE "public"."Talent_Lead" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Administrador"
    ADD CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Departamento_key" UNIQUE ("ID_Departamento");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Empleado_key" UNIQUE ("ID_Empleado");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_pkey" PRIMARY KEY ("ID_CapabilityLead");



ALTER TABLE ONLY "public"."Certificados"
    ADD CONSTRAINT "Certificados_pkey" PRIMARY KEY ("ID_Certificado");



ALTER TABLE ONLY "public"."Cliente"
    ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("PK_Cliente");



ALTER TABLE ONLY "public"."Contacto"
    ADD CONSTRAINT "Contacto_pkey" PRIMARY KEY ("PK_Contacto");



ALTER TABLE ONLY "public"."Cursos_Habilidades"
    ADD CONSTRAINT "Cursos_Habilidades_pkey" PRIMARY KEY ("ID_Curso", "ID_Habilidad");



ALTER TABLE ONLY "public"."Cursos"
    ADD CONSTRAINT "Cursos_pkey" PRIMARY KEY ("ID_Curso");



ALTER TABLE ONLY "public"."Delivery_Lead"
    ADD CONSTRAINT "Delivery_Lead_ID_Empleado_key" UNIQUE ("ID_Empleado");



ALTER TABLE ONLY "public"."Delivery_Lead"
    ADD CONSTRAINT "Delivery_Lead_pkey" PRIMARY KEY ("ID_DeliveryLead");



ALTER TABLE ONLY "public"."Departamento"
    ADD CONSTRAINT "Departamento_Nombre_key" UNIQUE ("Nombre");



ALTER TABLE ONLY "public"."Departamento"
    ADD CONSTRAINT "Departamento_pkey" PRIMARY KEY ("ID_Departamento");



ALTER TABLE ONLY "public"."Empleado_Habilidades"
    ADD CONSTRAINT "Empleado_Habilidades_pkey" PRIMARY KEY ("ID_Empleado", "ID_Habilidad");



ALTER TABLE ONLY "public"."Empleado_Proyectos"
    ADD CONSTRAINT "Empleado_Proyectos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Empleado"
    ADD CONSTRAINT "Empleado_pkey" PRIMARY KEY ("ID_Empleado");



ALTER TABLE ONLY "public"."FeedBack"
    ADD CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("ID_FeedBack");



ALTER TABLE ONLY "public"."Habilidades"
    ADD CONSTRAINT "Habilidades_pkey" PRIMARY KEY ("ID_Habilidad");



ALTER TABLE ONLY "public"."Intereses"
    ADD CONSTRAINT "Intereses_pkey" PRIMARY KEY ("ID_Interes");



ALTER TABLE ONLY "public"."Metas"
    ADD CONSTRAINT "Metas_pkey" PRIMARY KEY ("ID_meta");



ALTER TABLE ONLY "public"."People_lead"
    ADD CONSTRAINT "People_lead_ID_Empleado_key" UNIQUE ("ID_Empleado");



ALTER TABLE ONLY "public"."People_lead"
    ADD CONSTRAINT "People_lead_pkey" PRIMARY KEY ("ID");



ALTER TABLE ONLY "public"."Proyecto_Habilidades"
    ADD CONSTRAINT "Proyecto_Habilidades_pkey" PRIMARY KEY ("ID_Proyecto", "ID_Habilidad");



ALTER TABLE ONLY "public"."Proyectos"
    ADD CONSTRAINT "Proyectos_pkey" PRIMARY KEY ("ID_Proyecto");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_pkey" PRIMARY KEY ("ID_Revisor");



ALTER TABLE ONLY "public"."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_pkey" PRIMARY KEY ("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Empleado_key" UNIQUE ("ID_Empleado");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_pkey" PRIMARY KEY ("ID_TalentLead");



ALTER TABLE ONLY "public"."Empleado_Proyectos"
    ADD CONSTRAINT "unique_empleado_proyecto" UNIQUE ("ID_Empleado", "ID_Proyecto");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Departamento_fkey" FOREIGN KEY ("ID_Departamento") REFERENCES "public"."Departamento"("ID_Departamento");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Certificados"
    ADD CONSTRAINT "Certificados_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Cliente"
    ADD CONSTRAINT "Cliente_ID_Contacto_fkey" FOREIGN KEY ("ID_Contacto") REFERENCES "public"."Contacto"("PK_Contacto");



ALTER TABLE ONLY "public"."Contacto"
    ADD CONSTRAINT "Contacto_ID_empleado_fkey" FOREIGN KEY ("ID_empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Cursos_Habilidades"
    ADD CONSTRAINT "Cursos_Habilidades_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "public"."Cursos"("ID_Curso");



ALTER TABLE ONLY "public"."Cursos_Habilidades"
    ADD CONSTRAINT "Cursos_Habilidades_ID_Habilidad_fkey" FOREIGN KEY ("ID_Habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Delivery_Lead"
    ADD CONSTRAINT "Delivery_Lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Empleado_Habilidades"
    ADD CONSTRAINT "Empleado_Habilidades_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Empleado_Habilidades"
    ADD CONSTRAINT "Empleado_Habilidades_ID_Habilidad_fkey" FOREIGN KEY ("ID_Habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Empleado"
    ADD CONSTRAINT "Empleado_ID_Departamento_fkey" FOREIGN KEY ("ID_Departamento") REFERENCES "public"."Departamento"("ID_Departamento");



ALTER TABLE ONLY "public"."Empleado"
    ADD CONSTRAINT "Empleado_ID_PeopleLead_fkey" FOREIGN KEY ("ID_PeopleLead") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."Empleado_Proyectos"
    ADD CONSTRAINT "Empleado_Proyectos_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Empleado_Proyectos"
    ADD CONSTRAINT "Empleado_Proyectos_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."FeedBack"
    ADD CONSTRAINT "FeedBack_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."FeedBack"
    ADD CONSTRAINT "FeedBack_ID_People_lead_fkey" FOREIGN KEY ("ID_People_lead") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."Intereses"
    ADD CONSTRAINT "Intereses_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Metas"
    ADD CONSTRAINT "Metas_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Metas"
    ADD CONSTRAINT "Metas_ID_Revisor_fkey" FOREIGN KEY ("ID_Revisor") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."People_lead"
    ADD CONSTRAINT "People_lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Proyecto_Habilidades"
    ADD CONSTRAINT "Proyecto_Habilidades_ID_Habilidad_fkey" FOREIGN KEY ("ID_Habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Proyecto_Habilidades"
    ADD CONSTRAINT "Proyecto_Habilidades_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."Proyectos"
    ADD CONSTRAINT "Proyectos_ID_Cliente_fkey" FOREIGN KEY ("ID_Cliente") REFERENCES "public"."Cliente"("PK_Cliente");



ALTER TABLE ONLY "public"."Proyectos"
    ADD CONSTRAINT "Proyectos_ID_DeliveryLead_fkey" FOREIGN KEY ("ID_DeliveryLead") REFERENCES "public"."Delivery_Lead"("ID_DeliveryLead");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_EmpleadoRevisor_fkey" FOREIGN KEY ("ID_EmpleadoRevisor") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_empleado_fkey" FOREIGN KEY ("ID_empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_meta_fkey" FOREIGN KEY ("ID_meta") REFERENCES "public"."Metas"("ID_meta");



ALTER TABLE ONLY "public"."Roles"
    ADD CONSTRAINT "Roles_Proyecto_id_fkey" FOREIGN KEY ("Proyecto_id") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_ID_CapabilityLead_fkey" FOREIGN KEY ("ID_CapabilityLead") REFERENCES "public"."Capability_Lead"("ID_CapabilityLead");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_ID_DeliveryLead_fkey" FOREIGN KEY ("ID_DeliveryLead") REFERENCES "public"."Delivery_Lead"("ID_DeliveryLead");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_ID_People_lead_fkey" FOREIGN KEY ("ID_People_lead") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_ID_TalentLead_fkey" FOREIGN KEY ("ID_TalentLead") REFERENCES "public"."Talent_Lead"("ID_TalentLead");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Departamento_fkey" FOREIGN KEY ("ID_Departamento") REFERENCES "public"."Departamento"("ID_Departamento");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE "public"."Revisor_Meta" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";



































































































































































































GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Administrador" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Administrador" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Capability_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Capability_Lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Certificados" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Certificados" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cliente" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cliente" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Contacto" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Contacto" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cursos" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cursos" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cursos_Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Cursos_Habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Delivery_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Delivery_Lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Departamento" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Departamento" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado_Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado_Habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado_Proyectos" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Empleado_Proyectos" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."FeedBack" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."FeedBack" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Intereses" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Intereses" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Metas" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Metas" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."People_lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."People_lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Proyecto_Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Proyecto_Habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Proyectos" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Proyectos" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_proyecto" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_proyecto" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Roles" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Roles" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Discussion" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Discussion" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Lead" TO "anon";



























RESET ALL;
