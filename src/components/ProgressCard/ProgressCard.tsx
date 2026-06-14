import * as Progress from '@radix-ui/react-progress'
import styles from './ProgressCard.module.css'

interface ProgressCardProps {
	label: string
	value: number
	description?: string
}

export function ProgressCard({ label, value, description }: ProgressCardProps) {
	return (
		<section className={styles.card} aria-labelledby='progress-title'>
			<div className={styles.header}>
				<div>
					<h2 id='progress-title' className={styles.title}>
						{label}
					</h2>
					{description ? (
						<p className={styles.description}>{description}</p>
					) : null}
				</div>

				<strong className={styles.value}>{value}%</strong>
			</div>

			<Progress.Root
				className={styles.progressRoot}
				value={value}
				max={100}
				aria-label={`${label}: ${value}%`}
			>
				<Progress.Indicator
					className={styles.progressIndicator}
					style={{ transform: `translateX(-${100 - value}%)` }}
				/>
			</Progress.Root>

			<p className='visually-hidden'>
				{label}: выполнено {value}%.
			</p>
		</section>
	)
}
