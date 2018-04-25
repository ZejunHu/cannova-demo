var keystone = require('keystone');
var Assessment = keystone.list('Assessment');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'assessment';
  locals.nationality = Assessment.fields.nationality.ops;
	locals.salutation = Assessment.fields.salutation.ops;
	locals.province = Assessment.fields.preferredDestination.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.assessmentSubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'assessment' }, function (next) {

		var newAssessment = new Assessment.model();
		var updater = newAssessment.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, nationality, assessmentType',
			errorMessage: 'There was a problem submitting your assessment:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.assessmentSubmitted = true;
			}
			next();
		});
	});

	view.render('assessment');
};
