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

var View = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var html = _.template($("#mark_comment").html(), {});
		$(".mark").append(html);
	},
	events: {
		"click input": "toggleCommentRank" 
	},
	toggleCommentRank: function(event) {
		alert("toggle");
	}
});

var view = new View({el: $(".mark")[0]});