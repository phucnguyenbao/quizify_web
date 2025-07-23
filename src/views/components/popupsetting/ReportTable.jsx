// src/components/ReportTable.jsx

import React from 'react';

const ReportTable = ({
  searchReport, setSearchReport, filterCreateDate, setFilterCreateDate,
  searchUser, setSearchUser, searchBan, setSearchBan, searchTeam, setSearchTeam,
  filterReplyDate, setFilterReplyDate, resetFilters, filteredReports
}) => {
  return (
    <div className="section">
      <h3>Report Management</h3>
      <div className="filter-group">
        <input placeholder="Search report name" value={searchReport} onChange={(e) => setSearchReport(e.target.value)} />
        <select>
          <option>Filter by Status</option>
          <option>Processed</option>
          <option>Unread</option>
          <option>Processing</option>
        </select>
        <input type="date" value={filterCreateDate} onChange={(e) => setFilterCreateDate(e.target.value)} />
        <input placeholder="Creator" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
        <input placeholder="Department" value={searchBan} onChange={(e) => setSearchBan(e.target.value)} />
        <input placeholder="Team" value={searchTeam} onChange={(e) => setSearchTeam(e.target.value)} />
        <input type="date" value={filterReplyDate} onChange={(e) => setFilterReplyDate(e.target.value)} />
        <button onClick={() => {}}>Search</button>
        <button onClick={resetFilters}>Reset</button>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Report</th><th>Status</th><th>Create Date</th><th>Creator</th>
            <th>Department</th><th>Team</th><th>Reply Date</th><th>Reply Content</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>
                <select defaultValue={r.status}>
                  <option>Processed</option>
                  <option>Unread</option>
                  <option>Processing</option>
                </select>
              </td>
              <td>{r.date}</td>
              <td>{r.user}</td>
              <td>{r.ban}</td>
              <td>{r.team}</td>
              <td>{r.replyDate}</td>
              <td>
                <div className="reply-input-group">
                  <input type="text" placeholder="Enter reply..." />
                  <button>Send</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
