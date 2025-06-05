

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






CREATE OR REPLACE FUNCTION "public"."actualizar_estado_people_lead_y_crear_requests"("p_id_people_lead" "uuid", "p_id_talent_discussion" "uuid", "p_empleados_ids" "uuid"[] DEFAULT NULL::"uuid"[], "p_estado" "text" DEFAULT 'Pendiente'::"text") RETURNS TABLE("td_people_lead_actualizado" boolean, "requests_creados" integer)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_td_people_lead_id uuid;
    v_td_employee_id uuid;
    v_requests_creados integer := 0;
BEGIN
    -- 1. Actualizar estado en TD_People_Lead
    UPDATE "TD_People_Lead"
    SET "Estado" = p_estado
    WHERE "ID_TalentDiscussion" = p_id_talent_discussion
    AND "ID_People_Lead" = p_id_people_lead
    RETURNING "ID_TD_People_Lead" INTO v_td_people_lead_id;
    
    -- Verificar si se actualizó correctamente
    IF v_td_people_lead_id IS NULL THEN
        RAISE NOTICE 'No se encontró registro en TD_People_Lead para People Lead % y Talent Discussion %', 
            p_id_people_lead, p_id_talent_discussion;
    END IF;
    
    -- 2. Crear Employee Requests si se proporcionaron IDs de empleados
    IF p_empleados_ids IS NOT NULL AND array_length(p_empleados_ids, 1) > 0 THEN
        -- Por cada empleado proporcionado
        FOR i IN 1..array_length(p_empleados_ids, 1) LOOP
            -- Buscar el TD_Employee correspondiente
            SELECT "ID_TD_Employee" INTO v_td_employee_id
            FROM "TD_Employee"
            WHERE "ID_TalentDiscussion" = p_id_talent_discussion
            AND "ID_Empleado" = p_empleados_ids[i];
            
            -- Si existe el registro en TD_Employee, crear el request
            IF v_td_employee_id IS NOT NULL THEN
                INSERT INTO "TD_Employee_Request" (
                    "ID_TalentDiscussion",
                    "ID_TD_Employee",
                    "Descripcion",
                    "Estado",
                    "Resultado"
                ) VALUES (
                    p_id_talent_discussion,
                    v_td_employee_id,
                    'No Participa',
                    'No Asignado', -- Estado fijo como requeriste
                    'No participa(establecido por people lead)' -- Mensaje por defecto
                );
                
                v_requests_creados := v_requests_creados + 1;
            ELSE
                RAISE NOTICE 'No se encontró registro en TD_Employee para empleado % en esta Talent Discussion', 
                    p_empleados_ids[i];
            END IF;
        END LOOP;
    END IF;
    
    -- Retornar resultados
    RETURN QUERY SELECT 
        (v_td_people_lead_id IS NOT NULL) AS td_people_lead_actualizado,
        v_requests_creados AS requests_creados;
END;
$$;


