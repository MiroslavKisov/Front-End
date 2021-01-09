import React from 'react';
import Header from './containers/header/Header';
import Footer from './containers/footer/Footer';
import Home from './containers/home/Home';
import Register from './containers/register/Register';
import Login from './containers/login/Login';
import CreateCourse from './containers/create-course/CreateCourse';
import Profile from './containers/profile/Profile';
import EditProfile from './containers/edit-profile/EditProfile';
import CourseDetails from './containers/course-details/CourseDetails';
import AddLecture from './containers/add-lecture/AddLecture';
import Lectures from './containers/lectures/Lectures';
import LectureDetails from './containers/lecture-details/LectureDetails';
import NotFound from './containers/not-found/NotFound';
import EditCourse from './containers/edit-course/EditCourse';
import EditLecture from './containers/edit-lecture/EditLecture';
import Courses from './containers/courses/Courses';
import Users from './containers/users/Users';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/create-course" exact component={CreateCourse}/>
          <Route path="/users/:searchValue" exact component={Users}/>
          <Route path="/search/courses/:searchValue" exact component={Courses}/>
          <Route path="/:username/courses/:userCreatorId" exact component={Courses}/>
          <Route path="/profile/:username" exact component={Profile}/>
          <Route path="/edit-profile/:id" exact component={EditProfile}/>
          <Route path="/active-user" exact component={Profile}/>
          <Route path="/courses" exact component={Courses}/>
          <Route path="/courses/:id" exact component={CourseDetails}/>
          <Route path="/courses/my/:username" exact component={Courses}/>
          <Route path="/courses/:id/add-lecture" exact component={AddLecture}/>
          <Route path="/courses/:id/edit" exact component={EditCourse}/>
          <Route path="/courses/:id/lectures" exact component={Lectures}/>
          <Route path="/courses/:courseId/lectures/:lectureId" exact component={LectureDetails}/> 
          <Route path="/courses/:courseId/lectures/:lectureId/edit" exact component={EditLecture}/>
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </div>
      <NotificationContainer />
    </Router>
  );
}

export default App;
