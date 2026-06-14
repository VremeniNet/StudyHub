import { Link } from 'react-router-dom'

export function SettingsPage() {
	return (
		<main id='main-content' className='page-shell page-section'>
			<h1>Настройки доступности</h1>
			<p>
				Здесь будут переключатели высокого контраста, крупного текста и
				уменьшения анимаций.
			</p>

			<Link className='secondary-button' to='/'>
				Вернуться на главную
			</Link>
		</main>
	)
}
