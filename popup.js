var settings = [false,false,false];
chrome.storage.sync.get('settings', function(data) {
settings = data.saved;
});
var unsaved = settings;
// if(buttonDown){
//     unsaved[0] = !unsaved[0]
// }

chrome.storage.sync.set({ saved: [false,false,false] });