ALTER FUNCTION "public"."actualizar_estado_people_lead_y_crear_requests"("p_id_people_lead" "uuid", "p_id_talent_discussion" "uuid", "p_empleados_ids" "uuid"[], "p_estado" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."actualizar_estado_td_people_lead"("p_id_talent_discussion" "uuid", "p_id_people_lead" "uuid", "p_nuevo_estado" "text") RETURNS TABLE("actualizado" boolean, "mensaje" "text")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_registros_afectados integer;
BEGIN
  -- Validar que el nuevo estado no sea nulo
  IF p_nuevo_estado IS NULL THEN
    RETURN QUERY SELECT false, 'Error: El estado no puede ser nulo';
    RETURN;
  END IF;
  
  -- Actualizar el estado en TD_People_Lead
  UPDATE "TD_People_Lead"
  SET "Estado" = p_nuevo_estado
  WHERE "ID_TalentDiscussion" = p_id_talent_discussion
    AND "ID_People_Lead" = p_id_people_lead;
  
  -- Obtener número de registros afectados
  GET DIAGNOSTICS v_registros_afectados = ROW_COUNT;
  
  -- Retornar resultados
  IF v_registros_afectados > 0 THEN
    RETURN QUERY SELECT true, 'Estado actualizado correctamente a ' || p_nuevo_estado;
  ELSE
    RETURN QUERY SELECT false, 'No se encontró el registro con ID_TalentDiscussion=' || p_id_talent_discussion || 
                              ' e ID_People_Lead=' || p_id_people_lead;
  END IF;
END;
$$;


ALTER FUNCTION "public"."actualizar_estado_td_people_lead"("p_id_talent_discussion" "uuid", "p_id_people_lead" "uuid", "p_nuevo_estado" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."actualizar_td_employee_request"("p_id_td_employee_request" "uuid", "p_estado" character varying, "p_resultado" "text") RETURNS TABLE("success" boolean, "message" "text", "updated_record" "record")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_record_exists BOOLEAN := FALSE;
    v_updated_record RECORD;
BEGIN
    -- Verificar si el registro existe
    SELECT EXISTS(
        SELECT 1 
        FROM public."TD_Employee_Request"  -- Nota las comillas para nombres con mayúsculas
        WHERE "ID_TD_Employee_Request" = p_id_td_employee_request
    ) INTO v_record_exists;
    
    -- Si el registro no existe, retornar error
    IF NOT v_record_exists THEN
        RETURN QUERY SELECT 
            FALSE as success,
            'No se encontró el TD_Employee_Request con el ID proporcionado' as message,
            NULL::RECORD as updated_record;
        RETURN;
    END IF;
    
    -- Actualizar el registro
    UPDATE public."TD_Employee_Request" 
    SET 
        "Estado" = p_estado,
        "Resultado" = p_resultado
    WHERE "ID_TD_Employee_Request" = p_id_td_employee_request;
    
    -- Obtener el registro actualizado para confirmar los cambios
    SELECT 
        "ID_TD_Employee_Request",
        "ID_TalentDiscussion",
        "ID_TD_Employee",
        "Descripcion",
        "Estado",
        "Resultado"
    INTO v_updated_record
    FROM public."TD_Employee_Request" 
    WHERE "ID_TD_Employee_Request" = p_id_td_employee_request;
    
    -- Retornar éxito con el registro actualizado
    RETURN QUERY SELECT 
        TRUE as success,
        'TD_Employee_Request actualizado correctamente' as message,
        v_updated_record as updated_record;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Manejar cualquier error inesperado
        RETURN QUERY SELECT 
            FALSE as success,
            'Error al actualizar: ' || SQLERRM as message,
            NULL::RECORD as updated_record;
END;
$$;


ALTER FUNCTION "public"."actualizar_td_employee_request"("p_id_td_employee_request" "uuid", "p_estado" character varying, "p_resultado" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."aumentar_cargabilidad"("id" "uuid", "incremento" integer) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  update "public"."Empleado"
  set "Cargabilidad" = "Cargabilidad" + incremento
  where "ID_Empleado" = id
    and ("Cargabilidad" + incremento) <= 100;
end;
$$;


ALTER FUNCTION "public"."aumentar_cargabilidad"("id" "uuid", "incremento" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cambiar_estado_talent_discussion"("p_talent_discussion_id" "uuid", "p_nuevo_estado" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Validar que el nuevo estado no sea nulo
  IF p_nuevo_estado IS NULL THEN
    RAISE EXCEPTION 'El nuevo estado no puede ser nulo';
  END IF;
  
  -- Validar que la Talent Discussion exista (usando el nombre correcto de la tabla)
  IF NOT EXISTS (
    SELECT 1 FROM "Talent_Discussion" 
    WHERE "ID_TalentDiscussion" = p_talent_discussion_id
  ) THEN
    RAISE EXCEPTION 'No se encontró la Talent Discussion con ID %', p_talent_discussion_id;
  END IF;
  
  -- Actualizar el estado de la Talent Discussion
  UPDATE "Talent_Discussion"
  SET "Estado" = p_nuevo_estado
  WHERE "ID_TalentDiscussion" = p_talent_discussion_id;
  
  RETURN 'Estado actualizado correctamente a ' || p_nuevo_estado;
END;
$$;


ALTER FUNCTION "public"."cambiar_estado_talent_discussion"("p_talent_discussion_id" "uuid", "p_nuevo_estado" "text") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."crear_employee_request_con_capability_lead"("p_id_empleado" "uuid", "p_id_talent_discussion" "uuid", "p_descripcion_request" "text", "p_id_capability_lead" "uuid" DEFAULT NULL::"uuid") RETURNS TABLE("id_td_employee_request" "uuid", "id_td_capability_lead" "uuid")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_id_td_employee uuid;
    v_id_td_employee_request uuid;
    v_id_td_capability_lead uuid;
    v_capability_lead_to_use uuid;
BEGIN
    -- Validar que el empleado existe
    IF NOT EXISTS (SELECT 1 FROM "Empleado" WHERE "ID_Empleado" = p_id_empleado) THEN
        RAISE EXCEPTION 'Empleado con ID % no encontrado', p_id_empleado;
    END IF;
    
    -- Validar que la Talent Discussion existe
    IF NOT EXISTS (SELECT 1 FROM "Talent_Discussion" WHERE "ID_TalentDiscussion" = p_id_talent_discussion) THEN
        RAISE EXCEPTION 'Talent Discussion con ID % no encontrada', p_id_talent_discussion;
    END IF;
    
    -- Obtener el ID de TD_Employee existente
    SELECT "ID_TD_Employee" INTO v_id_td_employee
    FROM "TD_Employee"
    WHERE "ID_TalentDiscussion" = p_id_talent_discussion
    AND "ID_Empleado" = p_id_empleado;
    
    -- Verificar que existe un registro en TD_Employee
    IF v_id_td_employee IS NULL THEN
        RAISE EXCEPTION 'No existe un registro en TD_Employee para este empleado y talent discussion';
    END IF;
    
    -- Crear registro en TD_Employee_Request
    INSERT INTO "TD_Employee_Request" (
        "ID_TalentDiscussion",
        "ID_TD_Employee",
        "Descripcion",
        "Estado"
    ) VALUES (
        p_id_talent_discussion,
        v_id_td_employee,
        p_descripcion_request,
        'Pendiente' -- Estado por defecto
    ) RETURNING "ID_TD_Employee_Request" INTO v_id_td_employee_request;
    
    -- Determinar qué Capability Lead usar
    IF p_id_capability_lead IS NOT NULL THEN
        -- Verificar que el Capability Lead proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM "Capability_Lead" WHERE "ID_CapabilityLead" = p_id_capability_lead) THEN
            RAISE NOTICE 'El Capability Lead con ID % no existe, se intentará encontrar uno automáticamente', p_id_capability_lead;
        ELSE
            v_capability_lead_to_use := p_id_capability_lead;
        END IF;
    END IF;
    
    -- Si no se proporcionó un Capability Lead válido, buscar el del departamento del empleado
    IF v_capability_lead_to_use IS NULL THEN
        SELECT cl."ID_CapabilityLead" INTO v_capability_lead_to_use
        FROM "Empleado" e
        JOIN "Capability_Lead" cl ON e."ID_Departamento" = cl."ID_Departamento"
        WHERE e."ID_Empleado" = p_id_empleado;
    END IF;
    
    -- Si tenemos un capability lead válido, verificar si ya está asociado a la TD
    IF v_capability_lead_to_use IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 
            FROM "TD_Capability_Lead" 
            WHERE "ID_TalentDiscussion" = p_id_talent_discussion
            AND "ID_CapabilityLead" = v_capability_lead_to_use
        ) THEN
            -- Si no existe, crear el registro
            INSERT INTO "TD_Capability_Lead" (
                "ID_TalentDiscussion",
                "ID_CapabilityLead"
            ) VALUES (
                p_id_talent_discussion,
                v_capability_lead_to_use
            ) RETURNING "ID_TD_Capability_Lead" INTO v_id_td_capability_lead;
        END IF;
    END IF;
    
    -- Retornar los IDs de los registros creados
    RETURN QUERY SELECT v_id_td_employee_request, v_id_td_capability_lead;
END;
$$;


ALTER FUNCTION "public"."crear_employee_request_con_capability_lead"("p_id_empleado" "uuid", "p_id_talent_discussion" "uuid", "p_descripcion_request" "text", "p_id_capability_lead" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."crear_registros_talent_discussion"("p_id_empleado" "uuid", "p_id_talent_discussion" "uuid", "p_descripcion_request" "text") RETURNS TABLE("id_td_employee" "uuid", "id_td_employee_request" "uuid", "id_td_capability_lead" "uuid")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_id_td_employee uuid;
    v_id_td_employee_request uuid;
    v_id_capability_lead uuid;
    v_id_departamento_empleado uuid;
BEGIN
    -- Validar que el empleado existe (usando el nombre correcto de la tabla)
    IF NOT EXISTS (SELECT 1 FROM "Empleado" WHERE "ID_Empleado" = p_id_empleado) THEN
        RAISE EXCEPTION 'Empleado con ID % no encontrado', p_id_empleado;
    END IF;
    
    -- Validar que la Talent Discussion existe
    IF NOT EXISTS (SELECT 1 FROM "Talent_Discussion" WHERE "ID_TalentDiscussion" = p_id_talent_discussion) THEN
        RAISE EXCEPTION 'Talent Discussion con ID % no encontrada', p_id_talent_discussion;
    END IF;
    
    -- 1. Crear registro en TD_Employee
    INSERT INTO "TD_Employee" (
        "ID_TalentDiscussion",
        "ID_Empleado"
    ) VALUES (
        p_id_talent_discussion,
        p_id_empleado
    ) RETURNING "ID_TD_Employee" INTO v_id_td_employee;
    
    -- 2. Crear registro en TD_Employee_Request (sin estado ni resultado)
    INSERT INTO "TD_Employee_Request" (
        "ID_TalentDiscussion",
        "ID_TD_Employee",
        "Descripcion"
    ) VALUES (
        p_id_talent_discussion,
        v_id_td_employee,
        p_descripcion_request
    ) RETURNING "ID_TD_Employee_Request" INTO v_id_td_employee_request;
    
    -- 3. Buscar y crear registro en TD_Capability_Lead
    -- Primero obtener el departamento del empleado
    SELECT "ID_Departamento" INTO v_id_departamento_empleado
    FROM "Empleado"
    WHERE "ID_Empleado" = p_id_empleado;
    
    -- Luego obtener el Capability Lead de ese departamento
    IF v_id_departamento_empleado IS NOT NULL THEN
        SELECT "ID_CapabilityLead" INTO v_id_capability_lead
        FROM "Capability_Lead"
        WHERE "ID_Departamento" = v_id_departamento_empleado;
        
        -- Si existe un Capability Lead para ese departamento, crear el registro
        IF v_id_capability_lead IS NOT NULL THEN
            INSERT INTO "TD_Capability_Lead" (
                "ID_TalentDiscussion",
                "ID_CapabilityLead"
            ) VALUES (
                p_id_talent_discussion,
                v_id_capability_lead
            ) RETURNING "ID_TD_Capability_Lead" INTO v_id_capability_lead;
        END IF;
    END IF;
    
    -- Retornar los IDs de los registros creados
    RETURN QUERY SELECT v_id_td_employee, v_id_td_employee_request, v_id_capability_lead;
END;
$$;


ALTER FUNCTION "public"."crear_registros_talent_discussion"("p_id_empleado" "uuid", "p_id_talent_discussion" "uuid", "p_descripcion_request" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_talent_discussion_with_participants"("p_discussion_text" character varying, "p_id_talent_lead" "uuid", "p_nivel" character varying, "p_fecha_inicio" "date", "p_fecha_final" "date", "p_people_lead_ids" "uuid"[] DEFAULT NULL::"uuid"[], "p_employee_ids" "uuid"[] DEFAULT NULL::"uuid"[]) RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE 
    v_new_td_id uuid; 
    v_lead_id uuid;
    v_employee_id uuid;
BEGIN 
    -- 1. Crear la nueva Talent Discussion
    INSERT INTO "Talent_Discussion" ( 
        "Discussion", 
        "ID_TalentLead", 
        "Nivel", 
        "Fecha_Inicio", 
        "Fecha_Final", 
        "Estado" 
    ) VALUES ( 
        p_discussion_text, 
        p_id_talent_lead, 
        p_nivel, 
        p_fecha_inicio, 
        p_fecha_final, 
        'Pendiente' 
    ) RETURNING "ID_TalentDiscussion" INTO v_new_td_id; 

    -- 2. Agregar People Leads (si se proporcionaron)
    IF p_people_lead_ids IS NOT NULL THEN
        FOREACH v_lead_id IN ARRAY p_people_lead_ids LOOP 
            INSERT INTO "TD_People_Lead" ( 
                "ID_TalentDiscussion", 
                "ID_People_Lead" 
            ) VALUES ( 
                v_new_td_id, 
                v_lead_id 
            ); 
        END LOOP; 
    END IF;

    -- 3. Agregar Empleados a TD_Employee (si se proporcionaron)
    IF p_employee_ids IS NOT NULL THEN
        FOREACH v_employee_id IN ARRAY p_employee_ids LOOP 
            INSERT INTO "TD_Employee" ( 
                "ID_TalentDiscussion", 
                "ID_Empleado" 
            ) VALUES ( 
                v_new_td_id, 
                v_employee_id 
            ); 
        END LOOP;
    END IF;

    RETURN v_new_td_id; 
END;
$$;


ALTER FUNCTION "public"."create_talent_discussion_with_participants"("p_discussion_text" character varying, "p_id_talent_lead" "uuid", "p_nivel" character varying, "p_fecha_inicio" "date", "p_fecha_final" "date", "p_people_lead_ids" "uuid"[], "p_employee_ids" "uuid"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_talent_discussion_with_people_leads"("p_discussion_text" "text", "p_nivel" "text", "p_id_talent_lead" "uuid", "p_fecha_inicio" "date", "p_fecha_final" "date", "p_people_lead_ids" "uuid"[]) RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_new_td_id uuid;
    v_lead_id uuid;
BEGIN
    -- 1. Crear la nueva Talent Discussion
    INSERT INTO "Talent_Discussion" (
        "Discussion",
        "ID_TalentLead",
        "Nivel",
        "Fecha_Inicio",
        "Fecha_Final",
        "Estado"
    ) VALUES (
        p_discussion_text,
        p_id_talent_lead,
        p_nivel,
        p_fecha_inicio,
        p_fecha_final,
        'Pendiente'
    ) RETURNING "ID_TalentDiscussion" INTO v_new_td_id;
    
    -- 2. Agregar solo People Leads (si se proporcionaron)
    FOREACH v_lead_id IN ARRAY p_people_lead_ids LOOP
        INSERT INTO "TD_People_Lead" (
            "ID_TalentDiscussion",
            "ID_People_Lead"
        ) VALUES (
            v_new_td_id,
            v_lead_id
        );
    END LOOP;
    
    RETURN v_new_td_id;
END;
$$;


ALTER FUNCTION "public"."create_talent_discussion_with_people_leads"("p_discussion_text" "text", "p_nivel" "text", "p_id_talent_lead" "uuid", "p_fecha_inicio" "date", "p_fecha_final" "date", "p_people_lead_ids" "uuid"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    DELETE FROM public."Empleado"
    WHERE "ID_Empleado" = p_id_empleado;
END;
$$;


ALTER FUNCTION "public"."delete_empleado"("p_id_empleado" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."force_talent_discussion_participants"("p_talent_discussion_id" "uuid", "p_people_lead_ids_no_asignados" "uuid"[] DEFAULT NULL::"uuid"[], "p_people_lead_ids_asignados" "uuid"[] DEFAULT NULL::"uuid"[], "p_employee_ids" "uuid"[] DEFAULT NULL::"uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
  invalid_uuid_found boolean := false;
  array_len integer;
BEGIN
  -- Validar formatos UUID primero
  -- Verificar People Leads no asignados
  IF p_people_lead_ids_no_asignados IS NOT NULL THEN
    array_len := array_length(p_people_lead_ids_no_asignados, 1);
    IF array_len IS NOT NULL THEN
      FOR i IN 1..array_len LOOP
        IF p_people_lead_ids_no_asignados[i] IS NOT NULL AND p_people_lead_ids_no_asignados[i]::text !~ '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$' THEN
          invalid_uuid_found := true;
          RAISE NOTICE 'UUID inválido encontrado en p_people_lead_ids_no_asignados: %', p_people_lead_ids_no_asignados[i];
        END IF;
      END LOOP;
    END IF;
  END IF;
  
  -- Verificar People Leads asignados
  IF p_people_lead_ids_asignados IS NOT NULL THEN
    array_len := array_length(p_people_lead_ids_asignados, 1);
    IF array_len IS NOT NULL THEN
      FOR i IN 1..array_len LOOP
        IF p_people_lead_ids_asignados[i] IS NOT NULL AND p_people_lead_ids_asignados[i]::text !~ '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$' THEN
          invalid_uuid_found := true;
          RAISE NOTICE 'UUID inválido encontrado en p_people_lead_ids_asignados: %', p_people_lead_ids_asignados[i];
        END IF;
      END LOOP;
    END IF;
  END IF;
  
  -- Verificar Employee IDs
  IF p_employee_ids IS NOT NULL THEN
    array_len := array_length(p_employee_ids, 1);
    IF array_len IS NOT NULL THEN
      FOR i IN 1..array_len LOOP
        IF p_employee_ids[i] IS NOT NULL AND p_employee_ids[i]::text !~ '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$' THEN
          invalid_uuid_found := true;
          RAISE NOTICE 'UUID inválido encontrado en p_employee_ids: %', p_employee_ids[i];
        END IF;
      END LOOP;
    END IF;
  END IF;
  
  IF invalid_uuid_found THEN
    RAISE EXCEPTION 'Se encontraron UUIDs con formato inválido. Verifica los NOTICES anteriores para más detalles.';
  END IF;
  
  -- Actualizar People Leads a estado "No Asignados"
  IF p_people_lead_ids_no_asignados IS NOT NULL AND array_length(p_people_lead_ids_no_asignados, 1) > 0 THEN
    UPDATE "TD_People_Lead"
    SET "Estado" = 'No Asignados'
    WHERE "ID_TalentDiscussion" = p_talent_discussion_id
      AND "ID_People_Lead" = ANY(p_people_lead_ids_no_asignados)
      AND "Estado" = 'Pendiente';
  END IF;
  
  -- Actualizar People Leads a estado "Asignados"
  IF p_people_lead_ids_asignados IS NOT NULL AND array_length(p_people_lead_ids_asignados, 1) > 0 THEN
    UPDATE "TD_People_Lead"
    SET "Estado" = 'Asignados'
    WHERE "ID_TalentDiscussion" = p_talent_discussion_id
      AND "ID_People_Lead" = ANY(p_people_lead_ids_asignados)
      AND "Estado" = 'Pendiente';
  END IF;
  
  -- Procesar Employee IDs
  IF p_employee_ids IS NOT NULL AND array_length(p_employee_ids, 1) > 0 THEN
    -- Insertar registros en TD_Employee si no existen
    INSERT INTO "TD_Employee" ("ID_TalentDiscussion", "ID_Empleado")
    SELECT p_talent_discussion_id, emp_id
    FROM unnest(p_employee_ids) AS emp_id
    WHERE NOT EXISTS (
      SELECT 1 FROM "TD_Employee" 
      WHERE "ID_TalentDiscussion" = p_talent_discussion_id 
        AND "ID_Empleado" = emp_id
    );
    
    -- Crear TD_Employee_Request
    INSERT INTO "TD_Employee_Request" (
      "ID_TalentDiscussion",
      "ID_TD_Employee",
      "Descripcion",
      "Estado",
      "Resultado"
    )
    SELECT 
      p_talent_discussion_id,
      tde."ID_TD_Employee",
      'Omitida por talent lead',
      'No Asignado',
      'Omitida por talent lead'
    FROM "TD_Employee" tde
    WHERE tde."ID_TalentDiscussion" = p_talent_discussion_id
      AND tde."ID_Empleado" = ANY(p_employee_ids)
      AND NOT EXISTS (
        SELECT 1 FROM "TD_Employee_Request" tder
        WHERE tder."ID_TalentDiscussion" = p_talent_discussion_id
          AND tder."ID_TD_Employee" = tde."ID_TD_Employee"
      );
  END IF;
END;
$_$;


ALTER FUNCTION "public"."force_talent_discussion_participants"("p_talent_discussion_id" "uuid", "p_people_lead_ids_no_asignados" "uuid"[], "p_people_lead_ids_asignados" "uuid"[], "p_employee_ids" "uuid"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_available_delivery_leads"() RETURNS TABLE("id_empleado" "uuid", "nombre_empleado" "text", "id_deliverylead" "uuid")
    LANGUAGE "sql"
    AS $$SELECT 
    e."ID_Empleado", 
    e."Nombre" AS nombre_empleado, 
    dl."ID_DeliveryLead"
  FROM "Empleado" e
  JOIN "Delivery_Lead" dl ON dl."ID_Empleado" = e."ID_Empleado"
  LEFT JOIN "Proyectos" p ON p."ID_DeliveryLead" = dl."ID_DeliveryLead"
  WHERE p."ID_Proyecto" IS NULL;$$;


ALTER FUNCTION "public"."get_available_delivery_leads"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_available_delivery_leads2"() RETURNS TABLE("ID_Empleado" "uuid", "nombre_empleado" "text", "Cargabilidad" smallint, "ID_DeliveryLead" "uuid")
    LANGUAGE "sql"
    AS $$SELECT 
    e."ID_Empleado", 
    e."Nombre" AS nombre_empleado, 
    e."Cargabilidad",
    dl."ID_DeliveryLead"
FROM "Empleado" e
JOIN "Delivery_Lead" dl ON dl."ID_Empleado" = e."ID_Empleado"
LEFT JOIN "Proyectos" p ON p."ID_DeliveryLead" = dl."ID_DeliveryLead"
GROUP BY e."ID_Empleado", e."Nombre", e."Cargabilidad", dl."ID_DeliveryLead"
HAVING COUNT(p."ID_Proyecto") = 0 OR 
       BOOL_AND(p."Status" = 'done');$$;


ALTER FUNCTION "public"."get_available_delivery_leads2"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_available_delivery_leads3"() RETURNS SETOF "record"
    LANGUAGE "sql"
    AS $$
  SELECT 
      e."ID_Empleado", 
      e."Nombre" AS nombre_empleado, 
      e."Cargabilidad",
      dl."ID_DeliveryLead"
  FROM "Empleado" e
  JOIN "Delivery_Lead" dl ON dl."ID_Empleado" = e."ID_Empleado"
  LEFT JOIN "Proyectos" p ON p."ID_DeliveryLead" = dl."ID_DeliveryLead"
  WHERE p."ID_Proyecto" IS NULL OR p."Status" = 'done';
$$;


ALTER FUNCTION "public"."get_available_delivery_leads3"() OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."get_employees_and_leads_by_level"("level_param" "text") RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'employees', (
            SELECT json_agg(json_build_object(
                'ID_Empleado', e."ID_Empleado",
                'Nombre', e."Nombre",
                'Nivel', e."Nivel",
                'ID_Departamento', e."ID_Departamento",
                'Nombre_Departamento', d."Nombre",
                'ID_People_Lead', e."ID_PeopleLead",
                'People_Lead_Nombre', pl_emp."Nombre"
            ))
            FROM "Empleado" e
            JOIN "Departamento" d ON e."ID_Departamento" = d."ID_Departamento"
            LEFT JOIN "People_lead" pl ON e."ID_PeopleLead" = pl."ID"
            LEFT JOIN "Empleado" pl_emp ON pl."ID_Empleado" = pl_emp."ID_Empleado"
            WHERE e."Nivel" = level_param
            ORDER BY e."Nombre"
        ),
        'people_leads', (
            SELECT json_agg(json_build_object(
                'ID_People_Lead', pl."ID",
                'ID_Empleado', pl_emp."ID_Empleado",
                'Nombre', pl_emp."Nombre",
                'Cantidad_Empleados', (
                    SELECT COUNT(*) 
                    FROM "Empleado" emp 
                    WHERE emp."ID_PeopleLead" = pl."ID" AND emp."Nivel" = level_param
                )
            ))
            FROM "People_lead" pl
            JOIN "Empleado" pl_emp ON pl."ID_Empleado" = pl_emp."ID_Empleado"
            WHERE EXISTS (
                SELECT 1 FROM "Empleado" e 
                WHERE e."ID_PeopleLead" = pl."ID" AND e."Nivel" = level_param
            )
        ),
        'capability_leads', (
            SELECT json_agg(json_build_object(
                'ID_Capability_Lead', cl."ID_CapabilityLead",
                'ID_Empleado', cl_emp."ID_Empleado",
                'Nombre', cl_emp."Nombre",
                'Departamento', d."Nombre",
                'Cantidad_Empleados', (
                    SELECT COUNT(*) 
                    FROM "Empleado" e 
                    JOIN "Departamento" dept ON e."ID_Departamento" = dept."ID_Departamento"
                    WHERE dept."ID_Departamento" = cl."ID_Departamento" AND e."Nivel" = level_param
                )
            ))
            FROM "Capability_Lead" cl
            JOIN "Empleado" cl_emp ON cl."ID_Empleado" = cl_emp."ID_Empleado"
            JOIN "Departamento" d ON cl."ID_Departamento" = d."ID_Departamento"
            WHERE EXISTS (
                SELECT 1 FROM "Empleado" e 
                WHERE e."ID_Departamento" = cl."ID_Departamento" AND e."Nivel" = level_param
            )
        )
    ) INTO result;
    
    RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_employees_and_leads_by_level"("level_param" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employees_by_level"("level_param" "text") RETURNS TABLE("id_empleado" "uuid", "nombre_empleado" "text", "rol" "text", "nivel" "text", "id_departamento" "uuid", "nombre_departamento" "text", "cargabilidad" "text", "id_people_lead" "uuid", "nombre_people_lead" "text", "id_capability_lead" "uuid", "nombre_capability_lead" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e."ID_Empleado",
        e."Nombre"::text AS "Nombre_Empleado",
        e."Rol"::text,
        e."Nivel"::text,
        e."ID_Departamento",
        d."Nombre"::text AS "Nombre_Departamento",
        e."Cargabilidad"::text,
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


CREATE OR REPLACE FUNCTION "public"."get_employees_by_people_lead_and_nivel"("p_id_people_lead" "uuid", "p_nivel" "text") RETURNS TABLE("id_empleado" "uuid", "nombre" character varying, "rol" character varying, "nivel" character varying, "id_departamento" "uuid", "nombre_departamento" character varying, "cargabilidad" character varying, "fecha_contratacion" "date", "fechaultinivel" "date", "id_people_lead" "uuid", "nombre_people_lead" character varying, "id_capabilitylead" "uuid", "nombre_capabilitylead" character varying, "td_employee_request" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        e."ID_Empleado",
        e."Nombre",
        e."Rol",
        e."Nivel",
        e."ID_Departamento",
        d."Nombre"::character varying AS Nombre_Departamento,
        e."Cargabilidad",
        e."FechaContratacion" AS Fecha_Contratacion,
        e."FechaUltNivel" AS FechaUltiNivel,
        e."ID_PeopleLead" AS ID_People_Lead,
        pl_emp."Nombre"::character varying AS Nombre_People_Lead,
        cl."ID_CapabilityLead",
        cl_emp."Nombre"::character varying AS Nombre_CapabilityLead,
        CASE
            WHEN ter."ID_TD_Employee_Request" IS NOT NULL THEN
                jsonb_build_object(
                    'ID_TD_Employee_Request', ter."ID_TD_Employee_Request",
                    'ID_TalentDiscussion', ter."ID_TalentDiscussion",
                    'ID_TD_Employee', ter."ID_TD_Employee",
                    'Descripcion', ter."Descripcion"::character varying,
                    'Estado', ter."Estado"::character varying,
                    'Resultado', ter."Resultado"::character varying
                )
            ELSE NULL
        END AS TD_Employee_Request
    FROM 
        "Empleado" e
    LEFT JOIN 
        "Departamento" d ON e."ID_Departamento" = d."ID_Departamento"
    LEFT JOIN 
        "People_lead" pl ON e."ID_PeopleLead" = pl."ID"
    LEFT JOIN 
        "Empleado" pl_emp ON pl."ID_Empleado" = pl_emp."ID_Empleado"
    LEFT JOIN 
        "Capability_Lead" cl ON d."ID_Departamento" = cl."ID_Departamento"
    LEFT JOIN 
        "Empleado" cl_emp ON cl."ID_Empleado" = cl_emp."ID_Empleado"
    LEFT JOIN 
        "TD_Employee" tde ON tde."ID_Empleado" = e."ID_Empleado"
    LEFT JOIN 
        "TD_Employee_Request" ter ON ter."ID_TD_Employee" = tde."ID_TD_Employee"
    WHERE 
        e."ID_PeopleLead" = p_id_people_lead
        AND e."Nivel" = p_nivel;
END;
$$;


ALTER FUNCTION "public"."get_employees_by_people_lead_and_nivel"("p_id_people_lead" "uuid", "p_nivel" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employees_by_td_and_pl"("p_id_people_lead" "uuid", "p_id_talent_discussion" "uuid") RETURNS TABLE("id_empleado" "uuid", "nombre" character varying, "rol" character varying, "nivel" character varying, "id_departamento" "uuid", "nombre_departamento" character varying, "cargabilidad" character varying, "fecha_contratacion" "date", "fechaultinivel" "date", "id_people_lead" "uuid", "nombre_people_lead" character varying, "id_capabilitylead" "uuid", "nombre_capabilitylead" character varying, "td_employee_request" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        e."ID_Empleado" AS id_empleado,
        e."Nombre" AS nombre,
        e."Rol" AS rol,
        e."Nivel" AS nivel,
        e."ID_Departamento" AS id_departamento,
        d."Nombre" AS nombre_departamento,
        e."Cargabilidad"::VARCHAR AS cargabilidad,  -- Conversión explícita a VARCHAR
        e."FechaContratacion" AS fecha_contratacion,
        e."FechaUltNivel" AS fechaultinivel,
        e."ID_PeopleLead" AS id_people_lead,
        pl_emp."Nombre" AS nombre_people_lead,
        cl."ID_CapabilityLead" AS id_capabilitylead,
        cl_emp."Nombre" AS nombre_capabilitylead,
        CASE
            WHEN ter."ID_TD_Employee_Request" IS NOT NULL THEN
                jsonb_build_object(
                    'id_td_employee_request', ter."ID_TD_Employee_Request",
                    'id_talentdiscussion', ter."ID_TalentDiscussion",
                    'id_td_employee', ter."ID_TD_Employee",
                    'descripcion', ter."Descripcion",
                    'estado', ter."Estado",
                    'resultado', ter."Resultado"
                )
            ELSE NULL
        END AS td_employee_request
    FROM 
        "Empleado" e
    INNER JOIN
        "TD_Employee" tde ON tde."ID_Empleado" = e."ID_Empleado"
    LEFT JOIN 
        "Departamento" d ON e."ID_Departamento" = d."ID_Departamento"
    LEFT JOIN 
        "People_lead" pl ON e."ID_PeopleLead" = pl."ID"
    LEFT JOIN 
        "Empleado" pl_emp ON pl."ID_Empleado" = pl_emp."ID_Empleado"
    LEFT JOIN 
        "Capability_Lead" cl ON d."ID_Departamento" = cl."ID_Departamento"
    LEFT JOIN 
        "Empleado" cl_emp ON cl."ID_Empleado" = cl_emp."ID_Empleado"
    LEFT JOIN 
        "TD_Employee_Request" ter ON ter."ID_TD_Employee" = tde."ID_TD_Employee" 
        AND ter."ID_TalentDiscussion" = p_id_talent_discussion
    WHERE 
        e."ID_PeopleLead" = p_id_people_lead
        AND tde."ID_TalentDiscussion" = p_id_talent_discussion;
END;
$$;


ALTER FUNCTION "public"."get_employees_by_td_and_pl"("p_id_people_lead" "uuid", "p_id_talent_discussion" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_employees_in_projects"() RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result json;
BEGIN
    SELECT json_agg(row_to_json(t))
    INTO result
    FROM (
        SELECT e."ID_Empleado", e."Nombre", p."ID_Proyecto", p."Nombre" AS "Proyecto_Nombre"
        FROM public."Empleado" e
        JOIN public."Delivery_Lead" dl ON e."ID_Empleado" = dl."ID_Empleado"
        JOIN public."Proyectos" p ON dl."ID_DeliveryLead" = p."ID_DeliveryLead"
    ) t;

    RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_employees_in_projects"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_full_project_data"("project_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  result jsonb;
BEGIN
  WITH ProyectoBase AS (
    SELECT pr.*,
    perfil."Nombre" AS nombre_delivery,
    perfil."ID_Empleado" AS ID_Empleado_delivery,
    perfil."Cargabilidad" AS Cargabilidad_delivery
    FROM "public"."Proyectos" pr
    JOIN "public"."Delivery_Lead" dv ON pr."ID_DeliveryLead" = dv."ID_DeliveryLead"
    JOIN "public"."Empleado" perfil ON dv."ID_Empleado" = perfil."ID_Empleado"
    WHERE "ID_Proyecto" = project_id
  ),
  
  Puestos AS (
    SELECT pp.*
    FROM "public"."Puesto_proyecto" pp
    JOIN ProyectoBase p ON pp."ID_Proyecto" = p."ID_Proyecto"
  ),
  
  HabilidadesPorPuesto AS (
  SELECT ph.*,
  hab."Nombre" AS nombre_habilidad
  FROM "public"."Puesto_habilidades" ph
  JOIN Puestos pu ON ph."Id_puesto" = pu."id"
  JOIN "public"."Habilidades" hab ON ph."Id_habilidad" = hab."ID_Habilidad"
),

HabilidadesGenerales AS (
  SELECT Prh.*,
  hab."Nombre" AS nombre_habilidad
  FROM "public"."Proyecto_Habilidades" Prh
  JOIN "public"."Habilidades" hab ON Prh."ID_Habilidad" = hab."ID_Habilidad"
  WHERE "ID_Proyecto" = project_id
)
  
  SELECT jsonb_build_object(
    'proyecto', (SELECT to_jsonb(p) FROM ProyectoBase p LIMIT 1),
    'puestos', (SELECT coalesce(jsonb_agg(to_jsonb(pp)), '[]'::jsonb) FROM Puestos pp),
    'habilidadesPuestos', (SELECT coalesce(jsonb_agg(to_jsonb(ph)), '[]'::jsonb) FROM HabilidadesPorPuesto ph),
    'habilidadesGenerales', (SELECT coalesce(jsonb_agg(to_jsonb(pg)), '[]'::jsonb) FROM HabilidadesGenerales pg)
  ) INTO result;
  
  RETURN result;
END;$$;


ALTER FUNCTION "public"."get_full_project_data"("project_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_people_lead_id_for_employee"("p_employee_id" "uuid") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_id_people_lead uuid;
BEGIN
    SELECT "ID"
    INTO v_id_people_lead
    FROM "People_lead"
    WHERE "ID_Empleado" = p_employee_id
    LIMIT 1;

    RETURN v_id_people_lead;
END;
$$;


ALTER FUNCTION "public"."get_people_lead_id_for_employee"("p_employee_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_proyectos_by_delivery_lead"("emp_id" "uuid") RETURNS TABLE("id_proyecto" "uuid", "nombre_proyecto" "text", "descripcion" "text", "status" "text", "id_deliverylead" "uuid", "fecha_inicio" "date", "fecha_fin" "date", "isreviewed" boolean, "cargabilidad_num" smallint, "cliente" "text", "created_at" timestamp with time zone, "imagenurl" "text", "habilidades" "json")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p."ID_Proyecto",
    p."Nombre" AS nombre_proyecto,
    p."Descripcion",
    p."Status",
    p."ID_DeliveryLead",
    p."fecha_inicio",
    p."fecha_fin",
    p."isReviewed",
    p."cargabilidad_num",
    p."Cliente",
    p."created_at",
    p."ImagenUrl",
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'ID_Habilidad', h."ID_Habilidad",
          'Nombre', h."Nombre",
          'nivel', ph."nivel"
        )
      ) FILTER (WHERE h."ID_Habilidad" IS NOT NULL),
      '[]'
    ) AS habilidades
  FROM 
    "public"."Proyectos" p
  LEFT JOIN 
    "public"."Proyecto_Habilidades" ph ON p."ID_Proyecto" = ph."ID_Proyecto"
  LEFT JOIN 
    "public"."Habilidades" h ON ph."ID_Habilidad" = h."ID_Habilidad"
  WHERE 
    p."ID_DeliveryLead" = emp_id
  GROUP BY 
    p."ID_Proyecto", p."Nombre", p."Descripcion", p."Status",
    p."ID_DeliveryLead", p."fecha_inicio", p."fecha_fin", p."isReviewed",
    p."cargabilidad_num", p."Cliente", p."created_at", p."ImagenUrl"
  ORDER BY 
    p."created_at" DESC;
END;
$$;


ALTER FUNCTION "public"."get_proyectos_by_delivery_lead"("emp_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_proyectos_con_habilidades"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
declare
  result jsonb;
begin
  select jsonb_agg(proyecto) into result
  from (
    select 
      p."ID_Proyecto",
      p."Nombre" AS nombre_proyecto,
      p."Descripcion",
      p."Status",
      p."ID_DeliveryLead",
      p."fecha_inicio",
      p."fecha_fin",
      p."isReviewed",
      p."cargabilidad_num",
      p."Cliente",
      p."created_at",
      p."ImagenUrl",
      coalesce(
        jsonb_agg(
          distinct jsonb_build_object(
            'ID_Habilidad', h."ID_Habilidad",
            'Nombre', h."Nombre",
            'nivel', ph."nivel"
          )
        ) filter (where h."ID_Habilidad" is not null),
        '[]'
      ) as habilidades
    from 
      public."Proyectos" p
    left join 
      public."Proyecto_Habilidades" ph on p."ID_Proyecto" = ph."ID_Proyecto"
    left join 
      public."Habilidades" h on ph."ID_Habilidad" = h."ID_Habilidad"
    group by 
      p."ID_Proyecto"
    order by 
      p."created_at" desc
  ) proyecto;

  return result;
end;
$$;


ALTER FUNCTION "public"."get_proyectos_con_habilidades"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_talent_discussion_by_id_and_people_lead"("p_id_talent_discussion" "uuid", "p_id_people_lead" "uuid") RETURNS TABLE("id_talent_discussion" "uuid", "discussion" "text", "id_talent_lead" "uuid", "nombre_talent_lead" "text", "nivel" "text", "fecha_inicio" "date", "fecha_final" "date", "estado" "text", "estado_td_people_lead" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        td."ID_TalentDiscussion" AS ID_Talent_Discussion,
        td."Discussion"::text,
        td."ID_TalentLead" AS ID_Talent_Lead,
        emp."Nombre"::text AS Nombre_Talent_Lead,
        td."Nivel"::text,
        td."Fecha_Inicio",
        td."Fecha_Final",
        td."Estado"::text,
        tpl."Estado"::text AS Estado_TD_People_Lead
    FROM "Talent_Discussion" td
    JOIN "Talent_Lead" tl ON td."ID_TalentLead" = tl."ID_TalentLead"
    JOIN "Empleado" emp ON tl."ID_Empleado" = emp."ID_Empleado"
    JOIN "TD_People_Lead" tpl ON tpl."ID_TalentDiscussion" = td."ID_TalentDiscussion"
    WHERE td."ID_TalentDiscussion" = p_id_talent_discussion
      AND tpl."ID_People_Lead" = p_id_people_lead
    LIMIT 1;
END;
$$;


ALTER FUNCTION "public"."get_talent_discussion_by_id_and_people_lead"("p_id_talent_discussion" "uuid", "p_id_people_lead" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_talent_discussions"() RETURNS TABLE("id_talent_discussion" "uuid", "discussion" "text", "id_talent_lead" "uuid", "nombre_talent_lead" "text", "nivel" "text", "fecha_inicio" "date", "fecha_final" "date", "estado" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        td."ID_TalentDiscussion" AS ID_Talent_Discussion,
        td."Discussion",
        tl."ID_TalentLead" AS ID_Talent_Lead,
        tl_emp."Nombre" AS Nombre_Talent_Lead,
        td."Nivel",
        td."Fecha_Inicio",
        td."Fecha_Final",
        td."Estado"
    FROM 
        "Talent_Discussion" td
    JOIN 
        "Talent_Lead" tl ON td."ID_TalentLead" = tl."ID_TalentLead"
    JOIN 
        "Empleado" tl_emp ON tl."ID_Empleado" = tl_emp."ID_Empleado"
    ORDER BY 
        td."Fecha_Inicio" DESC;
END;
$$;


ALTER FUNCTION "public"."get_talent_discussions"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_talent_discussions_by_lead"("p_id_talent_lead" "uuid") RETURNS TABLE("id_talent_discussion" "uuid", "discussion" "text", "id_talent_lead" "uuid", "nombre_talent_lead" "text", "nivel" "text", "fecha_inicio" "date", "fecha_final" "date", "estado" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        td."ID_TalentDiscussion" AS ID_Talent_Discussion,
        td."Discussion"::text, -- <-- CAST AQUÍ
        tl."ID_TalentLead" AS ID_Talent_Lead,
        tl_emp."Nombre"::text, -- <-- CAST AQUÍ (si es varchar)
        td."Nivel"::text,      -- <-- CAST AQUÍ (si es varchar)
        td."Fecha_Inicio",
        td."Fecha_Final",
        td."Estado"::text      -- <-- CAST AQUÍ (si es varchar)
    FROM 
        "Talent_Discussion" td
    JOIN 
        "Talent_Lead" tl ON td."ID_TalentLead" = tl."ID_TalentLead"
    JOIN 
        "Empleado" tl_emp ON tl."ID_Empleado" = tl_emp."ID_Empleado"
    WHERE 
        tl."ID_TalentLead" = p_id_talent_lead
    ORDER BY 
        td."Fecha_Inicio" DESC;
END;
$$;


ALTER FUNCTION "public"."get_talent_discussions_by_lead"("p_id_talent_lead" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_talent_discussions_by_people_lead"("p_id_people_lead" "uuid") RETURNS TABLE("id_talent_discussion" "uuid", "discussion" "text", "id_talent_lead" "uuid", "nombre_talent_lead" "text", "nivel" "text", "fecha_inicio" "date", "fecha_final" "date", "estado" "text", "estado_td_people_lead" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        td."ID_TalentDiscussion" AS ID_Talent_Discussion,
        td."Discussion"::text,
        tl."ID_TalentLead" AS ID_Talent_Lead,
        emp."Nombre"::text AS Nombre_Talent_Lead,
        td."Nivel"::text,
        td."Fecha_Inicio",
        td."Fecha_Final",
        td."Estado"::text,
        tpl."Estado"::text -- Estado de la relación en TD_People_Lead
    FROM 
        "TD_People_Lead" tpl
    JOIN 
        "Talent_Discussion" td ON tpl."ID_TalentDiscussion" = td."ID_TalentDiscussion"
    JOIN 
        "Talent_Lead" tl ON td."ID_TalentLead" = tl."ID_TalentLead"
    JOIN 
        "Empleado" emp ON tl."ID_Empleado" = emp."ID_Empleado"
    WHERE 
        tpl."ID_People_Lead" = p_id_people_lead
    ORDER BY 
        td."Fecha_Inicio" DESC;
END;
$$;


ALTER FUNCTION "public"."get_talent_discussions_by_people_lead"("p_id_people_lead" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_talent_lead_id_for_employee"("p_employee_id" "uuid") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_talent_lead_id uuid;
BEGIN
    -- Buscar si el empleado es un Talent Lead
    SELECT tl."ID_TalentLead" INTO v_talent_lead_id
    FROM "Talent_Lead" tl
    WHERE tl."ID_Empleado" = p_employee_id;
    
    -- Si no es Talent Lead, devolver null
    RETURN v_talent_lead_id;
END;
$$;


ALTER FUNCTION "public"."get_talent_lead_id_for_employee"("p_employee_id" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."obtener_empleados_disponibles"("id_proyecto" "uuid", "cargabilidad_adicional" integer) RETURNS TABLE("id_empleado" "uuid", "nombre" "text", "cargabilidad" integer, "total_propuesta" integer)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    e."ID_Empleado"::UUID,
    e."Nombre"::TEXT,
    e."Cargabilidad"::INTEGER,
    (e."Cargabilidad" + cargabilidad_adicional)::INTEGER AS total_propuesta
  FROM "Empleado" e
  WHERE 
    (e."Cargabilidad" + cargabilidad_adicional) <= 100
    AND e."ID_Empleado" NOT IN (
      SELECT pp."ID_Empleado"
      FROM "Puesto_persona" pp
      JOIN "Puesto_proyecto" pproy ON pp."ID_Puesto" = pproy."id"
      WHERE pproy."ID_Proyecto" = id_proyecto
    );
END;
$$;


ALTER FUNCTION "public"."obtener_empleados_disponibles"("id_proyecto" "uuid", "cargabilidad_adicional" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."obtener_empleados_por_puesto_proyecto"("id_puesto_proyecto" "uuid") RETURNS TABLE("id_empleado" "uuid", "nombre" "text", "cargabilidad" numeric)
    LANGUAGE "sql"
    AS $$
  SELECT 
    e."ID_Empleado" as id_empleado,
    e."Nombre" as nombre,
    e."Cargabilidad" as cargabilidad
  FROM 
    "public"."Empleado" e
  JOIN 
    "public"."Puesto_persona" pp ON e."ID_Empleado" = pp."ID_Empleado"
  JOIN 
    "public"."Puesto_proyecto" pproy ON pp."ID_Puesto" = pproy."id"
  WHERE 
    pproy."id" = id_puesto_proyecto;
$$;


ALTER FUNCTION "public"."obtener_empleados_por_puesto_proyecto"("id_puesto_proyecto" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."obtener_talent_discussion_completa_json"("p_id_talent_discussion" "uuid") RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result_json json;
BEGIN
    SELECT json_build_object(
        'talent_discussion', (
            SELECT to_json(td) FROM (
                SELECT 
                    td."ID_TalentDiscussion",
                    td."Discussion",
                    td."ID_TalentLead",
                    tl_emp."Nombre" AS nombre_talent_lead,
                    td."Nivel",
                    td."Fecha_Inicio",
                    td."Fecha_Final",
                    td."Estado"
                FROM "Talent_Discussion" td
                LEFT JOIN "Talent_Lead" tl ON td."ID_TalentLead" = tl."ID_TalentLead"
                LEFT JOIN "Empleado" tl_emp ON tl."ID_Empleado" = tl_emp."ID_Empleado"
                WHERE td."ID_TalentDiscussion" = p_id_talent_discussion
            ) td
        ),
        'employees', (
            SELECT json_agg(
                json_build_object(
                    'td_employee', to_json(tde),
                    'empleado', to_json(e),
                    'request', (
                        SELECT to_json(ter) 
                        FROM "TD_Employee_Request" ter
                        WHERE ter."ID_TalentDiscussion" = p_id_talent_discussion
                        AND ter."ID_TD_Employee" = tde."ID_TD_Employee"
                    ),
                    'people_lead', (
                        SELECT to_json(pl)
                        FROM "People_lead" pl
                        WHERE pl."ID" = e."ID_PeopleLead"
                    ),
                    'capability_lead', (
                        SELECT to_json(cl)
                        FROM "Capability_Lead" cl
                        WHERE cl."ID_Departamento" = e."ID_Departamento"
                    )
                )
            )
            FROM "TD_Employee" tde
            JOIN "Empleado" e ON tde."ID_Empleado" = e."ID_Empleado"
            WHERE tde."ID_TalentDiscussion" = p_id_talent_discussion
        ),
        'people_leads', (
            SELECT json_agg(
                json_build_object(
                    'td_people_lead', to_json(tpl),
                    'people_lead', to_json(pl),
                    'empleado', (
                        SELECT to_json(emp) 
                        FROM "Empleado" emp 
                        WHERE emp."ID_Empleado" = pl."ID_Empleado"
                    )
                )
            )
            FROM "TD_People_Lead" tpl
            JOIN "People_lead" pl ON tpl."ID_People_Lead" = pl."ID"
            WHERE tpl."ID_TalentDiscussion" = p_id_talent_discussion
        ),
        'capability_leads', (
            SELECT json_agg(
                json_build_object(
                    'td_capability_lead', to_json(tcl),
                    'capability_lead', to_json(cl),
                    'empleado', (
                        SELECT to_json(emp) 
                        FROM "Empleado" emp 
                        WHERE emp."ID_Empleado" = cl."ID_Empleado"
                    )
                )
            )
            FROM "TD_Capability_Lead" tcl
            JOIN "Capability_Lead" cl ON tcl."ID_CapabilityLead" = cl."ID_CapabilityLead"
            WHERE tcl."ID_TalentDiscussion" = p_id_talent_discussion
        )
    ) INTO result_json;
    
    RETURN result_json;
END;
$$;


ALTER FUNCTION "public"."obtener_talent_discussion_completa_json"("p_id_talent_discussion" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."verificar_cargabilidad_empleados"("id_proyecto" "uuid", "cargabilidad_nueva" integer, "cargabilidad_actual_proyecto" integer) RETURNS TABLE("id_empleado" "uuid", "nombre" "text", "cargabilidad_actual" integer, "cargabilidad_calculada" integer)
    LANGUAGE "plpgsql"
    AS $$
begin
  return query
  select  
    e."ID_Empleado" as "ID_Empleado",
    e."Nombre"::text as "Nombre",
    e."Cargabilidad"::integer as "Cargabilidad_actual", -- CAST AQUÍ
    (e."Cargabilidad"::integer + (cargabilidad_nueva - cargabilidad_actual_proyecto)) as "Cargabilidad_calculada"
  from 
    "public"."Empleado" e
  join 
    "public"."Puesto_persona" pp on pp."ID_Empleado" = e."ID_Empleado"
  join 
    "public"."Puesto_proyecto" pu on pu."id" = pp."ID_Puesto"
  join 
    "public"."Proyectos" p on p."ID_Proyecto" = pu."ID_Proyecto"
  where 
    p."ID_Proyecto" = id_proyecto
    and (e."Cargabilidad"::integer + (cargabilidad_nueva - cargabilidad_actual_proyecto)) > 100;
end;
$$;


ALTER FUNCTION "public"."verificar_cargabilidad_empleados"("id_proyecto" "uuid", "cargabilidad_nueva" integer, "cargabilidad_actual_proyecto" integer) OWNER TO "postgres";

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
    "Cargabilidad" smallint,
    "FechaContratacion" "date",
    "FechaUltNivel" "date",
    "ID_PeopleLead" "uuid",
    "Biografia" character varying,
    CONSTRAINT "chk_cargabilidad_max" CHECK (("Cargabilidad" <= 100))
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
    "Status" "text" DEFAULT 'inactive'::"text" NOT NULL,
    "ID_DeliveryLead" "uuid",
    "fecha_inicio" "date",
    "fecha_fin" "date",
    "isReviewed" boolean DEFAULT false NOT NULL,
    "cargabilidad_num" smallint DEFAULT '100'::smallint NOT NULL,
    "Cliente" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "ImagenUrl" "text",
    CONSTRAINT "Proyectos_Status_check" CHECK (("Status" = ANY (ARRAY['active'::"text", 'inactive'::"text", 'pending'::"text", 'done'::"text"])))
);


ALTER TABLE "public"."Proyectos" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Proyectos"."cargabilidad_num" IS 'cargabilidad del proyecto en entero del 1 al 100, definida por el capability lead';



CREATE TABLE IF NOT EXISTS "public"."Puesto_habilidades" (
    "Id_puesto" "uuid" DEFAULT "gen_random_uuid"(),
    "Id_habilidad" "uuid" DEFAULT "gen_random_uuid"(),
    "nivel" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."Puesto_habilidades" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Puesto_persona" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_Empleado" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_Puesto" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."Puesto_persona" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Puesto_proyecto" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_Proyecto" "uuid" DEFAULT "gen_random_uuid"(),
    "Puesto" character varying,
    "N_puestos" smallint,
    "Completo" boolean
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
    "Descripcion" "text",
    "Estado" character varying DEFAULT 'Pendiente'::character varying,
    "Resultado" "text"
);


ALTER TABLE "public"."TD_Employee_Request" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_Employee_Request" IS 'Request of the employee to the talent discussion';



CREATE TABLE IF NOT EXISTS "public"."TD_People_Lead" (
    "ID_TD_People_Lead" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ID_TalentDiscussion" "uuid" DEFAULT "gen_random_uuid"(),
    "ID_People_Lead" "uuid" DEFAULT "gen_random_uuid"(),
    "Estado" "text" DEFAULT 'Pendiente'::"text"
);


ALTER TABLE "public"."TD_People_Lead" OWNER TO "postgres";


COMMENT ON TABLE "public"."TD_People_Lead" IS 'PeopleLead del talent discussion';



COMMENT ON COLUMN "public"."TD_People_Lead"."Estado" IS 'Cuando el people lead haya nominado a los empleados se debe de saber si ya nominó a todos los que quería o si aun esta pendiente';



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



ALTER TABLE ONLY "public"."Puesto_habilidades"
    ADD CONSTRAINT "Puesto_habilidades_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Puesto_persona"
    ADD CONSTRAINT "Puesto_persona_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Puesto_proyecto"
    ADD CONSTRAINT "Puesto_proyecto_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Revisor_Meta"
    ADD CONSTRAINT "Revisor_Meta_pkey" PRIMARY KEY ("ID_Revisor");



ALTER TABLE ONLY "public"."Evaluacion_Proyecto"
    ADD CONSTRAINT "Revisor_Proyecto_pkey" PRIMARY KEY ("ID_Evaluacion");



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



CREATE OR REPLACE TRIGGER "after_insert_evaluacion" AFTER INSERT ON "public"."Evaluacion_Proyecto" FOR EACH ROW EXECUTE FUNCTION "public"."update_is_reviewed"();



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



ALTER TABLE ONLY "public"."Puesto_habilidades"
    ADD CONSTRAINT "Puesto_habilidades_Id_habilidad_fkey" FOREIGN KEY ("Id_habilidad") REFERENCES "public"."Habilidades"("ID_Habilidad");



ALTER TABLE ONLY "public"."Puesto_habilidades"
    ADD CONSTRAINT "Puesto_habilidades_Id_puesto_fkey" FOREIGN KEY ("Id_puesto") REFERENCES "public"."Puesto_proyecto"("id");



ALTER TABLE ONLY "public"."Puesto_persona"
    ADD CONSTRAINT "Puesto_persona_ID_Empleado_fkey" FOREIGN KEY ("ID_Empleado") REFERENCES "public"."Empleado"("ID_Empleado");



ALTER TABLE ONLY "public"."Puesto_persona"
    ADD CONSTRAINT "Puesto_persona_ID_Puesto_fkey" FOREIGN KEY ("ID_Puesto") REFERENCES "public"."Puesto_proyecto"("id");



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



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_habilidades" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_habilidades" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_persona" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_persona" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_proyecto" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Puesto_proyecto" TO "anon";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Revisor_Meta" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."Revisor_Meta" TO "anon";



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
