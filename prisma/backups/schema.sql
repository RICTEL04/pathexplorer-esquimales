

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






CREATE OR REPLACE FUNCTION "public"."check_and_update_reviewed_trigger"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    all_reviewed boolean;
BEGIN
    SELECT COUNT(*) = 0 INTO all_reviewed
    FROM public."Empleado_Proyectos"
    WHERE "ID_Proyecto" = NEW."ID_Proyecto" AND "isReviewed" = false;

    IF all_reviewed THEN
        UPDATE public."Proyectos"
        SET "isReviewed" = true
        WHERE "ID_Proyecto" = NEW."ID_Proyecto";
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."check_and_update_reviewed_trigger"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    DELETE FROM public."Empleado"
    WHERE "ID_Empleado" = p_id_empleado;
END;
$$;


ALTER FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_available_delivery_leads"() RETURNS TABLE("id_empleado" "uuid", "nombre_empleado" "text", "id_deliverylead" "uuid")
    LANGUAGE "sql"
    AS $$
  SELECT 
    e."ID_Empleado", 
    e."Nombre" AS nombre_empleado, 
    dl."ID_DeliveryLead"
  FROM "Empleado" e
  JOIN "Delivery_Lead" dl ON dl."ID_Empleado" = e."ID_Empleado"
  LEFT JOIN "Proyectos" p ON p."ID_DeliveryLead" = dl."ID_DeliveryLead"
  WHERE p."ID_Proyecto" IS NULL;
$$;


ALTER FUNCTION "public"."get_available_delivery_leads"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employee_skills_excluding_category"("employee_id" "uuid", "excluded_category_id" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre_habilidad" "text", "nivel" "text", "nombre_position" "text", "nombre_empresa" "text")
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
  RETURN QUERY
  WITH habilidades_ordenadas AS (
    SELECT 
      h."ID_Habilidad",
      h."Nombre",
      hh."nivel",
      hist."NombrePosition",
      hist."NombreEmpresa",
      ROW_NUMBER() OVER (
        PARTITION BY h."ID_Habilidad"
        ORDER BY 
          CASE hh."nivel"
            WHEN 'expert' THEN 3
            WHEN 'intermediate' THEN 2
            WHEN 'beginner' THEN 1
            ELSE 0
          END DESC
      ) AS rn
    FROM "Historial" hist
    JOIN "Historial_Habilidades" hh ON hh."ID_Historial" = hist."id"
    JOIN "Habilidades" h ON h."ID_Habilidad" = hh."ID_Habilidad"
    WHERE hist."ID_Empleado" = employee_id
      AND h."ID_Categoria" != excluded_category_id
  )
  SELECT id_habilidad, nombre, nivel, nombreposition, nombreempresa
  FROM habilidades_ordenadas
  WHERE rn = 1;
END;
$$;


