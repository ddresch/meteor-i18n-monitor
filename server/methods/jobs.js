import {Jobs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

const fs = require('fs');

export default function () {
  Meteor.methods({
    'jobs.create'(_id, title, content) {
      check(_id, String);
      check(title, String);
      check(content, String);

      // Demo the latency compensations (Delete this in production)
      Meteor._sleepForMs(500);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const job = {_id, title, content, createdAt};
      Jobs.insert(job);
    }
  });

  Meteor.methods({
    'jobs.pullTranslations'(options) {
      var spreadsheetId = options.spreadsheetId;
      var serviceEmail = options.serviceEmail;

      // define list of language codes which are available as columns in spreadsheet
      var validLanguages = options.validLanguages;
      // storage object
      var outputFiles = {};
      // where do you want to store your output files
      // this default is based on .meteor/local/build/programs/server running node.js
      // needs to be absolute or starting from .meteor location like this one which ends up in project root
      var outputFolder = '../../../../../i18n';
      // override default via settings.json
      if(options.outputFolder) outputFolder = options.outputFolder;

      // valid are json, i18n, t9n
      var outputFormat = 'i18n';
      // override default via settings.json
      if(options.outputFormat) outputFormat = options.outputFormat;

      // will be appended to language code e.g. de.i18n.js
      var outputFileExtension = '.i18n.js';
      // override default via settings.json
      if(options.outputFileExtension) outputFileExtension = options.outputFileExtension;

      var result = Meteor.call("spreadsheet/fetch2", spreadsheetId, options.worksheetIndex, {email: serviceEmail, isSpreadsheetId: true});

      // Gather property names
      var propNames = {};
      _.each(result.rows, function (rowCells, rowNum) {
        var doc = {};
        _.each(rowCells, function (val, colNum) {
          if (+rowNum === 1) {
            propNames[colNum] = val;
          } else {
            var propName = propNames[colNum];
            if (propName) {
              doc[propName] = val;
            }
          }
        });
        if (+rowNum > 1) {
          validLanguages.map(function(lang){
            // init module keys if needed
            if(!outputFiles[lang]) outputFiles[lang] = {};
            // only add if a module is defined
            if(doc.module){
              if(!outputFiles[lang][doc.module]) outputFiles[lang][doc.module] = {};
              // only add if label is defined
              if(doc.label && doc[lang]) outputFiles[lang][doc.module][doc.label] = doc[lang];
            }
          });
        }
      });

      validLanguages.map(function(lang){
        var out = '';
        if(outputFormat == 'i18n'){
          out += "i18n.map('" + lang + "', JSON.parse('"
          out += JSON.stringify(outputFiles[lang]).replace(/'/g, "\\'");
          out += "'));";
        }
        if(outputFormat == 'json'){
          out += JSON.stringify(outputFiles[lang], null, 2);
        }
        var outFilepath = outputFolder + '/' + lang + outputFileExtension;
        fs.writeFileSync(outFilepath, out);
        console.log('Wrote file: ', outFilepath);
      });

      console.log('Wait for change of spreadsheet with ID:', options.spreadsheetId);

      return result;
    }
  });
}
