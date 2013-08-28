(function(){
	var formBlock = false;
	
	function htmlEncode(str) {
		return $('<div>').html(str).text();
	}
	
	function val(id) {
		return $('#'+id).val();
	}
	
	function parts() {
		var arr = [], i = 0, len = arguments.length;
		for(; i < len; i++) {
			arr.push(arguments[i] + ': ' + htmlEncode(val(arguments[i])));
		}
		return arr.join('<br>');
	}
	
	$('#contactform').submit(function(ev){
		ev.preventDefault();
		if (formBlock) { return; }
		formBlock = true;
		var formValid = true,
			$form = $(this);
		$('#error').slideUp('fast');
		$form.find('input,textarea').each(function(){
			if( $.trim($(this).val()) === '' ) {
				formValid = false;
				return false;
			}
		});
		if (!formValid) {
			$('#error').slideDown('fast');
			formBlock = false;
			return;
		}
		$.post('/email', {
			subject : 'Jeano\'s Catering form',
			html : parts('name','email','phone','message')
		}, function(json){
			$form.slideUp('fast');
			$('#thanks').slideDown('fast');
		},'json');
	}).on('focus','input,textarea', function(){
		$('#error').slideUp('fast');
	});
})();