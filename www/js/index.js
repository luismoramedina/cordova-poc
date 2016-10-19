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
        document.getElementById("butt").addEventListener("click", speed.doAlert);

        speed.beep();
        speed.getInfoInterval();
        compass.getInfo();

        app.receivedEvent('deviceready');
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

var speed = {
    getInfo: function () {
        console.log("on get info");
        navigator.accelerometer.getCurrentAcceleration(speed.onReceive, speed.onError);
    }, 
    getInfoInterval: function () {
        var options = {frequency: 2000};
        var watchId = navigator.accelerometer.watchAcceleration(speed.onReceive, speed.onError, options);
        console.log(watchId);
    }, 
    beep: function () {
        var options = {frequency: 2000};
        var watchId = navigator.accelerometer.watchAcceleration(speed.beepInterval, speed.onError, options);
    }, 
    doAlert: function () {
        navigator.notification.alert("hello", speed.alertCB, "title", "OK");
    },
    beepInterval: function (speed) {
        if (speed.x > 1) {
            navigator.notification.beep(1);
            navigator.notification.alert("hello", speed.alertCB, "title", "OK");
        } else {
            console.log("Noo beeping");
        }
    }, 
    onReceive: function (speed) {
        document.getElementById("speed").innerHTML = 
            speed.x + "....";
    }, 
    alertCB: function () {
        console.log("cb");
    }, 
    onError: function (error) {
        console.log("error");
        alert("speed!" + error.code);
    }
};

var compass = {
    getInfo: function () {
        console.log("on get info");
        navigator.compass.getCurrentHeading(compass.onReceive, compass.onError);
    }, 
    onReceive: function (compass) {
        document.getElementById("compass").innerHTML = 
            compass.magneticHeading + "....";
    }, 
    onError: function (error) {
        console.log("error");
        alert("speed!" + error.code);
    }
};

app.initialize();