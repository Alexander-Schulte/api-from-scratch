const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./student");
const Course = require("./course");
const student = require("./student");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const { method, url } = req;
  console.log("My custom middleware");
  console.log(`${method} ${url}`);
  next();
});

app.get("/", (req, res) => {
  Course.find();
  res.json({
    "/courses": "nothing yet",
  });
});

// find all courses
app.get("/courses", (req, res) => {
  Course.find()
    .then((courses) => {
      res.status(200);
      res.json(courses);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

// find a specific course
app.get("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findById(courseId)
    .then((course) => {
      if (course) {
        res.status(200);
        res.json(course);
      } else {
        res.status(404);
        res.json({
          error: `Post with id: ${id} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

// Get all students in one Course
app.get("/courses/:courseId/students", (req, res) => {
  const { courseId } = req.params;
  Student.find({ course: courseId })
    .then((students) => {
      if (student.course === courseId) {
        res.jsonp(students);
        res.status(200);
      } else {
        res.status(404);
        res.json({
          error: `Post with id: ${courseIdgit} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

// most specific: find one student in one course
app.get("/courses/:courseId/students/:studentId", (req, res) => {
  const { courseId, studentId } = req.params;
  Student.findById(courseId && studentId)
    .then((student) => {
      if (student.course === courseId) {
        res.status(200);
        res.json(student);
      } else {
        res.status(404);
        res.json({
          error: `Student with id: ${studentId} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

// find all students
app.get("/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.status(200);
      res.json(students);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

// find specific student
app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .then((student) => {
      if (student) {
        res.status(200);
        res.json(student);
      } else {
        res.status(404);
        res.json({
          error: `Post with id: ${id} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server Error: ${error}`,
      });
    });
});

//create new courses
app.post("/courses", (req, res) => {
  Course.create(req.body)
    .then((newCourse) => {
      if (newCourse.location === undefined) {
        newCourse.location = "Remote";
      }
      res.status(201);
      res.json(newCourse);
    })

    .catch((error) => {
      console.error(error);
    });
});

// create new students
app.post("/courses/:courseId/students", (req, res) => {
  const { courseId } = req.params;
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    course: courseId,
  })
    .then((newStudent) => {
      res.status(201);
      res.json(newStudent);
    })

    .catch((error) => {
      console.error(error);
    });
});

// update a specific course
app.patch("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndUpdate(courseId, req.body, { new: true }).then(
    (updatedCourse) => {
      if (updatedCourse) {
        res.status(200);
        res.json(updatedCourse);
      } else {
        res.status(404);
        res.json({
          error: "No Id find",
        });
      }
    }
  );
});

// update a specific student
app.patch("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndUpdate(studentId, req.body, { new: true }).then(
    (updatedStudent) => {
      if (updatedStudent) {
        res.status(200);
        res.json(updatedStudent);
      } else {
        res.status(404);
        res.json({
          error: "No Id find",
        });
      }
    }
  );
});

// delete a specific course
app.delete("/courses/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId)
    .then((course) => {
      res.status(200);
      res.json(course);
    })
    .catch((error) => {
      res.status(404);
      res.json({
        error: "No Id find",
      });
    });
});

// delete a specific student
app.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndDelete(studentId)
    .then((student) => {
      res.status(200);
      res.json(student);
    })
    .catch((error) => {
      res.status(404);
      res.json({
        error: "No Id find",
      });
    });
});
const { PORT, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
