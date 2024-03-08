'use client'

import { ReactNode, useEffect } from 'react'
import { Center, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

type SplashScreenProps = {
	children: ReactNode
}

export const SplashScreen = ({ children }: SplashScreenProps) => {
	const [loading, { close }] = useDisclosure(true)

	useEffect(() => {
		setTimeout(() => close(), 1500)
	}, [close])

	if (!loading) return children

	return (
		<Center h="100vh">
			<Loader size="xl" type="dots" />
		</Center>
	)
}
