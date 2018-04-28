var keystone = require('keystone');
var Types = keystone.Field.Types;

var nations = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Island","Colombia","Comoros","Congo","Congo, The Democratic Republic of the","Cook Islands","Costa Rica","Cote D Ivoire","Croatia (Hrvatska)","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","France Metropolitan","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Heard and Mc Donald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran (Islamic Republic of)","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyz Republic","Lao, People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia, The Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia Federation","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia (Slovak Republic)","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","St. Helena","Sudan","Suriname","Svalbard and Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syria Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania United Republic of","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands (British)","Virgin Islands (US)","Wallis and Futuna Islands","Western Sahara","Yemen","Yugoslavia","Zambia","Zimbabwe"];

var provinces = ["No Preferred Destination", "Alberta", "British Colombia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories (NWT)", "Nova Scotia", "Ontario", "Quebec", "Prince Edward Island (PEI)", "Saskatchewan", "Yukon"];

var level = ["Advanced", "High Intermediate", "Intermediate", "Low Intermediate", "Basic", "None"];

/**
 * Assessment Model
 * =============
 */

var Assessment = new keystone.List('Assessment', {
	nocreate: true,
	noedit: true,
});

Assessment.add({
	salutation: { type: Types.Select, options: [
		{ value: 'Mr.', label: 'Mr.' },
		{ value: 'Ms.', label: 'Ms.' },
		{ value: 'Mrs.', label: 'Mrs.' },
		{ value: 'Miss.', label: 'Miss.' },
		{ value: 'Dr.', label: 'Dr.' },
	] },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	nationality: { type: Types.Select, options: nations },
	currentResidence: { type: Types.Select, options: nations },
	preferredDestination: { type: Types.Select, options: provinces },
	age: { type: Number, required: true },
	martialStatus: { type: Types.Select, options: [
		{ value: 'Never Married', label: 'Never Married' },
		{ value: 'Married', label: 'Married' },
		{ value: 'Common-Law Relationship', label: 'Common-Law Relationship' },
		{ value: 'Divorced', label: 'Divorced' },
		{ value: 'Widow', label: 'Widow' },
	] },
	childrenNumber: { type: Types.Select, options: [
		{ value: '0', label: '0' },
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
		{ value: '5', label: '5' },
		{ value: '6', label: '6' },
		{ value: '7', label: '7' },
		{ value: '8', label: '8' },
		{ value: '9', label: '9' },
		{ value: '10', label: '10' },
	] },
	childrenDisability: { type: Boolean },
	completedHighSchool: { type: Boolean },
	afterHighSchool: { type: Boolean },
	haveWork: { type: Boolean },
	speakingEnglish: { type: Types.Select, options: level },
	listeningEnglish: { type: Types.Select, options: level },
	readingEnglish: { type: Types.Select, options: level },
	writingEnglish: { type: Types.Select, options: level },
	speakingFrench: { type: Types.Select, options: level },
	listeningFrench: { type: Types.Select, options: level },
	readingFrench: { type: Types.Select, options: level },
	writingFrench: { type: Types.Select, options: level },
	workInCanada: { type: Boolean },
	offerInCanada: { type: Boolean },
	visitedCanada: { type: Boolean },
	familyInCanada: { type: Boolean },
	currency: { type: Types.Select, options: ["CAD - Canadian Dollar", "EUR - Euro", "USD - United States Dollar"] },
	networth: { type: Types.Select, options: ["Less than 10,000", "10,000 to 100,000", "100,000 to 500,000", "500,000 to 1,000,000", "1,000,000 to 1,600,000", "1,600,000+"] },
	businessExp: { type: Boolean },
	ownBusiness: { type: Boolean },
	criminal: { type: Boolean },
	disease: { type: Boolean },
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
			//to: "success@can-nova.com",
			to: "wbsxbysharp@gmail.com",
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
Assessment.defaultColumns = 'firstName, LastName, email, createdAt';
Assessment.register();
