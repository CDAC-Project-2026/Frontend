import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import BrowseCourses from './pages/public/BrowseCourses';
import Login from './pages/public/Login';
import AdminLogin from './pages/public/AdminLogin';
import Signup from './pages/public/Signup';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import CourseDetails from './pages/student/CourseDetails';
import TakeTest from './pages/student/TakeTest';
import TestsList from './pages/student/TestsList';
import Results from './pages/student/Results';
import TestAnalysis from './pages/student/TestAnalysis';
import Chatbot from './pages/student/Chatbot';
import Profile from './pages/student/Profile';
import MoreCourses from './pages/student/MoreCourses';
// import AdminLayout from './layouts/AdminLayout';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageUsers from './pages/admin/ManageUsers';
// import ManageCourses from './pages/admin/ManageCourses';
// import ViewResults from './pages/admin/ViewResults';
// // import AdminProfile from './pages/admin/AdminProfile';
// import CourseDetail from './pages/admin/CourseDetail';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<BrowseCourses />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/student/test/:testId" element={<TakeTest />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          
          <Route path="courses/:courseId" element={<CourseDetails />} /> 
          
          <Route path="tests" element={<TestsList />} />
          <Route path="results" element={<Results />} />
          <Route path="analysis/:studentTestId" element={<TestAnalysis />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="profile" element={<Profile />} />
          <Route path="more-courses" element={<MoreCourses />} /> 
        </Route>

        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/new" element={<CourseDetail isNew={true} />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="courses/:courseId/edit" element={<CourseDetail isEdit={true} />} />
          <Route path="results" element={<ViewResults />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;