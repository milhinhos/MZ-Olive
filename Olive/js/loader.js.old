window.onload = function () {
    if (typeof FileReader == "undefined") alert ("Sorry your browser does not support the File API and this demo will not work for you");
    FileAPI = new FileAPI(
        document.getElementById("fileList"),
        document.getElementById("fileDrop"),
        document.getElementById("fileField")
    );
    FileAPI.init();
    
   
    
    var reset = document.getElementById("reset");
    reset.onclick = FileAPI.clearList;
    var upload = document.getElementById("upload");
    upload.onclick = FileAPI.uploadQueue;
    
    Grafico=new Grafico();
    Grafico.init();
    
   /* var gr = new Grafico (null);
    gr.init();
    gr.setData();
    gr.mostraGrafico();
        
   var dados = [[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]];
    $.each(dados, function(index, val) {
    	$('#tabela').append('<tr><td>'+val[0]+'</td><td>'+val[1]+'</td></tr>');
  });*/
}