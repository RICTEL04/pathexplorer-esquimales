import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { supabase } from "@/lib/supabase";

export default function CurrentProject(
    props: { userId: string | null } = { userId: null }
) {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            let { data: Proyectos, error } = await supabase.rpc('get_employees_in_projects')

            if (error) {
                console.error('Error fetching proyectos:', error);
            } else {
                setData(Proyectos);
            }
        };

        fetchData();
    }, []);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Proyecto Actual</h2>
      <pre>
        {data ? JSON.stringify(data, null, 2) : 'Cargando datos del proyecto...'}
      </pre>
      <Card>
        <p>Detalles del proyecto actual...</p>
        
      </Card>
    </div>
  );
}
