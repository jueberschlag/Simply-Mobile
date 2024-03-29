/*
Simply Mobile - Mobile Development Framework
Copyright (c) 2012 Model N, Jérôme Ueberschlag, Clémence Aucagne, Jean-Baptiste Pringuey

See the file license.txt for copying permission.
*/


//TODO : check SMapp.navgroup

if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else {   
   /* Encryption module */
    Titanium.include('lib/sjcl.js');

    /* Analytics */

    /* SMapp global namespace */
    var SMapp = {
        dataToSendList : [], // Where waiting data are added when they cannot be sent
        toSendList : [], // Used to send the data from the dataToSendList in the right order
        serverUrl : "https://modeln-serverdev.herokuapp.com/",

        user : {// Describes the connected user
            login : null, // Login with the form username@company.com, set only once the server responds positively to the authentication request, set to null on logout
            userDirectory : null, // path to the user folder (it is inside the application data directory and contains files related to the user and its modules)
            wasConnectedOffline : false // Used in the LoginWindow to know if the user was already connected thanks to the saved credential when it receive a response from the server
        },
        utils : {}, // Defining the utils namespace
        tests_enabled : false, // Used to launch jasmine tests instead of open the normal window
        buttonSize : 40 // Use for the window header size
    };
    /* End SMapp global namespace */

    /* Files include */
    Ti.include('/lib/underscore.js');
    Ti.include('/utils.js');
    Ti.include('/controller/loader.js');
    Ti.include('/controller/dataManagement.js');

    // Notifications lib

    // Include main file
    Ti.include('ui/test.js');
    //load the file
    Ti.App.fireEvent('loadtest');
    //open the main view of baseFile
    Ti.App.fireEvent('opentest');

    /* End Files include */

    // When app is put on background, we save the remaining data to send
    Ti.App.addEventListener('pause', function(e) {
        var l = SMapp.dataToSendList.length;
        if (l > 0) {
            for ( i = 0; i < l; i++) {
                SMapp.toSendList.push(SMapp.dataToSendList.pop());
            }
        }
        if (SMapp.toSendList.length > 0 && SMapp.user.userDirectory != null) {
            var saveFile = Ti.Filesystem.getFile(SMapp.user.userDirectory, 'save.json');
            saveFile.write(JSON.stringify(SMapp.toSendList));
            Ti.API.info('File content: ' + saveFile.read().text);
        }
    });

}