'use client'

import { Fragment, useState } from 'react'
import { Table, Pagination, Paper, Select } from '@mantine/core'
import { Flex, Input, ScrollAreaAutosize } from '@mantine/core'

type DataTableProps = {
	columns: {
		accessor: string
		title?: string
		render?: (value: any, index: number) => void
	}[]
	data: any
}

export const DataTable = ({ columns, data }: DataTableProps) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [searchTerm, setSearchTerm] = useState('')

	const filteredData = data.filter((item: any) =>
		Object.values(item).some((value) =>
			String(value).toLowerCase().includes(searchTerm.toLowerCase())
		)
	)

	const totalPages = Math.ceil(filteredData.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentData = filteredData.slice(startIndex, endIndex)

	return (
		<Fragment>
			<Flex mb="xs" gap="md" justify="space-between">
				<Select
					value={String(itemsPerPage)}
					data={['5', '10', '50', '100']}
					onChange={(value) => setItemsPerPage(Number(value))}
					w={80}
				/>
				<Input
					placeholder="Cari..."
					value={searchTerm}
					onChange={(event) =>
						setSearchTerm(event.currentTarget.value)
					}
				/>
			</Flex>
			<Paper mb="xs" withBorder>
				<ScrollAreaAutosize>
					<Table highlightOnHover striped withColumnBorders>
						<Table.Thead>
							{columns.map((column) => (
								<Table.Th key={column.accessor}>
									{column.title || column.accessor}
								</Table.Th>
							))}
						</Table.Thead>
						<Table.Tbody>
							{currentData.map((item: any, index: number) => (
								<Table.Tr key={item.id}>
									{columns.map((column) => (
										<Table.Td key={column.accessor}>
											{column.render?.(item, index) ||
												item[column.accessor]}
										</Table.Td>
									))}
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</ScrollAreaAutosize>
			</Paper>
			<Flex justify="space-between">
				<Pagination
					ms="auto"
					value={currentPage}
					onChange={(value) => setCurrentPage(Number(value))}
					total={totalPages}
				/>
			</Flex>
		</Fragment>
	)
}
