import { Link } from 'react-router-dom'
import { AchievementCard } from '../../components/AchievementCard/AchievementCard'
import { achievements } from '../../data/achievements'
import { useStudyStore } from '../../store/useStudyStore'
import { getUnlockedAchievements } from '../../utils/progress'
import styles from './AchievementsPage.module.css'

export function AchievementsPage() {
	const completedTopicIds = useStudyStore(state => state.completedTopicIds)

	const unlockedAchievements = getUnlockedAchievements(completedTopicIds)
	const unlockedAchievementIds = unlockedAchievements.map(
		achievement => achievement.id,
	)

	const unlockedCount = unlockedAchievements.length
	const totalCount = achievements.length
	const progress = Math.round((unlockedCount / totalCount) * 100)

	return (
		<main id='main-content' className='page-shell page-section'>
			<Link className={styles.backLink} to='/'>
				← На главную
			</Link>

			<header className={styles.header}>
				<div>
					<p className={styles.eyebrow}>Геймификация</p>
					<h1 className={styles.title}>Достижения подготовки</h1>
					<p className={styles.description}>
						Достижения помогают видеть прогресс и поддерживать мотивацию, но не
						блокируют основной сценарий подготовки к зачёту.
					</p>
				</div>

				<aside
					className={styles.progressCard}
					aria-labelledby='achievements-progress-title'
				>
					<p className={styles.eyebrow}>Прогресс</p>
					<h2 id='achievements-progress-title' className={styles.progressTitle}>
						{unlockedCount} из {totalCount}
					</h2>
					<p className={styles.progressText}>
						Открыто достижений: {progress}%.
					</p>

					<div className={styles.progressTrack} aria-hidden='true'>
						<span
							className={styles.progressBar}
							style={{ width: `${progress}%` }}
						/>
					</div>

					<p className='visually-hidden'>
						Прогресс достижений: открыто {unlockedCount} из {totalCount}, это{' '}
						{progress}%.
					</p>
				</aside>
			</header>

			<section className={styles.infoCard} aria-labelledby='why-title'>
				<div>
					<p className={styles.eyebrow}>Зачем это нужно</p>
					<h2 id='why-title' className={styles.sectionTitle}>
						Ненавязчивая мотивация
					</h2>
				</div>

				<p className={styles.infoText}>
					В StudyHub игровые элементы не заменяют учебную цель. Они только
					отмечают важные этапы: первую изученную тему, половину пути, полную
					готовность к зачёту и внимание к доступности.
				</p>
			</section>

			<section className={styles.section} aria-labelledby='unlocked-title'>
				<div className={styles.sectionHeader}>
					<div>
						<p className={styles.eyebrow}>Получено</p>
						<h2 id='unlocked-title' className={styles.sectionTitle}>
							Открытые достижения
						</h2>
					</div>
				</div>

				{unlockedAchievements.length > 0 ? (
					<div className={styles.grid}>
						{unlockedAchievements.map(achievement => (
							<AchievementCard
								key={achievement.id}
								achievement={achievement}
								unlocked
							/>
						))}
					</div>
				) : (
					<div className={styles.emptyState}>
						<h3>Пока нет достижений</h3>
						<p>
							Открой любую тему подготовки и отметь её как изученную, чтобы
							получить первое достижение.
						</p>
						<Link className='primary-button' to='/subjects/ui-ux'>
							Перейти к подготовке
						</Link>
					</div>
				)}
			</section>

			<section className={styles.section} aria-labelledby='locked-title'>
				<div className={styles.sectionHeader}>
					<div>
						<p className={styles.eyebrow}>В процессе</p>
						<h2 id='locked-title' className={styles.sectionTitle}>
							Ещё не получено
						</h2>
					</div>
				</div>

				<div className={styles.grid}>
					{achievements
						.filter(
							achievement => !unlockedAchievementIds.includes(achievement.id),
						)
						.map(achievement => (
							<AchievementCard
								key={achievement.id}
								achievement={achievement}
								unlocked={false}
							/>
						))}
				</div>
			</section>
		</main>
	)
}