ALTER FUNCTION "public"."get_employee_skills_excluding_category"("employee_id" "uuid", "excluded_category_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employee_skills_max_level"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $_$BEGIN
CREATE OR REPLACE FUNCTION get_employee_skills_max_level(employee_id uuid)
RETURNS TABLE (
  id_habilidad uuid,
  nombre_habilidad text,
  nivel text,
  nombre_position text,
  nombre_empresa text
) AS $$
BEGIN
  RETURN QUERY
  WITH habilidades_ordenadas AS (
    SELECT 
      h."ID_Habilidad",
      h."Nombre",
      hh."nivel",
      hist."NombrePosition",
      hist."NombreEmpresa",
      ROW_NUMBER() OVER (
        PARTITION BY h."ID_Habilidad"
        ORDER BY 
          CASE hh."nivel"
            WHEN 'expert' THEN 3
            WHEN 'intermediate' THEN 2
            WHEN 'beginner' THEN 1
            ELSE 0
          END DESC
      ) AS rn
    FROM "Historial" hist
    JOIN "Historial_Habilidades" hh ON hh."ID_Historial" = hist."id"
    JOIN "Habilidades" h ON h."ID_Habilidad" = hh."ID_Habilidad"
    WHERE hist."ID_Empleado" = employee_id
  )
  SELECT id_habilidad, nombre, nivel, nombreposition, nombreempresa
  FROM habilidades_ordenadas
  WHERE rn = 1;
END;
$$ LANGUAGE plpgsql STABLE;

END;$_$;


ALTER FUNCTION "public"."get_employee_skills_max_level"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employee_skills_max_level"("employee_id" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre_habilidad" "text", "nivel" "text", "nombre_position" "text", "nombre_empresa" "text")
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
  RETURN QUERY
  WITH habilidades_ordenadas AS (
    SELECT 
      h."ID_Habilidad",
      h."Nombre",
      hh."nivel",
      hist."NombrePosition",
      hist."NombreEmpresa",
      ROW_NUMBER() OVER (
        PARTITION BY h."ID_Habilidad"
        ORDER BY 
          CASE hh."nivel"
            WHEN 'expert' THEN 3
            WHEN 'intermediate' THEN 2
            WHEN 'beginner' THEN 1
            ELSE 0
          END DESC
      ) AS rn
    FROM "Historial" hist
    JOIN "Historial_Habilidades" hh ON hh."ID_Historial" = hist."id"
    JOIN "Habilidades" h ON h."ID_Habilidad" = hh."ID_Habilidad"
    WHERE hist."ID_Empleado" = employee_id
  )
  SELECT id_habilidad, nombre, nivel, nombreposition, nombreempresa
  FROM habilidades_ordenadas
  WHERE rn = 1;
END;
$$;


