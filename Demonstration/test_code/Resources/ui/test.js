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

// Context variable for the test app
SMapp.test = {
	data : null,
	loadingNumber : 0,
	app : {
		name : "test",
		id : "test"
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
	
		SMapp.test.Contracts = Backbone.Model.extend({
	
		initialize: function () {
			this.collection = SMapp.test.ContractsCollection;
			//custom binding
			
				
					this.bind("change:status", this.setIspending, this);
				
				this.setIspending();
			
				
					this.bind("change:status", this.setIsprocessed, this);
				
				this.setIsprocessed();
			
				
					this.bind("change:status", this.setIsWaitingAction, this);
				
					this.bind("change:to", this.setIsWaitingAction, this);
				
				this.setIsWaitingAction();
			
				
				this.ispending();
			
				
				this.isprocessed();
			
			//nested collection
			
				this.CommentsColl = nestCollection(this, 'comments', new SMapp.test.CommentsCollectionConstructor(this.get('comments')), {removeMissing : true});
			
		},
		//custom binding
		
			setIspending : function() {
				
				 var isProcessed = this.get('status') == 'Pending'; this.set({isPending: isProcessed});
				
			},
		
			setIsprocessed : function() {
				
				 var isProcessed = this.get('status') != 'Pending'; this.set({isProcessed: isProcessed});
				
			},
		
			setIsWaitingAction : function() {
				
				var login = 'jerome'; var isWaitingAction = (this.get('status') == 'Pending' && this.get('to') && this.get('to').indexOf(login) > -1); this.set({isWaitingAction: isWaitingAction});
				
			},
		
			ispending : function() {
				
				return this.get('status') == 'Pending'
				
			},
		
			isprocessed : function() {
				
				return this.get('status') != 'Pending'
				
			},
		
		
			idAttribute : "_id",
		
		storeName: 'Contracts'
	});

	//create model
	
		SMapp.test.Products = Backbone.Model.extend({
	
		initialize: function () {
			this.collection = SMapp.test.ContractsCollection;
			//custom binding
			
			//nested collection
			
		},
		//custom binding
		
		
			idAttribute : "_id",
		
		storeName: 'Products'
	});

	//create model
	
		SMapp.test.Comment = Backbone.DeepModel.extend({
	
		initialize: function () {
			this.collection = SMapp.test.CommentsCollection;
			//custom binding
			
				
				this.ispending();
			
				
				this.isprocessed();
			
			//nested collection
			
		},
		//custom binding
		
			ispending : function() {
				
				return this.get('status') == 'Pending'
				
			},
		
			isprocessed : function() {
				
				return this.get('status') != 'Pending'
				
			},
		
		
			idAttribute : "date",
		
		storeName: 'Comment'
	});


//collections

/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//collection template


	//create collection
	SMapp.test.ContractsCollectionConstructor = Backbone.Collection.extend({
		//initialize function : create eventListener for creation, updating and deletion of model in the collection
		initialize : function() {
			Ti.App.addEventListener('newContracts', this.onNew);
			Ti.App.addEventListener('updateContracts', this.onUpdate);
			Ti.App.addEventListener('deleteContracts', this.onDelete);
			Ti.App.addEventListener('refreshAll', this.onRefreshAll);

			var thisAlias = this;

			var removeEvent = function () {
				Ti.App.removeEventListener('newContracts', thisAlias.onNew);
				Ti.App.removeEventListener('updateContracts', thisAlias.onUpdate);
				Ti.App.removeEventListener('deleteContracts', thisAlias.onDelete);
				Ti.App.removeEventListener('refreshAll', thisAlias.onRefreshAll);
				Ti.App.removeEventListener("logout", removeEvent);
			};

			Ti.App.addEventListener("logout", removeEvent);
		},

		onNew : function(entry) {
			var toModel = entry.model;
			var thisCol = SMapp.test.ContractsCollection;
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
			SMapp.test.ContractsCollection.fetch({update : true, removeMissing : true,
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
		
			idAttribute : "_id",
		

		//only one model
		
		//more than one model
			model: function (attrs, options) {
					switch (attrs.type) {
						
							case 'contract' : return new SMapp.test.Contracts(attrs, options);
						
							case 'product' : return new SMapp.test.Products(attrs, options);
						
							case 'comment' : return new SMapp.test.Comment(attrs, options);
						
						
							default : return new SMapp.test.Contracts(attrs, options);
						
					}
				},
		
		//url
		
			url : 'https://modeln-serverdev.herokuapp.com/contracts',
		
		//storeName
		storeName : 'Contracts'
		
			,
			directory : SMapp.user.userDirectory
		
		
			,
			encryption : { key : SMapp.key}
		
	});

	SMapp.test.ContractsCollection = new SMapp.test.ContractsCollectionConstructor();
	
	//subsets
	
		

			SMapp.test.ContractspendingCollectionConstructor = Backbone.Subset.extend({
				parent : SMapp.test.ContractsCollection,
				sieve : function (item) {
					if (item.ispending) {
						return item.ispending();
					} else {
						return false;
					}
				}
			});

			SMapp.test.ContractspendingCollection = new SMapp.test.ContractspendingCollectionConstructor();
			SMapp.test.ContractspendingCollection.liveupdate_keys = 'all';
			
		

			SMapp.test.ContractsprocessedCollectionConstructor = Backbone.Subset.extend({
				parent : SMapp.test.ContractsCollection,
				sieve : function (item) {
					if (item.isprocessed) {
						return item.isprocessed();
					} else {
						return false;
					}
				}
			});

			SMapp.test.ContractsprocessedCollection = new SMapp.test.ContractsprocessedCollectionConstructor();
			SMapp.test.ContractsprocessedCollection.liveupdate_keys = 'all';
			
		
	


	//first fetch
	
		if (SMapp.spinnerWindow) {
			SMapp.spinnerWindow.show();
		}
		SMapp.test.ContractsCollection.fetch({
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
	SMapp.test.CommentsCollectionConstructor = Backbone.Collection.extend({
		//initialize function : create eventListener for creation, updating and deletion of model in the collection
		initialize : function() {
			Ti.App.addEventListener('newComments', this.onNew);
			Ti.App.addEventListener('updateComments', this.onUpdate);
			Ti.App.addEventListener('deleteComments', this.onDelete);
			Ti.App.addEventListener('refreshAll', this.onRefreshAll);

			var thisAlias = this;

			var removeEvent = function () {
				Ti.App.removeEventListener('newComments', thisAlias.onNew);
				Ti.App.removeEventListener('updateComments', thisAlias.onUpdate);
				Ti.App.removeEventListener('deleteComments', thisAlias.onDelete);
				Ti.App.removeEventListener('refreshAll', thisAlias.onRefreshAll);
				Ti.App.removeEventListener("logout", removeEvent);
			};

			Ti.App.addEventListener("logout", removeEvent);
		},

		onNew : function(entry) {
			var toModel = entry.model;
			var thisCol = SMapp.test.CommentsCollection;
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
			SMapp.test.CommentsCollection.fetch({update : true, removeMissing : true,
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
		

		//only one model
		
			model: SMapp.test.Comment,
		
		//url
		
		//storeName
		storeName : 'Comments'
		
			,
			directory : SMapp.user.userDirectory
		
		
			,
			encryption : { key : SMapp.key}
		
	});

	SMapp.test.CommentsCollection = new SMapp.test.CommentsCollectionConstructor();
	
	//subsets
	


	//first fetch
	



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

//backbone view creation for a tabgroup
testtabGroup1 = Backbone.View.extend({

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
        var thistabGroup1 = this;
        //biding list
        this.toBind = [];

        //create the window
        this.tabGroup1 = Titanium.UI.createTabGroup(
		
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	
	});

	//after content
	


		// create and add tabs to the tabGroup
		
			//include
			
				
					//create tab call
					
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


// Create the tab
		
	
	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//create the backbone view
var testwindowPendingTab = Backbone.View.extend({

	//list to create the close function
	
	
	

	_modelBinder: undefined,
	newModel: [],
	    
    initialize: function() {
        _.bindAll(this);

        
        	this.model = SMapp.test.ContractspendingCollection.at(0);
	        this.collection = SMapp.test.ContractspendingCollection;
        
        if (this.model) {
        	this._modelBinder = new Backbone.ModelBinder();
        	this.model.bind("destroy", this.close, this);
    	} 

        
        //alias for this
        var thiswindowPendingTab = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	this.windowPendingTab = Titanium.UI.createWindow(
			
			
        	
        	
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Pending",
layout : "vertical"
	});

	//after content
	


		
			//hide NavBar cause of iPhone
			this.windowPendingTab.navBarHidden = true;
			//if window in a tab then create an intermediate view to put logout bar at the bottom
			this.windowPendingTabmainView = Titanium.UI.createView({layout : 'vertical'});
			this.windowPendingTabmainView.bottom = SMapp.buttonSize;

			this.windowPendingTab.add(this.windowPendingTabmainView);

			

			
		



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
		
		
			
		

		
			thiswindowPendingTab.PendingTable = Titanium.UI.createTableView(
			
			
		

		
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
		
			if (thiswindowPendingTab.PendingTable) {
				thiswindowPendingTab.windowPendingTabmainView.add(thiswindowPendingTab.PendingTable);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
				if (thiswindowPendingTab.collection) {

					var viewCreator = function(_model) {
			            return new testcontractItem({model: _model, parent : thiswindowPendingTab.PendingTable});
			        };

			        var viewManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory(viewCreator);
			        thiswindowPendingTab.collectionBinder = new Backbone.CollectionBinder(viewManagerFactory);

			    	thiswindowPendingTab.collectionBinder.bind(thiswindowPendingTab.collection, thiswindowPendingTab.PendingTable);			
				}
			
			
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var testwindowPendingTabLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thiswindowPendingTab.windowPendingTab);
					},
					android : function() {
						if (thiswindowPendingTab.windowPendingTab) {
							thiswindowPendingTab.windowPendingTab.close();
						}
					}
				});
				SMapp.utils.destroy(thiswindowPendingTab.windowPendingTab);
				thiswindowPendingTab.close();
		};
		Ti.App.addEventListener('logout', testwindowPendingTabLogout);

		var testwindowPendingTabClose = function(e) {
			thiswindowPendingTab.windowPendingTab.close();
		};
		thiswindowPendingTab.windowPendingTab.addEventListener('android:back', testwindowPendingTabClose);	
		
		var testwindowPendingTabLogoutClose = function () {
			if (testwindowPendingTabLogout && testwindowPendingTabLogout != null) {
				Ti.API.info('remove testwindowPendingTabLogout');
				Ti.App.removeEventListener('logout', testwindowPendingTabLogout);	
			}
			if (testwindowPendingTabClose && testwindowPendingTabClose != null) {
				Ti.API.info('remove testwindowPendingTabClose');
				Ti.App.removeEventListener('android:back', testwindowPendingTabClose);				
			}
			testwindowPendingTabLogout = null;
			testwindowPendingTabLogoutClose = null;
			testwindowPendingTabClose = null;
		};		
		thiswindowPendingTab.windowPendingTab.addEventListener('close', testwindowPendingTabLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thiswindowPendingTab.windowPendingTab.navBarHidden = true;

	thiswindowPendingTab.windowPendingTab.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thiswindowPendingTab.windowPendingTab.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thiswindowPendingTab.windowPendingTab.titleView.text = "Pending";
	

	thiswindowPendingTab.windowPendingTab.logoutBarView.add(thiswindowPendingTab.windowPendingTab.titleView);

	

	var buttonSize = 40;

	


	

	thiswindowPendingTab.windowPendingTab.add(thiswindowPendingTab.windowPendingTab.logoutBarView);

};

var defFunctionButtons = function () {
	var buttonSize = 40;

	

	
};

SMapp.os({android : logoutBarAndroidFunction, def : defFunctionButtons});	

logoutBarFunction = null;
defFunctionButtons = null;
		

		//eventListener
		

		//close eventListener
		this.windowPendingTab.addEventListener("close", this.close);

        return this.windowPendingTab;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.windowPendingTab) {
	    		this.windowPendingTab.close();
	    	}
    	

    	
        	if (this.windowPendingTab && this.windowPendingTab != null) {
				SMapp.utils.destroy(this.windowPendingTab);
	    	}
    	
        	if (this.windowPendingTabmainView && this.windowPendingTabmainView != null) {
				SMapp.utils.destroy(this.windowPendingTabmainView);
	    	}
    	
        	if (this.PendingTable && this.PendingTable != null) {
				SMapp.utils.destroy(this.PendingTable);
	    	}
    	
        	if (this.windowPendingTab.logoutBarView && this.windowPendingTab.logoutBarView != null) {
				SMapp.utils.destroy(this.windowPendingTab.logoutBarView);
	    	}
    	
        	if (this.windowPendingTab.titleView && this.windowPendingTab.titleView != null) {
				SMapp.utils.destroy(this.windowPendingTab.titleView);
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

	        this._modelBinder.bind(this.model, this.windowPendingTab, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }

});

// If this window is in a tab then create the backbone view and render it

	var param = {};
	if (this.model) {
		param.model = this.model;
	}
	if (this.collection) {
		param.collection = this.collection;
	}
	this.windowPendingTab = new testwindowPendingTab(param).render().windowPendingTab;

	testwindowPendingTab = null;

	

	//create params
    

    //params modif
    
	

	this.tab0 = Titanium.UI.createTab(
	
	
	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	window : thistabGroup1.windowPendingTab,
title : "Pending"
	});

	//after content
	


	var tab0Close = function () {
		thistabGroup1.tab0.removeEventListener('close', tab0Close);		
		//thistabGroup1.tab0.window.close();
		thistabGroup1.tab0.window.fireEvent('close');
		tab0Close = null;
	};

	thistabGroup1.tab0.addEventListener('close', tab0Close);

	

	this.tabGroup1.addTab(thistabGroup1.tab0);

	this.tabGroup1.currentTab = thistabGroup1.tab0;
	this.tabGroup1.setActiveTab(thistabGroup1.tab0);



//other backbones views

				
			
		
			//include
			
				
					//create tab call
					
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


// Create the tab
		
	
	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//create the backbone view
var testwindowProcessedTab = Backbone.View.extend({

	//list to create the close function
	
	
	

	_modelBinder: undefined,
	newModel: [],
	    
    initialize: function() {
        _.bindAll(this);

        
        	this.model = SMapp.test.ContractsprocessedCollection.at(0);
	        this.collection = SMapp.test.ContractsprocessedCollection;
        
        if (this.model) {
        	this._modelBinder = new Backbone.ModelBinder();
        	this.model.bind("destroy", this.close, this);
    	} 

        
        //alias for this
        var thiswindowProcessedTab = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	this.windowProcessedTab = Titanium.UI.createWindow(
			
			
        	
        	
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Processed",
layout : "vertical"
	});

	//after content
	


		
			//hide NavBar cause of iPhone
			this.windowProcessedTab.navBarHidden = true;
			//if window in a tab then create an intermediate view to put logout bar at the bottom
			this.windowProcessedTabmainView = Titanium.UI.createView({layout : 'vertical'});
			this.windowProcessedTabmainView.bottom = SMapp.buttonSize;

			this.windowProcessedTab.add(this.windowProcessedTabmainView);

			

			
		



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
		
		
			
		

		
			thiswindowProcessedTab.ProcessedTable = Titanium.UI.createTableView(
			
			
		

		
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
		
			if (thiswindowProcessedTab.ProcessedTable) {
				thiswindowProcessedTab.windowProcessedTabmainView.add(thiswindowProcessedTab.ProcessedTable);
			}
		

		//some views type need to be shown
		

		//searchBar
		

		//collectionBinder creation if TableView or View
		
			
				if (thiswindowProcessedTab.collection) {

					var viewCreator = function(_model) {
			            return new testcontractItem({model: _model, parent : thiswindowProcessedTab.ProcessedTable});
			        };

			        var viewManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory(viewCreator);
			        thiswindowProcessedTab.collectionBinder = new Backbone.CollectionBinder(viewManagerFactory);

			    	thiswindowProcessedTab.collectionBinder.bind(thiswindowProcessedTab.collection, thiswindowProcessedTab.ProcessedTable);			
				}
			
			
		

		//add children of this view
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var testwindowProcessedTabLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thiswindowProcessedTab.windowProcessedTab);
					},
					android : function() {
						if (thiswindowProcessedTab.windowProcessedTab) {
							thiswindowProcessedTab.windowProcessedTab.close();
						}
					}
				});
				SMapp.utils.destroy(thiswindowProcessedTab.windowProcessedTab);
				thiswindowProcessedTab.close();
		};
		Ti.App.addEventListener('logout', testwindowProcessedTabLogout);

		var testwindowProcessedTabClose = function(e) {
			thiswindowProcessedTab.windowProcessedTab.close();
		};
		thiswindowProcessedTab.windowProcessedTab.addEventListener('android:back', testwindowProcessedTabClose);	
		
		var testwindowProcessedTabLogoutClose = function () {
			if (testwindowProcessedTabLogout && testwindowProcessedTabLogout != null) {
				Ti.API.info('remove testwindowProcessedTabLogout');
				Ti.App.removeEventListener('logout', testwindowProcessedTabLogout);	
			}
			if (testwindowProcessedTabClose && testwindowProcessedTabClose != null) {
				Ti.API.info('remove testwindowProcessedTabClose');
				Ti.App.removeEventListener('android:back', testwindowProcessedTabClose);				
			}
			testwindowProcessedTabLogout = null;
			testwindowProcessedTabLogoutClose = null;
			testwindowProcessedTabClose = null;
		};		
		thiswindowProcessedTab.windowProcessedTab.addEventListener('close', testwindowProcessedTabLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thiswindowProcessedTab.windowProcessedTab.navBarHidden = true;

	thiswindowProcessedTab.windowProcessedTab.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thiswindowProcessedTab.windowProcessedTab.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thiswindowProcessedTab.windowProcessedTab.titleView.text = "Processed";
	

	thiswindowProcessedTab.windowProcessedTab.logoutBarView.add(thiswindowProcessedTab.windowProcessedTab.titleView);

	

	var buttonSize = 40;

	


	

	thiswindowProcessedTab.windowProcessedTab.add(thiswindowProcessedTab.windowProcessedTab.logoutBarView);

};

var defFunctionButtons = function () {
	var buttonSize = 40;

	

	
};

SMapp.os({android : logoutBarAndroidFunction, def : defFunctionButtons});	

logoutBarFunction = null;
defFunctionButtons = null;
		

		//eventListener
		

		//close eventListener
		this.windowProcessedTab.addEventListener("close", this.close);

        return this.windowProcessedTab;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.windowProcessedTab) {
	    		this.windowProcessedTab.close();
	    	}
    	

    	
        	if (this.windowProcessedTab && this.windowProcessedTab != null) {
				SMapp.utils.destroy(this.windowProcessedTab);
	    	}
    	
        	if (this.windowProcessedTabmainView && this.windowProcessedTabmainView != null) {
				SMapp.utils.destroy(this.windowProcessedTabmainView);
	    	}
    	
        	if (this.ProcessedTable && this.ProcessedTable != null) {
				SMapp.utils.destroy(this.ProcessedTable);
	    	}
    	
        	if (this.windowProcessedTab.logoutBarView && this.windowProcessedTab.logoutBarView != null) {
				SMapp.utils.destroy(this.windowProcessedTab.logoutBarView);
	    	}
    	
        	if (this.windowProcessedTab.titleView && this.windowProcessedTab.titleView != null) {
				SMapp.utils.destroy(this.windowProcessedTab.titleView);
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

	        this._modelBinder.bind(this.model, this.windowProcessedTab, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }

});

// If this window is in a tab then create the backbone view and render it

	var param = {};
	if (this.model) {
		param.model = this.model;
	}
	if (this.collection) {
		param.collection = this.collection;
	}
	this.windowProcessedTab = new testwindowProcessedTab(param).render().windowProcessedTab;

	testwindowProcessedTab = null;

	

	//create params
    

    //params modif
    
	

	this.tab1 = Titanium.UI.createTab(
	
	
	/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	window : thistabGroup1.windowProcessedTab,
title : "Processed"
	});

	//after content
	


	var tab1Close = function () {
		thistabGroup1.tab1.removeEventListener('close', tab1Close);		
		//thistabGroup1.tab1.window.close();
		thistabGroup1.tab1.window.fireEvent('close');
		tab1Close = null;
	};

	thistabGroup1.tab1.addEventListener('close', tab1Close);

	

	this.tabGroup1.addTab(thistabGroup1.tab1);

	this.tabGroup1.currentTab = thistabGroup1.tab1;
	this.tabGroup1.setActiveTab(thistabGroup1.tab1);



//other backbones views

				
			
		

		//track the current tab for the tab group
		var testtabGroup1SetCurrentTab = function(e) {
			if (e.tab) {
				thistabGroup1.tabGroup1.currentTab = e.tab;
			}
		};
		this.tabGroup1.addEventListener('focus', testtabGroup1SetCurrentTab);

		//track the current tab for the tab group
		var testtabGroup1CloseAndroid = function(e) {
			thistabGroup1.tabGroup1.close();
		};
		this.tabGroup1.addEventListener('android:back', testtabGroup1CloseAndroid);

		var testtabGroup1CurrentTabCloseHandler = function(e) {
			if (testtabGroup1SetCurrentTab && testtabGroup1SetCurrentTab != null) { 
				thistabGroup1.tabGroup1.removeEventListener('focus', testtabGroup1SetCurrentTab);			
			}
			testtabGroup1SetCurrentTab = null;
			if (testtabGroup1CloseAndroid && testtabGroup1CloseAndroid != null) { 
				thistabGroup1.tabGroup1.removeEventListener('android:back', testtabGroup1CloseAndroid);
			}
			testtabGroup1CloseAndroid = null;			
			if (testtabGroup1CurrentTabCloseHandler && testtabGroup1CurrentTabCloseHandler != null) { 
				thistabGroup1.tabGroup1.removeEventListener('close', testtabGroup1CurrentTabCloseHandler);
			}
			testtabGroup1CurrentTabCloseHandler = null;
		};
		this.tabGroup1.addEventListener('close', testtabGroup1CurrentTabCloseHandler);

		//logout handler
		var testtabGroup1Logout = function() {
			SMapp.os({
				def : function() {
					SMapp.navgroup.close(thistabGroup1.tabGroup1);
				},
				android : function() {
					if (thistabGroup1.tabGroup1) {
						thistabGroup1.tabGroup1.close();
					}
				}
			});
			thistabGroup1.close();
			SMapp.utils.destroy(thistabGroup1.tabGroup1);
		};
		Ti.App.addEventListener('logout', testtabGroup1Logout);

		var testtabGroup1CloseHandler = function () {
			if (testtabGroup1Logout && testtabGroup1Logout != null) { 
				Ti.App.removeEventListener('logout', testtabGroup1Logout);
			}
			testtabGroup1Logout = null;
			if (testtabGroup1CloseHandler && testtabGroup1CloseHandler != null) { 
				thistabGroup1.tabGroup1.removeEventListener("close", testtabGroup1CloseHandler);
			}
			testtabGroup1CloseHandler = null;
		};
		this.tabGroup1.addEventListener("close", testtabGroup1CloseHandler);

		//close eventListener
		this.tabGroup1.addEventListener("close", this.close);

	    return this.tabGroup1;
    },

    close: function () {

		this.tabGroup1.removeEventListener("close", this.close);

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}  

    	
    		this.tabGroup1.removeTab(this.tab0);
    	
    		this.tabGroup1.removeTab(this.tab1);
    	 

    	
    		if (this.tabGroup1) {
	    		this.tabGroup1.close();
	    	}
    	

    	

    	
    		if (this.tab0) {
    			//iOS tab close take the window in param
    			this.tab0.fireEvent('close');
    			if (Ti.Platform.osname == 'android') {
    				this.tab0.close();
    			}
    			else {
    				this.tab0.close(this.tab0.window);
    			}
	    	}
    	
    		if (this.tab1) {
    			//iOS tab close take the window in param
    			this.tab1.fireEvent('close');
    			if (Ti.Platform.osname == 'android') {
    				this.tab1.close();
    			}
    			else {
    				this.tab1.close(this.tab1.window);
    			}
	    	}
    		

    	
        	if (this.tabGroup1 && this.tabGroup1 != null) {
	    		SMapp.utils.destroy(this.tabGroup1);
	    	}
    	
    	
    	
    		SMapp.utils.destroy(this.tab0);
		
    		SMapp.utils.destroy(this.tab1);
		
    	
    		if (this.model) {
    			this.model.unbind("destroy", this.close);
    		}
    	
    },

    destroy: function () {
    	//fireEvent on father
    	this.model.destroy();
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
	    	
	        this._modelBinder.bind(this.model, this.tabGroup1, bindings);
	        //unreference
	        this.toBind = null;
	    }
        return this;
    }
});

