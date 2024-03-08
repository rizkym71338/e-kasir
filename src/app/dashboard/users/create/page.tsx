'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Paper, Select, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import { CustomBreadcrumb } from '@/components'
import { useStore } from '@/hooks'

export default function CreateUserPage() {
	const router = useRouter()
	const store = useStore()

	const form = useForm({
		initialValues: {
			username: '',
			level: '',
			password: '',
		},
	})

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Pengguna', href: '/dashboard/users' },
					{ title: 'Tambah' },
				]}
			/>
			<Paper withBorder p="md" maw={540}>
				<form
					onSubmit={form.onSubmit((value) => {
						store.user.create(value)
						notifications.show({
							title: 'Berhasil!',
							message: 'Berhasil menambahkan pengguna baru.',
						})
						router.push('/dashboard/users')
					})}
				>
					<TextInput
						mb="md"
						label="Username"
						placeholder="-- Username --"
						{...form.getInputProps('username')}
						required
					/>
					<Select
						mb="md"
						label="Level"
						placeholder="-- Level --"
						data={['Admin', 'Kasir']}
						{...form.getInputProps('level')}
						required
					/>
					<TextInput
						mb="md"
						label="Password"
						placeholder="-- Password --"
						{...form.getInputProps('password')}
						required
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Paper>
		</Fragment>
	)
}
