
##############################################
#
#	Ficheiro: funcoesEscrita.r
#	Objectivo: escrever dados em ficheiro
#	criador: João Milhinhos
#	data: 22-11-2011
#	Versão: 0.1
#
###############################################


##############################################
#
#	Função: escreveMatrizEstatistica
#	Objectivo: escrever dados da matriz em ficheiro,
#	incluindo gráficos e tabelas de dados
#	Argumentos: 	dataSet com dados
#			nome do Ficheiro de Output
#	criador: João Milhinhos
#	data: 22-11-2011
#	Versão: 0.1
#
###############################################

escreveMatrizEstatistica<-function(ds,nomeFicheiro)
{
	filename=paste(nomeFicheiro,".csv",sep="")	
	#Writes the table	
	cat("CHAPTER\n",append=TRUE)
	cat("Descriptive Statistics\n",file=filename,append=TRUE)
	cat(paste("TABLE ",nrows(ds)," ",ncol(ds),"\n",sep=""))
	write.csv2(ds,filename,append=TRUE)	
	#cat(ds,file=nomeFicheiro,append=TRUE)
	cat("\n\n",file=nomeFicheiro,append=TRUE)
}



##############################################
#
#	Função: escreveGraph
#	Objectivo: guarda gráfico pré-definido em ficheiro jpg
#	Argumentos:	dataSet
#			Nome da Variável
#			Nome do ficheiro de output
#	criador: João Milhinhos
#	data: 22-11-2011
#	Versão: 0.1
#
###############################################

escreveGraph<-function(ds,tipoGraph,nomeFicheiro)
{
	pdf(paste(nomeFicheiro,".pdf"))
	if(tipoGraph=="DESCRIBE")
	{
		layout(matrix(c(1,2,3,3),2,2,byrow=TRUE),widths=c(1,3),heights=c(2,1))
		plot(ds,main="Dispersion Graph")
		hist(ds,main="Histogram")
		boxplot(ds,main="Boxplot")
		mtext("Graphical Descriptive Analisys",side=3,outer=TRUE,line=-3)
	}
	dev.off()
}


