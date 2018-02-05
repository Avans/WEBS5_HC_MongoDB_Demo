var express = require('express');
var router = express();
var _ = require('underscore');
var handleError;
var async = require('async');

var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');
var Course = mongoose.model('Course');

function getCourses(req, res){
	var query = {};
	if(req.params.id){
		query._id = req.params.id.toLowerCase();
	}

	Course
		.find(query)
	  	.lean()
	  	.then(data => {		
			if(req.params.id){
				data = data[0];
			}
			res.json(data);
		});
}

// Routing
router.route('/')
	.get(getCourses);

router.route('/:id')
	.get(getCourses);

// Export
module.exports = router;