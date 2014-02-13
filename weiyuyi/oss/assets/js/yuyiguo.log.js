var Model = Backbone.Model.extend({
	initialize: function() {
		console.log("Successfully import one query")
	},
	defaults: {
		rank: 0,
		comment: "No comments"
	}
});

var Collection = Backbone.Collection.extend({
	model: Model
});

var View = Backbone.View.extend(function() {

});

var model = new Model;
console.log(model.get("rank"));