ALTER FUNCTION "public"."get_employee_skills_max_level"("employee_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employee_skills_max_level_by_category"("employee_id" "uuid", "category_id" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre_habilidad" "text", "nivel" "text", "nombre_position" "text", "nombre_empresa" "text")
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
  RETURN QUERY
  WITH habilidades_ordenadas AS (
    SELECT 
      h."ID_Habilidad",
      h."Nombre",
      hh."nivel" as habilidad_nivel,  -- Alias único para la columna nivel
      hist."NombrePosition",
      hist."NombreEmpresa",
      ROW_NUMBER() OVER (
        PARTITION BY h."ID_Habilidad"
        ORDER BY 
          CASE hh."nivel"  -- Referencia explícita a la tabla Historial_Habilidades
            WHEN 'expert' THEN 3
            WHEN 'intermediate' THEN 2
            WHEN 'beginner' THEN 1
            ELSE 0
          END DESC
      ) AS rn
    FROM "Historial" hist
    JOIN "Historial_Habilidades" hh ON hh."ID_Historial" = hist."id"
    JOIN "Habilidades" h ON h."ID_Habilidad" = hh."ID_Habilidad"
    WHERE hist."ID_Empleado" = employee_id
      AND h."ID_Categoria" = category_id
  )
  SELECT 
    "ID_Habilidad" AS id_habilidad,
    "Nombre" AS nombre_habilidad,
    habilidad_nivel AS nivel,  -- Usando el alias definido
    "NombrePosition" AS nombre_position,
    "NombreEmpresa" AS nombre_empresa
  FROM habilidades_ordenadas
  WHERE rn = 1;
END;
$$;


ALTER FUNCTION "public"."get_employee_skills_max_level_by_category"("employee_id" "uuid", "category_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employees_by_level"("level_param" "text") RETURNS TABLE("id_empleado" "uuid", "nombre_empleado" "text", "nivel" "text", "id_departamento" "uuid", "nombre_departamento" "text", "id_people_lead" "uuid", "nombre_people_lead" "text", "id_capability_lead" "uuid", "nombre_capability_lead" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e."ID_Empleado",
        e."Nombre"::text AS "Nombre_Empleado",
        e."Nivel"::text,
        e."ID_Departamento",
        d."Nombre"::text AS "Nombre_Departamento",
        pl."ID" AS "ID_People_Lead",
        pl_emp."Nombre"::text AS "Nombre_People_Lead",
        cl."ID_CapabilityLead" AS "ID_Capability_Lead",
        cl_emp."Nombre"::text AS "Nombre_Capability_Lead"   
    FROM 
        "Empleado" e
    JOIN 
        "Departamento" d ON e."ID_Departamento" = d."ID_Departamento"
    LEFT JOIN 
        "People_lead" pl ON e."ID_PeopleLead" = pl."ID"
    LEFT JOIN 
        "Empleado" pl_emp ON pl."ID_Empleado" = pl_emp."ID_Empleado"
    LEFT JOIN 
        "Capability_Lead" cl ON d."ID_Departamento" = cl."ID_Departamento"
    LEFT JOIN 
        "Empleado" cl_emp ON cl."ID_Empleado" = cl_emp."ID_Empleado"
    WHERE 
        e."Nivel" = level_param  
    ORDER BY 
        e."Nombre";
END;
$$;


ALTER FUNCTION "public"."get_employees_by_level"("level_param" "text") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."obtener_habilidades_empleado_excluyendo_categoria"("p_id_empleado" "uuid", "p_id_categoria_excluir" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre" "text", "nivel" "text")
    LANGUAGE "sql"
    AS $$
WITH niveles AS (
  SELECT 'beginner' AS nivel, 1 AS nivel_orden
  UNION ALL
  SELECT 'intermediate', 2
  UNION ALL
  SELECT 'expert', 3
),
habilidades_empleado AS (
  SELECT
    hh."ID_Habilidad",
    h."Nombre",
    hh."nivel",
    n.nivel_orden,
    h."ID_Categoria"
  FROM "Historial" hist
  JOIN "Historial_Habilidades" hh ON hist."id" = hh."ID_Historial"
  JOIN "Habilidades" h ON hh."ID_Habilidad" = h."ID_Habilidad"
  JOIN niveles n ON hh."nivel" = n.nivel
  WHERE hist."ID_Empleado" = p_id_empleado
    AND h."ID_Categoria" <> p_id_categoria_excluir
),
habilidades_max AS (
  SELECT
    "ID_Habilidad",
    "Nombre",
    "nivel",
    ROW_NUMBER() OVER (PARTITION BY "ID_Habilidad" ORDER BY nivel_orden DESC) AS rn
  FROM habilidades_empleado
)
SELECT 
  "ID_Habilidad" AS id_habilidad,
  "Nombre" AS nombre,
  "nivel" AS nivel
FROM habilidades_max
WHERE rn = 1;
$$;


ALTER FUNCTION "public"."obtener_habilidades_empleado_excluyendo_categoria"("p_id_empleado" "uuid", "p_id_categoria_excluir" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."obtener_habilidades_excluyendo_categoria"("p_id_empleado" "uuid", "p_id_categoria_a_excluir" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre_habilidad" "text", "nivel_habilidad" "text", "id_categoria" "uuid", "nombre_categoria" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    WITH HabilidadesNivel AS (
        SELECT 
            hh."ID_Habilidad",
            hab."Nombre",
            hh."nivel",
            hab."ID_Categoria",
            cat."Nombre" AS nombre_categoria,
            CASE 
                WHEN hh."nivel" = 'beginner' THEN 1
                WHEN hh."nivel" = 'intermediate' THEN 2
                WHEN hh."nivel" = 'expert' THEN 3
                ELSE 0
            END AS nivel_valor
        FROM "public"."Historial_Habilidades" hh
        JOIN "public"."Historial" h ON hh."ID_Historial" = h."id"
        JOIN "public"."Habilidades" hab ON hh."ID_Habilidad" = hab."ID_Habilidad"
        JOIN "public"."Categorias" cat ON hab."ID_Categoria" = cat."ID_Categoria"
        WHERE h."ID_Empleado" = p_id_empleado
    ),
    HabilidadesMaxNivel AS (
        SELECT 
            "ID_Habilidad",
            "Nombre",
            "ID_Categoria",
            nombre_categoria,
            MAX(nivel_valor) AS max_nivel_valor
        FROM HabilidadesNivel
        GROUP BY "ID_Habilidad", "Nombre", "ID_Categoria", nombre_categoria
    )
    SELECT 
        hm."ID_Habilidad",
        hm."Nombre"::TEXT,
        CASE 
            WHEN hm.max_nivel_valor = 1 THEN 'beginner'
            WHEN hm.max_nivel_valor = 2 THEN 'intermediate'
            WHEN hm.max_nivel_valor = 3 THEN 'expert'
            ELSE 'unknown'
        END,
        hm."ID_Categoria",
        hm.nombre_categoria::TEXT
    FROM HabilidadesMaxNivel hm
    WHERE hm."ID_Categoria" != p_id_categoria_a_excluir
    ORDER BY hm.max_nivel_valor DESC, hm."Nombre";
END;
$$;


ALTER FUNCTION "public"."obtener_habilidades_excluyendo_categoria"("p_id_empleado" "uuid", "p_id_categoria_a_excluir" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."obtener_habilidades_por_categoria"("p_id_empleado" "uuid", "p_id_categoria" "uuid") RETURNS TABLE("id_habilidad" "uuid", "nombre_habilidad" "text", "nivel_habilidad" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    WITH HabilidadesNivel AS (
        SELECT 
            hh."ID_Habilidad",
            hab."Nombre",
            hh."nivel",
            hab."ID_Categoria",
            CASE 
                WHEN hh."nivel" = 'beginner' THEN 1
                WHEN hh."nivel" = 'intermediate' THEN 2
                WHEN hh."nivel" = 'expert' THEN 3
                ELSE 0
            END AS nivel_valor
        FROM "public"."Historial_Habilidades" hh
        JOIN "public"."Historial" h ON hh."ID_Historial" = h."id"
        JOIN "public"."Habilidades" hab ON hh."ID_Habilidad" = hab."ID_Habilidad"
        WHERE h."ID_Empleado" = p_id_empleado
    ),
    HabilidadesMaxNivel AS (
        SELECT 
            "ID_Habilidad",
            "Nombre",
            "ID_Categoria",
            MAX(nivel_valor) AS max_nivel_valor
        FROM HabilidadesNivel
        GROUP BY "ID_Habilidad", "Nombre", "ID_Categoria"
    )
    SELECT 
        hm."ID_Habilidad",
        hm."Nombre"::TEXT,
        CASE 
            WHEN hm.max_nivel_valor = 1 THEN 'beginner'
            WHEN hm.max_nivel_valor = 2 THEN 'intermediate'
            WHEN hm.max_nivel_valor = 3 THEN 'expert'
            ELSE 'unknown'
        END
    FROM HabilidadesMaxNivel hm
    WHERE hm."ID_Categoria" = p_id_categoria
    ORDER BY hm.max_nivel_valor DESC, hm."Nombre";
END;
$$;


ALTER FUNCTION "public"."obtener_habilidades_por_categoria"("p_id_empleado" "uuid", "p_id_categoria" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."select_proyectos_sin_autoevaluacion"("p_id_empleado" "uuid") RETURNS TABLE("ID_Proyecto" "uuid", "Nombre" "text", "Descripcion" "text", "Status" "text", "ID_DeliveryLead" "uuid", "fecha_inicio" "date", "fecha_fin" "date", "isReviewed" boolean)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT p.*
    FROM public."Proyectos" p
    JOIN public."Empleado_Proyectos" ep ON p."ID_Proyecto" = ep."ID_Proyecto"
    WHERE ep."ID_Empleado" = p_id_empleado
    AND NOT EXISTS (
        SELECT 1
        FROM public."Evaluacion_Proyecto" ep2
        WHERE ep2."ID_Empleado" = p_id_empleado
        AND ep2."ID_Proyecto" = p."ID_Proyecto"
        AND ep2."esAutoevaluacion" = true
    );
END;
$$;


ALTER FUNCTION "public"."select_proyectos_sin_autoevaluacion"("p_id_empleado" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."select_proyectos_terminados_empleado"("p_id_empleado" "uuid") RETURNS TABLE("ID_Proyecto" "uuid", "Nombre" "text", "ID_Cliente" "uuid", "Descripcion" "text", "ID_DeliveryLead" "uuid", "fecha_inicio" "date", "fecha_fin" "date", "isAutoevaluacion" boolean, "Fortalezas" "text", "Area_Mejora" "text", "Calificacion" smallint)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p."ID_Proyecto", 
        p."Nombre", 
        p."ID_Cliente", 
        p."Descripcion", 
        p."ID_DeliveryLead", 
        p."fecha_inicio", 
        p."fecha_fin",
        evp."esAutoevaluacion",
        evp."Fortalezas",
        evp."Areas_Mejora",
        evp."Calificacion"
    FROM public."Proyectos" p
    JOIN public."Empleado_Proyectos" ep ON p."ID_Proyecto" = ep."ID_Proyecto"
    JOIN public."Evaluacion_Proyecto" evp ON p."ID_Proyecto" = evp."ID_Proyecto"
    WHERE 
    ep."ID_Empleado" = p_id_empleado AND
    ep."isReviewed" = true AND
    evp."ID_Empleado" = p_id_empleado AND
    p."isReviewed" = true;
END;
$$;


ALTER FUNCTION "public"."select_proyectos_terminados_empleado"("p_id_empleado" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."update_is_reviewed"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE public."Empleado_Proyectos"
    SET "isReviewed" = true
    WHERE "ID_Empleado" = NEW."ID_Empleado" AND "ID_Proyecto" = NEW."ID_Proyecto";
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_is_reviewed"() OWNER TO "postgres";

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


CREATE TABLE IF NOT EXISTS "public"."Categorias_habilidades" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "Nombre_categoria" "text"
);


ALTER TABLE "public"."Categorias_habilidades" OWNER TO "postgres";


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
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "isReviewed" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."Empleado_Proyectos" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Empleado_Proyectos"."isApproved" IS 'determines wether an employee is approved to a project or still on the postulation process';



CREATE TABLE IF NOT EXISTS "public"."Evaluacion_Proyecto" (
    "ID_Evaluacion" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_DeliveryLead" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Proyecto" "uuid",
    "Calificacion" smallint NOT NULL,
    "Fortalezas" "text" NOT NULL,
    "Areas_Mejora" "text" NOT NULL,
    "esAutoevaluacion" boolean DEFAULT false NOT NULL,
    CONSTRAINT "Revisor_Proyecto_Calificacion_check" CHECK (("Calificacion" <= 5))
);


ALTER TABLE "public"."Evaluacion_Proyecto" OWNER TO "postgres";


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
    "Nombre" character varying,
    "ID_Categoria" "uuid"
);


ALTER TABLE "public"."Habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Historial" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"(),
    "NombrePosition" "text",
    "NombreEmpresa" "text",
    "Fecha_inicio" "date",
    "Fecha_final" "date",
    "Descripcion" "text",
    "Currentjob" boolean,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."Historial" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Historial_Habilidades" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_Habilidad" "uuid" DEFAULT "gen_random_uuid"(),
    "nivel" "text",
    "ID_Historial" "uuid"
);


ALTER TABLE "public"."Historial_Habilidades" OWNER TO "postgres";


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
    "Registrada" boolean,
    "Estado" character varying,
    "Self_Reflection" character varying,
    "Fecha_Inicio" "date"
);


ALTER TABLE "public"."Metas" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."People_lead" (
    "ID" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ID_Empleado" "uuid"
);


ALTER TABLE "public"."People_lead" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Proyecto_Habilidades" (
    "ID_Proyecto" "uuid" NOT NULL,
    "ID_Habilidad" "uuid" NOT NULL,
    "nivel" "text"
);


ALTER TABLE "public"."Proyecto_Habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Proyectos" (
    "ID_Proyecto" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Nombre" "text" NOT NULL,
    "Descripcion" "text",
    "Status" "text" DEFAULT 'active'::"text" NOT NULL,
    "ID_DeliveryLead" "uuid",
    "fecha_inicio" "date",
    "fecha_fin" "date",
    "isReviewed" boolean DEFAULT false NOT NULL,
    "cargabilidad_num" smallint DEFAULT '100'::smallint NOT NULL,
    CONSTRAINT "Proyectos_Status_check" CHECK (("Status" = ANY (ARRAY['active'::"text", 'inactive'::"text", 'pending'::"text", 'done'::"text"])))
);


ALTER TABLE "public"."Proyectos" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Proyectos"."cargabilidad_num" IS 'cargabilidad del proyecto en entero del 1 al 100, definida por el capability lead';



CREATE TABLE IF NOT EXISTS "public"."Puesto_proyecto" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" "date" NOT NULL,
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Proyecto" "uuid" DEFAULT "gen_random_uuid"(),
    "Puesto" character varying,
    "cliente" "text"
);


ALTER TABLE "public"."Puesto_proyecto" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Revisor_Meta" (
    "ID_Revisor" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_EmpleadoRevisor" "uuid",
    "ID_meta" "uuid",
    "ID_Empleado" "uuid",
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



CREATE TABLE IF NOT EXISTS "public"."TD_Capability_Lead" (
    "ID_TD_Capability_Lead" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TalentDiscussion" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_CapabilityLead" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."TD_Capability_Lead" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_Capability_Lead" IS 'Talent discussion del cpaability Lead';



CREATE TABLE IF NOT EXISTS "public"."TD_Employee" (
    "ID_TD_Employee" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TalentDiscussion" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."TD_Employee" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_Employee" IS 'Empleados de la talent Discussion';



CREATE TABLE IF NOT EXISTS "public"."TD_Employee_Request" (
    "ID_TD_Employee_Request" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TalentDiscussion" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TD_Employee" "uuid" DEFAULT "gen_random_uuid"(),
    "Descripcion" character varying,
    "Estado" character varying DEFAULT 'Pendiente'::character varying,
    "Resultado" character varying
);


ALTER TABLE "public"."TD_Employee_Request" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_Employee_Request" IS 'Request of the employee to the talent discussion';



CREATE TABLE IF NOT EXISTS "public"."TD_People_Lead" (
    "ID_TD_People_Lead" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TalentDiscussion" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_People_Lead" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."TD_People_Lead" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_People_Lead" IS 'PeopleLead del talent discussion';



CREATE TABLE IF NOT EXISTS "public"."Talent_Discussion" (
    "ID_TalentDiscussion" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "Discussion" character varying,
    "ID_TalentLead" "uuid" NOT NULL,
    "Nivel" character varying,
    "Fecha_Inicio" "date",
    "Fecha_Final" "date",
    "Estado" character varying DEFAULT 'Pendiente'::character varying
);


ALTER TABLE "public"."Talent_Discussion" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Talent_Discussion"."Nivel" IS 'Nivel que se tiene planeado evaluar en la talent discussion';



COMMENT ON COLUMN "public"."Talent_Discussion"."Fecha_Inicio" IS 'Fecha de inicio a evaluar';



COMMENT ON COLUMN "public"."Talent_Discussion"."Fecha_Final" IS 'Fecha final del periodo a evaluar';



COMMENT ON COLUMN "public"."Talent_Discussion"."Estado" IS 'Estado de la talent discussion: Pendiente, En Progreso, Finalizada';



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



ALTER TABLE ONLY "public"."Categorias_habilidades"
    ADD CONSTRAINT "Categorias_habilidades_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Certificados"
    ADD CONSTRAINT "Certificados_pkey" PRIMARY KEY ("ID_Certificado");



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
    ADD CONSTRAINT "Habilidades_Nombre_key" UNIQUE ("Nombre");



ALTER TABLE ONLY "public"."Habilidades"
    ADD CONSTRAINT "Habilidades_pkey" PRIMARY KEY ("ID_Habilidad");



ALTER TABLE ONLY "public"."Historial_Habilidades"
    ADD CONSTRAINT "Historial_Habilidades_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Historial"
    ADD CONSTRAINT "Historial_pkey" PRIMARY KEY ("id");



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



ALTER TABLE ONLY "public"."Evaluacion_Proyecto"
    ADD CONSTRAINT "Revisor_Proyecto_pkey" PRIMARY KEY ("ID_Evaluacion");



ALTER TABLE ONLY "public"."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."TD_Capability_Lead"
    ADD CONSTRAINT "TD_Capability_Lead_pkey" PRIMARY KEY ("ID_TD_Capability_Lead");



ALTER TABLE ONLY "public"."TD_Employee_Request"
    ADD CONSTRAINT "TD_Employee_Request_pkey" PRIMARY KEY ("ID_TD_Employee_Request");



ALTER TABLE ONLY "public"."TD_Employee"
    ADD CONSTRAINT "TD_Employee_pkey" PRIMARY KEY ("ID_TD_Employee");



ALTER TABLE ONLY "public"."TD_People_Lead"
    ADD CONSTRAINT "TD_People_Lead_pkey" PRIMARY KEY ("ID_TD_People_Lead");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_pkey" PRIMARY KEY ("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Empleado_key" UNIQUE ("ID_Empleado");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_pkey" PRIMARY KEY ("ID_TalentLead");



ALTER TABLE ONLY "public"."Empleado_Proyectos"
    ADD CONSTRAINT "unique_empleado_proyecto" UNIQUE ("ID_Empleado", "ID_Proyecto");



CREATE OR REPLACE TRIGGER "after_insert_evaluacion" AFTER INSERT ON "public"."Evaluacion_Proyecto" FOR EACH ROW EXECUTE FUNCTION "public"."update_is_reviewed"();



CREATE OR REPLACE TRIGGER "update_proyecto_review_status" AFTER UPDATE ON "public"."Empleado_Proyectos" FOR EACH ROW EXECUTE FUNCTION "public"."check_and_update_reviewed_trigger"();



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Departamento_fkey" FOREIGN KEY ("ID_Departamento") REFERENCES "public"."Departamento"("ID_Departamento");



ALTER TABLE ONLY "public"."Capability_Lead"
    ADD CONSTRAINT "Capability_Lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Certificados"
    ADD CONSTRAINT "Certificados_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



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
    ADD CONSTRAINT "Empleado_Proyectos_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."FeedBack"
    ADD CONSTRAINT "FeedBack_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."FeedBack"
    ADD CONSTRAINT "FeedBack_ID_People_lead_fkey" FOREIGN KEY ("ID_People_lead") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."Habilidades"
    ADD CONSTRAINT "Habilidades_ID_Categoria_fkey" FOREIGN KEY ("ID_Categoria") REFERENCES "public"."Categorias_habilidades"("id");



ALTER TABLE ONLY "public"."Historial_Habilidades"
    ADD CONSTRAINT "Historial_Habilidades_ID_Habilidad_fkey" FOREIGN KEY ("ID_Habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Historial_Habilidades"
    ADD CONSTRAINT "Historial_Habilidades_ID_Historial_fkey" FOREIGN KEY ("ID_Historial") REFERENCES "public"."Historial"("id");



ALTER TABLE ONLY "public"."Historial"
    ADD CONSTRAINT "Historial_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Intereses"
    ADD CONSTRAINT "Intereses_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Metas"
    ADD CONSTRAINT "Metas_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."People_lead"
    ADD CONSTRAINT "People_lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Proyecto_Habilidades"
    ADD CONSTRAINT "Proyecto_Habilidades_ID_Habilidad_fkey" FOREIGN KEY ("ID_Habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Proyecto_Habilidades"
    ADD CONSTRAINT "Proyecto_Habilidades_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."Proyectos"
    ADD CONSTRAINT "Proyectos_ID_DeliveryLead_fkey" FOREIGN KEY ("ID_DeliveryLead") REFERENCES "public"."Delivery_Lead"("ID_DeliveryLead");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_EmpleadoRevisor_fkey" FOREIGN KEY ("ID_EmpleadoRevisor") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_ID_meta_fkey" FOREIGN KEY ("ID_meta") REFERENCES "public"."Metas"("ID_meta");



ALTER TABLE ONLY "public"."Evaluacion_Proyecto"
    ADD CONSTRAINT "Revisor_Proyecto_ID_DeliveryLead_fkey" FOREIGN KEY ("ID_DeliveryLead") REFERENCES "public"."Delivery_Lead"("ID_DeliveryLead") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Evaluacion_Proyecto"
    ADD CONSTRAINT "Revisor_Proyecto_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Evaluacion_Proyecto"
    ADD CONSTRAINT "Revisor_Proyecto_ID_Proyecto_fkey" FOREIGN KEY ("ID_Proyecto") REFERENCES "public"."Proyectos"("ID_Proyecto");



ALTER TABLE ONLY "public"."Roles"
    ADD CONSTRAINT "Roles_Proyecto_id_fkey" FOREIGN KEY ("Proyecto_id") REFERENCES "public"."Proyectos"("ID_Proyecto") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."TD_Capability_Lead"
    ADD CONSTRAINT "TD_Capability_Lead_ID_CapabilityLead_fkey" FOREIGN KEY ("ID_CapabilityLead") REFERENCES "public"."Capability_Lead"("ID_CapabilityLead");



ALTER TABLE ONLY "public"."TD_Capability_Lead"
    ADD CONSTRAINT "TD_Capability_Lead_ID_TalentDiscussion_fkey" FOREIGN KEY ("ID_TalentDiscussion") REFERENCES "public"."Talent_Discussion"("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."TD_Employee"
    ADD CONSTRAINT "TD_Employee_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."TD_Employee"
    ADD CONSTRAINT "TD_Employee_ID_TalentDiscussion_fkey" FOREIGN KEY ("ID_TalentDiscussion") REFERENCES "public"."Talent_Discussion"("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."TD_Employee_Request"
    ADD CONSTRAINT "TD_Employee_Request_ID_TD_Employee_fkey" FOREIGN KEY ("ID_TD_Employee") REFERENCES "public"."TD_Employee"("ID_TD_Employee");



ALTER TABLE ONLY "public"."TD_Employee_Request"
    ADD CONSTRAINT "TD_Employee_Request_ID_TalentDiscussion_fkey" FOREIGN KEY ("ID_TalentDiscussion") REFERENCES "public"."Talent_Discussion"("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."TD_People_Lead"
    ADD CONSTRAINT "TD_People_Lead_ID_People_Lead_fkey" FOREIGN KEY ("ID_People_Lead") REFERENCES "public"."People_lead"("ID");



ALTER TABLE ONLY "public"."TD_People_Lead"
    ADD CONSTRAINT "TD_People_Lead_ID_TalentDiscussion_fkey" FOREIGN KEY ("ID_TalentDiscussion") REFERENCES "public"."Talent_Discussion"("ID_TalentDiscussion");



ALTER TABLE ONLY "public"."Talent_Discussion"
    ADD CONSTRAINT "Talent_Discussion_ID_TalentLead_fkey" FOREIGN KEY ("ID_TalentLead") REFERENCES "public"."Talent_Lead"("ID_TalentLead");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Departamento_fkey" FOREIGN KEY ("ID_Departamento") REFERENCES "public"."Departamento"("ID_Departamento");



ALTER TABLE ONLY "public"."Talent_Lead"
    ADD CONSTRAINT "Talent_Lead_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE "public"."TD_Capability_Lead" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."TD_Employee" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."TD_Employee_Request" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."TD_People_Lead" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Proyectos";



REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";



































































































































































































GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Administrador" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Administrador" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Capability_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Capability_Lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Categorias_habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Categorias_habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Certificados" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Certificados" TO "anon";



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



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Evaluacion_Proyecto" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Evaluacion_Proyecto" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."FeedBack" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."FeedBack" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Historial" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Historial" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Historial_Habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Historial_Habilidades" TO "anon";



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



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Revisor_Meta" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Revisor_Meta" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Roles" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Roles" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Capability_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Capability_Lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Employee" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Employee" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Employee_Request" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_Employee_Request" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_People_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."TD_People_Lead" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Discussion" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Discussion" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Lead" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Talent_Lead" TO "anon";



























RESET ALL;
