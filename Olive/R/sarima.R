sarima = function(xdata,p,d,q,P=0,D=0,Q=0,S=-1,details=TRUE,tol=sqrt(.Machine$double.eps),no.constant=FALSE)
{  
  n = length(xdata)
  constant = 1:n   
  xmean = rep(1,n) 
  trc = ifelse(details==TRUE, 1, 0)
  if (d==0 & D==0) {
    fitit = arima(xdata, order=c(p,d,q), seasonal=list(order=c(P,D,Q), period=S),
              xreg=xmean,include.mean=FALSE, optim.control=list(trace=trc,REPORT=1,reltol=tol))
} else if (xor(d==1, D==1) & no.constant==FALSE) {
    fitit = arima(xdata, order=c(p,d,q), seasonal=list(order=c(P,D,Q), period=S),
              xreg=constant,optim.control=list(trace=trc,REPORT=1,reltol=tol))
} else fitit = arima(xdata, order=c(p,d,q), seasonal=list(order=c(P,D,Q), period=S), 
              optim.control=list(trace=trc,REPORT=1,reltol=tol))
#
#  replace tsdiag with a better version
    op <- par(no.readonly = TRUE)
    layout(matrix(c(1,2,4, 1,3,4), nc=2))
    rs <- fitit$residuals
    stdres <- rs/sqrt(fitit$sigma2)
    num <- sum(!is.na(rs))
     plot.ts(stdres,  main = "Standardized Residuals", ylab = "")
    alag <- 10+sqrt(num)
    ACF = acf(rs, alag, plot=FALSE, na.action = na.pass)$acf[-1] 
    LAG = 1:alag/frequency(xdata)
    L=2/sqrt(num)
     plot(LAG, ACF, type="h", ylim=c(min(ACF)-.1,min(1,max(ACF+.4))), main = "ACF of Residuals")
     abline(h=c(0,-L,L), lty=c(1,2,2), col=c(1,4,4))  
    qqnorm(stdres, main="Normal Q-Q Plot of Std Residuals"); qqline(stdres, col=4) 
    nlag <- ifelse(S<4, 20, 3*S)
    ppq <- p+q+P+Q
    pval <- numeric(nlag)
    for (i in (ppq+1):nlag) {u <- Box.test(rs, i, type = "Ljung-Box")$statistic
                             pval[i] <- pchisq(u, i-ppq, lower=FALSE)}            
     plot( (ppq+1):nlag, pval[(ppq+1):nlag], xlab = "lag", ylab = "p value", ylim = c(0, 
        1), main = "p values for Ljung-Box statistic")
     abline(h = 0.05, lty = 2, col = "blue")
     on.exit(par(op))     
#  end new tsdiag
#
  k = length(fitit$coef)
  BIC = log(fitit$sigma2)+(k*log(n)/n)
  AICc = log(fitit$sigma2)+((n+k)/(n-k-2))
  AIC = log(fitit$sigma2)+((n+2*k)/n)
  innov<<-fitit$resid
  list(fit=fitit, AIC=AIC, AICc=AICc, BIC=BIC)
}
