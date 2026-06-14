import { Link, useParams } from 'react-router-dom'
import { ProgressCard } from '../../components/ProgressCard/ProgressCard'
import { getSubjectById } from '../../data/subjects'
import { useStudyStore } from '../../store/useStudyStore'
import { getSubjectProgress } from '../../utils/progress'
import styles from './SubjectPage.module.css'

function formatExamDate(date: string) {
	const [year, month, day] = date.split('-')

	return `${day}.${month}.${year}`
}

export function SubjectPage() {
	const { subjectId } = useParams()
	const completedTopicIds = useStudyStore(state => state.completedTopicIds)

	const subject = getSubjectById(subjectId ?? '')

	if (!subject) {
		return (
			<main id='main-content' className='page-shell page-section'>
				<div className={styles.notFound}>
					<p className={styles.eyebrow}>Предмет не найден</p>
					<h1>Такого учебного плана нет</h1>
					<p>
						Возможно, ссылка устарела или предмет ещё не добавлен в StudyHub.
					</p>
					<Link className='primary-button' to='/'>
						Вернуться на главную
					</Link>
				</div>
			</main>
		)
	}

	const progress = getSubjectProgress(subject, completedTopicIds)
	const completedCount = subject.topics.filter(topic =>
		completedTopicIds.includes(topic.id),
	).length

	const nextTopic = subject.topics.find(
		topic => !completedTopicIds.includes(topic.id),
	)

	return (
		<main id='main-content' className='page-shell page-section'>
			<Link className={styles.backLink} to='/'>
				← На главную
			</Link>

			<header className={styles.header}>
				<div>
					<p className={styles.eyebrow}>{subject.accentLabel}</p>
					<h1 className={styles.title}>{subject.title}</h1>
					<p className={styles.description}>{subject.description}</p>

					<dl className={styles.metaList}>
						<div>
							<dt>Дата зачёта</dt>
							<dd>{formatExamDate(subject.examDate)}</dd>
						</div>

						<div>
							<dt>Тем изучено</dt>
							<dd>
								{completedCount} из {subject.topics.length}
							</dd>
						</div>

						<div>
							<dt>Прогресс</dt>
							<dd>{progress}%</dd>
						</div>
					</dl>
				</div>

				<aside className={styles.nextCard} aria-labelledby='next-topic-title'>
					<p className={styles.eyebrow}>Следующая тема</p>

					<h2 id='next-topic-title' className={styles.nextTitle}>
						{nextTopic ? nextTopic.title : 'План завершён'}
					</h2>

					<p className={styles.nextText}>
						{nextTopic
							? nextTopic.description
							: 'Все темы по этому предмету отмечены как изученные.'}
					</p>

					<Link
						className='primary-button'
						to={
							nextTopic
								? `/subjects/${subject.id}/topics/${nextTopic.id}`
								: '/achievements'
						}
					>
						{nextTopic ? 'Открыть тему' : 'Посмотреть достижения'}
					</Link>
				</aside>
			</header>

			<div className={styles.contentGrid}>
				<section aria-label='Прогресс подготовки'>
					<ProgressCard
						label={`Прогресс по предмету ${subject.shortTitle}`}
						value={progress}
						description='Прогресс рассчитывается по количеству тем, отмеченных как изученные.'
					/>
				</section>

				<section className={styles.summaryCard} aria-labelledby='summary-title'>
					<p className={styles.eyebrow}>Кратко</p>
					<h2 id='summary-title' className={styles.sectionTitle}>
						Что нужно сделать
					</h2>
					<p className={styles.summaryText}>
						Пройди темы по порядку, открой материал, проверь чеклист и отметь
						тему как изученную. После выполнения прогресс сохранится в браузере.
					</p>
				</section>
			</div>

			<section className={styles.topicSection} aria-labelledby='topics-title'>
				<div className={styles.sectionHeader}>
					<div>
						<p className={styles.eyebrow}>План</p>
						<h2 id='topics-title' className={styles.sectionTitle}>
							Темы подготовки
						</h2>
					</div>

					<p className={styles.topicCounter}>
						{completedCount} / {subject.topics.length} выполнено
					</p>
				</div>

				<ol className={styles.topicList}>
					{subject.topics.map((topic, index) => {
						const isCompleted = completedTopicIds.includes(topic.id)

						return (
							<li key={topic.id} className={styles.topicItem}>
								<article className={styles.topicCard}>
									<div className={styles.topicNumber} aria-hidden='true'>
										{index + 1}
									</div>

									<div className={styles.topicContent}>
										<div className={styles.topicHeader}>
											<h3 className={styles.topicTitle}>
												<Link
													className={styles.topicLink}
													to={`/subjects/${subject.id}/topics/${topic.id}`}
												>
													{topic.title}
												</Link>
											</h3>

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

										<p className={styles.topicDescription}>
											{topic.description}
										</p>

										<div className={styles.topicMeta}>
											<span>Примерное время: {topic.durationMinutes} мин.</span>
											<span>
												Статус:{' '}
												{isCompleted ? 'тема изучена' : 'тема ещё не изучена'}
											</span>
										</div>
									</div>
								</article>
							</li>
						)
					})}
				</ol>
			</section>
		</main>
	)
}
