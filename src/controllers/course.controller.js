import Course from "../models/Course.js"

const courseController = {
    addCourse: async (req, res) =>{
        const {name, picture, students, rate} = req.body;
        try {
            const newCourse = new Course({name, picture, students, rate});
            const course = await newCourse.save();
            return res.status(201).json(course);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllCourses: async (req, res)=>{
        try {
            const allCourses = await Course.find();
            res.status(200).json(allCourses);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default courseController;