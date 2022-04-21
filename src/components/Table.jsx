import React, {useState} from 'react';
import { Button, Table, TableHead, TableRow, TableBody, TableContainer, TableCell } from "@material-ui/core"

const CustomTable =({
  columns,
  rows,
  format = (_, value) => value,
  perPage = 25,
}) => {
  const [page, setPage] = useState(0)

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1)
  }

  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1)
  }

  const start = page * perPage;

  const headerCells = columns.map((col) => {
    return <TableCell key={col.name}>{col.name}</TableCell>;
  });

  const bodyRows = rows.slice(start, start + perPage).map((row) => {
    const rows = columns.map((col) => {
      const value = row[col.property]
      return <TableCell key={col.property + value}>{format(col.property, value)}</TableCell>
    });
    return <TableRow key={Object.values(row).join(":")}>{rows}</TableRow>
  });

  return (
    <div>
      <div>
        <p>Showing {start + 1} - {start + bodyRows.length} of {rows.length} routes</p>
      </div>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>{bodyRows}</TableBody>
      </Table>
      <Button onClick={previousPage} disabled={page === 0} >Previous Page</Button>
      <Button onClick={nextPage} disabled={start + perPage >= rows.length} >Next Page</Button>
    </TableContainer>
    </div>
  )
}

export default CustomTable;