import { useState } from 'react'
import Header from './components/header'
import Button from './components/button'
import Statistics from './components/statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header />
        <Button onClick={()=>setGood(good+1)} name="Good"/>
        <Button onClick={()=>setNeutral(neutral+1)} name="Neutral"/>
        <Button onClick={()=>setBad(bad+1)} name="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App