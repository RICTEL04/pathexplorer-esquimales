import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {course, skill} from "@/lib/cursos-empleado/definitions";

export async function fetchCoursesData(employeeID: string, setLoading: (loading: boolean) => void) {
    let data = null;
    try {
        setLoading(true);

        // Fetch courses
        const coursesResponse = await supabase
            .from("Cursos")
            .select("*");

        if (coursesResponse.error) {
            throw coursesResponse.error;
        }

        const courses = coursesResponse.data;

        // Fetch the associative entity (Cursos_Habilidades)
        const cursosHabilidadesResponse = await supabase
            .from("Cursos_Habilidades")
            .select("*");

        if (cursosHabilidadesResponse.error) {
            throw cursosHabilidadesResponse.error;
        }

        const cursosHabilidades = cursosHabilidadesResponse.data;

        // Fetch skills
        const skillsResponse = await supabase
            .from("Habilidades")
            .select("*");

        if (skillsResponse.error) {
            throw skillsResponse.error;
        }

        const skills = skillsResponse.data;

        // Attach all related skills to each course
        data = courses.map((course: course) => {
            const relatedSkills = cursosHabilidades
                .filter((ch) => ch.ID_Curso === course.ID_Curso) // Find all entries in Cursos_Habilidades for this course
                .map((ch) => skills.find((skill) => skill.ID_Habilidad === ch.ID_Habilidad)); // Map to actual skill objects

            return {
                ...course,
                skills: relatedSkills.filter((skill) => skill !== undefined), // Attach the related skills (filter out undefined)
            };
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }

    return data;
}
