const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14},
  ]
  

  return (
    <div>
      <Header title={course}/>
      <Content part={parts}/>
      <Total part={parts}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.title}</h1>
  )
}

const Content = (props) => {
  return(
   <div>
    <Part part={props.part[0]} />
    <Part part={props.part[1]} />
    <Part part={props.part[2]} />
   </div>
  )
}

const Part = (props) =>{
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p>
  )
  
}

export default App