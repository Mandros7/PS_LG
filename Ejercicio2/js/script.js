
var loadJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };
      xhr.onerror = function() {
        reject(xhr.response);
      };
      xhr.send();
    });
  }

function initAnimation () {
    //This function sets a loading animation
    var frame = document.getElementById("loading");
    frame.style.opacity = 1;
}

function showData (data) {
    //This function unsets the loading animation
    //and populates graphs
    var frame = document.getElementById("loading");
    frame.style.opacity = 0;
    console.log(data);
}

function parseData(json) {
    //This function normalizes the datasets
    return json;
}

function retrieveData() {
    Promise.all([
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data1.json"),
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data2.json"),
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data3.json")
    ]).then(function(jsonData) {
        showData(parseData(jsonData));
    }); 
}

function initialize() {
    initAnimation();
    retrieveData();
}