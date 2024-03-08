'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ActionIcon, Button, Flex, NumberFormatter } from '@mantine/core'
import { Paper, Select, SimpleGrid, Table, Text, Tooltip } from '@mantine/core'

import { CustomBreadcrumb } from '@/components'
import { useStore } from '@/hooks'
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'

export default function CreateSalePage() {
	const [selectedProduct, setSelectedProduct] = useState('')
	const [data, setData] = useState<any[]>([])

	const router = useRouter()
	const store = useStore()

	const products = store.product.findMany()

	const addSelectedProduct = () => {
		setData((prevData: any) => {
			const product = store.product.find(selectedProduct)
			return [...prevData, { ...product, quantity: 1 }]
		})
	}

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Penjualan', href: '/dashboard/sales' },
					{ title: 'Tambah' },
				]}
			/>
			<SimpleGrid cols={{ lg: 2 }} spacing="md">
				<Paper withBorder p="md" h="fit-content">
					<Select
						mb="md"
						label="Produk"
						placeholder="-- Produk --"
						onChange={(value) => setSelectedProduct(value || '')}
						data={products.map((product: any) => ({
							label: product.name,
							value: product.id,
						}))}
					/>
					<Button onClick={addSelectedProduct}>Tambah</Button>
				</Paper>
				<Paper withBorder h="fit-content">
					<Table highlightOnHover striped>
						<Table.Thead>
							<Table.Td>Nama</Table.Td>
							<Table.Td>Harga</Table.Td>
							<Table.Td>Kuantitas</Table.Td>
						</Table.Thead>
						<Table.Tbody>
							{data?.map((product: any, index: number) => {
								const increment = () => {
									setData((prevData: any) => {
										return prevData.map(
											(item: any, i: number) => {
												if (i === index) {
													return {
														...item,
														quantity:
															item.quantity + 1,
													}
												}
												return item
											}
										)
									})
								}
								const decrement = () => {
									setData((prevData: any) => {
										return prevData.map(
											(item: any, i: number) => {
												if (i === index) {
													return {
														...item,
														quantity:
															item.quantity !== 0
																? item.quantity -
																  1
																: 0,
													}
												}
												return item
											}
										)
									})
								}
								const deleteSelectedProduct = () => {
									setData((prevData: any) => {
										return prevData.filter(
											(_: any, i: number) => i !== index
										)
									})
								}
								return (
									<Table.Tr key={index}>
										<Table.Td>{product.name}</Table.Td>
										<Table.Td>
											<NumberFormatter
												value={product.price}
												decimalSeparator=","
												thousandSeparator="."
												prefix="Rp"
											/>
										</Table.Td>
										<Table.Td>
											<Flex gap="xs">
												<Tooltip label="Kurang">
													<ActionIcon
														variant="light"
														color="gray"
														onClick={decrement}
													>
														<IconMinus />
													</ActionIcon>
												</Tooltip>
												<Text>{product.quantity}</Text>
												<Tooltip label="Tambah">
													<ActionIcon
														variant="light"
														color="gray"
														onClick={increment}
													>
														<IconPlus />
													</ActionIcon>
												</Tooltip>
											</Flex>
										</Table.Td>
										<Table.Td>
											<Tooltip label="Hapus">
												<ActionIcon
													variant="light"
													color="red"
													onClick={
														deleteSelectedProduct
													}
												>
													<IconTrash />
												</ActionIcon>
											</Tooltip>
										</Table.Td>
									</Table.Tr>
								)
							})}
						</Table.Tbody>
					</Table>
					<Flex
						p="xs"
						align="center"
						gap="xs"
						justify="space-between"
					>
						<Button>Submit</Button>
						<Text fw="bold">
							Total :{' '}
							<NumberFormatter
								value={data?.reduce(
									(a, b) => a + b.price * b.quantity,
									0
								)}
								decimalSeparator=","
								thousandSeparator="."
								prefix="Rp"
								color="green"
							/>
						</Text>
					</Flex>
				</Paper>
			</SimpleGrid>
		</Fragment>
	)
}
