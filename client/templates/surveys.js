Template.survey.events({
    "click .delete": function() {
        var result = confirm("Really want to delete?");
        if (result) {
            Meteor.call("deleteSurvey", this._id);
        }
    },
    "click .view-results": function() {
        Router.go('/results/' + this._id);
    },
    "click .view-survey": function(event) {
        Router.go(event.target.value);
    },
    "click .copy-link": function(event) {
        //Metero.absoluteUrl() returns 0.0.0.0.:8000 on c9.io. Need to find out how to get/set the server ip/adress.
        // Hardcoded the adress on c9. Okay for testing purposes.
        window.prompt("Copy to clipboard: Ctrl+C or cmd+C, Enter", Meteor.absoluteUrl()+event.target.value);
    }
});

Template.survey.helpers({
    getSurveyLink: function() {
        var link = "surveys/" + this._id;
        return link;
    }
});
