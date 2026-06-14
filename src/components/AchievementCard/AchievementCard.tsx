import type { Achievement } from '../../types/study'
import styles from './AchievementCard.module.css'

interface AchievementCardProps {
	achievement: Achievement
	unlocked: boolean
}

export function AchievementCard({
	achievement,
	unlocked,
}: AchievementCardProps) {
	return (
		<article className={styles.card}>
			<div className={styles.icon} aria-hidden='true'>
				{unlocked ? '★' : '○'}
			</div>

			<div>
				<h3 className={styles.title}>{achievement.title}</h3>
				<p className={styles.description}>
					{unlocked ? achievement.rewardText : achievement.condition}
				</p>
				<p className={styles.status}>
					Статус: {unlocked ? 'получено' : 'ещё не получено'}
				</p>
			</div>
		</article>
	)
}
