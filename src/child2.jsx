import { useFetch } from './useFetch'

function Child2() {
	const { loading, result, error, refetch } = useFetch("https://fakestoreapi.com/products")

	return (
		<>
			<h1>Child 2</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{result && <p>{result.length}</p>}
			<button onClick={refetch}>Refetch Data</button>
		</>
	)
}

export default Child2;


