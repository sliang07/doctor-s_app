var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
module.exports = (function(){
	return{
		show: function(req, res){
			Appointment.find({}, function(err,results){
				if(err){
					console.log(err);
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			// console.log(req.body.info);
			var createAppointment = new Appointment({date: req.body.info.date, name: req.body.info.name, complain: req.body.info.complain, time: req.body.info.time});
			createAppointment.save(function(err){
				if(err){
					res.json({title: 'you have errors!', errors: createAppointment.errors});
				}else{
					console.log("Added an appoinment")
					res.json({added: "true"});
				}
			})
		},
		remove: function(req, res){
			Appointment.find({_id: req.info}).remove().exec();
			console.log("Delete an Appointment");
			res.json({success: "true"});
		}
	}
})();