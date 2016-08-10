# treejs-model-loader-wrapper
> Simple wrapper for tree.js OBJ model loader

## Usage

```javascript
 <div id="main" style="width: 800px; height: 600px;"></div>
 <script src="dist/index.js"></script>
 <script>
     window.modelLoader.load3D(
             document.getElementById('main'),
             {
                 cameraX: 100,
                 cameraY: 100,
                 cameraZ: 200,
                 ambientLight: 0x555555,
                 directionalLight: 0x888888,
                 ambientLightStrength: 1,
                 directionalLightStrength: 1.5,
             },
             [
                 {
                     options: {
                         x: 50,
                         y: 50,
                         z: 0,
                         scale: 50,
                         rotateX: 0,
                         rotateY: 45,
                         rotateZ: 0
                     },
                     model: 'example/cube.obj',
                     material: 'example/cube.mtl',
                     texture: 'example/cube.jpg'
                 },
                 {
                     options: {x: -50, scale: 30},
                     model: 'example/cube.obj',
                     texture: 'example/cube.jpg'
                 }
             ]
     );
 
 </script>
```

## License

**treejs-model-loader-wrapper** is licensed under the [MIT license](http://opensource.org/licenses/MIT).
For the full license, see the `LICENSE` file.
