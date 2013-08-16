/*
 * Class Store
*/


function Store()
{
	this.nomesDados=null;
	this.valoresDados= null;
	this.etiqueta=null;
	this.estrutura=null;
	this.nomesEstatistica=null;
	this.dadosEstatistica=null;
	this.anova=null;
	this.grafico_tipo=null;
	this.grafico_label=null;
}	
	
	/*
	 * methods
	 */
	Store.prototype.init=function()
	{
		this.nomesDados=new Array();
		this.valoresDados=new Array();
		this.grafico=new Array();
		this.estrutura=new Array();
		this.etiqueta= new Array();
		this.nomesEstatistica= new Array();
		this.dadosEstatistica=new Array();
		this.anova=new Array();
		
		//Graphic definitions
		this.grafico_tipo="Linhas";
		this.grafico_label=false;
		$.jqplot.config.enablePlugins=true;
	};
	

	
	
	Store.prototype.dataProcess=function(jLista)
	{
		var obj = jQuery.parseJSON(jLista);
		
		// processes the main marker: DataList
		for(var beta in obj)
		{
		//////LINHA 0 (DataList && Stat List)	
		//$('#graphics').append('<tr><td>Linha0: '+ beta +'</td></tr>');
		var omega=obj[beta];		
		for (var x in omega){
        	///// LINHA 1 
        	var cx=omega[x];
        	//$('#graphics').append('<tr><td>Linha1: '+ x +' |||  '+ omega[x] +'</td></tr>');
        	if(x=="header"){
           		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Linha2: '+ chave +'</td></tr>');
        			//$('#graphics').append('<tr><td>Linha3: '+ cx[chave] +'</td></tr>');
        			var valor=cx[chave];
        			if(chave=="object"){this.estrutura[0]=valor;}
					if(chave=="type"){this.estrutura[1]=valor;}
					if(chave=="num_columns"){this.estrutura[2]=valor;}
        		}
        	}
        	if(x=="label"){
           		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Linha2: '+ chave +'</td></tr>');
        			//$('#graphics').append('<tr><td>Linha3: '+ cx[chave] +'</td></tr>');
        			var valor=cx[chave];
        			if(chave=="title"){this.etiqueta[0]=valor;}
					if(chave=="xaxe"){this.etiqueta[1]=valor;}
					if(chave=="yaxe"){this.etiqueta[2]=valor;}
        		}
        	}
        	if(x=="dados"){
           		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Linha2: '+ chave +'</td></tr>');
        			//$('#graphics').append('<tr><td>Linha3: '+ cx[chave] +'</td></tr>');
        			// theory: this is executed only once for the entire array
        			var valor=cx[chave];
        			this.nomesDados.push(chave);
					this.valoresDados.push(valor);
        		}
        	}
        	if(x=="statVariables"){
        		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Nomes Estatisticos: '+ chave +'   '+ cx[chave] +'</td></tr>');
        			this.nomesEstatistica.push(cx[chave]);
        			
        		}
        	}
        	if(x=="statData"){
        		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Dados Estatisticos: '+ chave +'   '+ cx[chave] +'</td></tr>');
        			this.dadosEstatistica.push(cx[chave]);
        			
        		}
        	}
        	if(x=="ANOVA"){
        		//$('#graphics').append('<tr><td>ANOVA: '+ x +'   '+ omega[x] +'</td></tr>');
        		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>ANOVA: '+ x +'   '+ omega[x] +'</td></tr>');
        			this.anova.push(cx[chave]);
        		}
        	}
        	if(x=="matrizTesteT"){
        		//$('#graphics').append('<tr><td>T: '+ x +'   '+ cx[chave] +'</td></tr>');
        		for (var chave in cx)
        		{
        			//$('#graphics').append('<tr><td>Testes T: '+ chave +'   '+ cx[chave] +'</td></tr>');
        			this.anova.push(cx[chave]);
        		}
        	}
        	
        	
        }
        }
        
        
        

        	
         
	}
	
	
	
		
	Store.prototype.imprime=function()
	{
		var out = '';
		out += 'Nomes Dados '+ this.nomesDados + '\n';
		//out += 'Valores Dados '+ this.valoresDados + '\n';
		out += 'Etiqueta '+ this.etiqueta + '\n';
		out += 'Estrutura '+ this.estrutura + '\n';
		out += 'Nomes Variáveis Estatistica '+ this.nomesEstatistica + '\n';
		out += 'Dados Estatistica '+ this.dadosEstatistica + '\n';
		out += 'ANOVA '+ this.anova + '\n';
		alert(out);
	}
	
	Store.prototype.imprimeLabel=function()
	{
		var out=new Array();
		var n=0;
		while(n < this.estrutura[2])
		{
			out.push(this.nomes)
			n++;
		}
		return out;
	}
	
	
	
	function printObject(o) {
  			var out = '';
  			for (var p in o) {
    			out += p + ': ' + o[p] + '\n';
  			}
  			alert(out);
		}
		

