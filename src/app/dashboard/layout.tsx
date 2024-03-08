'use client'

import { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AppShell, Burger, Flex, Text, Paper } from '@mantine/core'
import { Avatar, Menu, Tooltip } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { IconLogout } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'

import { SIDEBAR_MENU } from '@/constants'

type RootLayoutProps = {
	children: ReactNode
}

export default function DashboardLayout({ children }: RootLayoutProps) {
	const [opened, { toggle, close }] = useDisclosure()
	const pathname = usePathname()
	const router = useRouter()

	const sidebar = SIDEBAR_MENU.map((menu) => {
		const active = pathname.split('/')[2] === menu.href.split('/')[2]
		return (
			<Paper
				key={menu.name}
				onClick={() => {
					close()
					router.push(menu.href)
				}}
				style={{ cursor: 'pointer' }}
				bg={active ? 'green' : undefined}
			>
				<Flex p="md" gap="md" align="center">
					<menu.icon color={active ? 'white' : undefined} />
					<Text color={active ? 'white' : undefined}>
						{menu.name}
					</Text>
				</Flex>
			</Paper>
		)
	})

	return (
		<AppShell
			header={{ height: 70 }}
			navbar={{
				width: 280,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Flex p="md" gap="md" align="center" justify="space-between">
					<Text size="xl" fw="bold" color="green">
						E-Kasir
					</Text>
					<Flex align="center" gap="xs">
						<Menu position="bottom-end" width={240}>
							<Menu.Target>
								<Tooltip label="Profil">
									<Avatar
										src={null}
										alt="default-avatar"
										color="green"
										style={{ cursor: 'pointer' }}
									/>
								</Tooltip>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item leftSection={<IconSettings />}>
									Pengaturan
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item leftSection={<IconLogout />}>
									Keluar
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
					</Flex>
				</Flex>
			</AppShell.Header>
			<AppShell.Navbar p="xs">{sidebar}</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
