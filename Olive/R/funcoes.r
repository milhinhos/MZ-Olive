

#library(DMwR)
#ibrary(DBI)
#library(reshape)
#library(car)
#library(kernlab)
#library(moments)
#library(BSDA)
#library(foreign)
#library(rjson)

####
#	processes all support functions
###
#setwd('/var/www/FileR/R')
#source("sistema.r")
#source("grafica.r")
#source("funcoesEscrita.r")
#source("funcoesLeitura.r")

###
# versão do Teste de levene
###

levene.teste = function(data1, data2) {
  levene.trans = function(data) {
    ## find median for group of data
    ## subtract median; take absolute value
    a = sort(abs(data - median(data)))
    ## if odd sample size, remove exactly one zero
    if (length(a)%%2)
      a[a != 0 | duplicated(a)]
    else a
  }
  ## perform two-independent sample T-test on transformed data
  t.test(levene.trans(data1), levene.trans(data2), var.equal = TRUE)
}

Levene <- function(y, group)
{
    group <- as.factor(group)  # precautionary
    meds <- tapply(y, group, median)
    resp <- abs(y - meds[group])
    anova(lm(resp ~ group))[1, 4:5]
} 	



criaMatrizEstatistica<-function(ds)
{
	#assumindo que ds é um dataframe, a primeira coluna
	#não é calculada
	#assume-se também que qualquer string é agora um factor

	#dados<-matrix(sd(ds[,2:ncol(ds)]),1,ncol(ds)-1)
	#nome<-'sd'
	#rownames(dados)<-c('sd')
	#dados<-rbind(dados,mean(ds[,2:ncol(ds)]))
	#rownames(dados)[2]<-c(rownames(dados),'mean')
	#criaMatrizEstatistica<-dados
	d<-constroiMatrix(NULL,apply(as.matrix(ds),2,sd),'sd')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,mean),'mean')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,median),'median')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,var),'variance')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,min),'min')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,max),'max')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,quantile)[1,],'Q0')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,quantile)[2,],'Q25')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,quantile)[3,],'Q50')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,quantile)[4,],'Q75')
	d<-constroiMatrix(d,apply(as.matrix(ds),2,quantile)[5,],'Q100')
	#d<-constroiMatrix(d,apply(as.matrix(ds),2,skewness),'simetria')
	
	#devolve matriz
	criaMatrizEstatistica<-d

}

constroiMatrix<-function(dsFinal,novaLinha,nome)
{
	nn<-NULL
	if(length(dsFinal)==0)
	{
		dsFinal<-matrix(novaLinha,1,length(novaLinha))
		rownames(dsFinal)<-nome
	}
	else
	{
		nn<-c(rownames(dsFinal),nome)		
		dsFinal<-rbind(dsFinal,novaLinha)
		rownames(dsFinal)<-nn
	}
	constroiMatriz<-dsFinal
}

###
#	--limpaCor--
#	Função que remove as colunas,iterativamente,
#	cujo grau de correlação é superior a um certo valor "grau"
#	pretende identificar as colunas removidas (lista?) e devolver a 
#	tabela sem estas colunas --> são as que interessam para qualquer 
#	análise de modelação
#
###


limpaCorList<- function(lista,y,grau,gravaFicheiro)
{
	copiaECola=FALSE
	colunaFinal=c()
	
	if(! is.data.frame(lista))
	{	
		cat("ERRO: Argumento 1 não é um data frame. Não pode ser processado\n\n")
		return -1
	}

	if(!is.null(y))
	{
		if(length(which(names(lista)==y))==0)
		{
			cat("AVISO: argumento y errado: não é nome de coluna\n\n")
			
		}
		else
		{
			copiaECola=TRUE
			colunaFinal=lista[,y]
			lista=lista[,-which(names(lista)==y)]
		}
	}
	
	#Recolha dos dados dentro da lista (todos sem a linha 1
	# e sem a coluna 1
	#matrizLista<-lista[,-1]
	matrizLista<-lista	
	if(!is.numeric(matrizLista))
	{		
		cat("A converter os dados numéricos...")
		dimensoes<-dim(matrizLista)
		matrizLista<-as.numeric(as.matrix(matrizLista))
		dim(matrizLista)<-dimensoes
	}
	listaCor<-cor(matrizLista)
	if(gravaFicheiro)
	{
		write.table(listaCor,file="correlacao.temp.dat")
	}
	upperTriCor<-upper.tri(listaCor)
	indicesARemover<-which(abs(listaCor)>grau & upperTriCor)
	colunasARemover<-(indicesARemover%/%ncol(matrizLista)+1)
	
	## Limpeza
	rm(listaCor)
	rm(matrizLista)
	rm(upperTriCor)

	lcl<-lista[,-colunasARemover]

	if(copiaECola)
	{
		nomes<-names(lcl)
		lcl<-cbind(lcl,colunaFinal)
		names(lcl)<-c(nomes,y)
	}
	
	limpaCorList<-lcl
}

