import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const enrollCourseId = searchParams.get('enroll');
  const enrollCourseName = searchParams.get('courseName');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', city: ''
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const completeLoginAndEnroll = async (email, password) => {
    const loginResponse = await api.post('/student/login', { email, password });
    const { token } = loginResponse.data.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', 'student');

    if (enrollCourseId) {
      try {
        await api.post(`/student/courses/${enrollCourseId}/enroll`);
      } catch (enrollErr) {
        if (enrollErr.response?.status !== 409) throw enrollErr;
      }
      navigate('/student/my-courses');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      await api.post('/student/register', formData);
      await completeLoginAndEnroll(formData.email, formData.password);
    } catch (err) {
      if (err.response?.status === 409) {
        setInfo(
          enrollCourseName
            ? `Account already exists. Enrolling you in the ${enrollCourseName} course.`
            : 'Account already exists. Logging you in.'
        );

        try {
          await completeLoginAndEnroll(formData.email, formData.password);
        } catch (loginErr) {
          setInfo('');
          setError("This email is already registered, but that password doesn't match.");
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a Student Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to={enrollCourseId ? `/login?enroll=${enrollCourseId}&courseName=${encodeURIComponent(enrollCourseName || '')}` : "/login"}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-blue-600">
          {enrollCourseName && !info && !error && (
            <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              You'll be enrolled in {enrollCourseName} after signing up.
            </div>
          )}
          {info && (
            <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              {info}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
                {enrollCourseId && (
                  <>
                    {' '}
                    <Link
                      to={`/login?enroll=${enrollCourseId}&courseName=${encodeURIComponent(enrollCourseName || '')}`}
                      className="underline font-medium"
                    >
                      Log in instead.
                    </Link>
                  </>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                <div className='mt-1'>
                    <input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>City</label>
                <div className='mt-1'>
                    <input
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;