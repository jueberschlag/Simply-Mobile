/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//variable to include files only one time


//loading screen while loading
if (SMapp.spinnerWindow) {
	SMapp.spinnerWindow.show();
}

// Appcelerator library include: underscore and backbone
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/underscore.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/backbone.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.CollectionUpdate.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.Sync.Ti.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.DeepModel.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.ModelBinder.Ti.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.CollectionBinder.Ti.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/Backbone.Utils.js');
Ti.include(Titanium.Filesystem.resourcesDirectory+'/lib/backbone.subset.js');

// Library for template

/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/

var extend = function (Objects) {
	var res = {};
	for (var i in Objects) {
		for (var j in Objects[i]) {
			res[j] = Objects[i][j];
		}
	}
	return res;
}

// Context variable for the RSSReader app
SMapp.RSSReader = {
	data : null,
	loadingNumber : 0,
	app : {
		name : "RSSReader",
		id : "RSSReader"
	},
	constants : {},
	setIntervalList : []
};

//Style sheet include


//models

/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//model and collection definition

	//create model
	
		SMapp.RSSReader.RSSfeed = Backbone.DeepModel.extend({
	
		initialize: function () {
			this.collection = SMapp.RSSReader.RSSfeedsCollection;
			//custom binding
			
			//nested collection
			
		},
		//custom binding
		
		
			idAttribute : "title",
		
		storeName: 'RSSfeed'
	});

	//create model
	
		SMapp.RSSReader.RSSSource = Backbone.DeepModel.extend({
	
		initialize: function () {
			this.collection = SMapp.RSSReader.RSSSourcesCollection;
			//custom binding
			
			//nested collection
			
		},
		//custom binding
		
		
			idAttribute : "id",
		
		storeName: 'RSSSource'
	});


//collections

/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//collection template


	//create collection
	SMapp.RSSReader.RSSfeedsCollectionConstructor = Backbone.Collection.extend({
		//initialize function : create eventListener for creation, updating and deletion of model in the collection
		initialize : function() {
			Ti.App.addEventListener('newRSSfeeds', this.onNew);
			Ti.App.addEventListener('updateRSSfeeds', this.onUpdate);
			Ti.App.addEventListener('deleteRSSfeeds', this.onDelete);
			Ti.App.addEventListener('refreshAll', this.onRefreshAll);

			var thisAlias = this;

			var removeEvent = function () {
				Ti.App.removeEventListener('newRSSfeeds', thisAlias.onNew);
				Ti.App.removeEventListener('updateRSSfeeds', thisAlias.onUpdate);
				Ti.App.removeEventListener('deleteRSSfeeds', thisAlias.onDelete);
				Ti.App.removeEventListener('refreshAll', thisAlias.onRefreshAll);
				Ti.App.removeEventListener("logout", removeEvent);
			};

			Ti.App.addEventListener("logout", removeEvent);
		},

		onNew : function(entry) {
			var toModel = entry.model;
			var thisCol = SMapp.RSSReader.RSSfeedsCollection;
			var realModel = thisCol.create(toModel);			
		},

		onUpdate : function(entry) {
			entry.model.save();
		},

		onDelete : function(entry) {
			entry.model.destroy();
		},

		onRefreshAll : function() {
			if (SMapp.spinnerWindow) {
				SMapp.spinnerWindow.show();
			}
			SMapp.RSSReader.RSSfeedsCollection.fetch({update : true, removeMissing : true,
			 success : function(coll) {   
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        },
	       	error : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        }});
		},

		//idAttribute
		
			idAttribute : "title",
		

		//only one model
		
			model: SMapp.RSSReader.RSSfeed,
		
		//url
		
			url : 'https://modeln-serverdev.herokuapp.com/rss',
		
		//storeName
		storeName : 'RSSfeeds'
		
		
	});

	SMapp.RSSReader.RSSfeedsCollection = new SMapp.RSSReader.RSSfeedsCollectionConstructor();
	
	//subsets
	


	//first fetch
	
		if (SMapp.spinnerWindow) {
			SMapp.spinnerWindow.show();
		}
		SMapp.RSSReader.RSSfeedsCollection.fetch({
			success : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        },
	       error : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        }
		});	    
	



	//create collection
	SMapp.RSSReader.RSSSourcesCollectionConstructor = Backbone.Collection.extend({
		//initialize function : create eventListener for creation, updating and deletion of model in the collection
		initialize : function() {
			Ti.App.addEventListener('newRSSSources', this.onNew);
			Ti.App.addEventListener('updateRSSSources', this.onUpdate);
			Ti.App.addEventListener('deleteRSSSources', this.onDelete);
			Ti.App.addEventListener('refreshAll', this.onRefreshAll);

			var thisAlias = this;

			var removeEvent = function () {
				Ti.App.removeEventListener('newRSSSources', thisAlias.onNew);
				Ti.App.removeEventListener('updateRSSSources', thisAlias.onUpdate);
				Ti.App.removeEventListener('deleteRSSSources', thisAlias.onDelete);
				Ti.App.removeEventListener('refreshAll', thisAlias.onRefreshAll);
				Ti.App.removeEventListener("logout", removeEvent);
			};

			Ti.App.addEventListener("logout", removeEvent);
		},

		onNew : function(entry) {
			var toModel = entry.model;
			var thisCol = SMapp.RSSReader.RSSSourcesCollection;
			var realModel = thisCol.create(toModel);			
		},

		onUpdate : function(entry) {
			entry.model.save();
		},

		onDelete : function(entry) {
			entry.model.destroy();
		},

		onRefreshAll : function() {
			if (SMapp.spinnerWindow) {
				SMapp.spinnerWindow.show();
			}
			SMapp.RSSReader.RSSSourcesCollection.fetch({update : true, removeMissing : true,
			 success : function(coll) {   
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        },
	       	error : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        }});
		},

		//idAttribute
		
			idAttribute : "id",
		

		//only one model
		
			model: SMapp.RSSReader.RSSSource,
		
		//url
		
			url : 'https://modeln-serverdev.herokuapp.com/rssSources',
		
		//storeName
		storeName : 'RSSSources'
		
		
	});

	SMapp.RSSReader.RSSSourcesCollection = new SMapp.RSSReader.RSSSourcesCollectionConstructor();
	
	//subsets
	


	//first fetch
	
		if (SMapp.spinnerWindow) {
			SMapp.spinnerWindow.show();
		}
		SMapp.RSSReader.RSSSourcesCollection.fetch({
			success : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        },
	       error : function(coll) {
				if (SMapp.spinnerWindow) {
					SMapp.spinnerWindow.hide();
				}
	        }
		});	    
	



