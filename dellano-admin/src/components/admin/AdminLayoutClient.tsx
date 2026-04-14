'use client'

import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

export function AdminLayoutClient({
  children,
  userName,
}: {
  children: React.ReactNode
  userName: string
}) {
  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader userName={userName} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}
