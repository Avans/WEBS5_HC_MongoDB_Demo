var mongoose = require("mongoose");
var Teacher = mongoose.model("Teacher");
var Course = mongoose.model("Course");
var q = require("q");

function fillTestCourses() {
  Course.find({}).then(function (data) {
    if (data.length == 0) {
      console.log("Creating courses testdata");
      var course1 = new Course({
        _id: "mbd1",
        name: "Hybrid Mobile Development",
        description: "Making mobile apps with HTML5",
        weightEC: 2,
        block: 11,
        content: [
          { week: 1, description: "introduction" },
          { week: 2, description: "JQuery UI" },
        ],
      });
      var course2 = new Course({
        _id: "webs5",
        name: "Cloud Services",
        description: "Making cloud services with NodeJS",
        weightEC: 4,
        block: 11,
        content: [
          { week: 1, description: "introduction" },
          { week: 2, description: "ReST" },
        ],
      });
      var course3 = new Course({
        _id: "webs2",
        name: "PHP",
        description: "Yeah baby!",
        weightEC: 2,
        block: 7,
        content: [],
      });
      var course4 = new Course({
        _id: "idpat",
        name: "Interaction Design Patterns",
        description: "Mooie plaatjes",
        weightEC: 2,
        block: 7,
        content: [],
      });

      Promise.all([
        course1.save(),
        course2.save(),
        course3.save(),
        course4.save(),
      ])
        .then(function () {
          console.log("Courses testdata created");
        })
        .catch(function (err) {
          console.log("Fill testdata failed, reason: %s", err);
        });
    } else {
      console.log("Skipping create courses testdata, already present");
    }
  });
}

function fillTestTeachers() {
  Teacher.find({}).then(function (data) {
    if (data.length == 0) {
      console.log("Creating teachers testdata");

      var teacher1 = new Teacher({
        _id: "mmaaschu",
        firstName: "Martijn",
        lastName: "Schuurmans",
        age: 26,
        isActive: true,
        courses: ["mbd1", "webs5", "idpat"],
      });
      var teacher2 = new Teacher({
        _id: "ssmulder",
        firstName: "Stijn",
        lastName: "Smulders",
        age: 24,
        isActive: true,
        courses: ["mbd1", "webs5", "webs2"],
      });
      var teacher3 = new Teacher({
        _id: "piet",
        firstName: "Piet",
        lastName: "Pietersen",
        age: 30,
        isActive: true,
      });
      var teacher4 = new Teacher({
        _id: "jan",
        firstName: "Jan",
        lastName: "Jansen",
        age: 40,
        isActive: true,
      });
      var teacher5 = new Teacher({
        _id: "kees",
        firstName: "Kees",
        lastName: "Keessen",
        age: 50,
        isActive: true,
      });
      var teacher6 = new Teacher({
        _id: "klaas",
        firstName: "Klaas",
        lastName: "Klaassen",
        age: 60,
        isActive: true,
      });
      var teacher7 = new Teacher({
        _id: "karel",
        firstName: "Karel",
        lastName: "Karelsen",
        age: 70,
        isActive: true,
      });
      var teacher8 = new Teacher({
        _id: "henk",
        firstName: "Henk",
        lastName: "Henksen",
        age: 80,
        isActive: true,
      });

      Promise.all([
        teacher1.save(),
        teacher2.save(),
        teacher3.save(),
        teacher4.save(),
        teacher5.save(),
        teacher6.save(),
        teacher7.save(),
        teacher8.save(),
      ])
        .then(function () {
          console.log("Teachers testdata created");
        })
        .catch(function (err) {
          console.log("Fill testdata failed, reason: %s", err);
        });
    } else {
      console.log("Skipping create teachers testdata, already present");
    }
  });
}

module.exports = function () {
  q.fcall(fillTestCourses).then(fillTestTeachers);
};
