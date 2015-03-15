Polymer({
	ready: function() {
		this.adjustHeight();
	},
	domReady: function() {
		var self = this;
		$(window).on("resize", function(){
			self.adjustHeight();
		});	
	},
	adjustHeight: function() {
		var total = $("body > div.container-fluid").height(),
			used = $("body > div.container-fluid > nav").outerHeight(),
			margin = 50,
			height = total - used - 50;

		$(this).height(height);
	}
});