const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`);
if(!webgl){ throw new Error("WebGL not available/supported");}
webgl.clearColor(1.0,1.0,0,1); //r=0 g=1 b=0 values red green blue 1 0 ; rgba
webgl.clear(webgl.COLOR_BUFFER_BIT);
const vertices = new Float32Array([
    -0.2,-0.2,//bottom left 
    -0.2,0.2, //top left 
    0.2,0.2,//top right
    0.2,-0.2, //bottom right
    
]);
const colours = new Float32Array([
    1,0,0,
    0,1,0,
    0,0,1,
    0,1,1
]);
const buffer = webgl.createBuffer();
const cbuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);
webgl.bindBuffer(webgl.ARRAY_BUFFER, cbuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, colours, webgl.STATIC_DRAW);

const vsSource =`     
attribute vec2 pos;
attribute vec3 col;
varying vec3 vcol;
void main() { 
    //gl_Position = vec4(0.5*pos,0,1) +vec4(0.5,0,0,0);
    //gl_Position = vec4(pos,0,1);
    
    gl_Position.x = pos.x*cos(0.3) -pos.y*sin(0.3);
    gl_Position.y = pos.y*cos(0.3)+ pos.x*sin(0.3) ;
    gl_Position.z = 0.0;
    gl_Position.w = 1.0;
    

    vcol = col;

}`
const fsSource = `
precision mediump float;
varying vec3 vcol;
void main() { gl_FragColor = vec4(vcol,1.0); }`;
const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vsSource ); 
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fsSource);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
 

webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
const positionLocation = webgl.getAttribLocation(program, `pos`);
const cLocation = webgl.getAttribLocation(program, `col`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

webgl.enableVertexAttribArray(cLocation);
webgl.bindBuffer(webgl.ARRAY_BUFFER, cbuffer);
webgl.vertexAttribPointer(cLocation, 3, webgl.FLOAT, false, 0, 0);

//webgl.vertexAttribPointer(index, size, type, normalized, stride, offset);
webgl.useProgram(program);
//webgl.drawArrays(webgl.TRIANGLES, 0, 3);
//webgl.drawArrays(webgl.LINE_STRIP, 0, 7);    
webgl.drawArrays(webgl.TRIANGLE_FAN, 0, 4);    
// webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 7);