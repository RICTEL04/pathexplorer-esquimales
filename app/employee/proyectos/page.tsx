"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, ChevronDown, ArrowRight, User } from "lucide-react"

// Define interfaces for our data types
interface Project {
  id: string
  nombre: string
  descripcion: string
  status: string
  habilidad: string
  cliente: string
  cargabilidad?: number
  enProgreso?: boolean
  postulado?: boolean
}

export default function ProyectosPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [roles, setRoles] = useState([{ role: "", quantity: 1 }])
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [projectJson, setProjectJson] = useState<any | null>(null)

  // Datos de ejemplo para la interfaz
  const proyectosSugeridos: Project[] = [
    {
      id: "1",
      nombre: "Proyecto 1",
      descripcion: "Descripcion de proyecto:",
      status: "Status",
      habilidad: "Habilidad requerida",
      cliente: "CLIENT",
    },
    {
      id: "2",
      nombre: "Proyecto 2",
      descripcion: "Descripcion de proyecto:",
      status: "Status",
      habilidad: "Habilidad requerida",
      cliente: "CLIENT",
    },
    {
      id: "3",
      nombre: "Proyecto 3",
      descripcion: "Descripcion de proyecto:",
      status: "Status",
      habilidad: "Habilidad requerida",
      cliente: "CLIENT",
    },
  ]

  const proyectosActuales: Project[] = [
    { id: "4", nombre: "Proyecto en progreso 1", cargabilidad: 50, enProgreso: true, cliente: "CLIENT" },
    { id: "5", nombre: "Proyecto en progreso 2", cargabilidad: 30, enProgreso: true, cliente: "CLIENT" },
  ]

  const proyectosPostulados: Project[] = [
    { id: "6", nombre: "Proyecto 3", cargabilidad: 20, postulado: true, cliente: "CLIENT" },
  ]

  const handleRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...roles]
    updatedRoles[index] = { ...updatedRoles[index], [field]: value }
    setRoles(updatedRoles)
  }

  const addRole = () => {
    setRoles([...roles, { role: "", quantity: 1 }])
  }

  const removeRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index)
    setRoles(updatedRoles)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generar el JSON con los datos del proyecto
    const projectData = {
      nombre: projectName,
      descripcion: description,
      fechaInicio: startDate,
      fechaFin: endDate,
      roles: roles.map((role) => ({
        puesto: role.role,
        cantidad: role.quantity,
      })),
    }

    // Guardar el JSON en la variable y mostrarlo en la consola
    setProjectJson(projectData)
    console.log("JSON generado:", projectData)

    // Cerrar el modal y limpiar el formulario
    setShowNewProjectModal(false)
    setProjectName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setRoles([{ role: "", quantity: 1 }])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-500">PATH</span>
          <span className="text-purple-700">EXPLORER</span>
        </h1>
        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
      </header>

      {/* Main content */}
      <div className="p-4 md:p-6">
        {/* Search and filters */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-1 rounded">
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Título o ID Proyecto"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status</span>
            <div className="relative">
              <button className="bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Habilidad requerida"
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Suggested Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-black font-bold">Proyectos sugeridos</h2>
            <div className="space-y-4">
              {proyectosSugeridos.map((proyecto) => (
                <div key={proyecto.id} className="bg-white rounded-lg border border-gray-200 p-4 relative">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-black font-bold">{proyecto.nombre}</h3>
                      <p className="text-gray-600 text-sm">{proyecto.status}</p>
                      <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
                      <div className="mt-4">
                        <span className="text-black inline-block bg-gray-100 rounded-full px-4 py-1 text-sm">
                          {proyecto.habilidad}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{proyecto.cliente}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded flex items-center gap-1 transition-all">
                      Aplicar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Employee info and current projects */}
          <div>
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-black">Empleado</h3>
                <span className="text-black font-bold">lv.11</span>
              </div>
              <div className="flex justify-center mt-4">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-black 3xl font-bold">80%</span>
                    <p className="text-xs text-gray-600">Cargabilidad</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="bg-white rounded-lg p-4 mb-6">
             
              <h3 className="text-black font-bold mb-4">Proyectos actuales</h3>
              {proyectosActuales.map((proyecto) => (
                <div key={proyecto.id} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{proyecto.cliente}</span>
                    </div>
                    <div>
                      <p className="text-black font-medium">{proyecto.nombre}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-black font-bold">{proyecto.cargabilidad}%</span>
                        <span className="text-black text-gray-600">Cargabilidad</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Applied Projects */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-black font-bold mb-4">Proyectos postulados</h3>
              {proyectosPostulados.map((proyecto) => (
                <div key={proyecto.id} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{proyecto.cliente}</span>
                    </div>
                    <div>
                      <p className="text-black font-medium">{proyecto.nombre}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-black font-bold">{proyecto.cargabilidad}%</span>
                        <span className="text-black text-gray-600">Cargabilidad</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}