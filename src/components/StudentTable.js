import React from "react";

function StudentTable({
  students,
  onEdit,
  onDelete,
  onSort,
  sortBy,
  sortOrder,
}) {
  const arrow = (field) => {
    if (sortBy !== field) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  if (students.length === 0) {
    return <p className="no-data">📭 No students found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => onSort("name")} className="sortable">
              Name {arrow("name")}
            </th>
            <th>Email</th>
            <th onClick={() => onSort("age")} className="sortable">
              Age {arrow("age")}
            </th>
            <th onClick={() => onSort("department")} className="sortable">
              Department {arrow("department")}
            </th>
            <th>Course</th>
            <th onClick={() => onSort("cgpa")} className="sortable">
              CGPA {arrow("cgpa")}
            </th>
            <th onClick={() => onSort('yop')} className="sortable">
              YOP {arrow('yop')}</th>
            </th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>
                <strong>{s.name}</strong>
              </td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <span className="badge">{s.department}</span>
              </td>
              <td>{s.course}</td>
              <td>
                <span
                  className={`cgpa ${s.cgpa >= 8 ? "high" : s.cgpa >= 6 ? "mid" : "low"}`}
                >
                  {s.cgpa}
                </span>
              </td>
              <td>{s.yop}</td>
              <td>{s.phone}</td>
              <td>
                <button onClick={() => onEdit(s)} className="btn-edit">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(s.id, s.name)}
                  className="btn-delete"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
