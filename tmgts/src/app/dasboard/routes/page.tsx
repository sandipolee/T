'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react'

interface Route {
  id: string
  name: string
  address: string
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [newRoute, setNewRoute] = useState({ name: '', address: '' })
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)

  // Simulated data fetch - replace with actual API call
  useEffect(() => {
    setRoutes([
      { id: '1', name: 'School Gate', address: '123 School St' },
      { id: '2', name: 'Main Square', address: '456 Main St' },
    ])
  }, [])

  const addRoute = () => {
    if (newRoute.name && newRoute.address) {
      setRoutes([...routes, { ...newRoute, id: Date.now().toString() }])
      setNewRoute({ name: '', address: '' })
    }
  }

  const startEditing = (route: Route) => {
    setEditingRoute(route)
  }

  const saveEdit = () => {
    if (editingRoute) {
      setRoutes(routes.map(r => r.id === editingRoute.id ? editingRoute : r))
      setEditingRoute(null)
    }
  }

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(r => r.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Routes</h1>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Route Name"
          value={newRoute.name}
          onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
        />
        <Input
          placeholder="Address"
          value={newRoute.address}
          onChange={(e) => setNewRoute({ ...newRoute, address: e.target.value })}
        />
        <Button onClick={addRoute}>Add Route</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    value={editingRoute.name}
                    onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                  />
                ) : (
                  route.name
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    value={editingRoute.address}
                    onChange={(e) => setEditingRoute({ ...editingRoute, address: e.target.value })}
                  />
                ) : (
                  route.address
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Button onClick={saveEdit}>Save</Button>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => startEditing(route)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => deleteRoute(route.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
