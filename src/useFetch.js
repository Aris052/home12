import { useCallback, useEffect, useState } from 'react'

let lastRequestTime = 0

export const useFetch = (url, cacheTime = 5000, cooldownTime = 10000) => {
	const [result, setResult] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [lastFetch, setLastFetch] = useState(0)

	const fetchData = useCallback(() => {
		const now = Date.now()
		if (now - lastRequestTime < cooldownTime) {
			console.log("Request is on cooldown. Please wait.")
			return
		}

		setLoading(true)
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => {
				setResult(data)
				setLastFetch(now)
				lastRequestTime = now
				setError(null)
			})
			.catch(err => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [url])

	useEffect(() => {
		const now = Date.now()
		if (now - lastFetch > cacheTime) {
			fetchData()
		} else {
			setLoading(false)
		}
	}, [fetchData, lastFetch, cacheTime])

	const refetch = () => {
		const now = Date.now()
		if (now - lastFetch > cacheTime) {
			fetchData()
		} else {
			console.log("Data is still cached. Please wait for a while.")
		}
	}

	return { result, error, loading, refetch }
};

