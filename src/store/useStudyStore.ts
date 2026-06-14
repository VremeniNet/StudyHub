import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUnlockedAchievements } from '../utils/progress'

interface AccessibilitySettings {
	highContrast: boolean
	largeText: boolean
	reduceMotion: boolean
}

interface StudyState {
	completedTopicIds: string[]
	lastLiveMessage: string
	accessibility: AccessibilitySettings

	completeTopic: (topicId: string, topicTitle: string) => void
	resetProgress: () => void
	setHighContrast: (value: boolean) => void
	setLargeText: (value: boolean) => void
	setReduceMotion: (value: boolean) => void
	setLiveMessage: (message: string) => void
}

const initialAccessibilitySettings: AccessibilitySettings = {
	highContrast: false,
	largeText: false,
	reduceMotion: false,
}

export const useStudyStore = create<StudyState>()(
	persist(
		(set, get) => ({
			completedTopicIds: [],
			lastLiveMessage: '',
			accessibility: initialAccessibilitySettings,

			completeTopic: (topicId, topicTitle) => {
				const currentCompletedTopicIds = get().completedTopicIds

				if (currentCompletedTopicIds.includes(topicId)) {
					set({
						lastLiveMessage: `Тема “${topicTitle}” уже отмечена как изученная.`,
					})
					return
				}

				const nextCompletedTopicIds = [...currentCompletedTopicIds, topicId]
				const unlockedAchievements = getUnlockedAchievements(
					nextCompletedTopicIds,
				)

				set({
					completedTopicIds: nextCompletedTopicIds,
					lastLiveMessage: `Тема “${topicTitle}” отмечена как изученная. Открыто достижений: ${unlockedAchievements.length}.`,
				})
			},

			resetProgress: () => {
				set({
					completedTopicIds: [],
					lastLiveMessage: 'Прогресс подготовки сброшен.',
				})
			},

			setHighContrast: value => {
				set(state => ({
					accessibility: {
						...state.accessibility,
						highContrast: value,
					},
					lastLiveMessage: value
						? 'Режим высокого контраста включён.'
						: 'Режим высокого контраста выключен.',
				}))
			},

			setLargeText: value => {
				set(state => ({
					accessibility: {
						...state.accessibility,
						largeText: value,
					},
					lastLiveMessage: value
						? 'Режим крупного текста включён.'
						: 'Режим крупного текста выключен.',
				}))
			},

			setReduceMotion: value => {
				set(state => ({
					accessibility: {
						...state.accessibility,
						reduceMotion: value,
					},
					lastLiveMessage: value
						? 'Уменьшение анимаций включено.'
						: 'Уменьшение анимаций выключено.',
				}))
			},

			setLiveMessage: message => {
				set({
					lastLiveMessage: message,
				})
			},
		}),
		{
			name: 'studyhub-progress',
			partialize: state => ({
				completedTopicIds: state.completedTopicIds,
				accessibility: state.accessibility,
			}),
		},
	),
)
