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
