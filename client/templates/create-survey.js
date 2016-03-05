Template.createSurvey.events({
    "submit .new-survey": function(event) {
        event.preventDefault();

        var title = event.target.title.value;

        Session.set("title", event.target.title.value);
        Session.set("surveyProcessing", true);

        event.target.title.value = "";
    },
    "submit .new-survey-option": function(event) {
        event.preventDefault();

        var text = event.target.text.value;
        if (text == "") {
            alert("Please name the option");
            return false;
        } else if (Session.get("surveyOptions") && Session.get("surveyOptions").indexOf(text) != -1) {
            alert("Option is already existent");
            return false;
        }

        var options = new Array();

        if (Session.get("surveyOptions")) options = options.concat(Session.get("surveyOptions"));
        options = options.concat(text);

        Session.set("surveyOptions", options);
        event.target.text.value = "";
    },
    "click .survey-save": function() {
        if (Session.get("surveyOptions").length < 2) {
            alert("Please add at least two options");
            return false;
        }
        Meteor.call("addSurvey", Session.get("title"), Session.get("surveyOptions"));
        Session.set("title", undefined);
        Session.set("surveyOptions", undefined);
    },
    "click .survey-cancel": function() {
        Session.set("title", undefined);
        Session.set("surveyOptions", undefined);
    },
    "click .delete-option": function(event) {
        var options = Session.get("surveyOptions").filter(check);
        Session.set("surveyOptions", options);

        function check(text) {
            return text != event.target.value;
        }
    }
});

Template.createSurvey.helpers({
    getSurveyTitle: function() {
        return Session.get("title");
    },
    surveyOptions: function() {
        return Session.get("surveyOptions");
    }
});
