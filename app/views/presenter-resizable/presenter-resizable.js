Polymer({
	adjustHeight: function(diff) {
		var total = $("body").height(),
			margin = 50,
			height = total - diff - 50;

		$(this).height(height);
	}
});