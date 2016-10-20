/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        console.log("appcontacts: onDeviceReady");

        navigator.contacts.find(
                [navigator.contacts.fieldType.displayName,
                navigator.contacts.fieldType.photos],
                app.getContactsCallback,
                app.errorCallback
            );

        app.receivedEvent('deviceready');
    },
    getContactsCallback: function(data) {
        var firsts = "";
        var div = document.getElementById("contacts");
        for (var i = 0; i < 200; i++) {
//            firsts = firsts + " - " + data[i].displayName;
            console.log(JSON.stringify(data[i]));
            if (data[i].photos && data[i].photos.length > 0) {
                if (data[i].photos[0].type === 'base64') {
                div.innerHTML += div.innerHTML + "<img src='" + data[i].photos[0].value + "'>";                
            }
            }

        }
//        alert("appcontacts: data " + firsts);
        
    },
    errorCallback: function(error) {
        alert("appcontacts: error " + error.message);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();