//window Template


	


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
var testsecondwindow = Backbone.View.extend({

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
        var thissecondwindow = this;
        //biding list
        this.toBind = [];

        //create the window
		
        	thissecondwindow.secondwindow = Titanium.UI.createWindow(
        	
        	
			
			
		
		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : thissecondwindow.model.get("name"),
layout : "vertical"
	});

	//after content
	var toBind = {attribute : "name", bind : {el : thissecondwindow.secondwindow, attribute : "title" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		
			
			
			/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


var logoutBarAndroidFunction = function() {
	thissecondwindow.secondwindow.navBarHidden = true;

	thissecondwindow.secondwindow.logoutBarView = Ti.UI.createView({
		height : SMapp.buttonSize,
		width : '100%',
		backgroundColor : '#1C5298',
		top : 0
	});

	

	thissecondwindow.secondwindow.titleView = Ti.UI.createLabel({
		color : 'white',
		shadowColor : '#000',
		shadowOffset : {x : 1,	y : 1},
		heigth : Ti.UI.FILL,
		textAlign : 'center'}
	);

	
		thissecondwindow.secondwindow.titleView.text = thissecondwindow.model.get("name");
	

	thissecondwindow.secondwindow.logoutBarView.add(thissecondwindow.secondwindow.titleView);

	

	var buttonSize = 40;

	


	

	thissecondwindow.secondwindow.add(thissecondwindow.secondwindow.logoutBarView);

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
		
		

		
			thissecondwindow.IntermediateView = Titanium.UI.createView(
			
			
		

		
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
_type : "View"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thissecondwindow.IntermediateView) {
				thissecondwindow.secondwindow.add(thissecondwindow.IntermediateView);
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
		
		

		
			thissecondwindow.ContractNameView = Titanium.UI.createView(
			
			
		

		
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
		
			if (thissecondwindow.ContractNameView) {
				thissecondwindow.IntermediateView.add(thissecondwindow.ContractNameView);
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
		
		

		
			thissecondwindow.ContractNameLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Contract Name : "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractNameLabel) {
				thissecondwindow.ContractNameView.add(thissecondwindow.ContractNameLabel);
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
		
		

		
			thissecondwindow.ContractNameLabelValue = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thissecondwindow.model.get("name")
	});

	//after content
	var toBind = {attribute : "name", bind : {el : thissecondwindow.ContractNameLabelValue, attribute : "text" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractNameLabelValue) {
				thissecondwindow.ContractNameView.add(thissecondwindow.ContractNameLabelValue);
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
		
		

		
			thissecondwindow.ContractValueView = Titanium.UI.createView(
			
			
		

		
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
		
			if (thissecondwindow.ContractValueView) {
				thissecondwindow.IntermediateView.add(thissecondwindow.ContractValueView);
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
		
		

		
			thissecondwindow.ContractValueLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Value : "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractValueLabel) {
				thissecondwindow.ContractValueView.add(thissecondwindow.ContractValueLabel);
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
		
		

		
			thissecondwindow.ContractValueLabelValue = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thissecondwindow.model.get("value")
	});

	//after content
	var toBind = {attribute : "value", bind : {el : thissecondwindow.ContractValueLabelValue, attribute : "text" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractValueLabelValue) {
				thissecondwindow.ContractValueView.add(thissecondwindow.ContractValueLabelValue);
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
		
		

		
			thissecondwindow.ContractStatusView = Titanium.UI.createView(
			
			
		

		
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
		
			if (thissecondwindow.ContractStatusView) {
				thissecondwindow.IntermediateView.add(thissecondwindow.ContractStatusView);
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
		
		

		
			thissecondwindow.ContractStatusLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : "Status : "
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractStatusLabel) {
				thissecondwindow.ContractStatusView.add(thissecondwindow.ContractStatusLabel);
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
		
		

		
			thissecondwindow.ContractStatusLabelValue = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thissecondwindow.model.get("status")
	});

	//after content
	var toBind = {attribute : "status", bind : {el : thissecondwindow.ContractStatusLabelValue, attribute : "text" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thissecondwindow.ContractStatusLabelValue) {
				thissecondwindow.ContractStatusView.add(thissecondwindow.ContractStatusLabelValue);
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
		
		

		
			thissecondwindow.ValidateButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Validate Contract",
visible : thissecondwindow.model.get("isPending")
	});

	//after content
	var toBind = {attribute : "isPending", bind : {el : thissecondwindow.ValidateButton, attribute : "visible" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thissecondwindow.ValidateButton) {
				thissecondwindow.IntermediateView.add(thissecondwindow.ValidateButton);
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
    	
    	
    	
    	
		thissecondwindow.model.set({status : "Processed"}); thissecondwindow.model.collection.onUpdate({model : thissecondwindow.model});
	};

//sendEmail




	thissecondwindow.ValidateButton.addEventListener("click", fireEvent);

		

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
		
		

		
			thissecondwindow.RejectButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "Reject Contract",
visible : thissecondwindow.model.get("isProcessed")
	});

	//after content
	var toBind = {attribute : "isProcessed", bind : {el : thissecondwindow.RejectButton, attribute : "visible" , converter : undefined }};
if (thissecondwindow.toBind) {thissecondwindow.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thissecondwindow.RejectButton) {
				thissecondwindow.IntermediateView.add(thissecondwindow.RejectButton);
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
    	
    	
    	
    	
		thissecondwindow.model.set({status : "Pending"}); thissecondwindow.model.collection.onUpdate({model : thissecondwindow.model});
	};

//sendEmail




	thissecondwindow.RejectButton.addEventListener("click", fireEvent);

		

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
		
		

		
			thissecondwindow.DetailsButton = Titanium.UI.createButton(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	title : "PopUp"
	});

	//after content
	


		//different case to add or not to the parent
		
			if (thissecondwindow.DetailsButton) {
				thissecondwindow.IntermediateView.add(thissecondwindow.DetailsButton);
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
    	
    	
    	
    	
		alert('Popup on click !');
	};

//sendEmail




	thissecondwindow.DetailsButton.addEventListener("click", fireEvent);

		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//eventListener
		

		//newModel attributes
		

		//if isRequired then return a new object
		

	//if condition then close brackets of if
	


			
		

		//logout handler
		var testsecondwindowLogout = function() {
				SMapp.os({
					def : function() {
						SMapp.navgroup.close(thissecondwindow.secondwindow);
					},
					android : function() {
						if (thissecondwindow.secondwindow) {
							thissecondwindow.secondwindow.close();
						}
					}
				});
				SMapp.utils.destroy(thissecondwindow.secondwindow);
				thissecondwindow.close();
		};
		Ti.App.addEventListener('logout', testsecondwindowLogout);

		var testsecondwindowClose = function(e) {
			thissecondwindow.secondwindow.close();
		};
		thissecondwindow.secondwindow.addEventListener('android:back', testsecondwindowClose);	
		
		var testsecondwindowLogoutClose = function () {
			if (testsecondwindowLogout && testsecondwindowLogout != null) {
				Ti.API.info('remove testsecondwindowLogout');
				Ti.App.removeEventListener('logout', testsecondwindowLogout);	
			}
			if (testsecondwindowClose && testsecondwindowClose != null) {
				Ti.API.info('remove testsecondwindowClose');
				Ti.App.removeEventListener('android:back', testsecondwindowClose);				
			}
			testsecondwindowLogout = null;
			testsecondwindowLogoutClose = null;
			testsecondwindowClose = null;
		};		
		thissecondwindow.secondwindow.addEventListener('close', testsecondwindowLogoutClose);

		//if window in a tab then put the logout bar at the bottom and add eventListener to close the tabGroup
		

		//eventListener
		

		//close eventListener
		this.secondwindow.addEventListener("close", this.close);

        return this.secondwindow;
    },

    close : function () {  	
    	//close of window

    	if (this._modelBinder) {
    		this._modelBinder.unbind();
    	}

    	if (this.collectionBinder) {
    		this.collectionBinder.unbind();
    	} 	

    	
    		if (this.secondwindow) {
	    		this.secondwindow.close();
	    	}
    	

    	
        	if (this.secondwindow && this.secondwindow != null) {
				SMapp.utils.destroy(this.secondwindow);
	    	}
    	
        	if (this.secondwindow.logoutBarView && this.secondwindow.logoutBarView != null) {
				SMapp.utils.destroy(this.secondwindow.logoutBarView);
	    	}
    	
        	if (this.secondwindow.titleView && this.secondwindow.titleView != null) {
				SMapp.utils.destroy(this.secondwindow.titleView);
	    	}
    	
        	if (this.IntermediateView && this.IntermediateView != null) {
				SMapp.utils.destroy(this.IntermediateView);
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

	        this._modelBinder.bind(this.model, this.secondwindow, bindings);
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
	testcontractItem = Backbone.View.extend({
	    
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
	        var thiscontractItem = this;

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
className : "ListItemcontractItem"
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
		
		

		
			thiscontractItem.ContractNameLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thiscontractItem.model.get("name")
	});

	//after content
	var toBind = {attribute : "name", bind : {el : thiscontractItem.ContractNameLabel, attribute : "text" , converter : undefined }};
if (thiscontractItem.toBind) {thiscontractItem.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thiscontractItem.ContractNameLabel) {
				this.el.add(thiscontractItem.ContractNameLabel);
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
		
		

		
			thiscontractItem.ContractValueLabel = Titanium.UI.createLabel(
			
			
		

		
		/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/











//if the item is related to a class

	{
	
	text : thiscontractItem.model.get("value")
	});

	//after content
	var toBind = {attribute : "value", bind : {el : thiscontractItem.ContractValueLabel, attribute : "text" , converter : undefined }};
if (thiscontractItem.toBind) {thiscontractItem.toBind.push(toBind);}


		//different case to add or not to the parent
		
			if (thiscontractItem.ContractValueLabel) {
				this.el.add(thiscontractItem.ContractValueLabel);
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
				SMapp.navgroup.open(new testsecondwindow({model : thiscontractItem.model, collection : thiscontractItem.collection}).render().secondwindow, {
					animated : true
				});
			},
			android : function() {
				new testsecondwindow({model : thiscontractItem.model, collection : thiscontractItem.collection}).render().secondwindow.open({model : true});
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

			    	Ti.API.info('bindings of contractItem : ' + JSON.stringify(bindings));

			    	

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
	    	
	        	if (this.ContractNameLabel && this.ContractNameLabel != null) {
		    		SMapp.utils.destroy(this.ContractNameLabel);
		    	}
	    	
	        	if (this.ContractValueLabel && this.ContractValueLabel != null) {
		    		SMapp.utils.destroy(this.ContractValueLabel);
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
if (SMapp.test.loadingNumber == 0) {
	// The corresponding event is fired when the app is added to the dashboard
	Ti.App.addEventListener('load' + SMapp.test.app.id, loadtestApp);

	var opentest = function(e) {
		// Open the view
		if (Ti.Platform.osname == 'android') {			
			new testtabGroup1().render().tabGroup1.open();
		} else {
			SMapp.navgroup.open(new testtabGroup1().render().tabGroup1, {
				animated : true
			});
		}
	};
	// The corresponding event is fired when the app icon is clicked in the dashboard
	Ti.App.addEventListener('open' + SMapp.test.app.id, opentest);


	var testGlobalLoggedOut = function(e) {
		SMapp.test.data = [];
		SMapp.test.app.appDirectory = null;

		//Remove periodic call to collection.fetch()
		for (var intervalIndex in SMapp.test.setIntervalList) {
			clearInterval(SMapp.test.setIntervalList[intervalIndex]);
		}

		//remove eventListener
		Ti.App.removeEventListener('load' + SMapp.test.app.id, loadtestApp);
		Ti.App.removeEventListener('open' + SMapp.test.app.id, opentest);
		Ti.App.removeEventListener('logout', testGlobalLoggedOut);
	};
	Ti.App.addEventListener('logout', testGlobalLoggedOut);
}


// Load and set the periodicall call to the fetch function of collection
function loadtestApp(args) {
	//increment of loadingNumber
	SMapp.test.loadingNumber = SMapp.test.loadingNumber + 1;

	// If it is the first time we load this application
	if (SMapp.test.loadingNumber == 1) {
		SMapp.test.app = args.app;

		
			//set periodic call to collection.fetch()
			
				
				    var setIntervalId = setInterval(function() {
				    	if (Ti.Network.online && BackboneWaitingSyncList.length == 0) {
				            SMapp.test.ContractsCollection.fetch({
				                update : true, removeMissing : true
				            });
				        }
				    }, 60000);

				    SMapp.test.setIntervalList.push(setIntervalId);
				
			
				
			
		
	}
}

if (SMapp.spinnerWindow) {
	SMapp.spinnerWindow.hide();
}