setwd("/var/www/FileR/R")

source("sistema.r")
source("funcoes.r")
source("funcoesLeitura.r")
source("funcoesEscrita.r")


# Don't forget to include the call to leTabelaWeb on the first line of ProcessaFicheiro

#
# Copy and save this code to /var/www/R/test.R
#




###
#	Creation of the package to return to js.
#	Structure;
#		- header: information about the data transfered
#		- Support information. Can be:
#			- graphic labels
#		- Data: dataframe with all the data
#
###

###

processaFicheiro<-function()
{
  	#reads data from the web server session
  rawData<-f_leTabelaWeb()
  	# List containing Data
  dadosObj<-f_pDados(head(rawData))
  dList<-list(header=f_pHeader(),label=f_pLabelDados("Comparação de Linepacks","Milhoes Nm3","Tempo"),dados=dadosObj)
  	# List Containing stats
  statObj<-f_statData(dadosObj)
  statList<-list(statVariables=rownames(statObj),statData=statObj,ANOVA=f_analiseAnova(dadosObj),matrizTesteT=f_interchangedTTests(dadosObj))
  	# analyses all data 
  
  #print(anovaList)
  listaFinal<-list(DataList=dList, StatList=statList)
  print(toJSON(listaFinal))
  #print(listaFinal)
}


###########################Processes main Data
###
#	Creates list with header information
###

f_pHeader<-function()
{
  h<-list(object='graphic',type='line',num_columns=2)
  f_pHeader<-h
}


###
#	Creates dataframe with necessary graphical support information
###
f_pLabelDados<-function(title,yaxe,xaxe)
{
  fr<-list(title=title,yaxe=yaxe,xaxe=xaxe)
  f_pLabelDados<-fr
}

###
#	Creates dataframe with all data
###

f_pDados <- function(pivot)
{
	
	
	### passar uma matriz neste ambiente
	#print(pivot)
	p1<-pivot[,1]
	p2<-pivot[,2]
	p2n1<-as.numeric(gsub(',','',x=levels(p1)[p1],fixed=TRUE))
	p2n2<-as.numeric(gsub(',','',x=levels(p2)[p2],fixed=TRUE))
	pn<-cbind(p2n1,p2n2)
	pn<-as.data.frame(pn[,])
	names(pn)<-c("Simone","CDRD")
	#pnJ<-toJSON(pn)
	# returns data
	f_pDados<-pn
	#OK
}



#############################################################

#############################################################
###
# Processes statistic data
###
f_statData <- function(pivotTable)
{
  f_statData<-criaMatrizEstatistica(pivotTable)
}	

###ANOVA comparison beetween all variables
f_analiseAnova<-function(pivot)
{
 
  nomes<-names(pivot)
  a_p<-c(as.matrix(pivot))
  grupos<-factor(rep(letters[1:length(nomes)],each=dim(pivot)[1]))
  modelo<-lm(formula=a_p ~ grupos)
  #[1,4] is the p.value
  a<-Anova(modelo)
  #print(paste(a[1,1],"<br/>",a[1,2],"<br/>",a[1,3],"<br/>",a[1,4]))
  f_analiseAnova<-c(a[1,4],a[1,3])
  
}

f_interchangedTTests<-function(pivot)
{
  numcols<-dim(pivot)[2]
  matrizResultados<-array(0,c(numcols,numcols))
  for(a in c(1:numcols))
  {	
    for(b in c(1:numcols))
    {ftemp=tempfile(pattern="RDATA")
	teste<-t.test(pivot[,a],pivot[,b],var.equal=TRUE)
	matrizResultados[a,b]<-teste$p.value
    }  
  }
  f_interchangedTTests<-matrizResultados
}

###
# Reads the post message and stores the datafile
# reads the datafile as a data.frame and returnsit
###
f_leTabelaWeb<-function()
{
  ftemp=tempfile(pattern="RDATA")
  
  comp<-as.numeric(SERVER$headers_in$'Content-Length')
  ficheiro<-file(description=ftemp,"wb")
  open(ficheiro,type='w')
  while(length(a<-receiveBin())>0)
  {
  	writeBin(a,ficheiro)
  	#print("<br/>Escreveu!")
  }
  flush(ficheiro)
  close(ficheiro)
  	
  tabela<-read.table(ftemp,sep=";",header=TRUE)
  leTabelaWeb<-tabela
  
}	



	
processaFicheiro()

