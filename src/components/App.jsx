import { useState } from "react";
import Row, { ROW_OPERATIONS, DEFAULT_ROW_CONFIG } from "./Row";

const App = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows((oldRows) => {
      return [...oldRows, {
        id: new Date().valueOf(),
        ...DEFAULT_ROW_CONFIG
      }]
    })
  }

  const removeRow = (id) => {
    setRows((oldRows) => {
      return oldRows.filter((row) => row.id !== id)
    })
  }

  const updateHandler = (id, key, value) => {
    setRows((oldRows) => {
      return oldRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [key]: value
          }
        }

        return row
      })
    })
  }

  const listItems = rows.map((row) => {
    return (
      <Row
        key={row.id}
        updateValue={(e) => updateHandler(row.id, 'value', e.target.value)}
        updateOperation={(e) => updateHandler(row.id, 'operation', e.target.value)}
        updateDisability={(value) => updateHandler(row.id, 'disabled', value)}
        removeRow={() => removeRow(row.id)}
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
