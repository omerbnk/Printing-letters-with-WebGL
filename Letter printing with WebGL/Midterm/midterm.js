var canvas;
var gl;
var vPosition;
var program;

var  letter2vertices;
var buffer1, buffer2,buffer3,buffer4,buffer5,buffer6,buffer7;

var x=0.0;
var y=0.0;
var xLoc;
var yLoc;

var xr=1.0;
var yr=1.0;
var xrLoc;
var yrLoc;

var colorloc;
var red=1.0;
var green=0.0;
var blue=0.0;


var angle=0.0;
var angle2=0.0;
var angle3=0.0;
var vertice=[];
var vertice2=[];
var vertice4=[];
var vertice5=[];
var vertice6=[];
var vertice7=[];
var index=1;
var index2=1;
var index3=1;
// TODO: define any global variables you need

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // vertices for letter "B"'s line
    letter2vertices = [vec2(-0.01, -0.16),
                        vec2(0.02, -0.16),
                        vec2(-0.01, 0.16),
                        vec2(0.02, 0.16)];
	// up circle for letter "B"
 		vertice4[0]=vec2(0.02,+0.0748);
		vertice5[0]=vec2(0.02,+0.0748);
		for(angle2 =270; angle2 <=450; angle2+=1)
		{
				var radian = angle2 * Math.PI/180;
				vertice4[index2]=vec2(Math.cos(radian)/12+0.02,Math.sin(radian)/12+0.0748);
				vertice5[index2]=vec2(Math.cos(radian)/16+0.02,Math.sin(radian)/16+0.0748);
				index2++;
		}
			//down circle for letter "B"
			vertice6[0]=vec2(0.02,-0.076);
			vertice7[0]=vec2(0.02,-0.076);
			for(angle3 =270; angle3 <=450; angle3+=1)
			{
				 var radian = angle3 * Math.PI/180;
				 vertice6[index3]=vec2(Math.cos(radian)/12+0.02,Math.sin(radian)/12-0.076);
			   vertice7[index3]=vec2(Math.cos(radian)/16+0.02,Math.sin(radian)/16-0.076);
			   index3++;
			}
//-------------------------------------------------------------------------------------------------\\
    // TODO: create vertex coordinates for your initial letters instead of these vertices
		//vertices for letter "O"
		vertice[0]=vec2(-0.2,0.0);
		vertice2[0]=vec2(-0.2,0.0);
		for(angle = 0; angle <=360; angle+=1){
					var radian = angle * Math.PI / 180;
					vertice[index]=vec2(Math.cos(radian)/7-0.2,Math.sin(radian)/7);
					vertice2[index]=vec2(Math.cos(radian)/9-0.2,Math.sin(radian)/9);
					index++;
		}



    // Load the data into the GPU
		// big circle for letter "O"
  	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice), gl.STATIC_DRAW );
		// small circle for letter "O"
		buffer2 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice2), gl.STATIC_DRAW );

		//line for letter b
    buffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );

		//up-bigger circle for letter "B"
		buffer4 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice4), gl.STATIC_DRAW );
		//up-smaller circle for letter "B"
		buffer5 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice5), gl.STATIC_DRAW );
		//down-bigger circle for letter "B"
		buffer6 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer6 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice6), gl.STATIC_DRAW );
		//down-smaller circle for letter "B"
		buffer7 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer7 );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertice7), gl.STATIC_DRAW );



		xrLoc = gl.getUniformLocation(program, "xr");
		yrLoc = gl.getUniformLocation(program, "yr");

		xLoc=gl.getUniformLocation( program, "x" );
		yLoc=gl.getUniformLocation( program, "y" );

		colorLoc = gl.getUniformLocation(program,"color");


	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
				x=event.target.value;
    };
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
				y=event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				xr=event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				yr=event.target.value;
    };
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				red=event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				green=event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				blue=event.target.value;
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
		gl.uniform1f(xrLoc, xr);
		gl.uniform1f(yrLoc, yr);

		gl.uniform1f(xLoc, x);
		gl.uniform1f(yLoc, y);


    // TODO: Send necessary uniform variables to shader and
    // perform draw calls for drawing letters

    // bind vertex buffer and associate position data with shader variables
		//for letter "O"
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
		color = vec4(red,green,blue,1.0);
		gl.uniform4fv(colorLoc,color);
  	gl.drawArrays(gl.TRIANGLE_FAN, 0, index);
		// bind vertex buffer and associate position data with shader variables
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer2);
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );
		// draw triangle
		color = vec4(1.0,1.0,1.0,1.0);
		gl.uniform4fv(colorLoc,color);
		gl.drawArrays(gl.TRIANGLE_FAN, 0, index);

		// bind vertex buffer and associate position data with shader variables
		// for letter "B"
		    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3 );
		    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		    gl.enableVertexAttribArray( vPosition );
		    // draw rectangle
				color = vec4(1-red,1-green,1-blue,1.0);
				gl.uniform4fv(colorLoc,color);
		  	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);
				// bind vertex buffer and associate position data with shader variables RENDER İÇİN
				//up-bigger circle for letter "B"
						gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
						gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
						gl.enableVertexAttribArray( vPosition );
						// draw rectangle
						color = vec4(1-red,1-green,1-blue,1.0);
						gl.uniform4fv(colorLoc,color);
						gl.drawArrays(gl.TRIANGLE_FAN, 0, index2);
						// bind vertex buffer and associate position data with shader variables RENDER İÇİN
						//up-smaller circle for letter "B"
								gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
								gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
								gl.enableVertexAttribArray( vPosition );
								// draw rectangle
								color = vec4(1.0,1.0,1.0,1.0);
								gl.uniform4fv(colorLoc,color);
								gl.drawArrays(gl.TRIANGLE_FAN, 0, index2);

								// bind vertex buffer and associate position data with shader variables RENDER İÇİN
								//down-bigger circle for letter "B"
										gl.bindBuffer( gl.ARRAY_BUFFER, buffer6 );
										gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
										gl.enableVertexAttribArray( vPosition );
										// draw rectangle
										color = vec4(1-red,1-green,1-blue,1.0);
										gl.uniform4fv(colorLoc,color);
										gl.drawArrays(gl.TRIANGLE_FAN, 0, index3);
										// bind vertex buffer and associate position data with shader variables RENDER İÇİN
										//down-smaller circle for letter "B"
												gl.bindBuffer( gl.ARRAY_BUFFER, buffer7 );
												gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
												gl.enableVertexAttribArray( vPosition );
												// draw rectangle
												color = vec4(1.0,1.0,1.0,1.0);
												gl.uniform4fv(colorLoc,color);
												gl.drawArrays(gl.TRIANGLE_FAN, 0, index3);

    window.requestAnimFrame(render);
}
