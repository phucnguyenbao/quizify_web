import React, { useState } from 'react';

const ReportTable = ({
  searchReport, setSearchReport,
  filterCreateDate, setFilterCreateDate,
  searchUser, setSearchUser,
  searchBan, setSearchBan,
  searchTeam, setSearchTeam,
  filterReplyDate, setFilterReplyDate,
  resetFilters,
  filteredReports,
  handleSendReply,
  handleStatusChange,
  searchReportId, setSearchReportId,
  searchReceiver, setSearchReceiver,
  searchReplyContent, setSearchReplyContent,
  searchStatus, setSearchStatus,
  currentMemberId
}) => {
  const [replyInputs, setReplyInputs] = useState({});

  const handleInputChange = (id, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSend = (report) => {
    const replyContent = replyInputs[report.Report_id]?.trim();
    if (!replyContent) return;

    const now = new Date();
    handleSendReply(report.Report_id, replyContent, now);

    setReplyInputs((prev) => ({
      ...prev,
      [report.Report_id]: '',
    }));
  };

  const safeDateDisplay = (ts) => {
    try {
      return ts?.toDate?.().toLocaleString?.() || 'N/A';
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="section">
      <h3>Report Management</h3>

      <div className="filter-group">
        <input
          placeholder="Report ID"
          value={searchReportId}
          onChange={(e) => setSearchReportId(e.target.value)}
        />
        <input
          type="date"
          value={filterCreateDate}
          onChange={(e) => setFilterCreateDate(e.target.value)}
        />
        <input
          placeholder="Sender ID"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <input
          placeholder="Receiver ID"
          value={searchReceiver}
          onChange={(e) => setSearchReceiver(e.target.value)}
        />
        <input
          placeholder="Department"
          value={searchBan}
          onChange={(e) => setSearchBan(e.target.value)}
        />
        <input
          placeholder="Team"
          value={searchTeam}
          onChange={(e) => setSearchTeam(e.target.value)}
        />
        <input
          placeholder="Search report content"
          value={searchReport}
          onChange={(e) => setSearchReport(e.target.value)}
        />
        <input
          placeholder="Status"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        />
        <input
          type="date"
          value={filterReplyDate}
          onChange={(e) => setFilterReplyDate(e.target.value)}
        />
        <input
          placeholder="Search reply content"
          value={searchReplyContent}
          onChange={(e) => setSearchReplyContent(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>
        <button onClick={resetFilters}>Reset</button>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Create Date</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Department</th>
            <th>Team</th>
            <th>Report Content</th>
            <th>Status</th>
            <th>Reply Date</th>
            <th>Reply Content</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>
                No reports found.
              </td>
            </tr>
          ) : (
            filteredReports.map((r, idx) => {
              const hasReply = !!r.Reply_content;
              return (
                <tr key={idx} className={r.Sender_id === currentMemberId ? 'highlight-row' : ''}>

                  <td>{r.Report_id}</td>
                  <td>{safeDateDisplay(r.Creation_date)}</td>
                  <td>{r.Sender_id}</td>
                  <td>{r.Receiver_id}</td>
                  <td>{r.Department}</td>
                  <td>{r.Team}</td>
                  <td>{r.Report_content}</td>
                  <td>
                    <select
                      value={r.Status}
                      onChange={(e) => handleStatusChange(r.Report_id, e.target.value)}
                    >
                      <option value="has been processed">has been processed</option>
                      <option value="not read">not read</option>
                      <option value="processing">processing</option>
                    </select>
                  </td>
                  <td>{hasReply ? safeDateDisplay(r.Response_date) : ''}</td>
                 <td>
  {r.Sender_id === currentMemberId ? (
    // Người gửi chỉ được xem reply nếu có
    <span>{r.Reply_content || 'Chưa có phản hồi'}</span>
  ) : hasReply ? (
    // Người nhận đã phản hồi → chỉ xem
    <span>{r.Reply_content}</span>
  ) : (
    // Người nhận chưa phản hồi → cho nhập và gửi
    <div className="reply-input-group">
      <input
        type="text"
        value={replyInputs[r.Report_id] || ''}
        onChange={(e) =>
          handleInputChange(r.Report_id, e.target.value)
        }
        placeholder="Enter reply..."
      />
      <button
        onClick={() => handleSend(r)}
        disabled={!replyInputs[r.Report_id]?.trim()}
      >
        Send
      </button>
    </div>
  )}
</td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