//require files


//all backbone view

	//include
	
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template

	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//create the backbone view
var RSSReaderHomeWindow = Backbone.View.extend({

	//list to create the close function
	
	
	

	_modelBinder: undefined,
	newModel: [],
	    
    initialize: function() {
        _.bindAll(this);

        
        	this.model = SMapp.RSSReader.RSSfeedsCollection.at(0);
	        this.collection = SMapp.RSSReader.RSSfeedsCollection;
        
        if (this.model) {
        	this._modelBinder = new Backbone.ModelBinder();
        	this.model.bind("destroy", this.close, this);
    	} 

        
        //alias for this
        var thisHomeWindow = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	thisHomeWindow.HomeWindow = Titanium.UI.createWindow(
        	
        	
			
			
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Home",
layout : "vertical"
	});

	//after content
	


		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thisHomeWindow.HomeWindow.navBarHidden = true;

	thisHomeWindow.HomeWindow.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thisHomeWindow.HomeWindow.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thisHomeWindow.HomeWindow.titleView.text = "Home";
	

	thisHomeWindow.HomeWindow.logoutBarView.add(thisHomeWindow.HomeWindow.titleView);

	

	var buttonSize = 40;

	
		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisHomeWindow.ParamsButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Params"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisHomeWindow.ParamsButton) {
				thisHomeWindow.HomeWindow.logoutBarView.add(thisHomeWindow.ParamsButton);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function (e) {
		Ti.API.info('event info ' + JSON.stringify(e));
		SMapp.os({
			def : function() {
				SMapp.navgroup.open(new RSSReaderParamsWindow({model : thisHomeWindow.model, collection : thisHomeWindow.collection}).render().ParamsWindow, {
					animated : true
				});
			},
			android : function() {
				new RSSReaderParamsWindow({model : thisHomeWindow.model, collection : thisHomeWindow.collection}).render().ParamsWindow.open({model : true});
			}
		});

	};

//fire an event on Ti.App




	thisHomeWindow.ParamsButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			thisHomeWindow.ParamsButton.right = "3%";
			thisHomeWindow.ParamsButton.height = buttonSize * 0.9;
			thisHomeWindow.ParamsButton.top = buttonSize * 0.05;
		
	


	

	thisHomeWindow.HomeWindow.add(thisHomeWindow.HomeWindow.logoutBarView);

};

var defFunctionButtons = function () {
	var buttonSize = 40;

	
		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisHomeWindow.ParamsButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Params"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisHomeWindow.ParamsButton) {
				thisHomeWindow.HomeWindow.logoutBarView.add(thisHomeWindow.ParamsButton);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function (e) {
		Ti.API.info('event info ' + JSON.stringify(e));
		SMapp.os({
			def : function() {
				SMapp.navgroup.open(new RSSReaderParamsWindow({model : thisHomeWindow.model, collection : thisHomeWindow.collection}).render().ParamsWindow, {
					animated : true
				});
			},
			android : function() {
				new RSSReaderParamsWindow({model : thisHomeWindow.model, collection : thisHomeWindow.collection}).render().ParamsWindow.open({model : true});
			}
		});

	};

//fire an event on Ti.App




	thisHomeWindow.ParamsButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			//trick to remove button from child and set it to rightNavButton
			thisHomeWindow.HomeWindow.remove(thisHomeWindow.ParamsButton);
			thisHomeWindow.HomeWindow.rightNavButton = thisHomeWindow.ParamsButton;
		
	

	
};

SMapp.os({android : logoutBarAndroidFunction, def : defFunctionButtons});	

logoutBarFunction = null;
defFunctionButtons = null;
			
		



		//ceate the children views
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		
			
		

		
			thisHomeWindow.RSSTable = Titanium.UI.createTableView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	_type : "TableView",
data : []
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisHomeWindow.RSSTable) {
				thisHomeWindow.HomeWindow.add(thisHomeWindow.RSSTable);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
				if (thisHomeWindow.collection) {

					var viewCreator = function(_model) {
			            return new RSSReaderrssfeed({model: _model, parent : thisHomeWindow.RSSTable});
			        };

			        var viewManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory(viewCreator);
			        thisHomeWindow.collectionBinder = new Backbone.CollectionBinder(viewManagerFactory);

			    	thisHomeWindow.collectionBinder.bind(thisHomeWindow.collection, thisHomeWindow.RSSTable);			
				}
			
			
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var RSSReaderHomeWindowLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thisHomeWindow.HomeWindow);
					},
					android : function() {
						if (thisHomeWindow.HomeWindow) {
							thisHomeWindow.HomeWindow.close();
						}
					}
				});
				SMapp.utils.destroy(thisHomeWindow.HomeWindow);
				thisHomeWindow.close();
		};
		Ti.App.addEventListener('logout', RSSReaderHomeWindowLogout);

		var RSSReaderHomeWindowClose = function(e) {
			thisHomeWindow.HomeWindow.close();
		};
		thisHomeWindow.HomeWindow.addEventListener('android:back', RSSReaderHomeWindowClose);	
		
		var RSSReaderHomeWindowLogoutClose = function () {
			if (RSSReaderHomeWindowLogout && RSSReaderHomeWindowLogout != null) {
				Ti.API.info('remove RSSReaderHomeWindowLogout');
				Ti.App.removeEventListener('logout', RSSReaderHomeWindowLogout);	
			}
			if (RSSReaderHomeWindowClose && RSSReaderHomeWindowClose != null) {
				Ti.API.info('remove RSSReaderHomeWindowClose');
				Ti.App.removeEventListener('android:back', RSSReaderHomeWindowClose);				
			}
			RSSReaderHomeWindowLogout = null;
			RSSReaderHomeWindowLogoutClose = null;
			RSSReaderHomeWindowClose = null;
		};		
		thisHomeWindow.HomeWindow.addEventListener('close', RSSReaderHomeWindowLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		

		//eventListener
		

		//close eventListener
		this.HomeWindow.addEventListener("close", this.close);

        return this.HomeWindow;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.HomeWindow) {
	    		this.HomeWindow.close();
	    	}
    	

    	
        	if (this.HomeWindow && this.HomeWindow != null) {
				SMapp.utils.destroy(this.HomeWindow);
	    	}
    	
        	if (this.HomeWindow.logoutBarView && this.HomeWindow.logoutBarView != null) {
				SMapp.utils.destroy(this.HomeWindow.logoutBarView);
	    	}
    	
        	if (this.HomeWindow.titleView && this.HomeWindow.titleView != null) {
				SMapp.utils.destroy(this.HomeWindow.titleView);
	    	}
    	
        	if (this.HomeWindow.ParamsButton && this.HomeWindow.ParamsButton != null) {
				SMapp.utils.destroy(this.HomeWindow.ParamsButton);
	    	}
    	
        	if (this.HomeWindow.ParamsButton && this.HomeWindow.ParamsButton != null) {
				SMapp.utils.destroy(this.HomeWindow.ParamsButton);
	    	}
    	
        	if (this.RSSTable && this.RSSTable != null) {
				SMapp.utils.destroy(this.RSSTable);
	    	}
    	
    	
    		if (this.model) {
    			this.model.unbind("destroy", this.close);
    		}
    	
    },

    destroy: function () {
    	if (this.model) {
    		this.model.destroy();
    	}
    },

    render: function(eventName) {
    	if (this._modelBinder) {
	    	//for loop on this.toBind
	    	var bindings = {};
	    	for (var bindingIndex in this.toBind) {
	    		var currentToBind = this.toBind[bindingIndex];
				if (!bindings[currentToBind.attribute]) {
	    			bindings[currentToBind.attribute] = [];
	    		}
	    		bindings[currentToBind.attribute].push(currentToBind.bind);
	    	}

	        this._modelBinder.bind(this.model, this.HomeWindow, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }

});

