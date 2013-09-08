function init()
{

    //setup the svg
    var svg = d3.select("#svg")
        .attr("width", w+100)
        .attr("height", h+100)
    console.log("svg", svg)
    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")

    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")
    
}


function processa_dados(file)
{
	d3.csv(file,function(csv) {
		  // we first sort the data
		 
		  
		  // then we create the marks, which we put in an initial position
		 
		  svg.selectAll("circle").data(csv).enter()
		    .append("circle")
		    .attr("cx",function(d) {return x(0);})
		    .attr("cy",function(d) {return y(0);})
		    .attr("r",function(d) {return r(0);})
		 
		    .style("fill",function(d) {return c(d.continent);})
		    .style("opacity",function(d) {return o(+d.GDPcap);})
		 
		      .append("title")
		      .text(function(d) {return d.country;})
		   
		  // now we initiate - moving the marks to their position
		 
		  svg.selectAll("circle").transition().duration(1000)
		    .attr("cx",function(d) {return x(+d.GERD);})
		    .attr("cy",function(d) {return y(+d.growth);})
		    .attr("r",function(d) {return r(Math.sqrt(+d.population));})
		});
}