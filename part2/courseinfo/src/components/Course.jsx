const Header = (props) => {
return <h2>{props.course}</h2>}

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part part = {part} key = {part.id}/>
    )}
    <Total parts = {parts} />
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) =>   <p><b>Number of exercises {parts.reduce((total,part)=>total+part.exercises,0)}</b></p>





const Course = (props) => {
  return(
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

export default Course