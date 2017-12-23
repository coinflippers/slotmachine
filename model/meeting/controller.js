const Controller = require('../../lib/controller');
const meetingFacade = require('./facade');
var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init(`http://${process.env.JENKINS_USERNAME}:${process.env.JENKINS_PASSWORD}@194.47.174.55:8080`);

class MeetingController extends Controller {

    apiTest(req, res, next) {
        console.log(req.body);

        //var testresult = req.body.url + 'testReport/api/json';
        jenkins.test_result('xx00xx-exam-1', '45', function(err, data) {
            if(err){console.log(err);}
            console.log(data);
        });

    }
}

module.exports = new MeetingController(meetingFacade);
