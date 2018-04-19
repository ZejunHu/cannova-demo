var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		posts: [],
		testimonials: [],
	};

	view.on('init', function (next) {

		var q = keystone.list('Testimonial').paginate({
			page: req.query.page || 1,
			perPage: 20,
			maxPages: 1,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.testimonials = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
