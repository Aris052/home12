import { useCallback, useMemo, useState } from 'react'
import './App.css'
import Child1 from './child1'
import Child2 from './child2'
import Child3 from './child3'
import Child4 from './child4'

function App() {
  const [num, setNum] = useState(10)
  const [count, setCount] = useState(0)
  const form = useMemo(() => count + 1, [count])
  const countUp = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <>
      <h2>count {num}</h2>
      <button onClick={() => setNum(num + 1)}>click</button>
      <Child1 />
      <Child2 />
      <Child3 />
      <Child4 />
    </>
  )
}

export default App
