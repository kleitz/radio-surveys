Template.voteSurvey.helpers({
    getSurvey: function() {
        return Surveys.findOne({
            _id: this._id
        });
    },
    getSurveyOptions: function() {
        var survey = Surveys.findOne({
            _id: this._id
        });
        var options = survey.options;
        var surveyOptions = new Array();
        for (var key in options) {
            surveyOptions.push(key);
        }
        return surveyOptions;
    },
    isVoted: function() {
        return Session.get("voted");
    }
});

Template.voteSurvey.events({
    "submit .vote-for-survey": function(event) {
        event.preventDefault();
        var target = -1;
        for (var i = 0; i < event.currentTarget.length; i++) {
            if (event.currentTarget[i].checked) target = i;
        }

        if (target == -1) {
            alert('Please choose an option!')
        } else {
            Meteor.call("voteSurvey", this._id, event.currentTarget[target].value, function() {
                Session.set("voted", true);
            });
        }
    }
});
