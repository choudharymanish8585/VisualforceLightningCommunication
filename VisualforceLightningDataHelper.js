({
	getUserEvents : function(component) {
		//Call server action to get events
        var action = component.get("c.getEvents");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
				//Sending response to visualforce page                
                this.sendToVF(component, JSON.stringify(response.getReturnValue()));
                //Show success toast
                this.showToast({
                        "title": "SUCCESS",
                        "type": "success",
                    	"message": "User Events Loaded"
                });
            } else{
                //Show failure toast
                this.showToast({
                        "title": "ERROR",
                        "type": "error",
                        "message": "Error in retrieving events"
                    });
            }
        });
        
        $A.enqueueAction(action);
	},
    
    upsertCalendarEvent : function(component, calendarEvent) {
		//Call server action to upser events
        var action = component.get("c.createOrUpdateEvent");
        action.setParams({
            calendarEvent : calendarEvent
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //Sending response to visualforce page                
                this.sendToVF(component, JSON.stringify(response.getReturnValue()));
                //Show success toast
                this.showToast({
                        "title": "Success",
                        "type": "success",
	                    "message": "User Event Upserted"
                });
            } else{
                //Show failure toast
                this.showToast({
                        "title": "ERROR",
                        "type": "error",
                        "message": "Error in upserting event"
                    });
            }
        });
        
        $A.enqueueAction(action);
	},
    
        
    /**
     * This function will be sending the data to visualforce page's window
     * object using postMessage function
     * */
    sendToVF : function(component, message) {
		console.log('Lightning Sends: ', message);
        const visualforceDomain = 'https://'+component.get('v.visualforceDomain');

        //Visualforce Page's iframe window object
        const vfWindow = component.find("vfFrame").getElement().contentWindow;
		//Sending message using postMessage function
		//If sending an json object, its better to stringify first and send the object
        vfWindow.postMessage(message, visualforceDomain);
        //resetting my text box with blank value
        //component.set("v.message", "");
	},
        
    /*
     * This function displays toast based on the parameter values passed to it
     * */
    showToast : function(params) {
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            if(!params){
                toastEvent.setParams({
                    "title": "TOAST ERROR!",
                    "type": "error",
                    "message": "Toast Param not defined"
                });
                toastEvent.fire();
            } else{
                toastEvent.setParams(params);
                toastEvent.fire();
            }
        }
    },
})
