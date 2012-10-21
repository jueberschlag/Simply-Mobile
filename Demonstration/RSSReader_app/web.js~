var express = require('express');

var app = express.createServer(express.logger());
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var Buffer = require('buffer').Buffer;
var nativeZip = require("node-native-zip");
var ejs = require('ejs');
var _ = require('./lib/underscore');

// Mongojs init
var databaseUrl = "mongodb://toChange";
// TODO "username:password@example.com/mydb"
var collections = ["RSS"];
var db = require("mongojs").connect(databaseUrl, collections);
var ObjectId = require("mongojs").ObjectId;

app.get('/rssSources', function(request, response) {
    db.RSS.find({login : "jerome"}).toArray(function(error, data) {
        if (error) {
            console.log('error getContract');
            response.send('error database');
        }
        else {
            if (data[0]) {
                response.send(JSON.stringify(data[0].sources));
            }
            else {
                response.send(JSON.stringify([]));
            }
        }
    });
});


app.delete('/rssSources/:id', function(request, response) {
    var object = request.body;
    db.RSS.find({login : "jerome"}).toArray(function(error, data) {
        if (error) {
            response.send('error database');
        }
        else {
            var currentSources = data[0].sources;
            var newSource = [];
            console.log('delete object : ' + JSON.stringify(request.params.id));
            for (var currentIndex in currentSources) {
                if (currentSources[currentIndex].id != request.params.id) {
                    newSource.push(currentSources[currentIndex]);
                }
            }

            db.RSS.update({login : "jerome"}, { $set : {sources : newSource} }, function(error, updated) {
                    response.contentType('json');
                    response.json({data : newSource});
            });

        }
    });
});

app.put('/rssSources/:id', function(request, response) {
    var object = request.body;
    db.RSS.find({login : "jerome"}).toArray(function(error, data) {
        if (error) {
            response.send('error database');
        }
        else {
            var currentSources = data[0].sources;
            var newSource = [];
            for (var currentIndex in currentSources) {
                if (currentSources[currentIndex].id == object.id) {
                    newSource.push({id : currentSources.length + 1 ,name : object.name, host : object.host, path : object.path});
                } 
                else {
                    newSource.push(currentSources[currentIndex]);
                }
            }

            db.RSS.update({login : "jerome"}, { $set : {sources : newSource} }, function(error, updated) {
                     if (error) {
                        response.send('error database');
                    }
                    else {
                        response.send(JSON.stringify(updated));
                    }
                });

        }
    });
});

app.post('/rssSources', function(request, response) {
    var object = request.body;
    db.RSS.find({login : "jerome"}).toArray(function(error, data) {
        if (error) {
            response.send('error database');
        }
        else {
            var currentSources = data[0].sources;
            object.id = currentSources.length + 1;
            db.RSS.update({login : "jerome"}, {$push : {sources : object}}, function(error, updated) {
                 if (error) {
                    response.send('error database');
                }
                else {
                    response.send(JSON.stringify(updated));
                }
            });
        }
    });
});


app.get('/rss', function(request, response) {
    db.RSS.find({login : "jerome"}).toArray(function(error, data) {
        if (error) {
            console.log('error getContract');
            response.send('error database');
        }
        else {
            var toFetchRss = data[0].sources;
            var resultNum = 0;
            var sendRequest = 0;
            var rssResult = [];

            var intervalRequest = setInterval(function () {
                if (sendRequest == resultNum && sendRequest < toFetchRss.length) {
                    sendRequest = sendRequest + 1;
                    var body = "";
                    var options = {
                        host : toFetchRss[resultNum].host,
                        port : 80,
                        path : toFetchRss[resultNum].path,
                        method : 'GET'
                    };
                    var req = http.request(options, function(res) {
                        res.on('data', function(chunk) {
                            body += chunk;
                        });
                        res.on('end', function() {
                            var toReturn = getRSS(body);
                            rssResult = rssResult.concat(toReturn);
                            resultNum = resultNum + 1;
                        });
                    });
                    req.on('error', function(e) {
                        response.send('problem with request: ' + e.message);
                    });
                    req.end(); 
                }
            }, 10);

            var interval = setInterval(function () {
                if (toFetchRss.length == resultNum) {
                    clearInterval(intervalRequest);
                    clearInterval(interval);
                    response.send(JSON.stringify(rssResult));
                }
            }, 10);
        }
    });
       
});

function getRSS(xml) {
    var parser = new xml2js.Parser({
        explicitArray : true,
        ignoreAttrs : true
    });
    var toReturn = null;

    parser.parseString(xml, function(err, result) {
        var toReturnList = [];
        if (err) {
            console.log(parserError + 'getRSS ');
        } else if (result.hasOwnProperty('channel')) {

            for (var feedIndex in result.channel[0].item) {
                var currentFeed = result.channel[0].item[feedIndex];
                var toReturnFeed = {};
                toReturnFeed.title = currentFeed.title[0];
                toReturnFeed.description = currentFeed.description[0];
                toReturnFeed.link = currentFeed.link[0];
                // toReturnFeed.authors = currentFeed.authors[0];
                // toReturnFeed.comments = currentFeed.comments[0];
                toReturnFeed.pubDate = currentFeed.pubDate[0];
                toReturnList.push(toReturnFeed);
            }
        }
        //response.send(JSON.stringify(toReturn));
        toReturn = toReturnList;
    });

    while(toReturn == null) {}

    return toReturn;
}

