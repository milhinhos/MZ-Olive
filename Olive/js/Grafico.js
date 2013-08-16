

function Grafico()
{
	this.tiposDeGraficos=null;
	this.opcoesDoGrafico=null;
	this.grafico=null;
	this.highlight=null;
	this.dragable=null;
	this.markers=null;
	this.legenda=null;
	this.cursor=null;
	//this.cg=null;
	//this.cgOpcoes=null;
	
}	
	/*
	 * initialization function.
	 * Sets default parameters
	 */
	
	Grafico.prototype.init = function ()
	{
		tiposDeGraficos=new Array("linhas");
		opcoesDoGrafico=new Array("legend","highlight","dragable","marker","cursor");
		highlight=false;
		dragable=false;
		marker=false;
		legend=false;
		cursor=false;
	}
	
	Grafico.prototype.init = function (tipo)
	{
		tiposDeGraficos=tipo;
		opcoesDoGrafico=new Array("Labels");
		
	}
	
	
	Grafico.prototype.desenhaMenus = function()
	{
		//console.log("A desenhar o menu!");
		$('#graphlabel').append('<h3>Graph Config:</h3>');
		$('#graphlabel').append('<h4>Graph Type:</h3>');
		
		for ( var x in tiposDeGraficos)
		{
			$('#graphlabel').append("<input type=\"checkbox\" id=\"g"+tiposDeGraficos[x]+" onChange=updateType('"+tiposDeGraficos[x]+"')/>");
			$('#graphlabel').append("<label for=\"g"+tiposDeGraficos[x]+"\">"+tiposDeGraficos[x]+"</br></label>");
		}
		
		$('#graphlabel').append('<h4>Graph Info:</h4>');
		
		
		for ( var x in opcoesDoGrafico)
		{
			/*$('#graphlabel').append('<input type="checkbox" id="g'+opcoesDoGrafico[x]+' onChange="updateOption('+opcoesDoGrafico[x]+'")/>');
			$('#graphlabel').append('<label for="g'+opcoesDoGrafico[x]+'">'+opcoesDoGrafico[x]+'</br></label>');*/
			$('#graphlabel').append("<input type=\"checkbox\" id=\"check\"  onclick='updateOption(\""+opcoesDoGrafico[x]+"\")'/>");
			$('#graphlabel').append("<label for=\"g"+opcoesDoGrafico[x]+"\">"+opcoesDoGrafico[x]+"</br></label>");
		}
		/*<h3>Graph Config:</h3>
					<h4>Graph Type</h4>
					
        			<label for="gLines">Lines</br></label>
        			<input type="checkbox" id="gBars" />
        			<label for="gBars">Bars<br/></label>
        			<input type="checkbox" id="gError" />
        			<label for="gError">Pie<br/></label>
        			<h4>Graph Options:</h4>
					<input type="checkbox" id="gLabel" />
        			<label for="gLabel">Show Labels<br/></label>
        			<input type="checkbox" id="gAnything" />
        			<label for="gAnything">Show all</br></label>*/
        		
		
	}
	
	
	
	
	
	
      
	Grafico.prototype.removeGrafico = function ()
	{
		cg.destroy();
	}
	
	Grafico.prototype.mostraGrafico=function(ds)
	{
		//console.log(ds.valoresDados.length);
		var cgOpcoes={ 
				title:ds.etiqueta[0],
  				//axes:{yaxis:{min:0, max:1}},
  				//series:[{color:'#5FAB78',dragable:{color:'#5FAB78',constrainTo:'x'}}],
  				axesDefaults: {
  					labelRenderer: $.jqplot.canvasAxisLabelRenderer,
  					rendererOptions:{
  						showDataLabels:true,
  					},
  					yaxis:{
  						autoscale:true,
  					},
  					pad:1,
  				},
  				legend:{
  					show:true,
  					location:'e',
  					placement:'outsideGrid',
  				},
  				seriesDefaults:{
  					showMarker:false
  				},
  				series:[ds.imprimeLabel()],
  				axes:{
  					yaxis:{
  						autoscale:true
  					}
  				},
  				
  				highlighter:{show:false,sizeAdjust: 15},
  				cursor:{
  					show:true, 
  					tooltipLocation: 'nw',
  					showToolTip:true,
  					zoom:true}
		}
		
		var cg = $.jqplot('graphicshow', ds.valoresDados ,cgOpcoes); 
		
		
	}
	
	
	
	Grafico.prototype.refreshGrafico=function(opcoes)
	{
		console.log("Refresh!!\n");
		//cg.destroy();
		//cg=jQuery.jqplot('graphicshow', ds.valoresDados ,cgOpcoes).replot();
		
	}
	
	/*
	 * Graphic management FUNCTIONS
	 * 
	 */
	
	
	
	
	Grafico.prototype.updateType=function(str)
	{
		switch(str)
		{
			case "legend": if(legend==true){legend=false;}else{legend=true;};break;
			case "highlight": if(highlight==true){highlight=false;}else{highlight=true;};break;
			case "dragable": if(dragable==true){dragable=false;}else{dragable=true;};break;
			case "marker": if(legend==true){legend=false;}else{legend=true;};break;
			case "cursor": if(legend==true){legend=false;}else{legend=true;};break;
		}
		
	}
	
	
	/*Page Events*/
	updateOption=function(val)
	{
		console.log("Comando clickado: "+val+"\n");
	}
