export const messages = {
  loginSuccess: { title: 'Welcome', msg: 'You have logged in.' },
  registerSuccess: {title: 'Welcome', msg: 'You have registered.' },
  logoutSuccess: {title: 'Farewell', msg: 'You have logged out.' },
  uploadProfilePic: { title: 'Success', msg: 'You have uploaded your profile picture.' },
  uploadBgPic: { title: 'Success', msg: 'You have uploaded your background picture.' },
  editUsername: { title: 'Success', msg: 'You have edited your username.' },
  createCourse: { title: 'Success', msg: 'You have created a course.' },
  editCourse: { title: 'Success', msg: 'You have edited this course.' },
  deleteCourse: { title: 'Success', msg: 'You have deleted this course.' },
  addLecture: { title: 'Success', msg: 'You have added a lecture to this course.' },
  editLecture: { title: 'Success', msg: 'You have edited this lecture.' },
  deleteLecture: { title: 'Success', msg: 'You have deleted this lecture.'},
  uploadVideo: { title: 'Success', msg: 'You have uploaded a video.' },
  invalidRegex: { title: 'Error', msg: 'Invalid Regex!' },
  error: {title: 'Error'},
}

export const sort = {
  ascending: 'ascending',
  descending: 'descending'
}

export const numerics = {
  msgTimeout: 3000,
  usernameMinLen: 3,
  courseNameMinLen: 3,
  lectureMinLen: 3,
  lectureMaxLen: 25,
  courseNameMaxLen: 25,
  courseDescriptionMinLen : 3,
  courseDescriptionMaxLen: 3000,
  usernameMaxLen: 50,
  passMinLen: 3,
  passMaxLen: 50,
  pageCoursesLen: 15,
  pageLectLen: 15,
  pageUsersLen: 5,
  maxFileSize: 1048576
}

export const fileTypes = {
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  mp4: 'video/mp4'
}