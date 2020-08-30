// @TODO: YOUR CODE HERE!
// set the dimensions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = { 
    top: 20, 
    right: 40, 
    bottom: 60, 
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
d3.csv("../data.csv").then(function(csvData){
    console.log(csvData);

    //Parse data as numbers
    csvData.forEach(function(csvData){
        csvData.smokes = +csvData.smokes;
        csvData.age = +csvData.age;
    });

    
    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    var chartGroup = svg.append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    //Create scale function
    var xAxisScale = d3.scaleLinear()
        .domain([d3.min(csvData, d=> d.smokes)-1, d3.max(csvData, d=> d.smokes)+1])
        .range([0, width]);
    var yAxisScale = d3.scaleLinear()
        .domain([d3.min(csvData, d=> d.age)-1, d3.max(csvData, d=> d.age)+1])
        .range([0, height]);
    
    //Create axis functions
    var xAxis = d3.axisBottom(xAxisScale);
    var yAxis = d3.axisLeft(yAxisScale);

    // Add to graph
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .call(yAxis);

    // Add circles
    var circle = chartGroup.selectAll("circle")
        .data(csvData)
        .enter()
        circle
        .append("circle")
        .attr("cx", d => xAxisScale(d.smokes))
        .attr("cy", d => yAxisScale(d.age))
        .attr("r", 10)
        .style("fill", "rgba(0,0,0,.3)")

    //Add the SVG Text Element to the svgContainer
    circle.append("text")
    .data(csvData)
    .enter()
    .append("text");

    //Fill in circles with state abbreviation name
    circle.append("text") 
      .text(d=>d.abbr)
      .attr("dx",d => xAxisScale(d.smokes))
      .attr("dy",d => yAxisScale(d.age))
      .attr("font-size", "10px")
      .attr("fill", "black")
      .attr("text-anchor","middle")
      .attr("text-align", "center");
    
});



