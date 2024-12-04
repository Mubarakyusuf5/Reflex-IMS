import React, { useState } from 'react';

export const DateRangeFilter = () => {
  // Sample data to filter
  const data = [
    { id: 1, name: 'Item 1', date: '2024-10-01' },
    { id: 2, name: 'Item 2', date: '2024-10-15' },
    { id: 3, name: 'Item 3', date: '2024-10-20' },
    { id: 4, name: 'Item 4', date: '2024-10-25' },
    { id: 5, name: 'Item 5', date: '2024-10-30' },
  ];

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = () => {
    const filtered = data.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Date Range Filter</h2>
      <div>
        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};




