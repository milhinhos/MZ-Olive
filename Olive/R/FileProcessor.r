setwd("/var/www/Olive/R")

##################################################
# Function f_table2JSON
#	Action: Converts a table to a tring on JSON format
#	Return: null
#	V0.1: creation (JM)
###################################################

f_table2JSON<-function(tabela)
{
	print(toJSON(tabela))
}



##################################################
# Function f_datatable_read
#	Action: Reads data from XMLHTTPRequest and writes it to a file
#	Return: datatable
#	V0.1: creation (JM)
###################################################
f_datatable_read<-function()
{
	filename<-paste('/var/www/Olive/upload/',SERVER$headers_in$'X-File-Name',sep='')
	webfilename<-paste('upload/',SERVER$headers_in$'X-File-Name',sep='')
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
	f_datatable_read<-read.table(webfilename,sep=';',header=TRUE)
	#print(webfilename)
}

###############################################
# Code execution
###############################################
tabela<-f_datatable_read()
f_table2JSON(tabela)









######################################################
		###################################
			#NOT USED
######################################################
#code to copy the files, PHP style
#destination <- file.path('/usr/local/uploaded_files',FILES$FirstFile$name)
#file.copy(FILES$FirstFile$tmp_name,destination,overwrite=TRUE)


