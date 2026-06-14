import { Link } from 'react-router-dom'
import type { StudySubject } from '../../types/study'
import styles from './SubjectCard.module.css'

interface SubjectCardProps {
	subject: StudySubject
	progress: number
	completedTopicsCount: number
}

export function SubjectCard({
	subject,
	progress,
	completedTopicsCount,
}: SubjectCardProps) {
	const totalTopicsCount = subject.topics.length

	return (
		<article className={styles.card}>
			<div className={styles.topRow}>
				<span className='status-pill status-pill--primary'>
					{subject.accentLabel}
				</span>
				<span className={styles.shortTitle} aria-hidden='true'>
					{subject.shortTitle}
				</span>
			</div>

			<h3 className={styles.title}>
				<Link className={styles.link} to={`/subjects/${subject.id}`}>
					{subject.title}
				</Link>
			</h3>

			<p className={styles.description}>{subject.description}</p>

			<div className={styles.meta} aria-label='Статистика подготовки'>
				<span>
					Темы: {completedTopicsCount} из {totalTopicsCount}
				</span>
				<span>Прогресс: {progress}%</span>
			</div>

			<div className={styles.progressTrack} aria-hidden='true'>
				<span
					className={styles.progressBar}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</article>
	)
}
