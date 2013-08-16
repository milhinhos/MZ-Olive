/*
 * Class Store
*/


function Store()
{
	var nomesDados=null;
	var valoresDados= null;
	var etiqueta=null;
	this.estrutura=null;
	
	
	
	/*
	 * methods
	 */
	this.init=function()
	{
		this.nomesDados=new Array();
		this.valoresDados=new Array();
		this.grafico=new Array();
		this.estrutura=new Array();
		$.jqplot.config.enablePlugins=true;
	};
	
	this.init=function(nomes,dados)
	{
		this.nomesDados=new Array(nomes);
		this.valoresDados=new Array(dados);
	};
	
	this.getNome=function(i){
		return this.nomesDados[i];
	};
	
	this.getDados=function(i){
		return this.valoresDados[i];
	};
	
	this.addNome=function(novoNome)
	{
		this.nomesDados.push(novoNome);
	};
	
	this.addDados=function(novosDados)
	{
		this.valoresDados.push(novosDados);
	};
	
	this.setEstrutura=function(valor,idx)
	{
		this.estrutura[idx]=valor;
	};
		
	
	this.dp=dpFunction;
	
	
	this.dataProcess=function(jLista)
	{
		var obj = jQuery.parseJSON(jLista);
		//$('#graphics').append('<tr><td>Lista em funçãoun: '+ jLista +'</td></tr>');		
        $.each (obj,function(chave,val){
        	if(chave=="header"){
        		$.each (val,function(chave,valor){
					//$('#graphics').append('<tr><td>Cabeçalho: '+ chave +'   Valor: '+valor+'</td></tr>');
					if(chave=="object"){this.estrutura[0]=valor;}
					if(chave=="type"){this.setTipo(valor);}
					if(chave=="num_columns"){this.setNumColunas(valor);}
				});
        	}
        	if(chave=="label"){
        		$.each (val,function(chave,valor){
					if(chave=="title"){this.setTitulo(valor);}
					if(chave=="xaxe"){this.setEixoX(valor);}
					if(chave=="yaxe"){this.setEixoY(valor);}
					//$('#graphics').append('<tr><td>Etiqueta: '+ chave +'   Valor: '+valor+'</td></tr>');
				});
			}
        	if(chave=="dados"){
        		$.each (val,function(chave,valor){
					this.nomesDados.push(chave);
					this.valoresDados.push(valor);
					//$('#graphics').append('<tr><td>Dados: '+ chave +'   Valor: '+valor+'</td></tr>');
				});
			}
	    
         });
         
	};
	
	
	
	/*
	 * Graphic Generation
	 */
	
	this.mostraGrafico=function(tipo,indice){
	// variable initialization
		var dataDisplay=new Array();
		
	//parameter definition
		if(indice==null){indice=1;}
		if(tipo=='simples'){dataDisplay=this.getDados(indice);}
		if(tipo=='duplo'){
			dataDisplay=[this.getDados(1),this.getDados(2)];
			
		}
	// simple plot
		var cg = $.jqplot('graphicshow',  [this.getDados(1),this.getDados(2)],
			{ title:this.getNome(indice),
  				axes:{
  					yaxis:{
  						showLabel: true,
  						label:'Milhoes Nm3',
          				autoscale: true}},
  				//series:[{color:'#5FAB78',dragable:{color:'#5FAB78',constrainTo:'x'}}],
  				series:[{
  					color:'#5FAB78',
  					showMarker:false}],
  				legend: {
  					show: true,
  					location: 'ns',
  					placement: 'insideGrid'
  				},
  				highlighter:{
  					show:true,
  					sizeAdjust: 15},
  				cursor:{
  					show:true, 
  					tooltipLocation: 'nw'},
  				
				}	
		);
		
	}; 
	
	
	
	
	//Cabecalho
	 /*****
		 * Processes each data value from the structure List:
		 *  - header:
		 * 		- object,
		 * 		- type,
		 * 		- num_columns
		 * 	- label:
		 * 		- title
		 * 		- xaxe name
		 * 		- yaxe name
		 * 	- data
		 */
	
	
	
}

/*this.getObjecto=function(){return this.estrutura[0];};
	this.setTipo=function(f){ this.estrutura[1]=f;};
	this.getTipo=function(){return this.estrutura[1];};
	this.setNumColunas=function(f){ this.estrutura[2]=f;};
	this.getNumColunas=function(){return this.estrutura[2];};
	
	
	this.setTituloGrafico=function(f){ this.etiqueta[0]=f;};
	this.getTituloGrafico=function(){return this.etiqueta[0];};
	this.setEixoX=function(f){ this.etiqueta[1]=f;};
	this.getEixoX=function(){return this.etiqueta[1];};
	this.setEixoY=function(f){ this.estrutura[2]=f;};
	this.getEixoY=function(){return this.estrutura[2];};*/
	Store.prototype.setObjecto=function serObjectof(f){ this.estrutura[0]=f;};
	
	function dpFunction(jLista)
	{
		var obj = jQuery.parseJSON(jLista);
		//$('#graphics').append('<tr><td>Lista em funçãoun: '+ jLista +'</td></tr>');		
        $.each (obj,function(chave,val){
        	if(chave=="header"){
        		$.each (val,function(chave,valor){
					//$('#graphics').append('<tr><td>Cabeçalho: '+ chave +'   Valor: '+valor+'</td></tr>');
					if(chave=="object"){this.estrutura[0]=valor;}
					if(chave=="type"){this.setTipo(valor);}
					if(chave=="num_columns"){this.setNumColunas(valor);}
				});
        	}
        	if(chave=="label"){
        		$.each (val,function(chave,valor){
					if(chave=="title"){this.setTitulo(valor);}
					if(chave=="xaxe"){this.setEixoX(valor);}
					if(chave=="yaxe"){this.setEixoY(valor);}
					//$('#graphics').append('<tr><td>Etiqueta: '+ chave +'   Valor: '+valor+'</td></tr>');
				});
			}
        	if(chave=="dados"){
        		$.each (val,function(chave,valor){
					this.nomesDados.push(chave);
					this.valoresDados.push(valor);
					//$('#graphics').append('<tr><td>Dados: '+ chave +'   Valor: '+valor+'</td></tr>');
				});
			}
	    
         });
         
	};

	
	



