var dict = new ReactiveDict('surveyDict');
Template.createSurvey.events({
    "submit .new-survey": function(event) {
        event.preventDefault();

        var title = event.target.title.value;

        dict.set("title", event.target.title.value);
        dict.set("surveyProcessing", true);

        event.target.title.value = "";
    },
    "submit .new-survey-option": function(event) {
        event.preventDefault();

        var text = event.target.text.value;
        if (text == "") {
            alert("Please name the option");
            return false;
        } else if (dict.get("surveyOptions") && dict.get("surveyOptions").indexOf(text) != -1) {
            alert("Option is already existent");
            return false;
        }

        var options = new Array();

        if (dict.get("surveyOptions")) options = options.concat(dict.get("surveyOptions"));
        options = options.concat(text);

        dict.set("surveyOptions", options);
        event.target.text.value = "";
    },
    "click .survey-save": function() {
        if (dict.get("surveyOptions").length < 2) {
            alert("Please add at least two options");
            return false;
        }
        Meteor.call("addSurvey", dict.get("title"), dict.get("surveyOptions"));
        dict.set("title", undefined);
        dict.set("surveyOptions", undefined);
    },
    "click .survey-cancel": function() {
        dict.set("title", undefined);
        dict.set("surveyOptions", undefined);
    },
    "click .delete-option": function(event) {
        var options = dict.get("surveyOptions").filter(check);
        dict.set("surveyOptions", options);

        function check(text) {
            return text != event.target.value;
        }
    }
});

Template.createSurvey.helpers({
    getSurveyTitle: function() {
        return dict.get("title");
    },
    surveyOptions: function() {
        return dict.get("surveyOptions");
    }
});
