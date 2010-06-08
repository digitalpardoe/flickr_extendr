getSettings(['quickReply'], 'quickReply');

function quickReply(settings) {
  if (settings['quickReply'] == true) {
    textareas = document.evaluate("//textarea", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    textArray = new Array();
    messageIndex = 0;
    
    function tagIt (tagOpen,tagClose,i) {
      var v = textArray[i].value;
      var selLength = textArray[i].textLength;
      var selStart = textArray[i].selectionStart;
      var selEnd = textArray[i].selectionEnd;
      if (selEnd == 1 || selEnd == 2) selEnd=selLength;
      var start = (v).substring(0, selStart);
      var middle = (v).substring(selStart, selEnd)
        var end = (v).substring(selEnd, selLength);
      textArray[i].value = start + tagOpen + middle + tagClose + end;
	  
	  	textArray[i].selectionStart = textArray[i].value.length;
	  	textArray[i].selectionEnd = textArray[i].value.length;
	  	textArray[i].focus();
	  }
    
    
	  function imgItAuto (imgSRC, i) {
	  	if (imgSRC != null) {
	  		tagIt('<img src="' + imgSRC + '" height="24" width="24"> ','', i);
	  	}
	  }
    
	  function usernameItAuto (username, i) {
	  	if (username != null) {
	  		tagIt('<b>'+ username +'</b> ','', i);
	  	}
	  }
          
    function bothItAuto (username, imgSRC, i) {
      if (username != null && imgSRC != null) {
        tagIt('<img src="' + imgSRC + '" height="24" width="24"> <b>'+ username +'</b> ','', i);
      }             
    }
    
	  var localiser = new FlickrLocaliser({
	  		'en-us' : {
	  			'reply with': 'reply with',
	  			'name' : 'name',
	  			'icon' : 'icon',
	  			'icon&name': 'both'
	  		},
	  		'fr-fr' : {
	  			'reply with': 'repondre avec',
	  			'name' : 'nom',
	  			'icon' : 'icone',
	  			'icon&name': 'deux'
	  		},
	  		'pt-br' : {
	  			'reply with': 'responder com',
	  			'name' : 'nome',
	  			'icon' : 'icone',
	  			'icon&name': 'ambos'
	  		},
	  		'it-it' : {
	  			'reply with': 'rispondere con',
	  			'name' : 'nome',
	  			'icon' : 'icone',
	  			'icon&name': 'entrambi'
	  		},
	  		'es-us' : {
	  			'reply with': 'responder con',
	  			'name' : 'nombre',
	  			'icon' : '&iacute;cono',
	  			'icon&name': 'ambos'
	  		},
	  		defaultLang: 'en-us'
	  	});
    
	  for (i=0; i<textareas.snapshotLength; i++) {
	  	textArray[i] = textareas.snapshotItem(i);
	  	//GM_log('doc18' + textArray[i].parentNode.innerHTML);
	  	if (textArray[i].name == 'message') {
	  		messageIndex = i;
	  		//GM_log('doc18 > textarea index' + messageIndex);
	  	}
	  }
    
	  comments = document.evaluate("//td[@class='Who']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	  var el = 'td';
	  if (comments.snapshotLength == 0) {
	  	comments = document.evaluate("//div[contains(@class,'Who')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),
	  		el = 'div';
	  }
    
	  for (i=0; i< comments.snapshotLength; i++) {
	  	var who = comments.snapshotItem(i);
	  	var imgSrc = who.getElementsByTagName('img')[0].src;
    
	  	var said = who.parentNode.getElementsByTagName(el)[1];
	  	var small = said.getElementsByTagName('small')[0];
	  	var permalink = small.getElementsByTagName('a')[0];
	  	var h4 = said.getElementsByTagName('h4')[0];
	  	if (h4 && h4.getElementsByTagName('a').length > 0) {
	  		var username = h4.getElementsByTagName('a')[0].textContent;
	  		if (username == '') {
	  			//admin username
	  			username = h4.getElementsByTagName('a')[1].textContent;	
	  		}
	  		small.insertBefore(document.createTextNode(localiser.localise('reply with') + ' '),permalink);
	  		var nameA = small.insertBefore(document.createElement('a'),permalink);
	  		nameA.href='javascript:;';
	  		nameA.innerHTML = localiser.localise('name');
	  		nameA.className = 'Plain';
	  		nameA.addEventListener('click', (function(a,b) { return function(){usernameItAuto(a,b)};})(username,messageIndex),false);
	  		if (imgSrc.indexOf('http://l.yimg.com/g/images/buddyicon.jpg') == -1) {
	  			small.insertBefore(document.createTextNode(' | '),permalink);
	  			var iconA = small.insertBefore(document.createElement('a'),permalink);
	  			iconA.href='javascript:;';
	  			iconA.innerHTML = localiser.localise('icon');
	  			iconA.className = 'Plain';
	  			iconA.addEventListener('click',(function(a,b) {return function() {imgItAuto(a,b)};})(imgSrc,messageIndex),false);
	  			small.insertBefore(document.createTextNode(' | '),permalink);
                                  
	  			var mix = small.insertBefore(document.createElement('a'),permalink);
	  			mix.href='javascript:;';
	  			mix.innerHTML = localiser.localise('icon&name');
	  			mix.className = 'Plain';
	  			mix.addEventListener('click',(function(a,b,c) {return function() {bothItAuto(a,b,c)};})(username,imgSrc,messageIndex),false);
	  		}
	  		small.insertBefore(document.createTextNode(' or '),permalink);
	  	}	
	  }
  }
}
