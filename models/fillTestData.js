var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');
var Course = mongoose.model('Course');
var q = require('q');

function saveCallback(err){
	if(err){
		console.log('Fill testdata failed, reason: %s', err)
	}
};


function fillTestCourses(callback){
	Course.find({}).then(function(data){
		if(data.length == 0){
			console.log('Creating courses testdata');
			new Course({_id: 'mbd1', name: 'Hybrid Mobile Development', description: 'Making mobile apps with HTML5', 
				weightEC: 2, block: 11, content: [{ week: 1, description: 'introduction'}, { week: 2, description: 'JQuery UI'}]
				}).save(saveCallback);
			new Course({_id: 'webs5', name: 'Cloud Services', description: 'Making cloud services with NodeJS', 
				weightEC: 4, block: 11, content: [{ week: 1, description: 'introduction'}, { week: 2, description: 'ReST'}]
				}).save(saveCallback);
			new Course({_id: 'webs2', name: 'PHP', description: 'Yeah baby!', 
				weightEC: 2, block: 7, content: []
				}).save(saveCallback);
			new Course({_id: 'idpat', name: 'Interaction Design Patterns', description: 'Mooie plaatjes', 
				weightEC: 2, block: 7, content: []
				}).save(saveCallback);
		} else{
			console.log('Skipping create courses testdata, allready present');
		}

		return;
	});
};

function fillTestTeachers(){
	Teacher.find({}).then(function(data){
		if(data.length == 0){
			console.log('Creating teachers testdata');

			new Teacher({_id: 'mmaaschu', firstName: 'Martijn', lastName: 'Schuurmans', age: 26, isActive: true, courses: ['mbd1', 'webs5', 'idpat'] }).save(saveCallback);
			new Teacher({_id: 'ssmulder', firstName: 'Stijn', lastName: 'Smulders', age: 24, isActive: true, courses: ['mbd1', 'webs5', 'webs2'] }).save(saveCallback);
			new Teacher({_id: 'piet', firstName: 'Piet', lastName: 'Pietersen', age: 30, isActive: true }).save(saveCallback);
			new Teacher({_id: 'jan', firstName: 'Jan', lastName: 'Jansen', age: 40, isActive: true }).save(saveCallback);
			new Teacher({_id: 'kees', firstName: 'Kees', lastName: 'Keessen', age: 50, isActive: true }).save(saveCallback);
			new Teacher({_id: 'klaas', firstName: 'Klaas', lastName: 'Klaassen', age: 60, isActive: true }).save(saveCallback);
			new Teacher({_id: 'karel', firstName: 'Karel', lastName: 'Karelsen', age: 70, isActive: true }).save(saveCallback);
			new Teacher({_id: 'henk', firstName: 'Henk', lastName: 'Henksen', age: 80, isActive: true }).save(saveCallback);
		} else{
			console.log('Skipping create teachers testdata, allready present');
		}

		return;
	});
};

module.exports = function(){
	q.fcall(fillTestCourses).then(fillTestTeachers);
};