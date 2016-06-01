# i18n-monitor

This is a little helper app which connects to a google spreadsheet and generates JSON or JS files for translation keys.

At the moment there is only the console based version of the app working, which depends on settings.json file as configuration. A simple GUI is work in progress :)

## Setup

1. git clone this repository
2. setup your google project and `private/google-key.pem` file following these [steps](https://github.com/ongoworks/meteor-google-spreadsheets#package-setup)
3. setup your `settings.json` file
4. run `i18n-monitor` to poll spreadsheet

## Supported i18n solutions (packages)

[anti:i18n](https://github.com/anticoders/meteor-i18n)
Slim solutions for small projects, uses JS Objects

[tap:i18n](https://github.com/TAPevents/tap-i18n)
Pretty complete solution with almost all use-cases covered, uses JSON format
 

## settings.json options

You will find an example file within the `settings.example.json`.

You can define multiple jobs within the JSON file which get exported to the specific folders.

```json
{
  "jobs": [
    {
      "spreadsheetId": "YOUR_SPREADSHEET_ID",
      "worksheetIndex": "1",
      "serviceEmail": "YOUR_GOOGLE_SERVICE_EMAIL",
      "outputFolder": "LOCAL_PATH_TO_YOUR_METEOR_APP_FOLDER",
      "validLanguages": ["de","fr","it"],
      "pollTimeout": 30000,
      "outputFormat": "js",
      "outputFileExtension": ".i18n.js"
    },
    {
      "spreadsheetId": "YOUR_SPREADSHEET_ID",
      "worksheetIndex": "2",
      "serviceEmail": "YOUR_GOOGLE_SERVICE_EMAIL",
      "outputFolder": "LOCAL_PATH_TO_YOUR_METEOR_APP_FOLDER",
      "validLanguages": ["de","fr","it"],
      "pollTimeout": 30000,
      "outputFormat": "json",
      "outputFileExtension": ".i18n.json"
    }
  ]
}
```

## Run i18n-monitor

```js
git clone https://github.com/ddresch/meteor-i18n-monitor i18n-monitor
cd i18n-monitor
npm install
meteor --settings settings.json
```

**ATTENTION**
To run `npm install` you need to install at least version 3.0.0 of `npm`.
