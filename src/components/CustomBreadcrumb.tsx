'use client'

import { useRouter } from 'next/navigation'
import { Breadcrumbs, Paper, Text } from '@mantine/core'

type CustomBreadcrumbProps = {
	items: {
		title: string
		href?: string
	}[]
}

export const CustomBreadcrumb = ({ items }: CustomBreadcrumbProps) => {
	const router = useRouter()

	const breadcrumbs = items.map((item, index) => {
		return (
			<Paper
				key={index}
				onClick={() => item.href && router.push(item.href)}
			>
				<Text color={item.href ? 'green' : 'gray'} size="sm">
					{item.title}
				</Text>
			</Paper>
		)
	})

	return <Breadcrumbs mb="xl">{breadcrumbs}</Breadcrumbs>
}
