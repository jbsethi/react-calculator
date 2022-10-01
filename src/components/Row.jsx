export const ROW_OPERATIONS = {
  ADD: '+',
  MINUS: '-'
}

export const DEFAULT_ROW_CONFIG = {
  value: '',
  disabled: false,
  operation: ROW_OPERATIONS.ADD
}

const Row = ({
  value,
  operation,
  disabled,
  updateValue,
  updateOperation,
  updateDisability,
  removeRow
}) => {
  const disability = disabled ? 'Enable' : 'Disable'

  return (
    <li>
      <select value={operation} onChange={updateOperation} >
        {
          Object.values(ROW_OPERATIONS)
            .map(op => {
              return (
                <option key={op} value={op}>{op}</option>
              )
            })
        }
      </select>
      <input disabled={disabled} type="text" value={value} onChange={updateValue} />
      <button onClick={removeRow}>Delete</button>
      <button onClick={()=> updateDisability(!disabled)}>{disability}</button>
    </li>
  )
}

export default Row;
