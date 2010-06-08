// http://userscripts.org/scripts/show/9523

getSettings(['onBlack'], 'onBlack');

function onBlack(settings) {
  if (settings['onBlack'] == true) {
    
    if (document.getElementById("button_bar")) {

      pid = location.pathname.split('/')[3];

      var containerA = document.createElement("li");
      containerA.setAttribute("class","Stats");
      var linkA = 'View on black: ';
      linkA    += '<a href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '" style="text-decoration: none;">regular</a>, ';
      linkA    += '<a href="http://bighugelabs.com/flickr/onblack.php?id=' + pid + '&size=large" style="text-decoration: none;">large</a>';
      containerA.innerHTML = linkA;

      addlInfo = document.evaluate("//li[contains(@class,'Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;  // This broke before, let's see
      addlInfo.appendChild(containerA);
    }
  }
}
    