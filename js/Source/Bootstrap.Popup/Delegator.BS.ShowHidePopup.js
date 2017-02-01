/*
---

name: Delegator.BS.ShowPopup

description: Shows a hidden popup.

authors: [Aaron Newton]

license: MIT-style license.

requires:
 - Behavior/Delegator
 - Behavior/Behavior
 - Behavior.BS.Popup

provides: [Delegator.BS.ShowPopup, Delegator.BS.HidePopup]

...
*/

(function(){

  var triggers = {};

  ['show', 'hide'].each(function(action){

    triggers['BS.'+ action + 'Popup'] = {
      handler: function(event, link, api){
        var target = api.get('target') ? link.getElement(api.get('target')) : document.id(link.get('href').split("#")[1]);
        event.preventDefault();
        if (!target) api.fail('Could not find target element to activate: ' + (api.get('target') || link.get('href')));
        api.getBehavior().apply(target);
        target.getBehaviorResult('BS.Popup')[action]();
      }
    };

  });

  Delegator.register('click', triggers);

})();
