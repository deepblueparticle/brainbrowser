function Spectrum(data) {
  var that = this;




  /*
   * Creates an canvas with the spectrum of colors
   * from low(left) to high(right) values
   */
  function createCanvas(colors,color_height,full_height) {
    var canvas = document.createElement("canvas");

    jQuery(canvas).attr("width",colors.length);
    jQuery(canvas).attr("height",full_height);

    var context = canvas.getContext("2d");
    for(var i = 0; i < colors.length; i++) {
      context.fillStyle = "rgb("+parseInt(parseFloat(colors[i][0])*255)+','+parseInt(parseFloat(colors[i][1])*255)+','+parseInt(parseFloat(colors[i][2])*255)+')';
      context.fillRect(i,0,1,color_height);
    };

    return canvas;

  }



  that.createSpectrumCanvas = function(colors)  {
    if(colors == null ) {
      colors = that.colors;
    }

    var canvas = createCanvas(colors,20,20);

    return canvas;
  };


  that.createSpectrumCanvasWithScale = function(min,max,colors) {

    if(colors == null) {
      colors = that.colors;
    }
    var canvas = createCanvas(colors,20,40);
    var context = canvas.getContext("2d");

    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0.5,20,1,10);
    context.fillText(min.toPrecision(3), 0.5, 40 );
    context.fillRect(canvas.width/2.0,20,1,10);
    context.fillText((min+max/2.0).toPrecision(3), canvas.width/2.0, 40 );
    context.fillRect(canvas.width-0.5,20,1,10);
    context.fillText(max.toPrecision(3), canvas.width-20, 40 );

    return canvas;
  };

  /*
   * Parse the spectrum data from a string
   */
  function parseSpectrum(data) {
    data = data.replace(/\s+$/, '');
    data = data.replace(/^\s+/, '');
    var tmp = data.split(/\n/);
    var colors = new Array();
    for(var i=0;i<tmp.length;  i++) {
      var tmp_color = tmp[i].split(/\s+/);
      for(var k=0; k<3; k++) {
	tmp_color[k]=parseFloat(tmp_color[k]);
      }
      tmp_color.push(1.0000);
      colors.push(tmp_color);
    }
    that.colors = colors;
    return colors;
  }

  if(data) {
    parseSpectrum(data);
  }

}
