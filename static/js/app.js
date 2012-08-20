$(document).ready(function() {
    // Hide overlay for flash messages
    var closeOverlay = function(event) {
        var backing = $(event.target).closest(".message_overlay_backing");
        backing.fadeOut(500, function() {
            backing.remove();
        });
    };
    
    $(".message_overlay_backing").on("click", closeOverlay);
    $(".message_overlay .close_button").on("click", function(event) {
        event.preventDefault();
        closeOverlay(event);
    });
    $(".message_overlay").on("click", function(event) {
        event.stopPropagation();
    });
    
    
    // Subscription form validation
    var emailPattern = /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i;
    var subscriptionForm = $("#subscription_form");
    var emailInput = $("#update_email");
    var message = null;
    
    subscriptionForm.on("submit", function(event) {
        value = emailInput.val();
        if (emailPattern.test(value)) {
            subscriptionForm.removeClass("invalid");
            subscriptionForm.find("input[type='submit']")[0].disabled = true;
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            subscriptionForm.addClass("invalid");
            
            if (!message) {
                message = document.createElement("p");
                message.className = "error_message";
                message.appendChild(document.createTextNode("Please use a valid e-mail address."));
                emailInput.after(message);
            }
        }
    });
    
    // delay setting of form action to cut down on form spam
    // this has the unfortunate side-effect of requiring JS for this form :\
    $(window).on("load", function() {
        setTimeout(function() {
            subscriptionForm.attr("action", subscriptionForm.attr("data-action"))
        }, 1000);
    });
    
    
    if ("createTouch" in document) {
        // Show the numeric keyboard for request input
        // but don't have the browser validate, because non-numeric characters (e.g. "-") may be input
        $("input[name='request_id']").each(function(index, element) {
            // need to use each because jQuery attr() explicitly refuses setting "type"
            try {
                element.setAttribute("type", "number");
            }
            catch(ex) {}
        }).on("focus", function() {
            // change the type back to text so browser doesn't try and validate
            this.type = "text";
            // sadly, we can't change the type back to "number" later or everything gets blown away :(
            // this means the second time the user taps, they won't get the number keyboard.
        });
    }
});
