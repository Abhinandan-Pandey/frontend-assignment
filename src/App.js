import React, { useEffect, useState } from 'react';

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

const App = () => {
  const columns = [{name:'S.No.',key:'s.no'}, {name:'Percentage funded',key:'percentage.funded'}, {name:'Amount pledged',key:'amt.pledged'}];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;  

  return (
    <div>
      <h1 style={{padding:'20px'}}>Table in React</h1>
      <Table columns={columns} data={paginatedData} />
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
