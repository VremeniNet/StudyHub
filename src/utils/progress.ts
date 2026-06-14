import { achievements } from '../data/achievements'
import { subjects } from '../data/subjects'
import type { Achievement, StudySubject } from '../types/study'

export function getCompletedTopicsCount(completedTopicIds: string[]) {
	return completedTopicIds.length
}

export function getSubjectProgress(
	subject: StudySubject,
	completedTopicIds: string[],
) {
	if (subject.topics.length === 0) {
		return 0
	}

	const completedCount = subject.topics.filter(topic =>
		completedTopicIds.includes(topic.id),
	).length

	return Math.round((completedCount / subject.topics.length) * 100)
}

export function getTotalProgress(completedTopicIds: string[]) {
	const allTopics = subjects.flatMap(subject => subject.topics)

	if (allTopics.length === 0) {
		return 0
	}

	const completedCount = allTopics.filter(topic =>
		completedTopicIds.includes(topic.id),
	).length

	return Math.round((completedCount / allTopics.length) * 100)
}

export function getUnlockedAchievements(
	completedTopicIds: string[],
): Achievement[] {
	const completedCount = getCompletedTopicsCount(completedTopicIds)

	const hasAnySubjectHalfCompleted = subjects.some(
		subject => getSubjectProgress(subject, completedTopicIds) >= 50,
	)

	const hasAnySubjectCompleted = subjects.some(
		subject => getSubjectProgress(subject, completedTopicIds) === 100,
	)

	const hasCompletedAccessibilityTopic =
		completedTopicIds.includes('accessibility')

	return achievements.filter(achievement => {
		switch (achievement.id) {
			case 'first-topic':
				return completedCount >= 1

			case 'half-way':
				return hasAnySubjectHalfCompleted

			case 'exam-ready':
				return hasAnySubjectCompleted

			case 'accessibility-minded':
				return hasCompletedAccessibilityTopic

			case 'stable-start':
				return completedCount >= 3

			default:
				return false
		}
	})
}
