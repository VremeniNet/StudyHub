import { RouterProvider } from 'react-router-dom'
import { AppEffects } from './app/AppEffects'
import { router } from './app/router'
import { LiveRegion } from './components/LiveRegion/LiveRegion'

function App() {
	return (
		<>
			<AppEffects />
			<LiveRegion />
			<RouterProvider router={router} />
		</>
	)
}

export default App
