'use client'

import { Fragment } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, NumberInput, Paper, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import { CustomBreadcrumb } from '@/components'
import { useStore } from '@/hooks'

export default function UpdateProductPage() {
	const router = useRouter()
	const store = useStore()
	const params = useSearchParams()
	const id = params.get('id')
	const product = store.product.find(id!)

	const form = useForm({
		initialValues: {
			name: '',
			price: '',
			stock: '',
		},
	})

	setTimeout(() => {
		if (form.values.name === '')
			form.setValues({ ...form.values, name: product?.name })
		if (form.values.price === '')
			form.setValues({ ...form.values, price: product?.price })
		if (form.values.stock === '')
			form.setValues({ ...form.values, stock: product?.stock })
	}, 10)

	return (
		<Fragment>
			<CustomBreadcrumb
				items={[
					{ title: 'Dashboard', href: '/dashboard' },
					{ title: 'Produk', href: '/dashboard/products' },
					{ title: 'Ubah' },
				]}
			/>
			<Paper withBorder p="md" maw={540}>
				<form
					onSubmit={form.onSubmit((value) => {
						store.product.update(id!, { ...product, ...value })
						notifications.show({
							title: 'Berhasil!',
							message: 'Berhasil mengubah produk.',
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
