({
	doInit : function(component, event, helper) {
        var visualforceDomain = "https://" + component.get("v.visualforceDomain");
        /**
         * Adding a new event listner on window object
         * to listen for message event
         **/
        window.addEventListener("message", function(event) {
            //Check if origin is not your org's my domain url, in this case, simply return out of function
            if (visualforceDomain.indexOf(event.origin) == -1) {
                // Not the expected origin: reject message!
                console.error('Discarding Message | Message received from invalid domain: ',event.origin);
                return;
            }
            // Handle the message event here
            console.log('Lightning Gets: ', event.data);
            //upserting the event
            helper.upsertCalendarEvent(component, event.data);
        }, false);
        
        
    },

    onVFLoad : function(component, event, helper) {
        helper.getUserEvents(component);
    }


})
