var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Assessment Model
 * =============
 */

var Assessment = new keystone.List('Assessment', {
	nocreate: true,
	noedit: true,
});

Assessment.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	assessmentType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Assessment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Assessment.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Assessment.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	var assessment = this;
	var brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'assessment-notification',
			transport: 'mailgun',
		}).send({
			to: "success@can-nova.com",
			from: {
				name: 'CanNova',
				email: 'noreply@cannova.com',
			},
			subject: 'New Online Assessment for CanNova',
			assessment: assessment,
			brand: brand,
			layout: false,
		}, callback);
	});
};

Assessment.defaultSort = '-createdAt';
Assessment.defaultColumns = 'name, email, assessmentType, createdAt';
Assessment.register();
