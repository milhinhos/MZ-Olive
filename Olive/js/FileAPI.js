function FileAPI (t, d, f) {

    var fileList = t,
        fileField = f,
        dropZone = d,
        fileQueue = new Array(),
        preview = null,
        dataList = null,
        graficoMgr = null
        dados=null;


    this.init = function () {
        fileField.onchange = this.addFiles;
        dropZone.addEventListener("dragenter",  this.stopProp, false);
        dropZone.addEventListener("dragleave",  this.dragExit, false);
        dropZone.addEventListener("dragover",  this.dragOver, false);
        dropZone.addEventListener("drop",  this.showDroppedFiles, false);
        
        // constroi a gestão dos gráficos
        graficoMgr = new Grafico();
        graficoMgr.init();
        dados = new Store();
   		dados.init();
    }

    this.addFiles = function () {
        addFileListItems(this.files);
    }
    
    

    this.showDroppedFiles = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var files = ev.dataTransfer.files;
        addFileListItems(files);
    }

    this.clearList = function (ev) {
        ev.preventDefault();
        while (fileList.childNodes.length > 0) {
            fileList.removeChild(
                fileList.childNodes[fileList.childNodes.length - 1]
            );
        }
    }

    this.dragOver = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.style["backgroundColor"] = "#F0FCF0";
        this.style["borderColor"] = "#3DD13F";
        this.style["color"] = "#3DD13F"
    }

    this.dragExit = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        dropZone.style["backgroundColor"] = "#FEFEFE";
        dropZone.style["borderColor"] = "#CCC";
        dropZone.style["color"] = "#CCC"
    }

    this.stopProp = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
    }

    this.uploadQueue = function (ev) {
        ev.preventDefault();
        while (fileQueue.length > 0) {
            var item = fileQueue.pop();
            var p = document.createElement("p");
            p.className = "loader";
            var pText = document.createTextNode("Uploading...");
            p.appendChild(pText);
            item.li.appendChild(p);
            if (item.file.size < 1048576) {
                uploadFile(item.file, item.li);
            } else {
                p.textContent = "File to large";
                p.style["color"] = "red";
            }
        }
        
    }

    var addFileListItems = function (files) {
        for (var i = 0; i < files.length; i++) {
            var fr = new FileReader();
            fr.file = files[i];
            fr.onloadend = showFileInList;
            fr.readAsDataURL(files[i]);
        }
    }

    var showFileInList = function (ev) {
        var file = ev.target.file;
        if (file) {
            var li = document.createElement("li");
            if (file.type.search(/image\/.*/) != -1) {
                var thumb = new Image();
                thumb.src = ev.target.result;
                thumb.addEventListener("mouseover", showImagePreview, false);
                thumb.addEventListener("mouseout", removePreview, false);
                li.appendChild(thumb);
            }
            var h3 = document.createElement("h3");
            var h3Text = document.createTextNode(file.name);
            h3.appendChild(h3Text);
            li.appendChild(h3)
            var p = document.createElement("p");
            var pText = document.createTextNode(
                "File type: ("
                + file.type + ") - " +
                Math.round(file.size / 1024) + "KB"
            );
            p.appendChild(pText);
            li.appendChild(p);
            var divLoader = document.createElement("div");
            divLoader.className = "loadingIndicator";
            li.appendChild(divLoader);
            fileList.appendChild(li);
            fileQueue.push({
                file : file,
                li : li
            });
        }
    }

    var showImagePreview = function (ev) {
        var div = document.createElement("div");
        div.style["top"] = (ev.pageY + 10) + "px";
        div.style["left"] = (ev.pageX + 10) + "px";
        div.style["opacity"] = 0;
        div.className = "imagePreview";
        var img = new Image();
        img.src = ev.target.src;
        div.appendChild(img);
        document.body.appendChild(div);
        document.body.addEventListener("mousemove", movePreview, false);
        preview = div;
        fadePreviewIn();
    }

    var movePreview = function (ev) {
        if (preview) {
            preview.style["top"] = (ev.pageY + 10) + "px";
            preview.style["left"] = (ev.pageX + 10) + "px";
        }
    }

    var removePreview = function (ev) {
        document.body.removeEventListener("mousemove", movePreview, false);
        document.body.removeChild(preview);
    }

    var fadePreviewIn = function () {
        if (preview) {
            var opacity = preview.style["opacity"];
            for (var i = 10; i < 250; i = i+10) {
                (function () {
                    var level = i;
                    setTimeout(function () {
                        preview.style["opacity"] = opacity + level / 250;
                    }, level);
                })();
            }
        }
    }

    var uploadFile = function (file, li) {
        if (li && file) {
            var xhr = new XMLHttpRequest(),
                upload = xhr.upload;
            upload.addEventListener("progress", function (ev) {
                if (ev.lengthComputable) {
                    var loader = li.getElementsByTagName("div")[0];
                    loader.style["width"] = (ev.loaded / ev.total) * 100 + "%";
                }
            }, false);
            upload.addEventListener("load", function (ev) {
                var ps = li.getElementsByTagName("p");
                var div = li.getElementsByTagName("div")[0];
                div.style["width"] = "100%";
                div.style["backgroundColor"] = "#0f0";
                for (var i = 0; i < ps.length; i++) {
                    if (ps[i].className == "loader") {
                        ps[i].textContent = "Upload complete";
                        ps[i].style["color"] = "#3DD13F";
                        break;
                    }
                }
            }, false);
            upload.addEventListener("error", function (ev) {console.log(ev);}, false);
            xhr.open(
                "POST",
                "R/processaR.R"
            );
            
            xhr.onload = function(outEvent){
            	//var outRes=document.getElementById("graphics");
            	var outContent=document.getElementById("graphics");
            	if(xhr.status==200){
            		//outRes.innerHTML="Ficheiro carregado com Sucesso!!!";
            		//outContent.innerHTML=xhr.responseText;
            		dataList=xhr.responseText;
               	}else
               	{
               		//outRes.innerHTML="ERRO: O Capitão Nascimento disse: "+xhr.status+" <br\/>";
               	}
               	dataList=limpaJSON(dataList);
               	//outContent.innerHTML="NEW    :" + dataList+" <br\/>";
                //var dados=new Store();
                //dados.init();
				dados.dataProcess(dataList);
				graficoMgr.desenhaMenus();
				graficoMgr.mostraGrafico(dados);
			
				//dados.imprime();
				//console.log(dados);
				//dados.	               
               
               	//dados.mostraGrafico('duplo',2);
               	//var gr = new Grafico();
               	//gr.init();
               	//gr.processaJData(obj);
               	
               	/*console.log("Pos Processo!\n");
               	console.log(dump(gr.getData()));*/
               
               //gr.mostraGraficoLinha();
               	
            };
            
            
           
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("X-File-Name", file.name);
            xhr.send(file);
            
        }
    }
    
       /**
* Function : dump()
* Arguments: The data - array,hash(associative array),object
*    The level - OPTIONAL
* Returns  : The textual representation of the array.
* This function was inspired by the print_r function of PHP.
* This will accept some data as the argument and return a
* text that will be a more readable version of the
* array/hash/object that is given.
*/
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
	 for(var item in arr) {
  		var value = arr[item];
 
  		if(typeof(value) == 'object') { //If it is an array,
   			dumped_text += level_padding + "'" + item + "' ...\n";
   			dumped_text += dump(value,level+1);
  		} else {
   			dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
  		}
 	 }
	} else { //Stings/Chars/Numbers etc.
 		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
} 
/*
 * Cleaning of R JSON implementation
 */

function limpaJSON(str) {
	var dp =str.replace(/\\/g,"");
	return dp.substring(5,dp.length-2);
}

function mostraJSON(lista)
{
	alert(lista);
   	var obj=JSON.parse(lista,function(key,value){
		alert("key: "+key+"      Valor: "+value);
   	});
}


    
}

