"use client"

import React, { useState } from 'react'
import Link from "next/link"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Search,
  Bell,
  User,
  Home,
  Bus,
  GraduationCap,
  Users2,
  IdCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const data = [
  { name: 'Jan', students: 400 },
  { name: 'Feb', students: 300 },
  { name: 'Mar', students: 500 },
  { name: 'Apr', students: 280 },
  { name: 'May', students: 200 },
  { name: 'Jun', students: 600 },
]

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="p-6">
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">+2 new routes added</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ID Cards Issued</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">89% of total students</p>
              </CardContent>
            </Card>
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>New student registered: John Doe</li>
                  <li>Route #5 modified: Added new stop</li>
                  <li>ID Card issued to: Jane Smith</li>
                  <li>New announcement: Summer vacation dates</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Button>Add New Student</Button>
                  <Button>Manage Routes</Button>
                  <Button>Generate ID Cards</Button>
                  <Button>Create Announcement</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  )
}