// If this window is in a tab then create the backbone view and render it


//tab Template


	


	//include
	
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template

	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//create the backbone view
var RSSReaderParamsWindow = Backbone.View.extend({

	//list to create the close function
	
	
	

	_modelBinder: undefined,
	newModel: [],
	    
    initialize: function() {
        _.bindAll(this);

        
        	this.model = SMapp.RSSReader.RSSSourcesCollection.at(0);
	        this.collection = SMapp.RSSReader.RSSSourcesCollection;
        
        if (this.model) {
        	this._modelBinder = new Backbone.ModelBinder();
        	this.model.bind("destroy", this.close, this);
    	} 

        
        //alias for this
        var thisParamsWindow = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	thisParamsWindow.ParamsWindow = Titanium.UI.createWindow(
        	
        	
			
			
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Feed sources",
layout : "vertical"
	});

	//after content
	


		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thisParamsWindow.ParamsWindow.navBarHidden = true;

	thisParamsWindow.ParamsWindow.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thisParamsWindow.ParamsWindow.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thisParamsWindow.ParamsWindow.titleView.text = "Feed sources";
	

	thisParamsWindow.ParamsWindow.logoutBarView.add(thisParamsWindow.ParamsWindow.titleView);

	

	var buttonSize = 40;

	


	

	thisParamsWindow.ParamsWindow.add(thisParamsWindow.ParamsWindow.logoutBarView);

};

var defFunctionButtons = function () {
	var buttonSize = 40;

	

	
};

SMapp.os({android : logoutBarAndroidFunction, def : defFunctionButtons});	

logoutBarFunction = null;
defFunctionButtons = null;
			
		



		//ceate the children views
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewSourceView = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	height : "100%",
layout : "vertical",
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewSourceView) {
				thisParamsWindow.ParamsWindow.add(thisParamsWindow.NewSourceView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedNameView = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
height : Titanium.UI.SIZE,
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedNameView) {
				thisParamsWindow.NewSourceView.add(thisParamsWindow.NewFeedNameView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedNameLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Name: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedNameLabel) {
				thisParamsWindow.NewFeedNameView.add(thisParamsWindow.NewFeedNameLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedNameTextField = Titanium.UI.createTextField(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	hintText : "Name"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedNameTextField) {
				thisParamsWindow.NewFeedNameView.add(thisParamsWindow.NewFeedNameTextField);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		
			thisParamsWindow.newModel.push({objectName : "NewFeedNameTextField", modelAttribute : "name", objectAttribute : "value"});
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedHostView = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
height : Titanium.UI.SIZE,
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedHostView) {
				thisParamsWindow.NewSourceView.add(thisParamsWindow.NewFeedHostView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedHostLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Host: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedHostLabel) {
				thisParamsWindow.NewFeedHostView.add(thisParamsWindow.NewFeedHostLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedHostTextField = Titanium.UI.createTextField(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	hintText : "Host"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedHostTextField) {
				thisParamsWindow.NewFeedHostView.add(thisParamsWindow.NewFeedHostTextField);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		
			thisParamsWindow.newModel.push({objectName : "NewFeedHostTextField", modelAttribute : "host", objectAttribute : "value"});
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedPathView = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
height : Titanium.UI.SIZE,
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedPathView) {
				thisParamsWindow.NewSourceView.add(thisParamsWindow.NewFeedPathView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedPathLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Path: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedPathLabel) {
				thisParamsWindow.NewFeedPathView.add(thisParamsWindow.NewFeedPathLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.NewFeedPathTextField = Titanium.UI.createTextField(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	hintText : "Path"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.NewFeedPathTextField) {
				thisParamsWindow.NewFeedPathView.add(thisParamsWindow.NewFeedPathTextField);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		
			thisParamsWindow.newModel.push({objectName : "NewFeedPathTextField", modelAttribute : "path", objectAttribute : "value"});
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisParamsWindow.AddButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Add source"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.AddButton) {
				thisParamsWindow.NewSourceView.add(thisParamsWindow.AddButton);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function () {
		//create the new object
		var modelToAdd = {};
		
		for (var modelToAddIndex in thisParamsWindow.newModel) {
			modelToAdd[thisParamsWindow.newModel[modelToAddIndex].modelAttribute] = thisParamsWindow[thisParamsWindow.newModel[modelToAddIndex].objectName][thisParamsWindow.newModel[modelToAddIndex].objectAttribute];
		}
		//TODO : fixed attribute
		
		//add poster
		
		//add a date to each new model
		modelToAdd.date = new Date().getTime();

		//if a nested collection is specified
		
			//add the new object to the collection
			if (thisParamsWindow.collection) {
				thisParamsWindow.collection.onNew({model : modelToAdd});
			}
			else if (thisParamsWindow.model.collection) {
				thisParamsWindow.model.collection.onNew({model : modelToAdd});
			}
		
	}

//update model




	thisParamsWindow.AddButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		
			
		

		
			thisParamsWindow.RSSSourceTableView = Titanium.UI.createTableView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	height : Titanium.UI.FILL,
_type : "TableView",
data : []
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisParamsWindow.RSSSourceTableView) {
				thisParamsWindow.NewSourceView.add(thisParamsWindow.RSSSourceTableView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
				if (thisParamsWindow.collection) {

					var viewCreator = function(_model) {
			            return new RSSReaderrssSource({model: _model, parent : thisParamsWindow.RSSSourceTableView});
			        };

			        var viewManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory(viewCreator);
			        thisParamsWindow.collectionBinder = new Backbone.CollectionBinder(viewManagerFactory);

			    	thisParamsWindow.collectionBinder.bind(thisParamsWindow.collection, thisParamsWindow.RSSSourceTableView);			
				}
			
			
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var RSSReaderParamsWindowLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thisParamsWindow.ParamsWindow);
					},
					android : function() {
						if (thisParamsWindow.ParamsWindow) {
							thisParamsWindow.ParamsWindow.close();
						}
					}
				});
				SMapp.utils.destroy(thisParamsWindow.ParamsWindow);
				thisParamsWindow.close();
		};
		Ti.App.addEventListener('logout', RSSReaderParamsWindowLogout);

		var RSSReaderParamsWindowClose = function(e) {
			thisParamsWindow.ParamsWindow.close();
		};
		thisParamsWindow.ParamsWindow.addEventListener('android:back', RSSReaderParamsWindowClose);	
		
		var RSSReaderParamsWindowLogoutClose = function () {
			if (RSSReaderParamsWindowLogout && RSSReaderParamsWindowLogout != null) {
				Ti.API.info('remove RSSReaderParamsWindowLogout');
				Ti.App.removeEventListener('logout', RSSReaderParamsWindowLogout);	
			}
			if (RSSReaderParamsWindowClose && RSSReaderParamsWindowClose != null) {
				Ti.API.info('remove RSSReaderParamsWindowClose');
				Ti.App.removeEventListener('android:back', RSSReaderParamsWindowClose);				
			}
			RSSReaderParamsWindowLogout = null;
			RSSReaderParamsWindowLogoutClose = null;
			RSSReaderParamsWindowClose = null;
		};		
		thisParamsWindow.ParamsWindow.addEventListener('close', RSSReaderParamsWindowLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		

		//eventListener
		

		//close eventListener
		this.ParamsWindow.addEventListener("close", this.close);

        return this.ParamsWindow;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.ParamsWindow) {
	    		this.ParamsWindow.close();
	    	}
    	

    	
        	if (this.ParamsWindow && this.ParamsWindow != null) {
				SMapp.utils.destroy(this.ParamsWindow);
	    	}
    	
        	if (this.ParamsWindow.logoutBarView && this.ParamsWindow.logoutBarView != null) {
				SMapp.utils.destroy(this.ParamsWindow.logoutBarView);
	    	}
    	
        	if (this.ParamsWindow.titleView && this.ParamsWindow.titleView != null) {
				SMapp.utils.destroy(this.ParamsWindow.titleView);
	    	}
    	
        	if (this.NewSourceView && this.NewSourceView != null) {
				SMapp.utils.destroy(this.NewSourceView);
	    	}
    	
    	
    		if (this.model) {
    			this.model.unbind("destroy", this.close);
    		}
    	
    },

    destroy: function () {
    	if (this.model) {
    		this.model.destroy();
    	}
    },

    render: function(eventName) {
    	if (this._modelBinder) {
	    	//for loop on this.toBind
	    	var bindings = {};
	    	for (var bindingIndex in this.toBind) {
	    		var currentToBind = this.toBind[bindingIndex];
				if (!bindings[currentToBind.attribute]) {
	    			bindings[currentToBind.attribute] = [];
	    		}
	    		bindings[currentToBind.attribute].push(currentToBind.bind);
	    	}

	        this._modelBinder.bind(this.model, this.ParamsWindow, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }

});

// If this window is in a tab then create the backbone view and render it


//tab Template


	


	//include
	
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template

	//backbone view template
	RSSReaderrssSource = Backbone.View.extend({
	    
		//list to create the close function
		
		
		
		

		//variables to pass to children
		

	    _modelBinder: undefined,
	    newModel: [],

	    initialize: function() {
	        _.bindAll(this);

	        
	        if (this.model) {
	        	this._modelBinder = new Backbone.ModelBinder();
	        	//bindings
		        this.model.bind("destroy", this.close, this);
		        
		        
			        this.model.bind("change", this.update, this);
			        
			    
	    	}

	        //alias for this used by children
	        var thisrssSource = this;

			//test condition
			

		        this.toBind = [];


		        //create the params for tab
		        

		        //params modif
		        
				

				

				
			        this.el = Ti.UI.createTableViewRow(
		        

				

				

				//searchable
				

				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "100%",
layout : "vertical",
height : Titanium.UI.SIZE,
_type : "TableViewItem",
className : "ListItemrssSource"
	});

	//after content
	


				//searchBar
				

				//collection children
				

				

				//ceate the children views
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceViewName = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceViewName) {
				this.el.add(thisrssSource.SourceViewName);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceNameLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "20%",
text : "Name: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceNameLabel) {
				thisrssSource.SourceViewName.add(thisrssSource.SourceNameLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.FeedTitleLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thisrssSource.model.get("name")
	});

	//after content
	var toBind = {attribute : "name", bind : {el : thisrssSource.FeedTitleLabel, attribute : "text" , converter : undefined }};
if (thisrssSource.toBind) {thisrssSource.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisrssSource.FeedTitleLabel) {
				thisrssSource.SourceViewName.add(thisrssSource.FeedTitleLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceViewHost = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceViewHost) {
				this.el.add(thisrssSource.SourceViewHost);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceHostLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "20%",
text : "Host: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceHostLabel) {
				thisrssSource.SourceViewHost.add(thisrssSource.SourceHostLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.FeedHostTextField = Titanium.UI.createTextField(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "75%",
value : thisrssSource.model.get("host")
	});

	//after content
	var toBind = {attribute : "host", bind : {el : thisrssSource.FeedHostTextField, attribute : "value" , converter : undefined }};
if (thisrssSource.toBind) {thisrssSource.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisrssSource.FeedHostTextField) {
				thisrssSource.SourceViewHost.add(thisrssSource.FeedHostTextField);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceViewPath = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceViewPath) {
				this.el.add(thisrssSource.SourceViewPath);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceNameLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "20%",
text : "Path: "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceNameLabel) {
				thisrssSource.SourceViewPath.add(thisrssSource.SourceNameLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.FeedPathTextField = Titanium.UI.createTextField(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "75%",
value : thisrssSource.model.get("path")
	});

	//after content
	var toBind = {attribute : "path", bind : {el : thisrssSource.FeedPathTextField, attribute : "value" , converter : undefined }};
if (thisrssSource.toBind) {thisrssSource.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisrssSource.FeedPathTextField) {
				thisrssSource.SourceViewPath.add(thisrssSource.FeedPathTextField);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SourceButtonView = Titanium.UI.createView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	layout : "horizontal",
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SourceButtonView) {
				this.el.add(thisrssSource.SourceButtonView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
			
		

		//add children of this view
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.SaveButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Save changes"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.SaveButton) {
				thisrssSource.SourceButtonView.add(thisrssSource.SaveButton);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function () {
		if (thisrssSource.collection) {
			thisrssSource.collection.onUpdate({model : thisrssSource.model});
		}
		else if (thisrssSource.model.collection) {
			thisrssSource.model.collection.onUpdate({model : thisrssSource.model});
		}
	}

//delete model




	thisrssSource.SaveButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssSource.DeleteButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Delete source"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisrssSource.DeleteButton) {
				thisrssSource.SourceButtonView.add(thisrssSource.DeleteButton);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function () {
		if (thisrssSource.collection) {
			thisrssSource.collection.onDelete({model : thisrssSource.model});
		}
		else if (thisrssSource.model.collection) {
			thisrssSource.model.collection.onDelete({model : thisrssSource.model});
		}
	}

//refresh all collections




	thisrssSource.DeleteButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				

				//eventListener
				

				//newModel attributes
				
		        
		        return this.el;

			//test condition
			
	    },
	    
	    render: function(eventName) {
	    	//test condition
			
		    	if (this._modelBinder) {
			    	var bindings = {};
			    	for (var bindingIndex in this.toBind) {
			    		var currentToBind = this.toBind[bindingIndex];
						if (!bindings[currentToBind.attribute]) {
			    			bindings[currentToBind.attribute] = [];
			    		}
			    		bindings[currentToBind.attribute].push(currentToBind.bind);
			    	}

			    	Ti.API.info('bindings of rssSource : ' + JSON.stringify(bindings));

			    	

			        //unreference
			        this.toBind = null;
			        this._modelBinder.bind(this.model, this.el, bindings);
			        
			        	if (this.options.parent.data) {
			        		this.options.parent.setData(this.options.parent.data.slice(0));
			        	}
			        
			    }
		        return this;

		    //test condition
			
	    },

	    destroy: function () {
	    	//fireEvent on father
	    	this.model.destroy();
	    },
	    
	    close: function() {
	     	//unbind modelBinder
	    	if (this._modelBinder) {
	    		this._modelBinder.unbind();
	    	}   

	    	if (this.collectionBinder) {
	    		this.collectionBinder.unbind();
	    	} 	

	    	
	    		if (this.el && this.el.close) {
		    		this.el.close();
		    	}
	    	

	    	

	    	//element to put to null
	        
	        	if (this.el && this.el != null) {
		    		SMapp.utils.destroy(this.el);
		    	}
	    	
	        	if (this.SourceViewName && this.SourceViewName != null) {
		    		SMapp.utils.destroy(this.SourceViewName);
		    	}
	    	
	        	if (this.SourceViewHost && this.SourceViewHost != null) {
		    		SMapp.utils.destroy(this.SourceViewHost);
		    	}
	    	
	        	if (this.SourceViewPath && this.SourceViewPath != null) {
		    		SMapp.utils.destroy(this.SourceViewPath);
		    	}
	    	
	        	if (this.SourceButtonView && this.SourceButtonView != null) {
		    		SMapp.utils.destroy(this.SourceButtonView);
		    	}
	    	
	    	Ti.API.info('after destroy');
	    	//execute unbindings
	    	
	    		if (this.model) {
	    			this.model.unbind("destroy", this.close);
	    		}
	    	
	    		if (this.model) {
	    			this.model.unbind("change", this.update);
	    		}
	    	
	    }

	    //if TableViewItem then have do do a setData to refresh tableView
	    
	    	,

		    update : function () {
	        	if (this.options.parent.data) {
	        		this.options.parent.setData(this.options.parent.data.slice(0));
	        	}
		    }

		
	});

//regular titanium views


	


	//include
	
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template

	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//create the backbone view
var RSSReaderFeedWindow = Backbone.View.extend({

	//list to create the close function
	
	
	

	_modelBinder: undefined,
	newModel: [],
	    
    initialize: function() {
        _.bindAll(this);

        
        if (this.model) {
        	this._modelBinder = new Backbone.ModelBinder();
        	this.model.bind("destroy", this.close, this);
    	} 

        
        //alias for this
        var thisFeedWindow = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	thisFeedWindow.FeedWindow = Titanium.UI.createWindow(
        	
        	
			
			
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Feed details",
layout : "vertical"
	});

	//after content
	


		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thisFeedWindow.FeedWindow.navBarHidden = true;

	thisFeedWindow.FeedWindow.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thisFeedWindow.FeedWindow.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thisFeedWindow.FeedWindow.titleView.text = "Feed details";
	

	thisFeedWindow.FeedWindow.logoutBarView.add(thisFeedWindow.FeedWindow.titleView);

	

	var buttonSize = 40;

	


	

	thisFeedWindow.FeedWindow.add(thisFeedWindow.FeedWindow.logoutBarView);

};

var defFunctionButtons = function () {
	var buttonSize = 40;

	

	
};

SMapp.os({android : logoutBarAndroidFunction, def : defFunctionButtons});	

logoutBarFunction = null;
defFunctionButtons = null;
			
		



		//ceate the children views
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisFeedWindow.FeedTitleLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thisFeedWindow.model.get("title")
	});

	//after content
	var toBind = {attribute : "title", bind : {el : thisFeedWindow.FeedTitleLabel, attribute : "text" , converter : undefined }};
if (thisFeedWindow.toBind) {thisFeedWindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisFeedWindow.FeedTitleLabel) {
				thisFeedWindow.FeedWindow.add(thisFeedWindow.FeedTitleLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisFeedWindow.FeedLinkLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Show in browser"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thisFeedWindow.FeedLinkLabel) {
				thisFeedWindow.FeedWindow.add(thisFeedWindow.FeedLinkLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function (e) {
    	
    	
    	
    	
		Titanium.Platform.openURL(thisFeedWindow.model.get('link'));
	};

//sendEmail




	thisFeedWindow.FeedLinkLabel.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisFeedWindow.PubDateLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thisFeedWindow.model.get("pubDate")
	});

	//after content
	var toBind = {attribute : "pubDate", bind : {el : thisFeedWindow.PubDateLabel, attribute : "text" , converter : undefined }};
if (thisFeedWindow.toBind) {thisFeedWindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisFeedWindow.PubDateLabel) {
				thisFeedWindow.FeedWindow.add(thisFeedWindow.PubDateLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		
			//include
			
				
				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisFeedWindow.DescriptionWebView = Titanium.UI.createWebView(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	html : thisFeedWindow.model.get("description")
	});

	//after content
	var toBind = {attribute : "description", bind : {el : thisFeedWindow.DescriptionWebView, attribute : "html" , converter : undefined }};
if (thisFeedWindow.toBind) {thisFeedWindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisFeedWindow.DescriptionWebView) {
				thisFeedWindow.FeedWindow.add(thisFeedWindow.DescriptionWebView);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var RSSReaderFeedWindowLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thisFeedWindow.FeedWindow);
					},
					android : function() {
						if (thisFeedWindow.FeedWindow) {
							thisFeedWindow.FeedWindow.close();
						}
					}
				});
				SMapp.utils.destroy(thisFeedWindow.FeedWindow);
				thisFeedWindow.close();
		};
		Ti.App.addEventListener('logout', RSSReaderFeedWindowLogout);

		var RSSReaderFeedWindowClose = function(e) {
			thisFeedWindow.FeedWindow.close();
		};
		thisFeedWindow.FeedWindow.addEventListener('android:back', RSSReaderFeedWindowClose);	
		
		var RSSReaderFeedWindowLogoutClose = function () {
			if (RSSReaderFeedWindowLogout && RSSReaderFeedWindowLogout != null) {
				Ti.API.info('remove RSSReaderFeedWindowLogout');
				Ti.App.removeEventListener('logout', RSSReaderFeedWindowLogout);	
			}
			if (RSSReaderFeedWindowClose && RSSReaderFeedWindowClose != null) {
				Ti.API.info('remove RSSReaderFeedWindowClose');
				Ti.App.removeEventListener('android:back', RSSReaderFeedWindowClose);				
			}
			RSSReaderFeedWindowLogout = null;
			RSSReaderFeedWindowLogoutClose = null;
			RSSReaderFeedWindowClose = null;
		};		
		thisFeedWindow.FeedWindow.addEventListener('close', RSSReaderFeedWindowLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		

		//eventListener
		

		//close eventListener
		this.FeedWindow.addEventListener("close", this.close);

        return this.FeedWindow;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.FeedWindow) {
	    		this.FeedWindow.close();
	    	}
    	

    	
        	if (this.FeedWindow && this.FeedWindow != null) {
				SMapp.utils.destroy(this.FeedWindow);
	    	}
    	
        	if (this.FeedWindow.logoutBarView && this.FeedWindow.logoutBarView != null) {
				SMapp.utils.destroy(this.FeedWindow.logoutBarView);
	    	}
    	
        	if (this.FeedWindow.titleView && this.FeedWindow.titleView != null) {
				SMapp.utils.destroy(this.FeedWindow.titleView);
	    	}
    	
        	if (this.FeedTitleLabel && this.FeedTitleLabel != null) {
				SMapp.utils.destroy(this.FeedTitleLabel);
	    	}
    	
        	if (this.FeedLinkLabel && this.FeedLinkLabel != null) {
				SMapp.utils.destroy(this.FeedLinkLabel);
	    	}
    	
        	if (this.PubDateLabel && this.PubDateLabel != null) {
				SMapp.utils.destroy(this.PubDateLabel);
	    	}
    	
        	if (this.DescriptionWebView && this.DescriptionWebView != null) {
				SMapp.utils.destroy(this.DescriptionWebView);
	    	}
    	
    	
    		if (this.model) {
    			this.model.unbind("destroy", this.close);
    		}
    	
    },

    destroy: function () {
    	if (this.model) {
    		this.model.destroy();
    	}
    },

    render: function(eventName) {
    	if (this._modelBinder) {
	    	//for loop on this.toBind
	    	var bindings = {};
	    	for (var bindingIndex in this.toBind) {
	    		var currentToBind = this.toBind[bindingIndex];
				if (!bindings[currentToBind.attribute]) {
	    			bindings[currentToBind.attribute] = [];
	    		}
	    		bindings[currentToBind.attribute].push(currentToBind.bind);
	    	}

	        this._modelBinder.bind(this.model, this.FeedWindow, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }

});

// If this window is in a tab then create the backbone view and render it


//tab Template


	


	//include
	
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template

	//backbone view template
	RSSReaderrssfeed = Backbone.View.extend({
	    
		//list to create the close function
		
		
		
		

		//variables to pass to children
		

	    _modelBinder: undefined,
	    newModel: [],

	    initialize: function() {
	        _.bindAll(this);

	        
	        if (this.model) {
	        	this._modelBinder = new Backbone.ModelBinder();
	        	//bindings
		        this.model.bind("destroy", this.close, this);
		        
		        
			        this.model.bind("change", this.update, this);
			        
			    
	    	}

	        //alias for this used by children
	        var thisrssfeed = this;

			//test condition
			

		        this.toBind = [];


		        //create the params for tab
		        

		        //params modif
		        
				

				

				
			        this.el = Ti.UI.createTableViewRow(
		        

				

				

				//searchable
				

				
				/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	width : "100%",
layout : "vertical",
height : Titanium.UI.SIZE,
_type : "TableViewItem",
className : "ListItemrssfeed"
	});

	//after content
	


				//searchBar
				

				//collection children
				

				

				//ceate the children views
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssfeed.FeedTitleLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thisrssfeed.model.get("title")
	});

	//after content
	var toBind = {attribute : "title", bind : {el : thisrssfeed.FeedTitleLabel, attribute : "text" , converter : undefined }};
if (thisrssfeed.toBind) {thisrssfeed.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisrssfeed.FeedTitleLabel) {
				this.el.add(thisrssfeed.FeedTitleLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				
					
						
						
						/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//execute function


//tabGroup Template


	//test condition
	

		
		//create the view's params
		
		

		
			thisrssfeed.PubDateLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thisrssfeed.model.get("pubDate")
	});

	//after content
	var toBind = {attribute : "pubDate", bind : {el : thisrssfeed.PubDateLabel, attribute : "text" , converter : undefined }};
if (thisrssfeed.toBind) {thisrssfeed.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thisrssfeed.PubDateLabel) {
				this.el.add(thisrssfeed.PubDateLabel);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


					
				

				//eventListener
				
					
					/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/




//open a new window

	var fireEvent = function (e) {
		Ti.API.info('event info ' + JSON.stringify(e));
		SMapp.os({
			def : function() {
				SMapp.navgroup.open(new RSSReaderFeedWindow({model : thisrssfeed.model, collection : thisrssfeed.collection}).render().FeedWindow, {
					animated : true
				});
			},
			android : function() {
				new RSSReaderFeedWindow({model : thisrssfeed.model, collection : thisrssfeed.collection}).render().FeedWindow.open({model : true});
			}
		});

	};

//fire an event on Ti.App




	this.el.addEventListener("click", fireEvent);

				

				//newModel attributes
				
		        
		        return this.el;

			//test condition
			
	    },
	    
	    render: function(eventName) {
	    	//test condition
			
		    	if (this._modelBinder) {
			    	var bindings = {};
			    	for (var bindingIndex in this.toBind) {
			    		var currentToBind = this.toBind[bindingIndex];
						if (!bindings[currentToBind.attribute]) {
			    			bindings[currentToBind.attribute] = [];
			    		}
			    		bindings[currentToBind.attribute].push(currentToBind.bind);
			    	}

			    	Ti.API.info('bindings of rssfeed : ' + JSON.stringify(bindings));

			    	

			        //unreference
			        this.toBind = null;
			        this._modelBinder.bind(this.model, this.el, bindings);
			        
			        	if (this.options.parent.data) {
			        		this.options.parent.setData(this.options.parent.data.slice(0));
			        	}
			        
			    }
		        return this;

		    //test condition
			
	    },

	    destroy: function () {
	    	//fireEvent on father
	    	this.model.destroy();
	    },
	    
	    close: function() {
	     	//unbind modelBinder
	    	if (this._modelBinder) {
	    		this._modelBinder.unbind();
	    	}   

	    	if (this.collectionBinder) {
	    		this.collectionBinder.unbind();
	    	} 	

	    	
	    		if (this.el && this.el.close) {
		    		this.el.close();
		    	}
	    	

	    	

	    	//element to put to null
	        
	        	if (this.el && this.el != null) {
		    		SMapp.utils.destroy(this.el);
		    	}
	    	
	        	if (this.FeedTitleLabel && this.FeedTitleLabel != null) {
		    		SMapp.utils.destroy(this.FeedTitleLabel);
		    	}
	    	
	        	if (this.PubDateLabel && this.PubDateLabel != null) {
		    		SMapp.utils.destroy(this.PubDateLabel);
		    	}
	    	
	    	Ti.API.info('after destroy');
	    	//execute unbindings
	    	
	    		if (this.model) {
	    			this.model.unbind("destroy", this.close);
	    		}
	    	
	    		if (this.model) {
	    			this.model.unbind("change", this.update);
	    		}
	    	
	    }

	    //if TableViewItem then have do do a setData to refresh tableView
	    
	    	,

		    update : function () {
	        	if (this.options.parent.data) {
	        		this.options.parent.setData(this.options.parent.data.slice(0));
	        	}
		    }

		
	});

//regular titanium views


	




// Event listeners
if (SMapp.RSSReader.loadingNumber == 0) {
	// The corresponding event is fired when the app is added to the dashboard
	Ti.App.addEventListener('load' + SMapp.RSSReader.app.id, loadRSSReaderApp);

	var openRSSReader = function(e) {
		// Open the view
		if (Ti.Platform.osname == 'android') {			
			new RSSReaderHomeWindow().render().HomeWindow.open();
		} else {
			SMapp.navgroup.open(new RSSReaderHomeWindow().render().HomeWindow, {
				animated : true
			});
		}
	};
	// The corresponding event is fired when the app icon is clicked in the dashboard
	Ti.App.addEventListener('open' + SMapp.RSSReader.app.id, openRSSReader);


	var RSSReaderGlobalLoggedOut = function(e) {
		SMapp.RSSReader.data = [];
		SMapp.RSSReader.app.appDirectory = null;

		//Remove periodic call to collection.fetch()
		for (var intervalIndex in SMapp.RSSReader.setIntervalList) {
			clearInterval(SMapp.RSSReader.setIntervalList[intervalIndex]);
		}

		//remove eventListener
		Ti.App.removeEventListener('load' + SMapp.RSSReader.app.id, loadRSSReaderApp);
		Ti.App.removeEventListener('open' + SMapp.RSSReader.app.id, openRSSReader);
		Ti.App.removeEventListener('logout', RSSReaderGlobalLoggedOut);
	};
	Ti.App.addEventListener('logout', RSSReaderGlobalLoggedOut);
}


// Load and set the periodicall call to the fetch function of collection
function loadRSSReaderApp(args) {
	//increment of loadingNumber
	SMapp.RSSReader.loadingNumber = SMapp.RSSReader.loadingNumber + 1;

	// If it is the first time we load this application
	if (SMapp.RSSReader.loadingNumber == 1) {
		SMapp.RSSReader.app = args.app;

		
			//set periodic call to collection.fetch()
			
				
				    var setIntervalId = setInterval(function() {
				    	if (Ti.Network.online && BackboneWaitingSyncList.length == 0) {
				            SMapp.RSSReader.RSSfeedsCollection.fetch({
				                update : true, removeMissing : true
				            });
				        }
				    }, 60000);

				    SMapp.RSSReader.setIntervalList.push(setIntervalId);
				
			
				
				    var setIntervalId = setInterval(function() {
				    	if (Ti.Network.online && BackboneWaitingSyncList.length == 0) {
				            SMapp.RSSReader.RSSSourcesCollection.fetch({
				                update : true, removeMissing : true
				            });
				        }
				    }, 60000);

				    SMapp.RSSReader.setIntervalList.push(setIntervalId);
				
			
		
	}
}

if (SMapp.spinnerWindow) {
	SMapp.spinnerWindow.hide();
}