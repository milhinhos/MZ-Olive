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
    	
    	var answer=clean_r_answer(xhr.responseText);
    	//info.innerHTML=answer;
    	
    	processa(answer);
    };
    
    
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.send(file);
}


function mostra_objecto(obj)
{
	for(var a in obj){
		console.log(a);
		var b=obj[a];
		for(var c in b){
			console.log(c+"   "+b[c]);
		}
	}
}



function processa_tabela_dados(datastring){
	var proc_data = datastring;
	
	
	console.log(proc_data);
	var chaves=[];
	var novosdados=jQuery.parseJSON(proc_data);
	var datamodel=[];
	
	for(var k1 in novosdados){
		var v1 = novosdados[k1];
		var obj={};
		for(var k2 in v1){
			obj={};
			v2=v1[k2];
			obj["id"]=k1;
			obj["x"]=k2;
			obj["valor"]=v2;
			//console.log("a acrescentar: "+ k1+"   "+k2+"  "+v2);
			datamodel.push(obj);
		}
		
	};
	
	return datamodel;
	
}


function desenha_tabela(dados)
{
	
	//dados=[[1,2,3,4,5],['a','b','c','d','e']];
	var sampleHTML = d3.select("#svg_data")
    .append("table")
    .style("border-collapse", "collapse")
    .style("border", "2px black solid")

    .selectAll("tr")
    .data(dados)
    .enter().append("tr")
    //.enter().append("tr")
    .style("border", "1px black solid")
    .style("padding", "5px")
    .on("mouseover", function(){d3.select(this).style("background-color", "aliceblue")})
    .on("mouseout", function(){d3.select(this).style("background-color", "white")})
    .text(function(d){return d.id;})
    .style("font-size", "12px");
	
	//console.log(JSON.stringify(dados));
}

function desenha_grafico(dataset)
{
		
	var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	
	var width=800,height=600;
	var maxv,minv,wfact,hfact,wgap,hgap,varsize;
	var h_margin_bottom, h_margin_top;
	
	//dataset=[10,23,43,2,6,24];
	console.log(" a desenhar gráfico ... ");
	var chart = d3.select("#svg_graph").append("svg")
		.attr("class","chart")
		.attr("width",width)
		.attr("height",height);
	
	
	/*
	 * Bar char specific graphics
	 */
	// define the maximum value
		
	wgap=10;
	hgap=10;
	h_margin_bottom=10;
	h_margin_top=10;
	barsize=10;
	maxv = Math.round(d3.max(dataset,function(d){
		return d.valor;
	}));
	
	minv = Math.round(d3.min(dataset,function(d){
		return d.valor;
	}));
	
	console.log(minv+" "+maxv);
	console.log(typeof(minv));
	console.log(typeof(maxv));
	var x = d3.scale.linear()
		.domain([minv-wgap, maxv+wgap])
	    .range(["0", "100%"]);
	
	var y = d3.scale.linear()
		.domain(d3.range(dataset.length))
		.rangeBands([h_margin_bottom,height-h_margin_top],0.5);
	//wfact=500/(maxv+wgap);
	
	// nest the data, before create the graph
	//dataset = d3.nest().key(function(d){ return d.id;}).entries(dataset);
	
	chart.selectAll("rect")
		.data(dataset)
	   .enter().append("rect")
	   .attr("y",function(d,i){
		   return i*barsize;
	   })
		.attr("width",function(d){return x(d.valor);})
		.attr("height",barsize)
	     .style("fill", function(d){
	    	 return color(d.id);
	     })
	     .text(function(d) { return d.valor; });
	
}


