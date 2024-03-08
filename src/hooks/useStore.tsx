import { useLocalStorage } from '@mantine/hooks'

export const useStore = () => {
	const [users, setUsers] = useLocalStorage({
		key: 'users',
		defaultValue: '[]',
	})

	const [products, setProducts] = useLocalStorage({
		key: 'products',
		defaultValue: '[]',
	})

	const [sales, setSales] = useLocalStorage({
		key: 'sales',
		defaultValue: '[]',
	})

	const commonOperations = {
		count(model: any) {
			return JSON.parse(model).length
		},
		find(id: string, model: any) {
			return JSON.parse(model).find((item: any) => item.id === id)
		},
		findMany(model: any) {
			return JSON.parse(model)
		},
		create(model: any, setModel: any, value: any) {
			setModel(
				JSON.stringify([
					...JSON.parse(model),
					{ ...value, id: crypto.randomUUID() },
				])
			)
		},
		delete(model: any, setModel: any, id: string) {
			setModel(
				JSON.stringify(
					JSON.parse(model).filter((item: any) => item.id !== id)
				)
			)
		},
		update(model: any, setModel: any, id: string, value: any) {
			setModel(
				JSON.stringify(
					JSON.parse(model).map((item: any) =>
						item.id === id ? { ...item, ...value } : item
					)
				)
			)
		},
	}

	return {
		user: {
			count() {
				return commonOperations.count(users)
			},
			find(id: string) {
				return commonOperations.find(id, users)
			},
			findMany() {
				return commonOperations.findMany(users)
			},
			create(value: any) {
				commonOperations.create(users, setUsers, value)
			},
			delete(id: string) {
				commonOperations.delete(users, setUsers, id)
			},
			update(id: string, value: any) {
				commonOperations.update(users, setUsers, id, value)
			},
		},
		product: {
			count() {
				return commonOperations.count(products)
			},
			find(id: string) {
				return commonOperations.find(id, products)
			},
			findMany() {
				return commonOperations.findMany(products)
			},
			create(value: any) {
				commonOperations.create(products, setProducts, value)
			},
			delete(id: string) {
				commonOperations.delete(products, setProducts, id)
			},
			update(id: string, value: any) {
				commonOperations.update(products, setProducts, id, value)
			},
		},
		sale: {
			count() {
				return commonOperations.count(sales)
			},
			find(id: string) {
				return commonOperations.find(id, sales)
			},
			findMany() {
				return commonOperations.findMany(sales)
			},
			create(value: any) {
				commonOperations.create(sales, setSales, value)
			},
			delete(id: string) {
				commonOperations.delete(sales, setSales, id)
			},
			update(id: string, value: any) {
				commonOperations.update(sales, setSales, id, value)
			},
		},
	}
}
