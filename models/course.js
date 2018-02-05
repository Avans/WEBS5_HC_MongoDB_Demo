var mongoose = require('mongoose');
const ecInSBU = 28;

var courseSchema = new mongoose.Schema({
	_id: { type: String, required: true, lowercase: true },
	name: { type: String, required: true },
	description: { type: String },
	weightEC: { type: Number, required: true },
	block: { type: Number },
	content: [{
			week: { type: Number },
			description: { type: String }
		}]
	},
	{ // settings:
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

courseSchema.virtual('displayValue').get(function(){
	return this._id.toUpperCase() + ': ' + this.name;
});

courseSchema.virtual('weightSBU')
	.get(function(){
		return this.weightEC * ecInSBU;
	})
	.set(function(val){
		this.weightEC = val / ecInSBU;
	});

courseSchema.statics.createIfNotExists = function(course){
	course._id = course._id.toLowerCase();
	this.findById(course._id, function(err, existingCourse){
		if(!existingCourse){
			var Course = mongoose.model('Course');
			new Course(course).save();
		}
	})
};

mongoose.model('Course', courseSchema);