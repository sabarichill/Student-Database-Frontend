import React, { useState, useEffect } from "react";

// Default empty student
const emptyStudent = {
  name: "",
  email: "",
  age: "",
  department: "",
  course: "",
  phone: "",
  address: "",
  cgpa: "",
  yop: "",
};

function StudentForm({ student, onSave, onCancel }) {
  const [form, setForm] = useState(emptyStudent);
  const [errors, setErrors] = useState({});

  // If editing, fill the form with student data
  useEffect(() => {
    if (student) setForm(student);
    else setForm(emptyStudent);
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
  const errs = {};

  // Name
  if (!form.name.trim()) errs.name = "Name is required";

  // Email
  if (!form.email.trim()) errs.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";

  // Phone - max 10 digits
  if (form.phone && form.phone.length > 10) 
    errs.phone = "Phone max 10 digits";

  // YOP - must be 4 digit year
  if (form.yop && (form.yop < 1000 || form.yop > 9999)) 
    errs.yop = "YOP must be 4 digits (e.g. 2025)";

  // CGPA
  if (form.cgpa && (form.cgpa < 0 || form.cgpa > 10)) 
    errs.cgpa = "CGPA must be 0-10";

  return errs;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave(form);
  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <h2>{student ? "✏️ Edit Student" : "➕ Add New Student"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="field">
              <label>Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
              />
            </div>
            <div className="field">
              <label>Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="field">
              <label>Course</label>
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech"
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
            <div className="field">
              <label>CGPA (0-10)</label>
              <input
                name="cgpa"
                type="number"
                step="0.1"
                value={form.cgpa}
                onChange={handleChange}
                placeholder="e.g. 8.5"
              />
              {errors.cgpa && <span className="error">{errors.cgpa}</span>}
            </div>
            <div className="field">
  <label>YOP (Year of Passing)</label>
  <input 
    name="yop" 
    type="number" 
    value={form.yop} 
    onChange={handleChange} 
    placeholder="e.g. 2025"
    maxLength="4"
    min="1000"
    max="9999"
  />
</div>
            </div>
            <div className="field full-width">
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="City / Address"
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              {student ? "Update" : "Add Student"}
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
