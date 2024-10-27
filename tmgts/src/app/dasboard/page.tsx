// ... existing imports ...
import DasboardContent from './DasboardConent'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout() {
  const session = await auth();
  if(!session?.user) redirect("/login");

  return (
    <DasboardContent/>
  )
}