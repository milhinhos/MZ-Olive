function init()
{

    //setup the svg
    var svg = d3.select("#svg_data")
        .attr("width", w+100)
        .attr("height", h+10)
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
	var xhr = new XMLHttpRequest(), upload = xhr.upload;
	upload.addEventListener("progress", function (ev) {}
    , false);
    upload.addEventListener("load", function (ev) {}, false);
    upload.addEventListener("error", function (ev) {console.log(ev);}, false);
    xhr.open(
        "POST",
        "R/FileProcessor.r"
    );
    
    xhr.onload = function(outEvent){
    	var info=document.getElementById("info");
    	/*if(xhr.status==200){
    		info.innerHTML=xhr.responseText;
       	}else
       	{
       		info.innerHTML="ERRO: O Capitão Nascimento disse: "+xhr.status+" <br\/>";
       	}*/
    	info.innerHTML=xhr.responseText;
    	var filename=clean_r_answer(xhr.responseText);
    	//processa(filename);
    };
    
    
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.send(file);
}


function processa(filename)
{
	processa_os_dados(filename);
	processa_novos_dados(filename);
}

function processa_os_dados(file)
{
	d3.text(file, function(datasetText) {

		var dsv=d3.dsv(";","text/plain");
		var parsedCSV = dsv.parseRows(datasetText);

		var sampleHTML = d3.select("#svg_data")
		    .append("table")
		    .style("border-collapse", "collapse")
		    .style("border", "2px black solid")

		    .selectAll("tr")
		    .data(parsedCSV)
		    .enter().append("tr")

		    .selectAll("td")
		    .data(function(d){return d;})
		    .enter().append("td")
		    .style("border", "1px black solid")
		    .style("padding", "5px")
		    .on("mouseover", function(){d3.select(this).style("background-color", "aliceblue")})
		    .on("mouseout", function(){d3.select(this).style("background-color", "white")})
		    .text(function(d){return d;})
		    .style("font-size", "12px");
		
		
				
		});
	
	
	
		 
}

function processa_novos_dados(file)
{
	d3.text(file,function(dt){
		var dsv=d3.dsv(";","text/plain");
		var parsedCSV = dsv.parse(dt);
		
		d3.forEach(function(d)
		{
			
			console.log(d);
		});
	});	
}
			
