

function Grafico()
{
	this.tiposDeGraficos=null;
	this.opcoesDoGrafico=null;
	this.grafico=null;
	this.highlight=null;
	this.dragable=null;
	this.markers=null;
	
}	
	/*
	 * initialization function.
	 * Sets default parameters
	 */
	
	Grafico.prototype.init = function ()
	{
		tiposDeGraficos=new Array();
		opcoesDoGrafico=new Array("Show Labels");
		
	}
	
	Grafico.prototype.init = function (tipo)
	{
		tiposDeGraficos=tipo;
		opcoesDoGrafico=new Array("Show Labels");
		
	}
	
	
	Grafico.prototype.desenhaMenus = function()
	{
		//console.log("A desenhar o menu!");
		$('#graphlabel').append('<h3>Graph Config:</h3>');
		$('#graphlabel').append('<h4>Graph Type:</h3>');
		
		for ( var x in tiposDeGraficos)
		{
			$('#graphlabel').append('<input type="checkbox" id="g'+tiposDeGraficos[x]+' onClick=updateType("'+tiposDeGraficos[x]+'")/>');
			$('#graphlabel').append('<label for="g'+tiposDeGraficos[x]+'">'+tiposDeGraficos[x]+'</br></label>');
		}
		
		$('#graphlabel').append('<h3>Graph Info:</h3>');
		
		
		for ( var x in opcoesDoGrafico)
		{
			$('#graphlabel').append('<input type="checkbox" id="g'+opcoesDoGrafico[x]+' onClick=updateType("'+opcoesDoGrafico[x]+'")/>');
			$('#graphlabel').append('<label for="g'+opcoesDoGrafico[x]+'">'+opcoesDoGrafico[x]+'</br></label>');
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
	
	/*
	 * Creates an associative array from the array
	 *  for each name (pair index), creates an entry
	 */
	Grafico.prototype.processaJData = function (d) {
		var cadeado = 0,
		nome=null,
		valor=null,
		comprimento=0;
		console.log("A criar array...\n");
		for (var key in d)
    	{ 
    	     if(cadeado==0){
    	     	/* Checks if exists on nameList. If it does, add another value on matrix (dados).
    	     	 * If not, adds another array and name
    	     	 */
    	     	nome=d[key];
    	     	if(listaNomes.indexOf(nome)==-1)
    	     	{
    	     		//nome does not exists on listaNomes. Inicializes object 
    	     		listaNomes.push(nome);
    	     		dados[nome]=[];
    	     	}
    	     	cadeado=1;
    	     }
    	     else
    	     {
    	     	//Name HAS to exist!
    	     	dados[nome].push(d[key]);
    	       	cadeado=0;
    	     }
    	}
    	
    	
		
	}
	
	Grafico.prototype.converteParelhas = function(n)
	{
		//console.log("A converter Parelhas...")
		var res = [];
		var temp= [];
		var indice= listaNomes[0];
		//console.log(dados[indice].length);
		for (var nums in dados[indice])
		{
			temp[0]=dados[indice][nums];
			temp[1]=dados[listaNomes[n]][nums];
			//console.log(temp);
			res.push(temp.slice());
			
		}
		//console.log(res);
		return res;
	}
	
	Grafico.prototype.getData = function (){
		return dados;
	}
	
	Grafico.prototype.setData = function (d) {
    	/*this.dados=[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]];*/
    	this.dados=d;
    	
    	
      }
      
	Grafico.prototype.removeGrafico = function ()
	{
		cg.destroy();
	}
	
	Grafico.prototype.mostraGrafico=function(ds)
	{
		//console.log(ds.valoresDados.length);
		var cg = $.jqplot('graphicshow', ds.valoresDados ,
			{ title:ds.etiqueta[0],
  				//axes:{yaxis:{min:0, max:1}},
  				//series:[{color:'#5FAB78',dragable:{color:'#5FAB78',constrainTo:'x'}}],
  				series:[{color:'#5FAB78'}],
  				highlighter:{show:true,sizeAdjust: 15},
  				cursor:{show:true, tooltipLocation: 'nw'}
			}
		); 
	}
	
	
	Grafico.prototype.mostraGraficoLinha = function ()
	{
		console.log(this.converteParelhas(2));
		visivel=true;
		$.jqplot.config.enablePlugins = true;
 		var cg = $.jqplot('output',  [this.converteParelhas(2)],
			{ title:'Exponential Line',
  				axes:{yaxis:{min:0, max:1}},
  				//series:[{color:'#5FAB78',dragable:{color:'#5FAB78',constrainTo:'x'}}],
  				series:[{color:'#5FAB78'}],
  				highlighter:{show:true,sizeAdjust: 15},
  				cursor:{show:true, tooltipLocation: 'nw'}
			}
		); 

	}
	
	/*
	 * UTILITY FUNCTIONS
	 * 
	 */
	
	Grafico.prototype.isPair = function(n)
	{
		if(n%2==0){return 1}else{return 0}
	}
	
	
	/***
	 * 	Grafic update functions
	 * 
	 * 
	 * ***/
	 

