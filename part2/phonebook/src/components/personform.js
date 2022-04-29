const PersonForm = ({submitHandler, nameHandler, numberHandler, newName, newNumber}) => {
    return (
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
          <br />
          number: <input value={newNumber} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm