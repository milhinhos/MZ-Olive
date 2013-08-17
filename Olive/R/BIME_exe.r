library(DMwR)
library(DBI)
library(RPostgreSQL)
library(reshape)
library(car)
library(filehash)
library(kernlab)


#carrega funcoes
setwd('/opt/BIME/DATA/Pipeline')
source("funcoes.r")
source("grafica.r")

##
# Criação das tabelas Pivot: 1 por mês
#
#versao<-read.table('ciclo.txt')
#v<-as.numeric(versao[1,1])
#carrega(v,paste("pivot",toString(v),".dat", sep=""))
##


pivot<-read.table("dadosAno.dat")

#Simplificação dos dados:
#	- Contadores n são relevantes
#	- valores de caudais das subsecções não são relevantes
#	- odorização não é contabilizada (depende do caudal...)
np<-names(pivot)
npInd<-c(grep("SIM.FLOW",np),grep("SIM.LINE.PACK.1",np),grep("FQ",np),grep("JQ",np),grep("SIM.FIN",np),grep("SIM.FOUT",np),grep("LINE.PACK.0",np),grep("LINE.PACK.1",np),grep("ODOR",np))
pL<-pivot[,-npInd]


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
#  Selecção de Features (variáveis significantes)
#*******************************
###

sa<-seleccaoAtributos("SIM.LINE.PACK.TOT",pL,'COR',30)
pL<-pL[,sa]




###
#*******************************
#  Geração de Modelos
#*******************************
###
# Criação dos dados de treino e teste

fTreino=2/3
tam<-nrow(pL)
tV<-sample(seq(1:tam),tam*fTreino,replace=FALSE,prob=NULL)
pTreino<-pL[tV,]
pTeste<-pL[-tV,]

#cat("Criados os conjuntos de treino e teste...\n")
#cat(paste("	Treino:",nrow(pTreino),"linhas\n")) 
#cat(paste("	Teste:",nrow(pTeste),"linhas\n"))

#cat("A criar os modelos...\n")
mod.lmr<-lm(SIM.LINE.PACK.TOT ~ .,data=pTreino)
mod.lmr.pred<-predict(mod.lmr,pTeste)






###
#***********************************************
#	Verificar quão bons os modelos são
#***********************************************
###





