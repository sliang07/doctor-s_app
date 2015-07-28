var mongoose = require('mongoose');
var AppointmentSchema = new mongoose.Schema({
	date: Date,
	time: Date,
	name: String,
	complain: String
});

mongoose.model('Appointment', AppointmentSchema);

AppointmentSchema.path('date').required(true,'Date cannot be blank');
AppointmentSchema.path('time').required(true,'time cannot be blank');
AppointmentSchema.path('name').required(true,'name cannot be blank');
AppointmentSchema.path('complain').required(true,'complain cannot be blank');