import { Link } from 'react-router-dom'

export function SubjectPage() {
	return (
		<main id='main-content' className='page-shell'>
			<h1>UI/UX Design</h1>
			<p>Страница предмета с планом подготовки.</p>

			<Link className='secondary-button' to='/'>
				Вернуться на главную
			</Link>
		</main>
	)
}
