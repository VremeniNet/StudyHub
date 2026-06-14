import { Link, useParams } from 'react-router-dom'
import { getSubjectById, getTopicById } from '../../data/subjects'
import { useStudyStore } from '../../store/useStudyStore'
import styles from './TopicPage.module.css'

export function TopicPage() {
	const { subjectId, topicId } = useParams()

	const completedTopicIds = useStudyStore(state => state.completedTopicIds)
	const completeTopic = useStudyStore(state => state.completeTopic)

	const subject = getSubjectById(subjectId ?? '')
	const topic = getTopicById(subjectId ?? '', topicId ?? '')

	if (!subject || !topic) {
		return (
			<main id='main-content' className='page-shell page-section'>
				<div className={styles.notFound}>
					<p className={styles.eyebrow}>Тема не найдена</p>
					<h1>Такого материала нет</h1>
					<p>
						Возможно, ссылка устарела или тема ещё не добавлена в учебный план.
					</p>
					<Link className='primary-button' to='/'>
						Вернуться на главную
					</Link>
				</div>
			</main>
		)
	}

	const isCompleted = completedTopicIds.includes(topic.id)

	function handleCompleteTopic() {
		if (!topic) {
			return
		}

		completeTopic(topic.id, topic.title)
	}

	return (
		<main id='main-content' className='page-shell page-section'>
			<Link className={styles.backLink} to={`/subjects/${subject.id}`}>
				← К предмету {subject.shortTitle}
			</Link>

			<article className={styles.pageGrid}>
				<section className={styles.content} aria-labelledby='topic-title'>
					<p className={styles.eyebrow}>{subject.title}</p>

					<div className={styles.titleRow}>
						<h1 id='topic-title' className={styles.title}>
							{topic.title}
						</h1>

						<span
							className={
								isCompleted
									? 'status-pill status-pill--success'
									: 'status-pill status-pill--warning'
							}
						>
							{isCompleted ? 'Изучено' : 'В плане'}
						</span>
					</div>

					<p className={styles.description}>{topic.description}</p>

					<div className={styles.materialCard}>
						<h2 className={styles.sectionTitle}>Краткий материал</h2>
						<p className={styles.materialText}>{topic.material}</p>
					</div>

					<section
						className={styles.checklistCard}
						aria-labelledby='checklist-title'
					>
						<h2 id='checklist-title' className={styles.sectionTitle}>
							Чеклист изучения
						</h2>

						<ul className={styles.checklist}>
							{topic.checklist.map(item => (
								<li key={item} className={styles.checklistItem}>
									<span className={styles.checkIcon} aria-hidden='true'>
										✓
									</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</section>
				</section>

				<aside className={styles.sidePanel} aria-labelledby='actions-title'>
					<div className={styles.sideCard}>
						<p className={styles.eyebrow}>Действие</p>

						<h2 id='actions-title' className={styles.sideTitle}>
							Завершение темы
						</h2>

						<p className={styles.sideText}>
							Когда материал изучен, отметь тему как выполненную. Прогресс
							обновится автоматически и сохранится после перезагрузки страницы.
						</p>

						<dl className={styles.metaList}>
							<div>
								<dt>Предмет</dt>
								<dd>{subject.shortTitle}</dd>
							</div>

							<div>
								<dt>Время</dt>
								<dd>{topic.durationMinutes} мин.</dd>
							</div>

							<div>
								<dt>Статус</dt>
								<dd>{isCompleted ? 'Изучено' : 'Не изучено'}</dd>
							</div>
						</dl>

						<button
							className='primary-button'
							type='button'
							onClick={handleCompleteTopic}
							disabled={isCompleted}
						>
							{isCompleted ? 'Тема уже изучена' : 'Отметить как изученную'}
						</button>

						<p className={styles.accessibilityNote}>
							Статус темы отображается текстом и не зависит только от цвета.
						</p>
					</div>

					<div className={styles.nextCard}>
						<h2 className={styles.sideTitle}>Что дальше?</h2>
						<p className={styles.sideText}>
							Вернись к списку тем, чтобы продолжить подготовку по плану.
						</p>
						<Link className='secondary-button' to={`/subjects/${subject.id}`}>
							Открыть план предмета
						</Link>
					</div>
				</aside>
			</article>
		</main>
	)
}
