import {Mongo} from 'meteor/mongo';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Jobs = new Mongo.Collection('jobs');

let schema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  }
});

Jobs.attachSchema(schema);

export default Jobs;
