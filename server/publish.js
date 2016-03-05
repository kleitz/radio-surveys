Meteor.publish("surveys", function() {
    return Surveys.find({
        owner: this.userId
    });
});
Meteor.publish("voteSurveys", function() {
    return Surveys.find();
})
Meteor.publish("votes", function() {
    return Votes.find({
        owner: this.userId
    });
});
