import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Layout.module.css'

const navItems = [
	{
		to: '/',
		label: 'Главная',
		end: true,
	},
	{
		to: '/subjects/ui-ux',
		label: 'Подготовка',
	},
	{
		to: '/achievements',
		label: 'Достижения',
	},
	{
		to: '/settings',
		label: 'Доступность',
	},
]

export function Layout() {
	return (
		<div className={styles.app}>
			<a className='skip-link' href='#main-content'>
				Перейти к основному содержимому
			</a>

			<header className={styles.header}>
				<div className={clsx('page-shell', styles.headerInner)}>
					<NavLink
						className={styles.logo}
						to='/'
						aria-label='StudyHub, перейти на главную'
					>
						<span className={styles.logoMark} aria-hidden='true'>
							S
						</span>
						<span>StudyHub</span>
					</NavLink>

					<nav className={styles.navigation} aria-label='Основная навигация'>
						{navItems.map(item => (
							<NavLink
								key={item.to}
								to={item.to}
								end={item.end}
								className={({ isActive }) =>
									clsx(styles.navLink, isActive && styles.navLinkActive)
								}
							>
								{item.label}
							</NavLink>
						))}
					</nav>
				</div>
			</header>

			<Outlet />
		</div>
	)
}
