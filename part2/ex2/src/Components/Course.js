const Header = ({text}) => (
    <h2>{text}</h2>
)

const CoursePart = ({name, exercises}) => {
    return (
        <tr>
        <td>{name}</td><td>{exercises}</td>
        </tr>
    )
}

const Course = ({course}) => {
    const totalExercises = course.parts.reduce( (total, part) => (total += part.exercises), 0)
    return (
        <div>
            <Header key={course.name} text={course.name} />
            <table>
                <tbody>
                { course.parts.map( part =>
                    <CoursePart key={part.name} name={part.name} exercises={part.exercises} />        
                )}
                </tbody>
            </table>
            <b>Total exercises: {totalExercises}</b>
        </div>
    )
}

export default Course