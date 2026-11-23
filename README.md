# WebGL Basics: Colored Shapes & Shaders

A collection of raw WebGL experiments demonstrating core graphics programming concepts: GPU buffers, Vertex/Fragment shaders, color interpolation, and 2D rotation math. No external libraries (like Three.js) are used.

## 🎯 Project Overview

This repo documents my progression learning the WebGL pipeline. It moves from drawing a basic interpolated triangle to rotating a 4-vertex square entirely on the GPU using trigonometry within the vertex shader.

## 🗂️ Files

| File | Description | Key Concepts |
|------|-------------|--------------|
| `test.html` | A simple rainbow triangle. | Basic attributes, `varying` variables, `TRIANGLES` draw call. |
| `test2.html` | Identical to `test.html`, but fully commented for learning. | Understanding the graphics pipeline step-by-step. |
| `index.html` + `main.js` | A 4-vertex quad rotated on the GPU. | **Vertex Shader math**, `TRIANGLE_FAN`, uniform/attribute bindings. |

## 🚀 How to Run

No build tools are required. 
1. Clone the repo.
2. Open any `.html` file in your browser.
*(Note: Ensure your browser supports WebGL.)*

## 🧠 Deep Dive: How It Works

All three files follow the standard WebGL pipeline:

1. **JS Setup:** Create a `<canvas>`, get the `webgl` context, and compile the Vertex and Fragment shaders.
2. **Buffers:** Pass vertex positions (`Float32Array`) and colors to the GPU using `gl.createBuffer()` and `gl.bufferData()`.
3. **Linking:** Bind the buffers to the shader attributes (`pos` and `color`) via `gl.vertexAttribPointer`.
4. **Rendering:** Execute `gl.drawArrays()`. The GPU takes over from here.

### Shader Magic: Color Interpolation
In `test.html`, the colors are defined as Red, Green, and Blue at the three corners. We use a `varying` variable (`varying vec3 fColor`) in the Vertex Shader. This passes the color data to the Fragment Shader. The GPU automatically blends (interpolates) the colors across the surface of the triangle, creating the rainbow effect.

### Shader Magic: Rotation (main.js)
In `main.js`, the shape is rotated by 0.3 radians. Instead of doing this in JavaScript, the math is done on the GPU in the Vertex Shader:
```glsl
gl_Position = vec4(
    pos.x * cos(0.3) - pos.y * sin(0.3),
    pos.y * cos(0.3) + pos.x * sin(0.3),
    0.0, 
    1.0
);
