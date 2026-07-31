// src/pages/admin/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  DocumentIcon, 
  PresentationChartBarIcon, 
  TrashIcon, 
  PlusIcon,
  PencilIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import api from '../../services/api';

const CourseDetail = ({ isNew, isEdit }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ courseName: '', description: '' });
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [materials, setMaterials] = useState([]); //backend left
  const [tests, setTests] = useState([]); //backend left 

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;

    const fetchData = async () => {
      try {
        const [courseRes, enrollmentsRes] = await Promise.all([
          api.get(`/admin/courses/${courseId}`),
          api.get(`/admin/courses/${courseId}/enrollments`),
        ]);

        setFormData({
          courseName: courseRes.data.data.courseName,
          description: courseRes.data.data.description,
        });
        setEnrolledStudents(enrollmentsRes.data.data);
      } catch (err) {
        setError('Could not load this course.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, isNew]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      if (isNew) {
        await api.post('/admin/courses', formData);
      } else {
        await api.put(`/admin/courses/${courseId}`, formData);
      }
      navigate('/admin/courses');
    } catch (err) {
      setError('Could not save this course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Study Material — local-only for now, no backend endpoint yet
  const handleFileUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'pdf' ? '.pdf' : '.ppt,.pptx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMaterials((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: file.name,
            type: file.name.split('.').pop(),
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          },
        ]);
      }
    };
    input.click();
  };

  const handleDeleteMaterial = (materialId) => {
    setMaterials((prev) => prev.filter((m) => m.id !== materialId));
  };

  //siddhi
  const handleCreateTest = () => navigate(`/admin/courses/${courseId}/tests/new`);
  const handleEditTest = (testId) => navigate(`/admin/courses/${courseId}/tests/${testId}`);
  const handleDeleteTest = (testId) => setTests((prev) => prev.filter((t) => t.id !== testId));

  const getFileIcon = (type) => {
    if (type === 'pdf') return <DocumentIcon className="h-5 w-5 text-red-500" />;
    return <PresentationChartBarIcon className="h-5 w-5 text-orange-500" />;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const readOnly = !isNew && !isEdit;

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Section 1: Course Information */}
      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Course Information</h2>
          {readOnly && (
            <Link
              to={`/admin/courses/${courseId}/edit`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <PencilIcon className="h-4 w-4" /> Edit
            </Link>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            {readOnly ? (
              <p className="mt-1 text-gray-900">{formData.courseName}</p>
            ) : (
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            {readOnly ? (
              <p className="mt-1 text-gray-600">{formData.description}</p>
            ) : (
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            )}
          </div>
        </div>

        {!readOnly && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : isNew ? 'Create Course' : 'Save Changes'}
            </button>
          </div>
        )}
      </section>

      {/* Everything below only makes sense once the course actually exists */}
      {!isNew && (
        <>
          {/* Section 2: Study Material */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Study Material</h2>
              <span className="text-xs text-gray-400 italic">Not saved yet — backend coming soon</span>
            </div>
            <div className="flex space-x-3 mb-4">
              <button
                onClick={() => handleFileUpload('pdf')}
                className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-700"
              >
                <DocumentIcon className="h-4 w-4" /> Upload PDF
              </button>
              <button
                onClick={() => handleFileUpload('ppt')}
                className="bg-orange-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-orange-700"
              >
                <PresentationChartBarIcon className="h-4 w-4" /> Upload PPT
              </button>
            </div>
            {materials.length === 0 ? (
              <p className="text-gray-500">No materials uploaded yet.</p>
            ) : (
              <ul className="divide-y">
                {materials.map((material) => (
                  <li key={material.id} className="py-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getFileIcon(material.type)}
                      <span className="text-gray-700">{material.name}</span>
                      <span className="text-xs text-gray-400">{material.size}</span>
                    </div>
                    <button onClick={() => handleDeleteMaterial(material.id)} className="text-red-600">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Section 3: Tests */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tests</h2>
              <button
                onClick={handleCreateTest}
                className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4" /> Create Test
              </button>
            </div>
            {tests.length === 0 ? (
              <p className="text-gray-500">No tests created yet.</p>
            ) : (
              <div className="space-y-3">
                {tests.map((test) => (
                  <div key={test.id} className="border rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{test.title}</p>
                      <p className="text-sm text-gray-500">{test.questions} questions · {test.duration} min</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => handleEditTest(test.id)} className="text-blue-600">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteTest(test.id)} className="text-red-600">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Student Statistics */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Student Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-700">{enrolledStudents.length}</p>
                <p className="text-gray-600">Total Enrolled</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <AcademicCapIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-700">—</p>
                <p className="text-gray-600">Average Score</p>
                <p className="text-xs text-gray-400">Needs test data</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-purple-700">—</p>
                <p className="text-gray-600">Completion %</p>
                <p className="text-xs text-gray-400">Needs test data</p>
              </div>
            </div>
          </section>

          {/* Section 5: Enrolled Students */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Enrolled Students ({enrolledStudents.length})</h2>
            {enrolledStudents.length === 0 ? (
              <p className="text-gray-500">No students enrolled yet.</p>
            ) : (
              <div className="space-y-3">
                {enrolledStudents.map((student) => (
                  <div key={student.studentId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`}
                        alt={student.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Number(student.progress)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Number(student.progress)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CourseDetail;