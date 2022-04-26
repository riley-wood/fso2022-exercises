import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)
const StatisticsLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const percentPositive = (good / all) * 100

  if (all === 0) return ( <p>No feedback has been given yet.</p> )

  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Total Feedback" value={all} />
        <StatisticsLine text="Average Feedback" value={average} />
        <StatisticsLine text="Percent Positive" value={percentPositive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give Us Your Feedback" />
      <Button clickHandler={() => setGood(good + 1)} text="Good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="Bad" />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
