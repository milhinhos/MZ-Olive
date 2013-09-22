function handleImageFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

function handleDataFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // just gets the first file
    var message='';
    var file=files[0];
    if ('name' in file) {
        message += "name: " + file.name + "<br />";
    }
    else {
        message += "name: " + file.fileName + "<br />";
    }
    if ('size' in file) {
        message += "size: " + file.size + " bytes <br />";
    }
    else {
        message += "size: " + file.fileSize + " bytes <br />";
    }
    if ('mediaType' in file) {
        message += "type: " + file.mediaType + "<br />";
    }

    
    var info = document.getElementById ("info");
    info.innerHTML = message;
    
    processa_dados(files[0]);
    
  }



