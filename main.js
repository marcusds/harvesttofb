function findCases() {

	var items = $('div.entry-info-with-timestamps span.notes');
	items.each(function() {
		$this = $(this);
		if( !$this.hasClass('htfbchk') ) {
			$this.addClass('htfbchk');
			var re1='.*?';	// Non-greedy match on filler
			var re2='(Case)';	// Word 1
			var re3='(\\s+)';	// White Space 1
			var re4='(\\d+)';	// Integer Number 1
			var txt = $this.text();

			var oldtxt, newtxt;
			
			var p = new RegExp(re1+re2+re3+re4,["i"]);
			var m = p.exec(txt);
			if (m != null)
			{
				oldtxt = m[1] + m[2] + m[3];
				newtxt = '&nbsp;<a target="_blank" href="https://' + localStorage["fogbugz"] + '.fogbugz.com/f/cases/' + m[3] + '">' + m[1] + m[2] + m[3] + '</a>';
				txt = txt.replace(oldtxt, newtxt);
			}
			
			re1='.*?';	// Non-greedy match on filler
			re2='(#)';	// Any Single Character 1
			re3='(\\d+)';	// Integer Number 1
			
			var p = new RegExp(re1+re2+re3,["i"]);
			var m = p.exec(txt);
			if (m != null)
			{
				oldtxt = m[1]+m[2];
				newtxt = '&nbsp;<a target="_blank" href="https://' + localStorage["fogbugz"] + '.fogbugz.com/f/cases/' + m[2] + '">' + m[1] + m[2] + '</a>';
				txt = txt.replace(oldtxt, newtxt);
			}
			
			$this.html(txt);
		}
	});
}

$( document ).ready(function() {
	if( !localStorage["fogbugz"] ) {
		localStorage["fogbugz"] = prompt('Enter your fogbugz subdomain.');
	}
	
	findCases();
	$(document).on('click', '.button', function() {
		findCases();
		setTimeout(function() {
			findCases();
		}, 500);
	});
});