library(car)

coluna_erro<-function(resultado, previsao)
{
	coluna_erro<-(resultado-previsao)/resultado
}

graficoQQ<-function(coluna,labelX,labelY,labelHist,labelDist)
{
	par(mfrow=c(1,2))
	hist(coluna,prob=T,xlab=labelX,main=labelHist)
	lines(density(coluna),ra.rm=T)
	rug(jitter(coluna))
	qq.plot(coluna,labelDist)
	par(mfrow=c(1,1))
}

