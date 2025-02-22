"use client";

const vert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}
`;

const frag = `
precision mediump float;

#define PI 3.14159265358979323846
varying vec2 vTexCoord;
uniform float size_div;
uniform float far_grain;
uniform float close_grain;
uniform float blur_size;
uniform vec2 start;
uniform vec2 size;

uniform vec2 g1_coords;
uniform vec2 g2_coords;
uniform vec2 g3_coords;
uniform vec3 g1_clr;
uniform vec3 g2_clr;
uniform vec3 g3_clr;

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

float rand(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float lerp(float a, float b, float t) {
    return a * (1.0 - t) + b * t;
}

vec3 get_uv_clr (vec2 uv) {
    float shift_len = pow(rand(uv.xy*20.0), 10.) * far_grain;
    float shift_angle = pow(rand(uv.xy*10.0), 3.) * PI * 2.0;
    vec2 shift = vec2(cos(shift_angle), sin(shift_angle)) * shift_len;

    float shift2_len = pow(rand(uv.xy*40.0), .5) * close_grain;
    float shift2_angle = pow(rand(uv.xy*30.0), 3.) * PI * 2.0;
    vec2 shift2 = vec2(cos(shift2_angle), sin(shift2_angle)) * shift2_len;

    uv = uv + shift2 + shift;

    float n1 = distance(uv.xy, g1_coords) + snoise(vec2(uv.x * -1.0, uv.y)) * 0.3;
    float n2 = distance(uv.xy, g2_coords) + snoise(vec2(uv.x, uv.y * -1.0)) * 0.3;
    float n3 = distance(uv.xy, g3_coords) + snoise(vec2(uv.x, uv.y)) * 0.3;

    float min_n = min(n1, min(n2, n3));
    vec3 closest_clr = vec3(0.0);
    if (min_n == n1) {
        closest_clr = g1_clr;
    } else if (min_n == n2) {
        closest_clr = g2_clr;
    } else if (min_n == n3) {
        closest_clr = g3_clr;
    }
    

    return closest_clr;
}

void main() {
    vec2 uv = vec2((gl_FragCoord.x - start.x) / size.x, gl_FragCoord.y / size.y);
    uv.x = uv.x * size_div;
    uv.xy = uv.xy * 0.9;
    
    vec3 c2 = get_uv_clr(uv.xy + vec2(blur_size, 0));
    vec3 c3 = get_uv_clr(uv + vec2(-blur_size, 0));
    vec3 c4 = get_uv_clr(uv + vec2(0, blur_size));
    vec3 c5 = get_uv_clr(uv + vec2(0, -blur_size));

    vec3 c6 = get_uv_clr(uv.xy + vec2(blur_size*1.5, 0));
    vec3 c7 = get_uv_clr(uv + vec2(-blur_size*1.5, 0));
    vec3 c8 = get_uv_clr(uv + vec2(0, blur_size*1.5));
    vec3 c9 = get_uv_clr(uv + vec2(0, -blur_size*1.5));

    vec3 c10 = get_uv_clr(uv.xy + vec2(blur_size*2.0, 0));
    vec3 c11 = get_uv_clr(uv + vec2(-blur_size*2.0, 0));
    vec3 c12 = get_uv_clr(uv + vec2(0, blur_size*2.0));
    vec3 c13 = get_uv_clr(uv + vec2(0, -blur_size*2.0));

    vec3 c14 = get_uv_clr(uv.xy + vec2(blur_size*2.5, 0));
    vec3 c15 = get_uv_clr(uv + vec2(-blur_size*2.5, 0));
    vec3 c16 = get_uv_clr(uv + vec2(0, blur_size*2.5));
    vec3 c17 = get_uv_clr(uv + vec2(0, -blur_size*2.5));

    vec3 clr1 = mix(mix(c2, c3, 0.5), mix(c4, c5, 0.5), 0.5);
    vec3 clr2 = mix(mix(c6, c7, 0.5), mix(c8, c9, 0.5), 0.5);
    vec3 clr3 = mix(mix(c10, c11, 0.5), mix(c12, c13, 0.5), 0.5);
    vec3 clr4 = mix(mix(c14, c15, 0.5), mix(c16, c17, 0.5), 0.5);

    gl_FragColor = vec4((clr1 + clr2 + clr3 + clr4) / 4.0, 1.0);
    // gl_FragColor = vec4(uv.x, uv.x, uv.x, 1.0);
}
`;

function rand(_min: number, _max: number) {
  const t = Math.random();
  return _min * (1 - t) + _max * t;
}

function randCoords(): [number, number] {
  return [rand(0.1, 0.9), rand(0.1, 0.9)];
}

function shuffle<T>(arr: T[]): T[] {
  const arr_copy = [...arr];
  arr_copy.sort(() => 0.5 - Math.random());
  return arr_copy;
}

type drawConfig = {
  width: number;
  height: number;
  pixelRatio: number;
};

const DEBUG = true;

function log(message: string) {
  if (DEBUG) {
    console.debug(message);
  }
}

export function drawGradients(
  subcanvases: HTMLCanvasElement[],
  config: drawConfig,
) {
  if (subcanvases.length !== 1) {
    throw new Error("Multicanvas rendering disabled");
  }

  const w = config.width * config.pixelRatio; // canvas width
  const h = config.height * config.pixelRatio; // canvas height

  const initStart = performance.now();
  const rects = subcanvases.length;
  // const mainCanvas = new OffscreenCanvas(w * rects, h);
  const mainCanvas = subcanvases[0];
  const gl = mainCanvas.getContext("webgl")!;

  // Select 3 colors for gradient
  const allColors: [number, number, number][] = [
    [0.9372549019607843, 0.34901960784313724, 0.00784313725490196], // #ef5902
    [0.25882352941176473, 0.7137254901960784, 0.7764705882352941], // #42b6c6
    [0.9686274509803922, 0.6235294117647059, 0.4], // #f79f66
    [0.6980392156862745, 0.8745098039215686, 0.9019607843137255], // #b2dfe6
  ];

  for (const subcanvas of subcanvases) {
    subcanvas.width = w;
    subcanvas.height = h;
  }
  log(`init took ${performance.now() - initStart} ms`);

  const compileStart = performance.now();
  const progDraw = gl.createProgram()!;

  const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertShader, vert);
  gl.compileShader(vertShader);
  let status = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
  if (!status) {
    console.log("Vert shader compile error:", gl.getShaderInfoLog(vertShader));
  }
  gl.attachShader(progDraw, vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragShader, frag);
  gl.compileShader(fragShader);
  status = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
  if (!status) {
    console.log("Frag shader compile error:", gl.getShaderInfoLog(fragShader));
  }
  gl.attachShader(progDraw, fragShader);

  gl.linkProgram(progDraw);

  status = gl.getProgramParameter(progDraw, gl.LINK_STATUS);
  if (!status) {
    console.log("Program link error:", gl.getProgramInfoLog(progDraw));
  }
  log(`compile took ${performance.now() - compileStart} ms`);

  // Prepare uniform variables
  const size_div = gl.getUniformLocation(progDraw, "size_div");
  const blur_size = gl.getUniformLocation(progDraw, "blur_size");
  const far_grain = gl.getUniformLocation(progDraw, "far_grain");
  const close_grain = gl.getUniformLocation(progDraw, "close_grain");
  const size = gl.getUniformLocation(progDraw, "size");
  const start = gl.getUniformLocation(progDraw, "start");
  const g1_clr = gl.getUniformLocation(progDraw, "g1_clr");
  const g1_coords = gl.getUniformLocation(progDraw, "g1_coords");
  const g2_clr = gl.getUniformLocation(progDraw, "g2_clr");
  const g2_coords = gl.getUniformLocation(progDraw, "g2_coords");
  const g3_clr = gl.getUniformLocation(progDraw, "g3_clr");
  const g3_coords = gl.getUniformLocation(progDraw, "g3_coords");
  const inPos = gl.getAttribLocation(progDraw, "aPosition");
  gl.useProgram(progDraw);

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, mainCanvas.width, mainCanvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw rectangles
  const rectWidth = 1 / rects;
  for (let rectNum = 0; rectNum < rects; rectNum++) {
    const drawPrepareStart = performance.now();
    const pos = [
      rectWidth * rectNum,
      -1,
      rectWidth * (rectNum + 1),
      -1,
      rectWidth * (rectNum + 1),
      1,
      rectWidth * rectNum,
      1,
    ];

    const inx = [0, 1, 2, 0, 2, 3];

    const bufObj = {
      pos: gl.createBuffer(),
      inx: gl.createBuffer(),
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.pos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(inx),
      gl.DYNAMIC_DRAW,
    );

    gl.enableVertexAttribArray(inPos);
    gl.vertexAttribPointer(inPos, 2, gl.FLOAT, false, 0, 0);

    // Set uniform variable values
    const chosen_clrs = shuffle(allColors).slice(0, 3);
    const g1 = { clr: chosen_clrs[0], coords: randCoords() };
    const g2 = { clr: chosen_clrs[1], coords: randCoords() };
    const g3 = { clr: chosen_clrs[2], coords: randCoords() };

    gl.uniform1f(size_div, w / h); // to normalize coords in case canvas is rectangle
    gl.uniform1f(blur_size, 0.09); // read the name
    gl.uniform1f(far_grain, 0.3); // grain for inner parts of shapes
    gl.uniform1f(close_grain, 0.09); // grain for smoothing shapes between lines
    gl.uniform2f(size, w, h);
    gl.uniform2f(start, w * rectNum, h);
    gl.uniform3f(g1_clr, ...g1.clr);
    gl.uniform2f(g1_coords, ...g1.coords);
    gl.uniform3f(g2_clr, ...g2.clr);
    gl.uniform2f(g2_coords, ...g2.coords);
    gl.uniform3f(g3_clr, ...g3.clr);
    gl.uniform2f(g3_coords, ...g3.coords);
    log(`draw prepare took ${performance.now() - drawPrepareStart} ms`);

    // Render rectangle with shaders
    const drawStart = performance.now();
    gl.drawElements(gl.TRIANGLES, inx.length, gl.UNSIGNED_SHORT, 0);
    log(`draw took ${performance.now() - drawStart} ms`);

    // const copyStart = performance.now();
    // const subcanvas = subcanvases[rectNum];
    // subcanvas
    //   .getContext("2d", { alpha: false })!
    //   .drawImage(mainCanvas, w * rectNum, 0, w, h, 0, 0, w, h);
    // log(`copy took ${performance.now() - copyStart} ms`);

    gl.deleteBuffer(bufObj.pos);
    gl.deleteBuffer(bufObj.inx);
  }

  // mainCanvas.width = 1;
  // mainCanvas.height = 1;
  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);
  gl.deleteProgram(progDraw);
}
