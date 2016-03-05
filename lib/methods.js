Meteor.methods({
    voteSurvey: function(id, option) {
        var query = {};
        query['options.' + option] = 1;
        Surveys.update({
            _id: id
        }, {
            $inc: query
        });
    },
    addSurvey: function(title, options) {
        console.log('survey add');
        var surveyOptions = "{";
        options.forEach(function(s, i, o) {
            surveyOptions += "\"" + s + "\":" + 0;
            if (i < options.length - 1) surveyOptions += ",";
        });
        surveyOptions += "}";
        var optionsJson = JSON.parse(surveyOptions);
        Surveys.insert({
            title: title,
            options: optionsJson,
            owner: Meteor.userId(),
            createdAt: new Date()
        });

    },
    deleteSurvey: function(surveyId) {
        var survey = Surveys.findOne(surveyId);
        if (survey.owner !== Meteor.userId()) {
            // If the survey is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }
        Surveys.remove(surveyId);
    }
});