carregaDados<-function()
{
	dados<-c()
	np<-c()
	pivot<-c()
	for(i in seq(1,2,1))
	{
		nome=paste("pivot",i,".dat",sep='')
		pivot<-read.table(nome)
		if(length(np)==0)
		{	
			np<-names(pivot)
			dados<-pivot
		}
		else
		{
			np<-intersect(np,names(pivot))
			dados<-rbind(dados[,is.element(names(dados),np)],pivot[,is.element(names(pivot),np)])		
		
		}	

		cat(paste("Num linhas ",nome,": ",nrow(dados),"\n",sep=""))
		cat(paste("Len NP ",nome,": ",length(np),"\n",sep=""))  
	}
	carregaDados<-dados
}

carrega<-function(mes,ficheiro)
{
	cat("\n\n------- CARREGA -------\n");
	cat(paste("\t\targumentos:",mes,ficheiro))
	cat("\nA definir ligação a base de dados\n")
	drv <- dbDriver("PostgreSQL")
	ch<-dbConnect(drv,"localhost",dbname="LEAK",user="pgsql",password="postgres",port=5432)
	query<-paste("select date_part('month',data) as mes, date_part('dow',data) as dia_da_semana,date_part('day',data) as dia, date_part('hour',data) as hora,nome,valor from pipeline where date_part('month',data)=",mes,sep="")

# faz query à base de dados
	cat("A executar Query ...\n")
	cat(paste(query,"\n"))	
	dados<-dbGetQuery(ch,query)

###
# Cria Tabela Pivot
###
	cat(paste("A criar a tabela Pivot",ficheiro,"\n"))
	pivot<-cast(dados,mes + dia_da_semana + dia + hora ~ nome, mean)

###
# Escreve dados para ficheiro
###
	write.table(pivot,file=ficheiro)

# dados já não é necessária
	rm(dados)
	rm(pivot)


#p_no_na<-na.omit(pivot)

# os valores de fuga LRATE e LRATE2 não diferem entre si no período de 
# tempo analisado. Deve ser comprovado pela análise da correlação entre 
# todas as colunas.
###
#	--criaMatrizEstatistica--
#	devolve matriz com [nrows,ncol-1] com dados estatisticos
#		- linha 1: standard deviation
#		- linha 2: media
###


#cat("...almost done!")
	cat("DONE\n\n\n")
	carrega<-mes
#carrega<-pLimpa	
#cat("DONE!")
#gc()


}

###
#limpaColunas: funcao que calcula matriz estatistica, se não dada e:
#  1 - remove colunas com sd e média 0
#  2 - remove colunas com correlação superior a grau definido
###

limpaColunas<-function(pt, grau)
{
	#neste exemplo, já é dada a matriz estatística como argumento
	t_estatistica<-criaMatrizEstatistica(pt)

# remoção dos dados com média 0 e desvio padrão 0
# ESTUDAR: hipótese de remover todos os valores que não variam: sd=0
	pClean<-pt[-which(t_estatistica['sd',]==0 || t_estatistica['mean',]==0)]

###
#	Remoção das colunas com um elevado coeficiente de correlação
#	(demasiadas variáveis que não trazem valor acrescentado à análise
#	e que aumentam a sua necessidade de processamento
###
	#pcor<-cor(pClean)
	#cat("A criar tabela de correlação e criar tabela final...")
	limpaColunas<-limpaCorList(pClean,grau,TRUE)
	
	
}



