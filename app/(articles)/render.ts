"use client";

import type p5 from "p5";

const w = 360; // canvas width
const h = 225; // canvas height

export default async function gradientRenderer(canvas: HTMLCanvasElement) {
  const p5 = (await import("p5")).default;

  let p = new p5((sketch: p5) => {
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
uniform vec2 spawn;

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
    vec2 uv = vTexCoord;
    uv.x = uv.x * size_div;
    uv.xy = uv.xy * 0.8;
    
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
}
`;

    let sh: p5.Shader;
    sketch.setup = () => {
      sketch.createCanvas(w, h, sketch.WEBGL, canvas);
      sh = sketch.createShader(vert, frag);
      sketch.shader(sh);
      sketch.noStroke();

      sh.setUniform("size_div", w / h); // to normalize coords in case canvas is rectangle
      sh.setUniform("spawn", [Math.random() * 1000, Math.random() * 1000]); // random coordinate shift on simplex field
      sh.setUniform("blur_size", 0.09); // read the name
      sh.setUniform("far_grain", 0.3); // grain for inner parts of shapes
      sh.setUniform("close_grain", 0.09); // grain for smoothing shapes between lines
    };

    const rand = (_min: number, _max: number) => {
      let t = Math.random();
      return _min * (1 - t) + _max * t;
    };

    const rand_coords = () => {
      return [rand(0.1, 0.9), rand(0.1, 0.9)];
    };

    const shuffle = (arr: any[]) => {
      const arr_copy = [...arr];
      arr_copy.sort(() => 0.5 - Math.random());
      return arr_copy;
    };

    sketch.draw = () => {
      let all_clrs = [
        [0.9372549019607843, 0.34901960784313724, 0.00784313725490196], // #ef5902
        [0.25882352941176473, 0.7137254901960784, 0.7764705882352941], // #42b6c6
        [0.9686274509803922, 0.6235294117647059, 0.4], // #f79f66
        [0.6980392156862745, 0.8745098039215686, 0.9019607843137255], // #b2dfe6
      ];

      const chosen_clrs = shuffle(all_clrs).slice(0, 3);

      let g1 = { clr: chosen_clrs[0], coords: rand_coords() };
      let g2 = { clr: chosen_clrs[1], coords: rand_coords() };
      let g3 = { clr: chosen_clrs[2], coords: rand_coords() };
      [g1, g2, g3] = shuffle([g1, g2, g3]);
      sh.setUniform("g1_clr", g1.clr);
      sh.setUniform("g1_coords", g1.coords);
      sh.setUniform("g2_clr", g2.clr);
      sh.setUniform("g2_coords", g2.coords);
      sh.setUniform("g3_clr", g3.clr);
      sh.setUniform("g3_coords", g3.coords);

      sketch.rect(0, 0, w, h);

      if (sketch.frameCount >= 1) {
        sketch.noLoop();
      }

      canvas.style.removeProperty("width");
      canvas.style.removeProperty("height");
      canvas.style.removeProperty("display");
    };
  });

  return p;
}
