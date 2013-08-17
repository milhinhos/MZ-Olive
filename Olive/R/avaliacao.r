rec<-function(exp,pred,funcao)
{
	#vamos definir a funcao como desvio absoluto
	funcao="AD"
	
	#criacao de tabela de gestao
	tab<-as.data.frame(cbind(exp,pred))
	names(tab)<-c("EXP","PRED")
	
	#criação da função de erro
	tab<-cbind(tab,abs(tab$PRED-tab$EXP),(tab$PRED-tab$EXP)^2)
	names(tab)[3:4]<-c("ABSDEV","SQE")

	#algoritmo
	#1. Ordenacao pelo erro
	tabOrd<-tab[order(tab$ABSDEV),]
	
	#Algoritmo de criacao da curva (criação de vector adicional) que e adicionado
	# a esta tabela
	ePrev<-0
	correct<-0
	correctVector<-c()
	epsilon<-c()
	for(i in seq(1:nrow(tabOrd)))
	{
		epsilon<-c(epsilon,ePrev)		
		correctVector<-c(correctVector,correct/nrow(tabOrd))
				
		if(tabOrd$ABSDEV[i]>ePrev)
			ePrev<-tabOrd$ABSDEV[i]
		correct<-correct+1
	}
	rec<-cbind(tabOrd,epsilon,correctVector)
	
	
}
