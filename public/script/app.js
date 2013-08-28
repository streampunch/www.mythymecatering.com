$('a[href^="/"]').each(function(){
	if (location.pathname === $(this).attr('href')) {
		$(this).closest('li').addClass('active');
	}
});