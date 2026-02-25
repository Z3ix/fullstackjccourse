import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function addGoodHandler() {
    //console.log('adding good feedback');
    setGood(good+1);
  }

  function addNeutralHandler() {
    setNeutral(neutral+1);
  }

  function addBadHandler() {
    setBad(bad+1);
  }

  return (
    <div>
      <Header/>
      <div>
        <Button onClick={addGoodHandler} text ='good'/>
        <Button onClick={addNeutralHandler} text ='neutral'/>
        <Button onClick={addBadHandler} text ='bad'/>
      </div>
      <Stats clicks = {{good: good, neutral: neutral,bad: bad}}/>
    </div>
  )
}

const Header = () => {
  return (
    <h2>give us feedback</h2>
  )

}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
    <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Stats = (props) => {
  let total = props.clicks.good + props.clicks.neutral + props.clicks.bad;
  if (total > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
        <tbody>
        <StatisticLine text="good" value = {props.clicks.good} />
        <StatisticLine text="neutral" value = {props.clicks.neutral} />
        <StatisticLine text="bad" value = {props.clicks.bad} />
        <StatisticLine text="total feedback" value = {total} />
        <StatisticLine text="avarage" value = {(props.clicks.good-props.clicks.bad)/total || 0} />
        <StatisticLine text="positive" value = {(props.clicks.good/total*100 || 0)+"%"}  />
        </tbody>
        </table>
      </div>
    )  
  } else { 
    return ( //
      <div>
        <h2>statistics</h2>
        <br /> no feedback yet
      </div>
    )
  }
}
export default App