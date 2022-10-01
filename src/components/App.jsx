import { useState } from "react";
import Row, { ROW_OPERATIONS, DEFAULT_ROW_CONFIG } from "./Row";

const App = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows((oldRows) => {
      return [...oldRows, { ...DEFAULT_ROW_CONFIG }]
    })
  }

  const removeRow = (idx) => {
    setRows((oldRows) => {
      return oldRows.filter((_, index) => index !== idx)
    })
  }

  const updateHandler = (idx, key, value) => {
    setRows((oldRows) => {
      return oldRows.map((row, index) => {
        if (index === idx) {
          return {
            ...row,
            [key]: value
          }
        }

        return row
      })
    })
  }

  const listItems = rows.map((row, index) => {
    return (
      <Row
        key={index}
        updateValue={(e) => updateHandler(index, 'value', e.target.value)}
        updateOperation={(e) => updateHandler(index, 'operation', e.target.value)}
        updateDisability={(value) => updateHandler(index, 'disabled', value)}
        removeRow={() => removeRow(index)}
        {...row}
      />
    )
  })

  const total = rows
    .filter(row => !row.disabled)
    .reduce((acc, row) => {
      if (row.operation === ROW_OPERATIONS.ADD) {
        acc += Number(row.value)
      } else {
        acc -= Number(row.value)
      }

      return acc
    }, 0)

  return (
    <div className="wrapper">
      <h1>Calculator</h1>
      <div>
        <button onClick={addRow}>Add row</button>
      </div>
      <ul>
        { listItems }
      </ul>
      <div>
        Result: {total}
      </div>
    </div>
  )
}

export default App;
