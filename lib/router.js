Router.route('/', function() {
    Meteor.subscribe("surveys");
    this.render('home');
});

Router.route('/surveys/:_surveyId', function() {
    Meteor.subscribe("voteSurveys");
    if (Surveys.findOne(this.params._surveyId)) {
        Session.set("voted", false);
        this.render('voteSurvey', {
            data: function() {
                return Surveys.findOne({
                    _id: this.params._surveyId
                });
            }
        });
    } else {
        this.render('voteSurvey404');
    }

}, {
    name: 'survey.vote'
});

Router.route('/results/:_surveyId', function() {
    Meteor.subscribe("surveys");
    if (Surveys.findOne(this.params._surveyId)) {
        Meteor.subscribe("votes");
        //Dirty doing this with the session. Potentially unsafe. Have to find a better solution. But okay for testing purposes.
        Session.set("resultsId", this.params._surveyId);
        this.render('results', {
            data: function() {
                return Surveys.findOne({
                    _id: this.params._surveyId
                });
            }
        });
    } else {
        this.render('results404');
    }
});
