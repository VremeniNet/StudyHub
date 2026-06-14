import { Link } from 'react-router-dom'

export function AchievementsPage() {
	return (
		<main id='main-content' className='page-shell'>
			<h1>Достижения</h1>
			<p>Здесь будут отображаться полученные достижения пользователя.</p>

			<Link className='secondary-button' to='/'>
				Вернуться на главную
			</Link>
		</main>
	)
}
