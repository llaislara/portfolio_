// src/components/Aurora.tsx
"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorStops[3];
uniform float uBlend;

// Simplex noise implementation
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 x1 = x0 - i1 + C.xx;
  vec2 x2 = x0 - 2.0 * C.xx;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
		  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * vec2(x1.x, x2.x) + h.yz * vec2(x1.y, x2.y);
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 color = mix(uColorStops[0], uColorStops[1], uv.x + snoise(uv * 2.0 + uTime * 0.1) * uBlend);
  color = mix(color, uColorStops[2], uv.y + snoise(uv * 1.5 - uTime * 0.1) * uBlend);
  fragColor = vec4(color, 1.0);
}
`;

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  speed?: number;
}

export default function Aurora({
  colorStops = ["#3A29FF", "#3D7EAA", "#7DC2A7"],
  blend = 0.5,
  speed = 1.0,
}: AuroraProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    let animationFrameId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const setSize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", setSize);
    setSize();

    const geometry = new Triangle(gl);

    // Convert hex color strings to RGB floats
    const parseColor = (hex: string) => {
      const c = parseInt(hex.replace("#", ""), 16);
      return [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255];
    };

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [width, height] },
        uColorStops: { value: colorStops.map(parseColor) },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let lastTime = performance.now();

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.uTime.value += delta * speed;
      renderer.render({ scene: mesh });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setSize);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [colorStops, blend, speed]);

  return (
    <div
      ref={ctnDom}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
