import { useEffect, useState } from 'react';
import { getAllStudents, getStudent, updateStudent, deleteStudent } from '../api/userAPI';
import { getAdminClasses } from '../api/userAPI';
import { register } from '../api/authAPI';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '', gender: '' });
  const [editId, setEditId] = useState(null);
  const { token } = useAuth();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents(search, classFilter, genderFilter);
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to fetch students');
      console.error('Fetch students error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, [search, classFilter, genderFilter]);
  useEffect(() => {
    getAdminClasses().then(setClassOptions);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await register(form, token);
      toast.success('Student added');
      setShowAdd(false);
      setForm({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '', gender: '' });
      fetchStudents();
    } catch {
      toast.error('Failed to add student');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editId, form);
      toast.success('Student updated');
      setShowEdit(false);
      setForm({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '', gender: '' });
      setEditId(null);
      fetchStudents();
    } catch {
      toast.error('Failed to update student');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      toast.success('Student deleted');
      fetchStudents();
    } catch {
      toast.error('Failed to delete student');
    }
  };

  const openEdit = async (id) => {
    try {
      const res = await getStudent(id);
      setEditId(id);
      setForm({ ...res.data, password: '' });
      setShowEdit(true);
    } catch {
      toast.error('Failed to load student');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-8">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-4 sm:mb-6">Student Management</h1>
        <div className="mb-4 flex flex-col md:flex-row gap-2 sm:gap-4 md:items-center">
          <input
            type="text"
            placeholder="Search students by name, email, class, or roll no..."
            className="w-full md:w-1/2 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-1/6 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            value={classFilter}
            onChange={e => setClassFilter(e.target.value)}
          >
            <option value="">All Classes</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <select
            className="w-full md:w-1/6 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition w-full md:w-auto text-sm sm:text-base"
            onClick={() => { setShowAdd(true); setForm({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '', gender: '' }); }}
          >
            Add Student
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Name</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Email</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Class</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Roll No</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Gender</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4">No students found.</td></tr>
              ) : students.map(student => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.class}</td>
                  <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                  <td className="py-2 px-4 border-b">{student.gender}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-indigo-600 hover:underline mr-2" onClick={() => openEdit(student._id)}>Edit</button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(student._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Student Modal */}
      {showAdd && (
        <Modal title="Add Student" onClose={() => setShowAdd(false)}>
          <form onSubmit={handleAdd} className="space-y-4">
            <Input label="Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
            <Input label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
            <Input label="Class" value={form.class} onChange={v => setForm(f => ({ ...f, class: v }))} required />
            <Input label="Roll No" value={form.rollNumber} onChange={v => setForm(f => ({ ...f, rollNumber: v }))} required />
            <Input label="Password" type="password" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} required />
            <Input label="Gender" type="select" value={form.gender} onChange={v => setForm(f => ({ ...f, gender: v }))} required options={[{label:'Select Gender',value:''},{label:'Male',value:'male'},{label:'Female',value:'female'},{label:'Other',value:'other'}]} />
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold">Add</button>
            </div>
          </form>
        </Modal>
      )}
      {/* Edit Student Modal */}
      {showEdit && (
        <Modal title="Edit Student" onClose={() => setShowEdit(false)}>
          <form onSubmit={handleEdit} className="space-y-4">
            <Input label="Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
            <Input label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
            <Input label="Class" value={form.class} onChange={v => setForm(f => ({ ...f, class: v }))} required />
            <Input label="Roll No" value={form.rollNumber} onChange={v => setForm(f => ({ ...f, rollNumber: v }))} required />
            <Input label="Password (leave blank to keep)" type="password" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} />
            <Input label="Gender" type="select" value={form.gender} onChange={v => setForm(f => ({ ...f, gender: v }))} required options={[{label:'Select Gender',value:''},{label:'Male',value:'male'},{label:'Female',value:'female'},{label:'Other',value:'other'}]} />
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowEdit(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', required, options }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      {type === 'select' ? (
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
        >
          {options && options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  );
} 