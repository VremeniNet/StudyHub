import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import { AchievementsPage } from '../pages/AchievementsPage/AchievementsPage'
import { DashboardPage } from '../pages/DashboardPage/DashboardPage'
import { SettingsPage } from '../pages/SettingsPage/SettingsPage'
import { SubjectPage } from '../pages/SubjectPage/SubjectPage'
import { TopicPage } from '../pages/TopicPage/TopicPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: 'subjects/:subjectId',
				element: <SubjectPage />,
			},
			{
				path: 'subjects/:subjectId/topics/:topicId',
				element: <TopicPage />,
			},
			{
				path: 'achievements',
				element: <AchievementsPage />,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
])
