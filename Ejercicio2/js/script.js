
// Load JSON function. Requests a file through an AJAX method.
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

//Function to group by elements of an array
var groupBy = function(arr, key) {
  return arr.reduce(function(field, x) {
    (field[x[key]] = field[x[key]] || []).push(x);
    return field;
  }, {});
};

//This function sets a loading animation
function initAnimation () {
    var frame = document.getElementById("loading");
    frame.style.opacity = 1;
}

//Prints a line chart with data sorted by category
function printLineChart(data) {
    var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    //Line printing function
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.amount); });

    //Sort element by date (to facilitate printing)
    categories = data.map((elem, i, data) => {
        return {
            "cat": elem.cat,
            "values": elem.values.sort(function(a, b) {
                return d3.ascending(a.date, b.date)
            })
        }
    });

    //Set limits of the axis
    x.domain([
        d3.min(categories, function(c) { return d3.min(c.values, function(d) { return d.date; }); }),
        d3.max(categories, function(c) { return d3.max(c.values, function(d) { return d.date; }); })
    ]);
    y.domain([
        d3.min(categories, function(c) { return d3.min(c.values, function(d) { return d.amount; }); }),
        d3.max(categories, function(c) { return d3.max(c.values, function(d) { return d.amount; }); })
    ]);

    //Define color palette
    z.domain(categories.map(function(c) { return c.cat; }));

    //Define axis
    g.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + height+ ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Value");

    //Load data into d3 objects
    var cat = g.selectAll(".cat")
      .data(categories)
      .enter().append("g")
      .attr("class", "cat");

    //Draw line
    cat.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.cat); });
    
    //Append category name to end of line.
    cat.append("text")
      .datum(function(d) { return {name: d.cat, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.amount) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .style("font-size","70%");
}

//Prints a legend
function printLegend(parentClass, data,width,height) {
    var svgLegend = d3.select("."+parentClass).append("svg")
            .attr("width", width)
            .attr("height", height - 50)
        
    var dataL = 0;
    var offset = 80;
    
    legendVals = data.map(function(c) { return c.cat; })
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var legend = svgLegend.selectAll('.legends')
        .data(legendVals)
        .enter().append('g')
        .attr("class", "legends")
        .attr("transform", function (d, i) {
         if (i === 0) {
            dataL = d.length + offset 
            return "translate(0,0)"
        } else { 
         var newdataL = dataL
         dataL +=  d.length + offset
         return "translate(" + (newdataL) + ",0)"
        }
    })
    
    legend.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
        return color(i)
    })
    
    legend.append('text')
        .attr("x", 20)
        .attr("y", 10)
    //.attr("dy", ".35em")
    .text(function (d, i) {
        return d
    })
        .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 15)
}


//Prints a donut chart (pie chart if factor = 1)
function printPieChart(parentClass,width,height,data,total,factor) {

    //Define color palette
    var z = d3.scaleOrdinal(d3.schemeCategory10);
    z.domain(data.map(function(c) { return c.cat; }));
   
    //Defne overall size
    radius = width / 2.2;

    //Define size of inner and outter (pie vs donut)
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - radius/factor);

    //Pie function for printing speicifc arcs
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.sum;
        });

    var svg = d3.select('.'+parentClass).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g");    

   	g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i) {
            return z(d.data.cat);
        });

    //Show percentage close to each section
    g.append("text")
        .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] *= 1.4 / factor ;	//multiply by a constant factor
            _d[1] *= 1.4 / factor;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function(d) {
            if( d.data.sum / total * 100 < 8) {
              return '';
            }
            return parseFloat(d.data.sum / total * 100).toFixed(2) + '%';
        });
   
}

//This function unsets the loading animation
//and populates graphs
function showData (data) {
    printLineChart(data);
    printLegend("exercise2",data,400,100);
    
    //Prepare data for pie charts
    catSum = data.map((elem, i, data) => {
        return {
            "cat": elem.cat,
            "sum": elem.values.reduce((a,b) => a + b.amount,0)
        }
    });   
    
    var total = catSum.reduce((a,b) => a + b.sum, 0);       
    printPieChart("exercise2",400,400,catSum,total,1);

    printPieChart("dyk",300,300,catSum,total,1);
    printPieChart("dyk",300,300,catSum,total,2.5);
        
    var frame = document.getElementById("loading");
    frame.style.opacity = 0;
}

//This function normalizes the datasets
function parseData(json) {
    collapsedArr = json.flat();
    var regex = /\d{4}\-\d{2}\-\d{2}/;
    //FORMAT
    var parsedArr = collapsedArr.map((elem, i, collapsedArr) => {
        if ("d" in elem) {
            return {
                "cat": elem.cat.toUpperCase(),
                "values":{
                    "date": parseInt(elem.d),
                    "amount": elem.value
                }
            }
        }
        else if ("myDate" in elem) {
            return {
                "cat": elem.categ.toUpperCase(),
                "values": {
                    "date": Date.parse(elem.myDate),
                    "amount": elem.val
                }               
            }
        }
        else if ("raw" in elem) {
            return {
                "cat": elem.raw.substring(elem.raw.indexOf("#") + 1, elem.raw.indexOf("#", elem.raw.indexOf("#") + 1)).toUpperCase(),
                "values": {
                    "date": Date.parse(elem.raw.match(regex)[0]),
                    "amount": elem.val
                }
                
            }            
        }
    });
    
    //AGGREATION OF DUPLICATES (PER CATEGORY)
    accArr = Object.values(parsedArr.reduce(function(r, e) {
      var key = e.values.date + '|' + e.cat;
      if (!r[key]) r[key] = e;
      else {
        r[key].values.amount += e.values.amount;
      }
      return r;
    }, {}));
    
    //FORMAT (FOR d3 VIS)
    return Object.values(accArr.reduce(function(r, e) {
      var key = e.cat;
      if (!r[key]) r[key] = {"cat": e.cat, "values":[e.values]};
      else {
        r[key].values.push(e.values);
      }
      return r;
    }, {}));
}

// This function loads data and calls the print functions
function retrieveData() {
    Promise.all([
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data1.json"),
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data2.json"),
        loadJSON("http://s3.amazonaws.com/logtrust-static/test/test/data3.json")
    ]).then(function(jsonData) {
        showData(parseData(jsonData));
    }); 
}
// Main function
function initialize() {
    initAnimation();
    retrieveData();
}