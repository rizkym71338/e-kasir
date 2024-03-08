'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Button, NumberInput, Paper, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import { CustomBreadcrumb } from '@/components'
import { useStore } from '@/hooks'

export default function CreateProductPage() {
	const router = useRouter()
	const store = useStore()

	const form = useForm({
		initialValues: {
			name: '',
			price: 0,
		},
	})

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Produk', href: '/dashboard/products' },
					{ title: 'Tambah' },
				]}
			/>
			<Paper withBorder p="md" maw={540}>
				<form
					onSubmit={form.onSubmit((value) => {
						store.product.create({ ...value, stock: 0 })
						notifications.show({
							title: 'Berhasil!',
							message: 'Berhasil menambahkan produk baru.',
						})
						router.push('/dashboard/products')
					})}
				>
					<TextInput
						mb="md"
						label="Nama"
						placeholder="-- Nama --"
						{...form.getInputProps('name')}
						required
					/>
					<NumberInput
						mb="md"
						label="Harga"
						placeholder="-- Harga --"
						{...form.getInputProps('price')}
						required
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Paper>
		</Fragment>
	)
}
