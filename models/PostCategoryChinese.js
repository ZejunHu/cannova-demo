var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategoryChinese', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
	priority: { type: Number, default: 9999 },
});

PostCategory.relationship({ ref: 'PostChinese', path: 'postsChinese', refPath: 'categories' });

PostCategory.register();
