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

        // Fetch skills
        const skillsResponse = await supabase
            .from("Habilidades")
            .select("*");

        if (skillsResponse.error) {
            throw skillsResponse.error;
        }

        const skills = skillsResponse.data;

        // Attach skills to courses
        data = courses.map((course: course) => ({
            ...course,
            skill: skills.find((skill: skill) => skill.ID_Habilidad === course.ID_Habilidad) || null,
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }

    return data;
}
