// http://userscripts.org/scripts/show/63457

getSettings(['shortLink'], 'shortLink');

function shortLink(settings) {
  if (settings['shortLink'] == true) {

    var rev = document.querySelector("link[rev='canonical']");
    if (rev) {
      if (document.getElementById("button_bar")) {

        pid = location.pathname.split('/')[3];

        var containerA = document.createElement("li");
        containerA.setAttribute("class","Stats");
        var linkA = 'Short link: ';
        linkA    += '<a href="' + rev.href + '">' + rev.href + '</a>';
        containerA.innerHTML = linkA;

        addlInfo = document.evaluate("//li[contains(@class,'Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;  // This broke before, let's see
        addlInfo.appendChild(containerA);
      }
    }
  }
}