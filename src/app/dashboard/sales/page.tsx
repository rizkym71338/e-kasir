'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button, ButtonGroup, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'

import { CustomBreadcrumb, DataTable } from '@/components'
import { useStore } from '@/hooks'

export default function SalesPage() {
	const router = useRouter()
	const store = useStore()

	const deleteSale = (id: string) => {
		return modals.openConfirmModal({
			title: 'Hapus Riwayat Penjualan',
			children: (
				<Text size="sm">
					Apakah kamu yakin ingin menghapus riwayat penjualan ini?
				</Text>
			),
			labels: { confirm: 'Hapus', cancel: 'Batal' },
			confirmProps: { color: 'red' },
			onConfirm() {
				store.sale.delete(id)
				notifications.show({
					title: 'Berhasil!',
					message: 'Berhasil menghapus riwayat penjualan.',
				})
			},
		})
	}

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Penjualan' },
				]}
			/>
			<Button
				mb="md"
				onClick={() => router.push('/dashboard/sales/create')}
			>
				<Text me="xs">Tambah Penjualan</Text>
				<IconPlus />
			</Button>
			<DataTable
				data={store.sale.findMany()}
				columns={[
					{ accessor: 'id', title: 'Id' },
					{ accessor: 'name', title: 'Nama' },
					{ accessor: 'quantity', title: 'Kuantitas' },
					{
						accessor: 'aksi',
						title: 'Aksi',
						render(sale) {
							return (
								<ButtonGroup>
									<Tooltip label="Ubah">
										<Button
											variant="light"
											size="xs"
											color="yellow"
											onClick={() =>
												router.push(
													`/dashboard/sales/update?id=${sale.id}`
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
											onClick={() => deleteSale(sale.id)}
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
