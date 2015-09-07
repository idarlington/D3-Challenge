var main=function(){
  // Seed data to populate the donut pie chart
var seedData = [{
  "label": "React",
  "value": 25,
  "link": "https://facebook.github.io/react/"
}, {
  "label": "D3",
  "value": 25,
  "link": "http://d3js.org"
}, {
  "label": "jQuery with more text",
  "value": 25,
  "link": "https://jquery.com/"
}, {
  "label": "AngularJS",
  "value": 25,
  "link": "https://angularjs.org/"
}, {
  "label": "Meteor",
  "value": 25,
  "link": "https://meteorhacks.com/meteor-js-web-framework-for-everyone"
}, {
  "label": "Node.js",
  "value": 25,
  "link": "https://nodejs.org/"
}];

// Define size & radius of donut pie chart
var width = 700,
  height = 700,
  radius = Math.min(width, height) / 2;

// Define arc colours
var colour = d3.scale.category20();

// Define arc ranges
var arcText = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1, .3);

// Determine size of arcs
var arc = d3.svg.arc()
  .innerRadius(radius - 100)
  .outerRadius(radius - 10);

// Create the donut pie chart layout
var pie = d3.layout.pie()
	.value(function (d) { return d["value"]; })
  .sort(null);

// Append SVG attributes and append g to the SVG
var svg = d3.select("#donut-chart")
  .attr("width", width)
  .attr("height", height)
.call(responsivefy)
	.append("g")
    

  	.attr("transform", "translate(" + radius + "," + radius + ")")
     


// Calculate SVG paths and fill in the colours
var g = svg.selectAll(".arc")
		.data(pie(seedData))
  .enter().append("g")
		.attr("class", "arc")
		
		// Make each arc clickable 
		.on("click", function(d, i) {
      window.location = seedData[i].link;
    });

	// Append the path to each g
	g.append("path")
  	.attr("d", arc)
  	.attr("fill", function(d, i) {
    	return colour(i);
  	});

	// Append text labels to each arc
	g.append("text")
  	.attr("transform", function(d) {
    	return "translate(" + arc.centroid(d) + ")";
  	})
  	.attr("dy", ".35em")
  	.style("text-anchor", "middle")
  	.attr("fill", "#fff")
		.text(function(d,i) { return seedData[i].label; })
  
  g.selectAll(".arc text")
		.call(wrap, arcText.rangeBand());

	// Wrap function to handle labels with longer text
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      	console.log("tspan: " + tspan);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > 90) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
    

    
    
    //Pie Chart
      
    //Pie Chart Colors
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arcPie = d3.svg.arc()
    .outerRadius(radius-110)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("#donut-chart")

    .append("g")
   .attr("transform", "translate(" + radius + "," + radius + ")");

//data for pie chart
data=[ 
     {"age":"<5","population":2704659},
{"age":"5-13","population":4499890},
{"age":"14-17","population":2159981},
{"age":"18-24","population":3853788},
{"age":"25-44","population":14106543},
{"age":"45-64","population":8819342},
{"age":"≥65","population":6012463}];
  

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arcPie)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arcPie.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });


    //function for making the chart reponsive
    function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    //On resize event listener
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it    
    function resize() {
  var targetWidth = parseInt(container.style("width"));
        
        //when width of browser is greater than original width of svg
        if (targetWidth >= width ) {    svg.attr("width",width);
        svg.attr("height",height);  }
        
        //when width of browser is less than original width of svg
        else {
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));}
    }
}
    
    
    
    
}



$(document).ready(main);