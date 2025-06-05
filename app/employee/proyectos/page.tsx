"use client";

import React, { useState, useEffect, use } from "react";
import { getUserId } from "@/lib/getUserId";

import CurrentProject from "./CurrentProject";

// Import other sections as you create them, e.g.:
// import ProjectHistory from "./ProjectHistory";
// import Performance from "./Performance";

export default function ProyectosPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mis Proyectos</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <CurrentProject userId={userId} />
        </div>
        <div className="flex-1">
          <CurrentProject userId={userId} />
        </div>
      </div>
      
      {/* Uncomment and add these as you build them */}
      {/* <ProjectHistory /> */}
      {/* <Performance /> */}
    </div>
  );
}