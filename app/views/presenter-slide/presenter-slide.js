Polymer({
	domReady: function () {
		$(this.$.slideContent).html($(this).html());
		$(this).empty();
		$(this.$.slideContent).find('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	}
});