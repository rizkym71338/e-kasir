'use client'

import { CustomBreadcrumb } from '@/components'

export default function DashboardPage() {
	return (
		<main>
			<CustomBreadcrumb items={[{ title: 'Dashboard' }]} />
		</main>
	)
}
