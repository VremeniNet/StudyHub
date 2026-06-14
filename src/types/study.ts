export type SubjectId = 'ui-ux' | 'web-development' | 'databases'

export type TopicId =
	| 'user-scenarios'
	| 'technical-requirements'
	| 'accessibility'
	| 'wireframes'
	| 'prototype'
	| 'react-components'
	| 'typescript-basics'
	| 'routing'
	| 'sql-basics'
	| 'normalization'
	| 'queries'

export type AchievementId =
	| 'first-topic'
	| 'half-way'
	| 'exam-ready'
	| 'accessibility-minded'
	| 'stable-start'

export interface StudyTopic {
	id: TopicId
	title: string
	description: string
	durationMinutes: number
	material: string
	checklist: string[]
}

export interface StudySubject {
	id: SubjectId
	title: string
	shortTitle: string
	description: string
	examDate: string
	accentLabel: string
	topics: StudyTopic[]
}

export interface Achievement {
	id: AchievementId
	title: string
	description: string
	condition: string
	rewardText: string
}
