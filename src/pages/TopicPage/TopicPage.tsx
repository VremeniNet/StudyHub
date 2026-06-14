import { Link } from 'react-router-dom'

export function TopicPage() {
	return (
		<main id='main-content' className='page-shell'>
			<h1>Тема подготовки</h1>
			<p>Страница учебной темы с материалом и чеклистом.</p>

			<Link className='secondary-button' to='/subjects/ui-ux'>
				Вернуться к предмету
			</Link>
		</main>
	)
}
