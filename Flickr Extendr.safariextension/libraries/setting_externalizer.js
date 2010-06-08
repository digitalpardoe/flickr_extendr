function getSettings(settings, callback) {
  for (var i in settings) {
    settings[i] = new Setting(settings[i], null);
  }
    
	safari.self.tab.dispatchMessage("getSettings", new SettingsMessage(settings, callback))
}

function getAnswer(theMessageEvent) {
	if (theMessageEvent.name == "theAnswer") {
		settingValue = theMessageEvent.message;
		settings = new Array();
		for (var i in settingValue.settings) {
		  settings[settingValue.settings[i].key] = settingValue.settings[i].val;
		}
		eval(settingValue.callback + "(settings)");
	}
}

safari.self.addEventListener("message", getAnswer, false);

function SettingsMessage(settings, callback) {
  this.settings = settings;
  this.callback = callback;
}

function Setting(key, val) {
  this.key = key;
  this.val = val;
}
