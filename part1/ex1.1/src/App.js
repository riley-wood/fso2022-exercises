const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = ({part, exercises}) => {
  return (
    <>
      <p>
        {part}: {exercises} exercises
      </p>
    </>
  )
}
const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => {
        return (<Part key={part.name} part={part.name} exercises={part.exercises} />)
      })}
    </>
  )
}

const Total = ({parts}) => {
  let totalExercises = 0 
  parts.forEach(part => {
    totalExercises += part.exercises    
  })
  return (
    <>
      <p>Total number of exercises: {totalExercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