function datashow(dmatrix)
{
	var data = [{"label":"1990", "value":16}, 
	            {"label":"1991", "value":56}, 
	            {"label":"1992", "value":7},
	            {"label":"1993", "value":77},
	            {"label":"1994", "value":22},
	            {"label":"1995", "value":16},
	            ];

	    //maximum of data you want to use
	    var data_max = 80,

	    //number of tickmarks to use
	    num_ticks = 5,

	    //margins
	    left_margin = 60,
	    right_margin = 60,
	    top_margin = 30,
	    bottom_margin = 0;


	    var w = 500,                        //width
	        h = 500,                        //height
	        color = function(id) { return '#00b3dc' };

	    var x = d3.scale.linear()
	        .domain([0, data_max])
	        .range([0, w - ( left_margin + right_margin ) ]),
	        y = d3.scale.ordinal()
	        .domain(d3.range(data.length))
	        .rangeBands([bottom_margin, h - top_margin], .5);


	    var chart_top = h - y.rangeBand()/2 - top_margin;
	    var chart_bottom = bottom_margin + y.rangeBand()/2;
	    var chart_left = left_margin;
	    var chart_right = w - right_margin;

	    /*
	     *  Setup the SVG element and position it
	     */
	    var vis = d3.select("body")
	        .append("svg:svg")
	            .attr("width", w)
	            .attr("height", h)
	        .append("svg:g")
	            .attr("id", "barchart")
	            .attr("class", "barchart")


	    //Ticks
	    var rules = vis.selectAll("g.rule")
	        .data(x.ticks(num_ticks))
	    .enter()
	        .append("svg:g")
	        .attr("transform", function(d)
	                {
	                return "translate(" + (chart_left + x(d)) + ")";});
	    rules.append("svg:line")
	        .attr("class", "tick")
	        .attr("y1", chart_top)
	        .attr("y2", chart_top + 4)
	        .attr("stroke", "black");

	    rules.append("svg:text")
	        .attr("class", "tick_label")
	        .attr("text-anchor", "middle")
	        .attr("y", chart_top)
	        .text(function(d)
	        {
	        return d;
	        });
	    var bbox = vis.selectAll(".tick_label").node().getBBox();
	    vis.selectAll(".tick_label")
	    .attr("transform", function(d)
	            {
	            return "translate(0," + (bbox.height) + ")";
	            });

	    var bars = vis.selectAll("g.bar")
	        .data(data)
	    .enter()
	        .append("svg:g")
	            .attr("class", "bar")
	            .attr("transform", function(d, i) { 
	                    return "translate(0, " + y(i) + ")"; });

	    bars.append("svg:rect")
	        .attr("x", right_margin)
	        .attr("width", function(d) {
	                return (x(d.value));
	                })
	        .attr("height", y.rangeBand())
	        .attr("fill", color(0))
	        .attr("stroke", color(0));


	    //Labels
	    var labels = vis.selectAll("g.bar")
	        .append("svg:text")
	            .attr("class", "label")
	            .attr("x", 0)
	            .attr("text-anchor", "right")
	            .text(function(d) {
	                    return d.label;
	                    });

	    var bbox = labels.node().getBBox();
	    vis.selectAll(".label")
	        .attr("transform", function(d) {
	                return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
	                });


	    labels = vis.selectAll("g.bar")
	        .append("svg:text")
	        .attr("class", "value")
	        .attr("x", function(d)
	                {
	                return x(d.value) + right_margin + 10;
	                })
	        .attr("text-anchor", "left")
	        .text(function(d)
	        {
	        return "" + d.value + "%";
	        });

	    bbox = labels.node().getBBox();
	    vis.selectAll(".value")
	        .attr("transform", function(d)
	        {
	            return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
	        });

	    //Axes
	    vis.append("svg:line")
	        .attr("class", "axes")
	        .attr("x1", chart_left)
	        .attr("x2", chart_left)
	        .attr("y1", chart_bottom)
	        .attr("y2", chart_top)
	        .attr("stroke", "black");
	     vis.append("svg:line")
	        .attr("class", "axes")
	        .attr("x1", chart_left)
	        .attr("x2", chart_right)
	        .attr("y1", chart_top)
	        .attr("y2", chart_top)
	        .attr("stroke", "black");
	 	
}






function processa(data)
{
	//processa_os_dados(filename);
	//processa_novos_dados(filename);
	var dados=processa_tabela_dados(data);
	desenha_tabela(dados);
	desenha_grafico(dados);
	//datashow(dados);
	
}







