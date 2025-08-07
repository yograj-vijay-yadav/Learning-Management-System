import { Router } from "express";
import Course from "../models/course.model.js";
import { addLectureToCourseById, createCourse, getAllCourses, getAllCoursesById, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { authorisedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const courseRouter = Router();

courseRouter.route('/').get(getAllCourses)
     .post(isLoggedIn,authorisedRoles('ADMIN'),upload.single('thumbnail'), createCourse);
courseRouter.route('/:id')
     .get(isLoggedIn,authorisedRoles('ADMIN'),getLecturesByCourseId)
     .put(isLoggedIn,authorisedRoles('ADMIN'),updateCourse)
     .delete(isLoggedIn,authorisedRoles('ADMIN'),removeCourse)
     .post(isLoggedIn,authorisedRoles('ADMIN'),upload.single('lecture'), addLectureToCourseById);

export default courseRouter;
