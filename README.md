#################################
 Simply Mobile -  Mobile Development Framework
#################################

# Introduction

Our mobile development framework relies on Appcelerator technology to allow you to develop an iPhone / Android native mobile application quickly and easily without writting any code.
All you have to provide is a configuration file containing information about your app such as the url from where to fetch data (if you want to have data-binding), the different windows of your application and interactions between windows.
Currently the part that generate the code for a module which can be included in an existing Appcelerator project is in beta-version and almost ready for a release.
The part that generate the whole application is in alpha version for the moment.

# Getting Started  
To use this framework, you will have to fork the repository or dowload the code.
We are using Node.js with some modules like express and ejs to generated the code. Here is a list of module that you will have to install:

- express
- ejs
- native-zip

Once you have the code on your computer, you can generate the code by calling our template with your configuration file.
Here is how to do it with

<pre>
var express = require('express');

var app = express.createServer(express.logger());
var fs = require('fs');
var ejs = require('ejs');
var Buffer = require('buffer').Buffer;
var nativeZip = require("node-native-zip");
 
//return the code for a module
app.get('/generateModuleCode', function(request, response) {
	var confFile = fs.readFileSync('apps/yourApplication/conf.json');
	var confFileParse = JSON.parse(confFile);
	var template = fs.readFileSync('Resources/template/baseTemplate.ejs', 'utf8');
	response.end(ejs.render(template, {module : confFileParse, ejs : ejs, fs : fs}));
});

