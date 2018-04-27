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
	locals.martial = Assessment.fields.martialStatus.ops;
	locals.childrenNumber = Assessment.fields.childrenNumber.ops;
	locals.level = Assessment.fields.speakingEnglish.ops;
	locals.currency = Assessment.fields.currency.ops;
	locals.networth = Assessment.fields.networth.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.assessmentSubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'assessment' }, function (next) {

		var newAssessment = new Assessment.model();
		var updater = newAssessment.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'salutation, firstName, lastName, email, phone, nationality, currentResidence, preferredDestination, age, martialStatus, childrenNumber, childrenDisability, completedHighSchool, afterHighSchool, haveWork, speakingEnglish, listeningEnglish, readingEnglish, writingEnglish, speakingFrench, listeningFrench, readingFrench, writingFrench, workInCanada, offerInCanada, visitedCanada, familyInCanada, currency, networth, businessExp, ownBusiness, criminal, disease, message',
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
