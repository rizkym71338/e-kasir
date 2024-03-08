'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button, ButtonGroup, NumberFormatter, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'

import { CustomBreadcrumb, DataTable } from '@/components'
import { useStore } from '@/hooks'

export default function ProductsPage() {
	const router = useRouter()
	const store = useStore()

	const deleteProduct = (id: string) => {
		return modals.openConfirmModal({
			title: 'Hapus Produk',
			children: (
				<Text size="sm">
					Apakah kamu yakin ingin menghapus produk ini?
				</Text>
			),
			labels: { confirm: 'Hapus', cancel: 'Batal' },
			confirmProps: { color: 'red' },
			onConfirm() {
				store.product.delete(id)
				notifications.show({
					title: 'Berhasil!',
					message: 'Berhasil menghapus produk.',
				})
			},
		})
	}

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Produk' },
				]}
			/>
			<Button
				mb="md"
				onClick={() => router.push('/dashboard/products/create')}
			>
				<Text me="xs">Tambah Produk</Text>
				<IconPlus />
			</Button>
			<DataTable
				data={store.product.findMany()}
				columns={[
					{ accessor: 'name', title: 'Nama' },
					{
						accessor: 'price',
						title: 'Harga',
						render(product) {
							return (
								<NumberFormatter
									value={product.price}
									decimalSeparator=","
									thousandSeparator="."
									prefix="Rp"
								/>
							)
						},
					},
					{ accessor: 'stock', title: 'Stok' },
					{
						accessor: 'aksi',
						title: 'Aksi',
						render(product) {
							return (
								<ButtonGroup>
									<Tooltip label="Ubah">
										<Button
											variant="light"
											size="xs"
											color="yellow"
											onClick={() =>
												router.push(
													`/dashboard/products/update?id=${product.id}`
												)
											}
										>
											<IconPencil />
										</Button>
									</Tooltip>
									<Tooltip label="Hapus">
										<Button
											variant="light"
											size="xs"
											color="red"
											onClick={() =>
												deleteProduct(product.id)
											}
										>
											<IconTrash />
										</Button>
									</Tooltip>
								</ButtonGroup>
							)
						},
					},
				]}
			/>
		</Fragment>
	)
}
