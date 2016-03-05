Template.results.helpers({
    getSurvey: function() {
        return Surveys.findOne({
            _id: this._id
        });
    },
    getSurveyValues: function() {

    }
});

Template.results.rendered = function() {
    if (!this._rendered) {
        this._rendered = true;
        var options = Surveys.findOne(Session.get("resultsId")).options;
        var optionKeys = new Array();
        var optionValues = new Array();
        for (var key in options) {
            optionKeys.push(key);
            optionValues.push(options[key]);
        }
        var voteSum = 0;
        optionValues.forEach(function(s, i, o) {
            voteSum += s;
        });
        optionValues.forEach(function(s, i, o) {
            optionValues[i] = Math.round((s / voteSum) * 1000) / 10;
        });
        Chart.defaults.global.animation = false;
        Chart.defaults.global.responsive = true;
        var ctx = document.getElementById("myChart").getContext("2d");
        var data = {
            labels: optionKeys,
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: optionValues
            }]
        };
        var myBarChart = new Chart(ctx).Bar(data, options);

    }
}
