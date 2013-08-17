
#carrega funcoes
setwd('/opt/BIME/DATA/Pipeline')
source("sistema.r")
source("funcoes.r")
source("grafica.r")
source("funcoesEscrita.r")

##
# Criação das tabelas Pivot: 1 por mês
#
#versao<-read.table('ciclo.txt')
#v<-as.numeric(versao[1,1])
#carrega(v,paste("pivot",toString(v),".dat", sep=""))
##

sourceFilename<-"Linepack2.csv"
outputDir<-"/opt/BIME/OO/B0001/"
outputStatisticsFilename<-paste(outputDir,"matrizEstatistica",sep="")

pivot<-read.table(sourceFilename,sep=";")
p1<-pivot[,1]
p2<-pivot[,2]
p2n1<-as.numeric(levels(p1))[p1]
p2n2<-as.numeric(levels(p2))[p2]

pn<-cbind(p2n1[-1],p2n2[-1],p2n2[-1]-p2n1[-1])
pn<-as.data.frame(pn)
names(pn)<-c("Simone","CDRD","erro")

###
# Creates and writes the descriptive analysis of the matriz
fO<-paste(outputDir,"matrizEstatistica",sep="")
m<-criaMatrizEstatistica(pn)
escreveMatrizEstatistica(m,fO)

###
# Creates graphs for each variable
for(i in 1:ncol(pn))
{
	fO<-paste(outputDir,"g_",names(pn)[i],sep="")
	escreveGraph(pn[,i],'DESCRIBE',fO)
}


###
#	Executes and prints PCA
fo<-paste(outputDir,"PCA")
escrevePCA


###
#	Executes and prints Correlation

###
#	Executa o teste z
#	Coluna 1 é o Simone
#	Coluna 2 é o CDRD
###
#testeZ<-z.test(df$erro,mu=49000,alternative="less",sigma.x=487730,conf.level=0.99)

# calcula o coeficiente de correlação de Pearson (omissão)
#CorP<-cor(df$Simone,df$CDRD)


#Simplificação dos dados:
#	- Contadores n são relevantes
#	- valores de caudais das subsecções não são relevantes
#	- odorização não é contabilizada (depende do caudal...)
#np<-names(pivot)
#npInd<-c(grep("SIM.FLOW",np),grep("SIM.LINE.PACK.1",np),grep("FQ",np),grep("JQ",np),grep("SIM.FIN",np),grep("SIM.FOUT",np),grep("LINE.PACK.0",np),grep("LINE.PACK.1",np),grep("ODOR",np))
#pL<-pivot[,-npInd]


###
#	Remoção de colunas NA's
#		neste caso há colunas com NAs que interessa remover
#		tb poderia tentar o na.omit da matriz inversa....
###
#pivot2<--pivot2[,-which(is.na(pivot2[1,]))]
#nas<-which(is.na(pivot2))
#colunasNa<-floor(nas/nrow(pivot2))
#pivotSNa<-pivot2[,-as.integer(levels(factor(colunasNa+1)))]

#ainda vamos simplificar mais: vamos remover todas as colunas com
#coeficiente de correlação supeior a xcor
#xcor=0.9
#pivotSNa_ne<-limpaCorList(pivotSNa,"SIM.LEAK.VALUE",xcor,FALSE)
#pivotSNa_ne<-pivotSNa
#nomes<-names(pivotSNa_ne)
#pivotSNa<-scale(pivotSNa_ne,center=TRUE,scale=TRUE)


###
#*******************************
#  Selecção de Features (variáveis significantes) - possivelmente utilizar PCA no futuro
#*******************************
###

#sa<-seleccaoAtributos("SIM.LINE.PACK.TOT",pL,'COR',30)
#pL<-pL[,sa]