//return a zip file containing all the application
app.get('/generateApplication', function(request, response) {
    //Read / parse all conf files
    var appFile = fs.readFileSync('apps/test/app.json');
    var jsonAppParse = JSON.parse(appFile);
    var confFile = fs.readFileSync('apps/test/conf.json');
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

</pre>

Here is how your folder structure should look:  

<pre>
- Resources
	- template
		- ui
        - lib
        - images
- apps
	- yourApplicationName
        - app.json
		- conf.json
		- styleSheet.json
		- images
			icon.png
			splashScreen.png
</pre>

# Application File  

This file is the entry configuration file of your application.  
It will be used with a configuration file to create an iPhone / Android mobile application.
Here is a list of attributes that you can put in this file:

- "applicationNameIcon": string that contain the name of your application as displayed on your application list (required)
- "applicationName": string that contain the code name of your application. This should not contain any blank space (required)
- "icon": string that contain the path of your application icon (optional, default to appicon.png). The icon should be place in the folder "apps/moduleName/images/" folder 
- "splashScreen": string that contain the path of your application loading screen (splashScreen) (optional). The icon should be place in the folder "apps/moduleName/images/" folder
- "version": string that contain the version of your application (optional)
- "publisher": string that contain the publisher name of your application (optional)
- "website": string that contain the url of your website (optional)
- "description": string that contain the description of your application (optional)
- "copyright" : string that contain the copyright of your application (optional)
- "serverUrl" : string that contain the url of your server (optional). If you are communicating with your server in the application this will be the default address that will be used,
- "target" : list of string representing build-targets (required). Targets are "iphone", "android" or "ipad" for the moment
- "manifest" : unused for now. Will contain the manifest content or path for android (optional)
- "allowVertical" : unused for now. Will contain a boolean to allow or not the portrait mode (optional, default to true)
- "allowHorizontal" : unused for now. Will contain a boolean to allow or not the landscape mode (optional, default to true)
- "baseFile" : string that contain the name of the module in conf.json (required)

Once you have written your application and your configuration files you can use the code in the Getting Started part to download the zip file containing your application files. To build your application you will have to use Appcelerator Studio and import a project from an existing folder (File -> Import -> Existing folder as a new project). Remeber to check "Titanium Mobile" in the check-list.  
We are currently working on a script to avoid the import in Titanium studio to build your application.


# Configuration File  

The entry point of your module is the main configuration file which will be named here conf.json.  
The framework use the configuration file to generate Appcelerator code. We remember you that this file is used to generate the code for a module which will be integrated in an existing Appcelerator project. To load the generated code you could just use Ti.App and fire the event "loadModuleName" where ModuleName should be replaced by the name of your module. To open the main window of the module, you could use Ti.App and fire the event "loadModuleName".  
Here is a list of attributes that you can put in this file:

- "moduleName": string that contains the name of the module (required). This name has to be the name of the module folder in the apps folder.
- "styleFile": string that contains the path of the style sheet file (optional). If this attribute is "style.json" and moduleName is set to "youreApplication" then the file has to be located at "apps/youreApplication/style.json"
- "autoRefresh": boolean to make periodic refresh of collections or not (optional)
- "refreshTime": integer that contains the refresh period in ms (required if autoRefresh exists, optional otherwise)
- "models": list of the models (optional)
- "collections": list of collections (optional)
- "require": list of strings that contain file path that will be needed for your application (optional). If you require the file "secondWindow.json" then this file has to be located at "apps/youreApplication/secondWindow.json"
- "views": list of views (required, must contain at least one view). The first view of your module must be placed at first position of this list


# Models / Collections  
The models and the collections allow you to store data locally or fetch data from a server.  
Here are all the models attributes:

- "name": string that contains the name of the model (required)
- "isDeepModel": boolean that specified if the model is a deepModel (optional). A deepModel si a model where you can have multiple level of attributes such as comment.content
- "collection": string that contains the name of the collection in which the model will be stored (required)
- "idAttribute": string that contains the name of the distinct attribute which will be use to identify a model in a collection (required)
- "function": list of functions that could be called for this model (optional). A function has 3 attributes which are
  - "name": string that contains the name of the function (required)
  - "triggerChange": list of events (string) that will trigger a call to this function (optional). Main events are "change" or "remove"
  - "functionContent": string that contains the content of the function (required)
- "nestCollection": list of nested collections (optional). A nestedCollection has 2 attributes:
  - "attribute": string that contains the name of the attribute that is a nestedCollection (required)
  - "collection": string that contains the name of the collection structure that will be used for this nested collection (required)

Here are all the collections attributes:

- "name": string that contains the name of the collection (required)
- "fetch": boolean that specified if this collection will be fetched at creation and periodically (optional, default to false)
- "idAttribute": string that contains the name of the distinct attribute which will be use to identify a model in this collection (required)
- "model": string that contains the model name that will be stored in this collection (required). If multiple model types in this colelction then this attribute is an object that contains 2 attributes:
  - "typeAttribute": string that contains the attribute's name of a model that will specified which model to use (required)
  - "list": list that contains the different models possibilities (required). Each item of the list contians 2 attributes:
   - "type" : string that contains the value of "typeAttribute" attribute for this model (required)
   - "modelName" : string that contains the model that will be used (required)
- "defaultModel": if multiple model types in this collection then string that contains the defaultModel name (optional). It will be used if we cannot find the model with the informations contained in the "model" attribute.
- "url": string that contains the url from a server where to fetch datas (optional). It will use get to get data, put to update data, post to create data and delete to remove data.
- "subset": list of subsets (optional). Each item of this list contains 2 attributes
  - "name": string that contains the name of the subset collection (required). You will use this name on your application as it was a normal collection.
  - "condition": string that contains the name of the function that will be used to check the condition (required) and determines wether or not a model will be added in this subset. This function must be specified in the model definition and ust returned a boolean.
- "directory": string that contains the name of the variable that will contains the name of the directory where to store datas (optional)
- "encryption": string that contains the name of the variable that will contains the key to encrypt / decrypt datas (optional)


# Views
Here is the main part of the configuration file, the place where you build your different windows. These are the attributes that are available for a view definition:

- name": string that contains the name of the view (required)
- "constructorType": string that contains the type of the view or the child (required). The possible values are all UI component type that can be found on Appcelerator documentation. For example "TabGroup", "Window", "Tab", "Label", "Button" or "Textfield"
- "model": string that contain the name of the collection that will be used to display information (optional). If use of a subset then the name of this subset is the parent's name and the substet name. If youre collection's name is "Contract" and you have a "pending" subset then you should use "Contractpending" in this attribute.
- "tabs": list containing all tabs. This attribute can only be used for a "TabGroup" component (optional)
- "title": object like one in the params attribute that represent the title of a tab or a window
- "icon": string that contains the path to the icon of a Tab. For now this icon is loaded from the web (optional)
- "window": object representing the window component of a Tab (optional)
- "rightNavButton": string that contains the name of the component that will be placed as a rightNavButton (this component must be required at the beginning of the conf file). May also be the object himself (optional, only for windows and tabgroups)
- "leftNavButton" : same a rightNavButton
- "children": list containing all children from the current object (optional). This list can contain strings that represents the names of components that will be add to the current object (these components must be required at the beginning of the conf file). The list can also contain objects directly. You can mix strings and objects in the list.
- "eventListener": list of object that has 2 attributes:
  - "event": string that contains the name of the event we want to listen (required). Can be a custom event or an existing event from Appcelerator like "close" (see Appcelerator documentation).
  - "action": object that contains information about the action when the event is triggered.
	Here is a list of currently supported actionType with action description for this event:
   <pre>
   		action : {
			"actionType" : "openWindow",
			"actionValue" : "windowName"
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "fireEvent",
			"actionValue" : "eventName",
			"actionData" : {
				"dataToPassToEvent" : "value"
			}
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "newModel",
			"addPoster" : true, // if true then add the poster attribute to the new model with the value of SMapp.user.login (optional, default to false)
			"fromScratch" : false, //boolean to use the current model as a base for the new one or beginning from scratch (optional, default to true)
			"nestCollection" : "commentsCollection" //name of the nestCollection if we want to add a new model in a nested collection of the current model (optional)
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "updateModel" //update the model
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "deleteModel"
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "refreshAll" //refresh all the collections from the server
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "refreshCurrent" //refresh only the current collection
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "eventListener",
			"actionValue" : "clickButton"
			"executeValue" : "alert('event fired !');" //body of the function that is called when the actionValue event is fired (required)
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "execute",
			"executeValue" : "alert('execute !');" //body of the function that is called when the actionValue event is fired (required)
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "sendEmail",
			"actionTo" : "john@doe.com" //persons you want to send the email to
			"actionSubject" : "Subject" //subject of the email
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "callPhone",
			"phoneNumber" : "4150000000" //phone number you want to call
		}
	</pre>
	<pre>
   		action : {
			"actionType" : "sendData",
			"serverUrl" : true, // true if we want to use the serverUrl defined for the application. If you want to send info to a specific url the n put the string of the url
			"actionData" : {} //data to send to the server
			"successAttribute" : "success" //name of the successAttribute. This attribute has to be in the data attribute of the server's response
			"successEvent" :  "serverResonse" //name of the event that will be listened for the server response. When the mobile receive the response from the server it will fire an event with the name contain in the event attribute of the server's response. Default to "<%- parentName %>SendDataResponse" where parentName is the name of the current view
			"onSuccess" : "alert('success');" //code to execute when success (optional)
			"onFailure" : "alert('error');" //code to execute when failure (optional)
		} // you can also sendData from the server to the mobile with the data attribute of the server's response
		/*
		The response from the server could look like this
		response = {
			"event" : "successEvent",
			"data" : {
				"success" : true,
				"payLoad" : "response"
			}
		}
		*/
	</pre>
- "newModel": list of objects to describe the location of attribute when you want to create a new model. It is composed of 2 attributes:
  - "modelAttribute": name of the attribute in the model you want to create
  - "objectAttribute": name of the attribute in the current component. For example if you want to get the value from a "TextField" component then the value of this attribute will be "value"
- "params": object that has this template:
	<pre>
		{
			"attributeName" : {
				"type" : "calculatedValue",
				"valueType": "String",
				"parameters" : {
					"startDate" : {
						"type" : "attributeValue",
						"valueType" : "String",
						"value" : "startDate"
					}
				},
				"value": "return startDate"
			}
		}
	</pre>
  - "type" can be either "directValue" (attributeName will then be equal to the "value" attribute), attributeValue (attributeName will then be equal to the "value" attribute of the current model) or calculatedValue (attributeName will then be equal to the result of the function where "value" is the body and parameters are the arguments).
  - "valueType" describe the type of attributeName. It can be "String", "Int", "Direct" or "loadPath" when it is an image that is fetched locally or from a server
  - "parameters" is an object of arguments for then function when "type" is equal to "calculatedValue"
  - "value" is the value of attributeName when "type" is equal to "directValue", the model's attribute name when "type" is equal to "attributeValue" or the body of the function when "type" is equal to "calculatedValue". For "directValue" or "attributeValue" you can specify differents values base on the platform. Here is a way to do it:
  		<pre>
			{
				"def" : 15,
				"android" : 13,
				"iphone" : 12,
				"ipad" : 25 
			}
		</pre>
  - "attributeName" can be a custom attribute or any attribute from a component like height or layout (see Appcelerator documentation).
- "item": string that contains the name of the item that will repeated for each model in the linked collection (optional)
- "searchable": if View or TableView with "item" attribute then this attribute is a boolean to show or hide the searchbar (optional, false by default). If inside an item (View or TableViewRow) then it is a list of model attributes that will be used to search results in the parent component which is a View or a TableView (optional) 
- "dependencies": list of files that will be included before include the current file (optional, will be use only when current view is included from a require)

# Demonstration  

For now there is only one demo app but we are currently working on adding 2 or 3 more.
In the Demonstration folder you can find one folder per demo application. These applications are here to show you how to use the framework and how you can use each attributes of the framework.
On each folder there are tow sub-folders. The first one is the configuration folder (which contain app.json, conf.json and some other usefull files) and the second one is the folder that contain the source code generated with the configuration files. There is also a web.js file containing an example of server-side code.
For each demo application you can copy-paste the configuration folder on your Node.js server with a folder-structure as shown on the "Getting started" part.
There are two demo app right now :
- the "test" app is an application that allows you to validate / reject some contracts. It shows you how to create subset of collections and use them in differents tabs
- the "RSS Reader" app is an application that allow you to add a rss source from your mobile and then fetch them to have a list of rss feeds on your phone. It shows you the creation, the modification and the deletion of a model. It is a good example of how to fetch information from different sources (google website, blogs, professional webservices like SAP webservices, ...).
The next demo application will be an application with login possibilities to have custom informations in your application. We will build a demo application with private chat rooms and someting like that. This application will also show the notifications possibilites since this feature is currently on development.

# Test  

We are currently working on a way to test the framework automatically.

# Roadmap / TODO

Better performance on close of "big" windows (windows that contain lots of rows created from a model)
Notifications possibilities
Script to build the app without Titanium Studio
Script to check the entry file (app.json and conf.json) before app generation
Analytics possibilities


# Copyright

Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.