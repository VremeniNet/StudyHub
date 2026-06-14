import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
	return (
		<main id='main-content' className='page-shell page-section'>
			<section className={styles.card} aria-labelledby='not-found-title'>
				<p className={styles.eyebrow}>Ошибка 404</p>

				<h1 id='not-found-title' className={styles.title}>
					Страница не найдена
				</h1>

				<p className={styles.description}>
					Возможно, ссылка устарела или такого раздела в StudyHub ещё нет.
					Вернитесь на главную страницу, чтобы продолжить подготовку.
				</p>

				<Link className='primary-button' to='/'>
					Вернуться на главную
				</Link>
			</section>
		</main>
	)
}
