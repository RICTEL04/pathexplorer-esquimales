import React, { useState } from "react";
import EmployeeCardEnProgreso from "@/components/Talent_Discussions/Talent_Lead/EmployeeCardEnProgreso";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PeopleLeadCardEnProgreso({
    peopleLead,
    employees,
    onEmployeeClick,
}: {
    peopleLead: any;
    employees: any[];
    onEmployeeClick: (employee: any) => void;
}) {
    const [open, setOpen] = useState(true);
    //console.log(employees, "Employees in PeopleLeadCardEnProgreso");
    //console.log(peopleLead, "PeopleLead in PeopleLeadCardEnProgreso");
    const completedCount = employees.filter(e => e.TD_Employee_Requests.Estado === "Aprobada" || 
                                            e.TD_Employee_Requests.Estado === "Rechazada").length;
    const progressPercentage = employees.length > 0 ? Math.round((completedCount / employees.length) * 100) : 0;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden border">

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b">
                <div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800">{peopleLead.people_lead.nombre_People_Lead}</h2>
                    </div>
                </div>

                <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            progressPercentage === 100 ? 'bg-green-100 text-green-600' :
                            progressPercentage > 50 ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                        }`}>
                            {progressPercentage}%
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                {completedCount} de {employees.length} completados
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-gray-400">
                        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>
            </div>
            
            {open && (
                <div className="border-t p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {employees.length > 0 ? (
                            employees.map((emp: any) => (
                                <EmployeeCardEnProgreso
                                    key={emp.ID_Empleado}
                                    employee={emp}
                                    onClick={() => onEmployeeClick(emp)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-4 text-gray-500">
                                No hay empleados asignados
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}