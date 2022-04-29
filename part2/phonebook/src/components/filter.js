const Filter = ({value, filterHandler}) => {
    return (
        <input value={value} onChange={filterHandler} />
    )
}

export default Filter