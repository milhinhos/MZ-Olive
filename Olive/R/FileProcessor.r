

#code to copy the files, PHP style
destination <- file.path('/var/www/Olive/upload',FILES$FirstFile$name)
file.copy(FILES$FirstFile$tmp_name,destination,overwrite=TRUE)

print(paste('upload/',FILES$FirstFile$name,sep='')
