import { Meteor } from 'meteor/meteor';
import publications from './publications';
import methods from './methods';

publications();
methods();

var lastUpdate = undefined;
var timestamps = {};

Meteor.startup(function(){
  // callback function
  var methodCb = function(error,result){
    if(error){
      console.log('Ooops! There was a error: ', error.reason);
      console.log(error);
    }else{
      console.log('Done, translations are up-to-date now.');
    }
  };

  var runJob = function(job, index){
    console.log('Pull from spreadsheet with ID: ', job.spreadsheetId);
    Meteor.call('jobs.pullTranslations', job, methodCb);
    var result = Meteor.call("spreadsheet/fetch2", job.spreadsheetId, job.worksheetIndex, {
      email: job.serviceEmail, isSpreadsheetId: true
    });
    timestamps[index] = result.info.worksheetUpdated;
  }

  // check if we got some jobs defined
  if(Meteor.settings.jobs){
    _.each(Meteor.settings.jobs, function(job, index){
      // do initial job run
      runJob(job, index);
      // is there a pollTimeout in ms defined
      if(job.pollTimeout){
        // let's start a simple poll
        Meteor.setInterval(function(){
          var result = Meteor.call("spreadsheet/fetch2", job.spreadsheetId, job.worksheetIndex, {
            email: job.serviceEmail, isSpreadsheetId: true
          });
          // check if we need to update translations
          if(timestamps[index] < result.info.worksheetUpdated){
            runJob(job, index);
          }
        }, job.pollTimeout);
      }
    });
  }
});
