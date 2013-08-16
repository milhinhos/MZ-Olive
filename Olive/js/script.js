	// Interactions
// Objects in Raphael are part of the DOM
// Calling the 'node' method returns a reference to the DOM object

// Here is the basic JavaScript way to create a button

/*window.onload = function() {  
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    var circle = paper.circle(100, 100, 80).attr('fill','#f00');  
    
    //circle creation on a for cycle
    //for(var i = 0; i < 5; i+=1) {  
    //    var multiplier = i*5;  
    //    paper.circle(250 + (2*multiplier), 100 + multiplier, 50 - multiplier)  
    //} 
    var rectangle = paper.rect(200, 200, 250, 100).attr('fill','#030');  
    var ellipse = paper.ellipse(200, 400, 100, 50).attr('fill','#6ff');
    var formaNova = paper.circle(20,100,130).attr('fill','#111');
    
    var drag = {x: 0, y: 0, state: false};
  //event management
  circle.node.onclick = function() {
  alert("You clicked the Red button");
};

$(ellipse.node).click(function() {
  alert("You clicked the Whatever button");
});

$(rectangle.node).hover(
	function() { rectangle.attr({fill: '#ff0'});},
	function() { rectangle.attr({fill: '#0f0'});}
	);

$(formaNova.node).mousedown(function(e) {
  if(!drag.state) {
    formaNova.attr({fill: '#808'});
    formaNova.node.style.cursor = "move";
    drag.x = e.pageX;
    drag.y = e.pageY;
    drag.state = true;
  }
  return false;
});

$(formaNova.node).mousemove(function(e) {
  if(drag.state) {
    formaNova.translate(e.pageX - drag.x, e.pageY - drag.y);
    drag.x = e.pageX;
    drag.y = e.pageY;
  }
});

$(formaNova.node).mouseup(function() {
  formaNova.attr({fill: '#80f'});
  formaNova.node.style.cursor = "default";
  drag.state = false;
});

$(formaNova.node).mouseout(function() {
  $(formaNova.node).mouseup();
});


//paper.text(300,25, 'Click, hover over or drag the objects').attr({'font-size': 18});
}*/
 
window.onload = function() { 
 	$.jqplot.config.enablePlugins = true;
 	var dados=[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]];
 	var cg = $.jqplot('chart1b',  [dados],
{ title:'Exponential Line',
  axes:{yaxis:{min:-10, max:240}},
  //series:[{color:'#5FAB78',dragable:{color:'#5FAB78',constrainTo:'x'}}],
  series:[{color:'#5FAB78'}],
  highlighter:{show:true,sizeAdjust: 15},
  cursor:{show:true, tooltipLocation: 'nw'}
}); 


$.jqplot('chartdiv2',  [[34.53, 56.32, 25.1, 18.6]], 
{series:[
	{
		renderer:$.jqplot.BarRenderer,
		label:'dados em Colunas',
		dragable:{color:'#5FAB78',constrainTo:'x'},
		isDragable:true
		}],
legend:{show:true}

});

// Legend is a simple table in the html.
  // Dynamically populate it with the labels from each data value.
  $.each(dados, function(index, val) {
    $('#legend1b').append('<tr><td>'+val[0]+'</td><td>'+val[1]+'</td></tr>');
  });
  
  
 
  
    	
    /*$('#chart1b').bind('jqplotDataHighlight',
    function (ev, seriesIndex, pointIndex, data, radius) {   
      var chart_left = $('#chart1b').offset().left,
        chart_top = $('#chart1b').offset().top,
        x = cg.axes.xaxis.u2p(data[0]),  // convert x axis unita to pixels
        y = cg.axes.yaxis.u2p(data[1]);  // convert y axis units to pixels
      var color = 'rgb(50%,50%,100%)';
      $('#tooltip1b').css({left:chart_left+x+5, top:chart_top+y});
      $('#tooltip1b').html('<span style="font-size:14px;font-weight:bold;color:' +
      color + ';">' + data[3] + '</span><br />' + 'x: ' + data[0] +
      '<br />' + 'y: ' + data[1] + '<br />' + 'r: ' + data[2]);
      $('#tooltip1b').show();
      $('#legend1b').css('background-color', '#ffffff');
      $('#legend1b').eq(pointIndex+1).css('background-color', color);
    });*/
    
    $('#chart1b').bind('jqplotDataHighlight',
      function (ev, seriesIndex, pointIndex, data) {
          $('#tooltip1b').show();
          $('#legend1b tr').css('background-color', '#ff0033');
      });
    
    $('#chart1b').bind('jqplotDataUnhighlight',
      function (ev, seriesIndex, pointIndex, data) {
          $('#tooltip1b').empty();
          $('#tooltip1b').hide();
          $('#legend1b tr').css('background-color', '#ffffff');
      });
     
    
};

