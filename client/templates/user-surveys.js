Template.userSurveys.helpers({
    surveys: function() {
        return Surveys.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },
    haveSurveys: function() {
        if (Surveys.findOne() != null) return true;
        return false;
    }
});
