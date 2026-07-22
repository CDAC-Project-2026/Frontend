// src/pages/admin/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  DocumentIcon, 
  PresentationChartBarIcon, 
  TrashIcon, 
  PlusIcon,
  PencilIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

// Mock API functions
const fetchCourse = (id) => ({
  id: Number(id),
  title: 'React for Beginners',
  description: 'Learn React from scratch with hooks and context. Build real-world applications.',
  category: 'Frontend',
  instructor: 'Rohan',
  coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=300&fit=crop',
  materials: [
    { id: 1, name: 'React Basics.pdf', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Advanced React.pptx', type: 'ppt', size: '5.1 MB' }
  ],
  tests: [
    { id: 1, title: 'Quiz 1 – Components', questions: 10, duration: 30 },
    { id: 2, title: 'Quiz 2 – State Management', questions: 15, duration: 45 }
  ],
  stats: {
    totalEnrolled: 145,
    averageScore: 78.5,
    completionRate: 68
  },
  enrolledStudents: [
    { id: 1, name: 'Deven', email: 'Deven@example.com', progress: 85, avatar: 'https://ui-avatars.com/api/?name=deven&background=3b82f6&color=fff' },
    { id: 2, name: 'Eshita', email: 'Eshita@example.com', progress: 62, avatar: 'https://ui-avatars.com/api/?name=Eshita&background=10b981&color=fff' },
    { id: 3, name: 'Siddhi', email: 'Siddhi@example.com', progress: 94, avatar: 'https://ui-avatars.com/api/?name=Siddhi&background=f59e0b&color=fff' },
  ]
});

const CourseDetail = ({ isNew, isEdit }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    coverImage: ''
  });

  useEffect(() => {
    if (!isNew && courseId) {
      const data = fetchCourse(courseId);
      setCourse(data);
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        instructor: data.instructor,
        coverImage: data.coverImage
      });
    } else if (isNew) {
      setCourse({ 
        materials: [], 
        tests: [], 
        stats: { totalEnrolled: 0, averageScore: 0, completionRate: 0 },
        enrolledStudents: []
      });
    }
  }, [courseId, isNew]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Saving course:', formData);
    alert(isNew ? 'Course created (mock)' : 'Course updated (mock)');
    navigate('/admin/courses');
  };

  // Study Material
  const handleFileUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'pdf' ? '.pdf' : '.ppt,.pptx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newMaterial = {
          id: Date.now(),
          name: file.name,
          type: file.name.split('.').pop(),
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        };
        setCourse(prev => ({
          ...prev,
          materials: [...prev.materials, newMaterial]
        }));
        alert(`Uploaded ${file.name} (mock)`);
      }
    };
    input.click();
  };

  const handleDeleteMaterial = (materialId) => {
    setCourse(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m.id !== materialId)
    }));
    alert('Material deleted (mock)');
  };

  // Tests
  const handleCreateTest = () => {
    navigate(`/admin/courses/${courseId}/tests/new`);
  };

  const handleEditTest = (testId) => {
    navigate(`/admin/courses/${courseId}/tests/${testId}`);
};

  const handleDeleteTest = (testId) => {
    setCourse(prev => ({
      ...prev,
      tests: prev.tests.filter(t => t.id !== testId)
    }));
    alert('Test deleted (mock)');
  };

  if (!course) return <div className="text-center py-10">Loading...</div>;

  const getFileIcon = (type) => {
    if (type === 'pdf') return <DocumentIcon className="h-5 w-5 text-red-500" />;
    return <PresentationChartBarIcon className="h-5 w-5 text-orange-500" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Section 1: Course Information with Cover Image */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative h-48 bg-gray-200">
          {formData.coverImage ? (
            <img src={formData.coverImage} alt="Course cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <PhotoIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Course Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isNew ? 'Create Course' : 'Save Changes'}
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Study Material */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Study Material</h2>
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
        {course.materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          <ul className="divide-y">
            {course.materials.map(material => (
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
        {course.tests.length === 0 ? (
          <p className="text-gray-500">No tests created yet.</p>
        ) : (
          <div className="space-y-3">
            {course.tests.map(test => (
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
            <p className="text-3xl font-bold text-blue-700">{course.stats.totalEnrolled}</p>
            <p className="text-gray-600">Total Enrolled</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <AcademicCapIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">{course.stats.averageScore}%</p>
            <p className="text-gray-600">Average Score</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-purple-700">{course.stats.completionRate}%</p>
            <p className="text-gray-600">Completion %</p>
          </div>
        </div>
      </section>

      {/* Section 5: Enrolled Students */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Enrolled Students ({course.enrolledStudents.length})</h2>
        {course.enrolledStudents.length === 0 ? (
          <p className="text-gray-500">No students enrolled yet.</p>
        ) : (
          <div className="space-y-3">
            {course.enrolledStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseDetail;