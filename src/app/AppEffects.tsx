import { useEffect } from 'react'
import { useStudyStore } from '../store/useStudyStore'

export function AppEffects() {
	const accessibility = useStudyStore(state => state.accessibility)

	useEffect(() => {
		document.documentElement.classList.toggle(
			'theme-high-contrast',
			accessibility.highContrast,
		)

		document.documentElement.classList.toggle(
			'theme-large-text',
			accessibility.largeText,
		)

		document.body.classList.toggle('reduce-motion', accessibility.reduceMotion)

		return () => {
			document.documentElement.classList.remove('theme-high-contrast')
			document.documentElement.classList.remove('theme-large-text')
			document.body.classList.remove('reduce-motion')
		}
	}, [
		accessibility.highContrast,
		accessibility.largeText,
		accessibility.reduceMotion,
	])

	return null
}
