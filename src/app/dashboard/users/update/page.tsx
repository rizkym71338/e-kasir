'use client'

import { Fragment } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Paper, Select, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import { CustomBreadcrumb } from '@/components'
import { useStore } from '@/hooks'

export default function UpdateUserPage() {
	const router = useRouter()
	const params = useSearchParams()
	const id = params.get('id')
	const store = useStore()
	const user = store.user.find(id!)

	const form = useForm({
		initialValues: {
			username: '',
			level: '',
			password: '',
		},
	})

	setTimeout(() => {
		if (form.values.username === '')
			form.setValues({ ...form.values, username: user?.username })
		if (form.values.level === '')
			form.setValues({ ...form.values, level: user?.level })
		if (form.values.password === '')
			form.setValues({ ...form.values, password: user?.password })
	}, 10)

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Pengguna', href: '/dashboard/users' },
					{ title: 'Ubah' },
				]}
			/>
			<Paper withBorder p="md" maw={540}>
				<form
					onSubmit={form.onSubmit((value) => {
						store.user.update(id!, value)
						notifications.show({
							title: 'Berhasil!',
							message: 'Berhasil merubah pengguna.',
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
