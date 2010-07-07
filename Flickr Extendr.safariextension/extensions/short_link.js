// http://userscripts.org/scripts/show/63457

getSettings(['shortLink'], 'shortLink');

function shortLink(settings) {
  if (settings['shortLink'] == true) {

    var rev = document.querySelector("link[rel='canonical']");
    if (rev) {
      if (document.getElementById("sidebar")) {
        var shortCode = FlickrBase58(rev.href.match(/^https?:\/\/[^\/]*\bflickr\.com\/(photos\/[^\/]+\/(\d+))/i)[2]);
        var shortUrl = "http://flic.kr/p/" + shortCode;
        
        var sidebarComponent = document.createElement("div");
        sidebarComponent.setAttribute("id","flickr_extendr");
        sidebarComponent.setAttribute("style","color:#999;");
        
        var sidebarHeading = document.createElement("h4");
        sidebarHeading.innerHTML = "Flickr extendr";
        sidebarHeading.setAttribute("style","margin-bottom:0.6em;");
        
        var sidebarContent = document.createElement("p");
        sidebarContent.innerHTML = "Short link: " + "<a href=\"" + shortUrl + "\">" + shortUrl + "</a>";
        
        sidebarComponent.appendChild(sidebarHeading);
        sidebarComponent.appendChild(sidebarContent);
        
        var sidebar = document.getElementById("sidebar-contexts");
        sidebar.appendChild(sidebarComponent);
      }
    }

  }
}

function FlickrBase58(num) {
    if(typeof num !== 'number') {
        num=parseInt(num);
    }

    var enc='', alpha='123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    var div=num,mod;

    while(num>=58) {
        div=num/58;
        mod=num-(58*Math.floor(div));
        enc=''+alpha.substr(mod,1)+enc;
        num=Math.floor(div);
    }

    return(div)?''+alpha.substr(div,1)+enc:enc;
}
