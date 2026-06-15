import { Link } from 'react-router-dom'
import { AchievementCard } from '../../components/AchievementCard/AchievementCard'
import { ProgressCard } from '../../components/ProgressCard/ProgressCard'
import { SubjectCard } from '../../components/SubjectCard/SubjectCard'
import { achievements } from '../../data/achievements'
import { subjects } from '../../data/subjects'
import { useStudyStore } from '../../store/useStudyStore'
import {
	getSubjectProgress,
	getTotalProgress,
	getUnlockedAchievements,
} from '../../utils/progress'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
	const completedTopicIds = useStudyStore(state => state.completedTopicIds)

	const totalProgress = getTotalProgress(completedTopicIds)
	const unlockedAchievements = getUnlockedAchievements(completedTopicIds)
	const unlockedAchievementIds = unlockedAchievements.map(
		achievement => achievement.id,
	)

	const recommendedSubject =
		subjects.find(
			subject => getSubjectProgress(subject, completedTopicIds) < 100,
		) ?? subjects[0]

	const recommendedTopic = recommendedSubject.topics.find(
		topic => !completedTopicIds.includes(topic.id),
	)

	return (
		<main id='main-content' className='page-shell page-section'>
			<div className={styles.hero}>
				<div>
					<p className={styles.eyebrow}>План подготовки</p>
					<h1 className={styles.title}>Готовься к зачёту без хаоса</h1>
					<p className={styles.subtitle}>
						StudyHub показывает темы, прогресс и следующие шаги подготовки.
						Игровые достижения помогают видеть движение, но не мешают основному
						сценарию.
					</p>
				</div>

				<aside className={styles.streakCard} aria-labelledby='streak-title'>
					<span className={styles.streakIcon} aria-hidden='true'>
						✦
					</span>
					<div>
						<h2 id='streak-title' className={styles.streakTitle}>
							Учебная серия
						</h2>
						<p className={styles.streakValue}>1 день</p>
					</div>
					<p className={styles.streakDescription}></p>
				</aside>
			</div>

			<div className={styles.grid}>
				<section className={styles.mainColumn} aria-label='Основная информация'>
					<ProgressCard
						label='Общий прогресс'
						value={totalProgress}
						description='Процент изученных тем по всем предметам.'
					/>

					<section
						className={styles.recommendation}
						aria-labelledby='recommendation-title'
					>
						<div>
							<p className={styles.eyebrow}>Следующий шаг</p>
							<h2
								id='recommendation-title'
								className={styles.recommendationTitle}
							>
								{recommendedTopic ? recommendedTopic.title : 'Все темы изучены'}
							</h2>

							<p className={styles.recommendationText}>
								{recommendedTopic
									? recommendedTopic.description
									: 'Можно повторить материалы или проверить достижения.'}
							</p>
						</div>

						<Link
							className='primary-button'
							to={
								recommendedTopic
									? `/subjects/${recommendedSubject.id}/topics/${recommendedTopic.id}`
									: '/achievements'
							}
						>
							{recommendedTopic
								? 'Продолжить подготовку'
								: 'Посмотреть достижения'}
						</Link>
					</section>

					<section aria-labelledby='subjects-title'>
						<div className={styles.sectionHeader}>
							<div>
								<p className={styles.eyebrow}>Предметы</p>
								<h2 id='subjects-title' className={styles.sectionTitle}>
									Учебные планы
								</h2>
							</div>
						</div>

						<div className={styles.subjectGrid}>
							{subjects.map(subject => {
								const progress = getSubjectProgress(subject, completedTopicIds)
								const completedCount = subject.topics.filter(topic =>
									completedTopicIds.includes(topic.id),
								).length

								return (
									<SubjectCard
										key={subject.id}
										subject={subject}
										progress={progress}
										completedTopicsCount={completedCount}
									/>
								)
							})}
						</div>
					</section>
				</section>

				<aside
					className={styles.sideColumn}
					aria-label='Достижения и подсказки'
				>
					<section
						className={styles.sideCard}
						aria-labelledby='achievements-title'
					>
						<div className={styles.sectionHeader}>
							<div>
								<p className={styles.eyebrow}>Мотивация</p>
								<h2 id='achievements-title' className={styles.sectionTitle}>
									Достижения
								</h2>
							</div>

							<Link className={styles.textLink} to='/achievements'>
								Все
							</Link>
						</div>

						<div className={styles.achievementList}>
							{achievements.slice(0, 3).map(achievement => (
								<AchievementCard
									key={achievement.id}
									achievement={achievement}
									unlocked={unlockedAchievementIds.includes(achievement.id)}
								/>
							))}
						</div>
					</section>

					<section
						className={styles.sideCard}
						aria-labelledby='accessibility-title'
					>
						<p className={styles.eyebrow}>Доступность</p>
						<h2 id='accessibility-title' className={styles.sectionTitle}>
							Интерфейс для разных пользователей
						</h2>
						<p className={styles.sideText}>
							Прогресс, статусы и достижения имеют текстовое описание. Основные
							действия доступны с клавиатуры, а важные изменения будут
							объявляться через live-region.
						</p>
						<Link className='secondary-button' to='/settings'>
							Открыть настройки
						</Link>
					</section>
				</aside>
			</div>
		</main>
	)
}
