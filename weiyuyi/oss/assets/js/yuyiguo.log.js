var MarkCommentModel = Backbone.Model.extend({
	initialize: function() {
		//
	},
	defaults: {
		//
	}
});

var MarkCommentCollection = Backbone.Collection.extend({
	model: MarkCommentModel
});

var MarkCommentView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var html = _.template($("#mark_comment").html(), {});
		$(".mark").append(html);
	},
	events: {
		"click [name='mark_comment_rank']": "toggleMarkCommentRank" 
	},
	toggleMarkCommentRank: function(event) {
		alert()
		$(this).parent().children("div").show();
	}
});

var markCommentView = new MarkCommentView({el: $(".mark")[0]});
