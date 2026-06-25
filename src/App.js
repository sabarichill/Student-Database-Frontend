import React, { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import SearchBar from "./components/SearchBar";
import api from "./services/api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [departments, setDepartments] = useState([]);
  const [filterDept, setFilterDept] = useState("");

  // Load students on start
  useEffect(() => {
    loadStudents();
    loadDepartments();
    loadCount();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await api.getAll();
      setStudents(res.data);
    } catch (err) {
      showMessage("❌ Failed to load students", "error");
    }
    setLoading(false);
  };

  const loadCount = async () => {
    const res = await api.getCount();
    setTotalCount(res.data);
  };

  const loadDepartments = async () => {
    const res = await api.getDepartments();
    setDepartments(res.data);
  };

  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSave = async (student) => {
    try {
      if (editStudent) {
        await api.update(editStudent.id, student);
        showMessage("✅ Student updated!");
      } else {
        await api.create(student);
        showMessage("✅ Student added!");
      }
      setShowForm(false);
      setEditStudent(null);
      loadStudents();
      loadCount();
      loadDepartments();
    } catch (err) {
      showMessage("❌ Error saving student", "error");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"?`)) return;
    try {
      await api.delete(id);
      showMessage(`✅ ${name} deleted!`);
      loadStudents();
      loadCount();
    } catch (err) {
      showMessage("❌ Error deleting student", "error");
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadStudents();
      return;
    }
    const res = await api.search(keyword);
    setStudents(res.data);
  };

  const handleSort = async (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);
    const res = await api.sort(field, newOrder);
    setStudents(res.data);
  };

  const handleFilter = async (dept) => {
    setFilterDept(dept);
    if (!dept) {
      loadStudents();
      return;
    }
    const res = await api.filterByDept(dept);
    setStudents(res.data);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 Student Database Management System</h1>
        <p>
          Total Students: <strong>{totalCount}</strong>
        </p>
      </header>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="controls">
        <SearchBar onSearch={handleSearch} />

        <div className="filter-sort">
          <select
            value={filterDept}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setEditStudent(null);
              setShowForm(true);
            }}
            className="btn-add"
          >
            + Add Student
          </button>
        </div>
      </div>

      {showForm && (
        <StudentForm
          student={editStudent}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditStudent(null);
          }}
        />
      )}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
}

export default App;
