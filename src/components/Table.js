const getText = (cell,row)=>{
  switch(cell.key) {
   case 'amt.pledged':
     return `$ ${row[cell.key]}`
   case 'percentage.funded':
     return `${row[cell.key]} %`;
   default:
     return row[cell.key]
  }
}

const Table = ({ columns, data }) => {
  return (
    <table border="1" style={{margin:'20px', width: '95%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={{ padding: '8px', textAlign: 'left' }}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ padding: '8px' }}>
                {getText(cell,row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;