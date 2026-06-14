import * as Switch from '@radix-ui/react-switch'
import { Link } from 'react-router-dom'
import { useStudyStore } from '../../store/useStudyStore'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
	const accessibility = useStudyStore(state => state.accessibility)
	const setHighContrast = useStudyStore(state => state.setHighContrast)
	const setLargeText = useStudyStore(state => state.setLargeText)
	const setReduceMotion = useStudyStore(state => state.setReduceMotion)
	const resetProgress = useStudyStore(state => state.resetProgress)

	return (
		<main id='main-content' className='page-shell page-section'>
			<Link className={styles.backLink} to='/'>
				← На главную
			</Link>

			<header className={styles.header}>
				<div>
					<p className={styles.eyebrow}>Доступность</p>
					<h1 className={styles.title}>Настройки интерфейса</h1>
					<p className={styles.description}>
						StudyHub можно адаптировать под разные потребности: повысить
						контраст, увеличить текст и уменьшить количество анимаций.
					</p>
				</div>

				<aside
					className={styles.noteCard}
					aria-labelledby='settings-note-title'
				>
					<p className={styles.eyebrow}>Важно</p>
					<h2 id='settings-note-title' className={styles.noteTitle}>
						Настройки сохраняются
					</h2>
					<p className={styles.noteText}>
						Выбранные параметры сохраняются в браузере и применяются после
						перезагрузки страницы.
					</p>
				</aside>
			</header>

			<section className={styles.settingsGrid} aria-labelledby='settings-title'>
				<div>
					<p className={styles.eyebrow}>Параметры</p>
					<h2 id='settings-title' className={styles.sectionTitle}>
						Визуальная доступность
					</h2>
				</div>

				<div className={styles.settingList}>
					<article className={styles.settingCard}>
						<div>
							<h3 id='high-contrast-title' className={styles.settingTitle}>
								Высокий контраст
							</h3>
							<p
								id='high-contrast-description'
								className={styles.settingDescription}
							>
								Делает фон тёмным, текст более контрастным, а границы и фокус
								заметнее.
							</p>
						</div>

						<Switch.Root
							className={styles.switchRoot}
							checked={accessibility.highContrast}
							onCheckedChange={setHighContrast}
							aria-labelledby='high-contrast-title'
							aria-describedby='high-contrast-description'
						>
							<Switch.Thumb className={styles.switchThumb} />
						</Switch.Root>
					</article>

					<article className={styles.settingCard}>
						<div>
							<h3 id='large-text-title' className={styles.settingTitle}>
								Крупный текст
							</h3>
							<p
								id='large-text-description'
								className={styles.settingDescription}
							>
								Увеличивает основные размеры текста, чтобы интерфейс было проще
								читать.
							</p>
						</div>

						<Switch.Root
							className={styles.switchRoot}
							checked={accessibility.largeText}
							onCheckedChange={setLargeText}
							aria-labelledby='large-text-title'
							aria-describedby='large-text-description'
						>
							<Switch.Thumb className={styles.switchThumb} />
						</Switch.Root>
					</article>

					<article className={styles.settingCard}>
						<div>
							<h3 id='reduce-motion-title' className={styles.settingTitle}>
								Уменьшить анимации
							</h3>
							<p
								id='reduce-motion-description'
								className={styles.settingDescription}
							>
								Отключает необязательные переходы и движения, если они могут
								мешать пользователю.
							</p>
						</div>

						<Switch.Root
							className={styles.switchRoot}
							checked={accessibility.reduceMotion}
							onCheckedChange={setReduceMotion}
							aria-labelledby='reduce-motion-title'
							aria-describedby='reduce-motion-description'
						>
							<Switch.Thumb className={styles.switchThumb} />
						</Switch.Root>
					</article>
				</div>
			</section>

			<section className={styles.accessibilityInfo} aria-labelledby='how-title'>
				<div>
					<p className={styles.eyebrow}>Как это работает</p>
					<h2 id='how-title' className={styles.sectionTitle}>
						Что сделано для доступности
					</h2>
				</div>

				<ul className={styles.infoList}>
					<li>Все основные действия доступны с клавиатуры.</li>
					<li>Активный элемент получает заметное состояние фокуса.</li>
					<li>Прогресс и статусы продублированы текстом.</li>
					<li>Важные изменения отправляются в aria-live область.</li>
					<li>Смысл не передаётся только через цвет.</li>
					<li>Переключатели имеют текстовые названия и описания.</li>
				</ul>
			</section>

			<section className={styles.dangerCard} aria-labelledby='reset-title'>
				<div>
					<p className={styles.eyebrow}>Данные</p>
					<h2 id='reset-title' className={styles.sectionTitle}>
						Сбросить прогресс
					</h2>
					<p className={styles.settingDescription}>
						Кнопка удалит список изученных тем из локального хранилища браузера.
						Это полезно для демонстрации проекта с нуля.
					</p>
				</div>

				<button
					className='secondary-button'
					type='button'
					onClick={resetProgress}
				>
					Сбросить прогресс
				</button>
			</section>
		</main>
	)
}
