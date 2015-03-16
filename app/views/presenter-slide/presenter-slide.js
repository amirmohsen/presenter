Polymer({
	domReady: function () {
		$(this.$.slideContent).html($(this).html());
		$(this).empty();
	}
});