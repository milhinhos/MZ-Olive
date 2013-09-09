setwd('/var/www/Olive')


filename<-paste('upload/',SERVER$headers_in$'X-File-Name',sep='');
comp<-as.numeric(SERVER$headers_in$'Content-Length')
ficheiro<-file(description=filename,"wb")
open(ficheiro,type='w')
while(length(a<-receiveBin())>0)
{
	writeBin(a,ficheiro)
  	#print("<br/>Escreveu!")
}
flush(ficheiro)
close(ficheiro)

print(filename)

	

