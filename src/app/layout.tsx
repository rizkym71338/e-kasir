'use client'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { MantineProvider, createTheme } from '@mantine/core'
import { NavigationProgress } from '@mantine/nprogress'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

import { SplashScreen } from '@/components'

import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/core/styles.css'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
	primaryColor: 'green',
	primaryShade: { light: 6, dark: 8 },
})

type RootLayoutProps = {
	children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head>
				<title>E-Kasir</title>
			</head>
			<body className={inter.className}>
				<MantineProvider theme={theme}>
					<ModalsProvider>
						<NavigationProgress />
						<SplashScreen>{children}</SplashScreen>
						<Notifications />
					</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	)
}