######
#	Função Auxiliar
#	AcertaMatrizes: em duas matrizes (data frames), identifica as colunas que não
#	existem em qualquer delas e remove-as do resultado final ou, pelo contrário
#	produz matriz com colunas de ambos os conjuntos
######


########################################################################
#	SELECCAO DE ATRIBUTOS
#######################################################################

seleccaoAtributos<-function(nomeRes,ds,metodo,numFeatures)
{
	cpl<-matrix()	
	#trata do metodo a usar se input é NULL	
	if(length(metodo)==0)
	{	metodo<-'COR'}
	
	if(metodo=='COR')
	{
		cpl<-cor(ds)
	}
	else
	{
		cat(paste("Metodo Errado: ",metodo,"\n",sep=''))
		return -1
	}
	cpl<-cor(ds)
	linhaCor<-cpl[which(names(ds)==nomeRes),]
	seleccaoAtributos<-order(abs(linhaCor),decreasing=TRUE)[1:numFeatures]
}



########################################################################

########################################################################
#	FUNÇÕES DATA MINING
#######################################################################

###
#	Cria Regressão linear
#		 - com base num conjunto de dados cria um modelo de regressão linear
#		   numa coluna
#		 - Numa segunda fase: cria um modelo por variável: permite assumir qq valor necessário
###

criaLM<-function(formula,treino,teste)
{
	criaLM<-lm(SIM.LEAK.VALUE ~ .,data=treino)
	
}


###
#	Cria SVM
#		 - com base num conjunto de dados cria um modelo de SVM
#		   numa coluna
###
criaSVM<-function(formula,treino,teste)
{
	SVMFit<-ksvm(formula, data=treino,kernel='rbfdot',kpar="automatic",cross=0,fit=TRUE,SCALE=FALSE)
	SVMPred<-predict(SVMfit,teste,type="response")
	criaSVM["fit"]<-SVMFit
	criaSVM["pred"]<-SVMPred
}


###
#	Cria Rede Neuronal
#		 - com base num conjunto de dados cria um modelo de NN
#		   numa coluna
###
criaNN<-function(formula,dados,indTeste)
{
	NNFit<-nnet(formula,data=dados,subset=indTeste,decay=0.01,maxit=40,size=10,MaxNWts=15000)
	NNpred<-predict(NNFit,pTeste,type="raw")
	criaNN["fit"]<-NNFit
	criaNN["pred"]<-NNPred
}




###
#	Cria árvore de decisão
#		 - com base num conjunto de dados cria um modelo de árvore de decisão
#		   , de regressão ou qualificação
###




###
#	Cria Modelo de Previsão Temporal
#		 - com base num conjunto de dados cria um modelo baseado no ARIMA
#		   numa coluna
###
criaTemp<-function()
{
	# --- remove as linhas da data e constroi data frame de time series
	#	8760: num de horas num ano normal
	#pivot_ts<-ts(pivot,start=c(2011,2,1,0),frequency=8760)
	#s2<-pivot_ts[,which(nomes=="SIM.LEAK.VALUE")]
	#rm(pivot2)
	#slv<-ts(c(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12),start=c(2010,1,1,0),frequency=8760)

	#slv_nots<-c(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12)

	# moving average diária
	#slv.1<-filter(slv,filter=rep(1/24,24),method="convolution",circular="TRUE")
	# moving average semanal
	#slv.2<-filter(slv,filter=rep(1/168,168),method="convolution",circular="TRUE")
	#plot(slv,type="l",ylim=c(-100000,40000))
	#lines(slv.1,col="red")
	#lines(slv.2,col="blue")

}

teste<-function()
{
	print("Este é um teste")
}



###
#	Função de Análise MultiANOVA
#	- criação de matriz de análise ANOVA, após validação das pré-condições
#	- pré condições: as variáveis têm valor esperado nulo (homogeneidade da variância): só importante quando a dimensão das análises é muito diferente. Pode ser verificada  pelo teste de Bartlett	
#				, são mutualmente independentes
#				 e são normalmente distribuidos : normalmente garantido pelo teorema do limite central.
###
MultiNova<-function(p,me)
{
  #teste<-Anova(model,p,
}

