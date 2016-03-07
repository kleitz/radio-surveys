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
        window.prompt("Copy to clipboard: Ctrl+C or cmd+C, Enter", Router.current().originalUrl + event.target.value);
    }
});

Template.survey.helpers({
    getSurveyLink: function() {
        var link = "surveys/" + this._id;
        return link;
    }
});
