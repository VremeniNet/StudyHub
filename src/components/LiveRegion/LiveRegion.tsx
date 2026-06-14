import { useStudyStore } from '../../store/useStudyStore'

export function LiveRegion() {
	const message = useStudyStore(state => state.lastLiveMessage)

	return (
		<div className='visually-hidden' aria-live='polite' aria-atomic='true'>
			{message}
		</div>
	)
}
