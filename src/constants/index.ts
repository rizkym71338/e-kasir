import {
	IconBox,
	IconDashboard,
	IconShoppingCart,
	IconUsersGroup,
} from '@tabler/icons-react'

export const SIDEBAR_MENU = [
	{ name: 'Dashboard', href: '/dashboard', icon: IconDashboard },
	{ name: 'Produk', href: '/dashboard/products', icon: IconBox },
	{ name: 'Penjualan', href: '/dashboard/sales', icon: IconShoppingCart },
	{ name: 'Pengguna', href: '/dashboard/users', icon: IconUsersGroup },
]
