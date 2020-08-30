// @TODO: YOUR CODE HERE!
//load data from data.csv (self-execulting anymous function)
d3.csv("../assets/data/data.csv").then(function(csvData) {
    console.log(csvData);

    //Parse data as numbers
    csvData.forEach(function(csvData){
        data.smokes = +data.smokes;
        data.age = +data.age;
    });

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
    
    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    varchartGroup = svg.append("g")
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

    // Add dots
    var dots = chartGroup.selectAll("circle")
        .data(csvData)
        .enter();
        dots
        .append("circle")
        .attr("cx", function (d) { return x(d.smokes); })
        .attr("cy", function (d) { return y(d.age); })
        .attr("r", 10)
        .style("fill", "rgba(0,0,0,.3)")
        .on("mouseover", function(csvData) {
            toolTip.show(data, this)})
        .on("mouseout", function(csvData) {
            toolTip.hide(data)});

        
    
    //Add the SVG Text Element to the svgContainer
    dots.append("text")
    .data(csvData)
    .enter()
    .append("text");
    
    //Add SVG Text Element Attributes
    var textLabels = text
    .attr("x", function (d) { console.log(x(d.smokes)); return x(d.smokes); })
    .attr("y", function (d) { return y(d.age); })
    .text(function (d) { return d.abbr; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .attr("fill", "red");
})();



