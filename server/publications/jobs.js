import {Jobs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('jobs.list', function () {
    return Jobs.find();
  });

  Meteor.publish('jobs.single', function (jobId) {
    check(jobId, String);
    const selector = {_id: jobId};
    return Jobs.find(selector);
  });
}
