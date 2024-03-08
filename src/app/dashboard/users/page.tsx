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

export default function UsersPage() {
	const router = useRouter()
	const store = useStore()

	const deleteUser = (id: string) => {
		return modals.openConfirmModal({
			title: 'Hapus Pengguna',
			children: (
				<Text size="sm">
					Apakah kamu yakin ingin menghapus pengguna ini?
				</Text>
			),
			labels: { confirm: 'Hapus', cancel: 'Batal' },
			confirmProps: { color: 'red' },
			onConfirm() {
				store.user.delete(id)
				notifications.show({
					title: 'Berhasil!',
					message: 'Berhasil menghapus pengguna.',
				})
			},
		})
	}

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Pengguna' },
				]}
			/>
			<Button
				mb="md"
				onClick={() => router.push('/dashboard/users/create')}
			>
				<Text me="xs">Tambah Pengguna</Text>
				<IconPlus />
			</Button>
			<DataTable
				data={store.user.findMany()}
				columns={[
					{ accessor: 'id', title: 'Id' },
					{ accessor: 'username', title: 'Username' },
					{ accessor: 'level', title: 'Level' },
					{
						accessor: 'aksi',
						title: 'Aksi',
						render(user) {
							return (
								<ButtonGroup>
									<Tooltip label="Ubah">
										<Button
											variant="light"
											size="xs"
											color="yellow"
											onClick={() =>
												router.push(
													`/dashboard/users/update?id=${user.id}`
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
											onClick={() => deleteUser(user.id)}
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