app.get('/apps', function(request, response) {
    //Read / parse all conf files
    var appFile = fs.readFileSync('apps/RSSReader/app.json');
    var jsonAppParse = JSON.parse(appFile);
    var confFile = fs.readFileSync('apps/RSSReader/conf.json');
    var jsonConfParse = JSON.parse(confFile);

    // Read all template files
    var tiappTemplate = fs.readFileSync('Resources/template/tiappTemplate.ejs', 'utf8');
    var baseTemplate = fs.readFileSync('Resources/template/baseTemplate.ejs', 'utf8');
    var appTemplate = fs.readFileSync('Resources/template/appTemplate.ejs', 'utf8');

    // Create all the template results
    var tiappResult = ejs.render(tiappTemplate, {app : jsonAppParse, ejs : ejs, fs : fs}); 
    var baseResult = ejs.render(baseTemplate, {module : jsonConfParse, ejs : ejs, fs : fs}); 
    var appResult = ejs.render(appTemplate, {app : jsonAppParse, ejs : ejs, fs : fs}); 

    // Read all lib files
    var backboneCollectionBinder = fs.readFileSync('Resources/template/lib/Backbone.CollectionBinder.Ti.js', 'utf8');
    var backboneCollectionUpdate = fs.readFileSync('Resources/template/lib/Backbone.CollectionUpdate.js', 'utf8');
    var backboneDeepModel = fs.readFileSync('Resources/template/lib/Backbone.DeepModel.js', 'utf8');
    var backboneModelBinder = fs.readFileSync('Resources/template/lib/Backbone.ModelBinder.Ti.js', 'utf8');
    var backboneSync = fs.readFileSync('Resources/template/lib/Backbone.Sync.Ti.js', 'utf8');
    var backboneFile = fs.readFileSync('Resources/template/lib/backbone.js', 'utf8');
    var backboneSubset = fs.readFileSync('Resources/template/lib/backbone.subset.js', 'utf8');
    var backboneUtils = fs.readFileSync('Resources/template/lib/Backbone.Utils.js', 'utf8');
    var sjclFile = fs.readFileSync('Resources/template/lib/sjcl.js', 'utf8');
    var underscoreFile = fs.readFileSync('Resources/template/lib/underscore.js', 'utf8');
    var utilsFile = fs.readFileSync('Resources/template/lib/utils.js', 'utf8');
    var dataManagementFile = fs.readFileSync('Resources/template/lib/dataManagement.js', 'utf8');
    var loaderFile = fs.readFileSync('Resources/template/lib/loader.js', 'utf8');
    //Images
    var spinnerImage = fs.readFileSync('Resources/template/images/spinner.png');
    if (jsonAppParse.icon) {
        var appIcon = fs.readFileSync('apps/' + jsonConfParse.moduleName + '/images/' + jsonAppParse.icon);
    }
    if (jsonAppParse.splashScreen) {
        var splashScreen = fs.readFileSync('apps/' + jsonConfParse.moduleName + '/images/' + jsonAppParse.splashScreen);
    }

    var downloadZip = new nativeZip();
    downloadZip.add("tiapp.xml", new Buffer(tiappResult));
    downloadZip.add("Resources/app.js", new Buffer(appResult));
    //controller files
    downloadZip.add("Resources/controller/dataManagement.js" , new Buffer(dataManagementFile));
    downloadZip.add("Resources/controller/loader.js" , new Buffer(loaderFile));

    if (jsonAppParse.icon) {
        downloadZip.add("Resources/android/" + jsonAppParse.icon, new Buffer(appIcon));
        downloadZip.add("Resources/iphone/" + jsonAppParse.icon, new Buffer(appIcon));
    }
    if (jsonAppParse.splashScreen) {
        downloadZip.add("Resources/android/default.png", new Buffer(splashScreen));
        downloadZip.add("Resources/iphone/Default.png", new Buffer(splashScreen));
    }
    //lib files
    downloadZip.add("Resources/lib/Backbone.CollectionBinder.Ti.js" , new Buffer(backboneCollectionBinder));
    downloadZip.add("Resources/lib/Backbone.CollectionUpdate.js" , new Buffer(backboneCollectionUpdate));
    downloadZip.add("Resources/lib/Backbone.DeepModel.js" , new Buffer(backboneDeepModel));
    downloadZip.add("Resources/lib/Backbone.Utils.js" , new Buffer(backboneUtils));
    downloadZip.add("Resources/lib/Backbone.ModelBinder.Ti.js" , new Buffer(backboneModelBinder));
    downloadZip.add("Resources/lib/Backbone.Sync.Ti.js" , new Buffer(backboneSync));
    downloadZip.add("Resources/lib/backbone.js" , new Buffer(backboneFile));
    downloadZip.add("Resources/lib/backbone.subset.js" , new Buffer(backboneSubset));
    downloadZip.add("Resources/lib/sjcl.js" , new Buffer(sjclFile));
    downloadZip.add("Resources/lib/underscore.js" , new Buffer(underscoreFile));
    downloadZip.add("Resources/utils.js" , new Buffer(utilsFile));
    //ui files
    downloadZip.add("Resources/ui/" + jsonConfParse.moduleName + '.js', new Buffer(baseResult));
    //images folder
    downloadZip.add("Resources/images/spinner.png", new Buffer(spinnerImage));

    response.send(downloadZip.toBuffer());
});
