/* global define, window, document, console, requestAnimationFrame */

define(
  [
    'threejs',
    'threejs/loaders/OBJLoader',
    'threejs/loaders/MTLLoader',
    'threejs/controls/OrbitControls',
    'threejs/renderers/Projector',
    'threejs/renderers/CanvasRenderer'

  ],
  function (three) {

    var camera, scene, renderer;
    var directionalLight;

    window.THREE = three;

    function loadModelWithTexture(scene, animate, options, modelSrc, textureSrc, materialSrc) {

      var manager = new three.LoadingManager();

      function loadModel(texture, materials) {
        var loader = new three.OBJLoader(manager);

        if (materials) {
          loader.setMaterials(materials);
        }

        loader.load(modelSrc, function (object) {

          object.traverse(function (child) {
            if (child instanceof three.Mesh) {
              if (textureSrc) {
                child.material.map = texture;
              }
              child.material.side = THREE.DoubleSide;
              child.geometry.computeFaceNormals();
              child.geometry.computeVertexNormals();
              child.scale.set(options.scale || 1, options.scale || 1, options.scale || 1);
            }
          });

          object.position.x = options.x || 0;
          object.position.y = options.y || 0;
          object.position.z = options.z || 0;
          object.rotateX(options.rotateX || 0);
          object.rotateY(options.rotateY || 0);
          object.rotateZ(options.rotateZ || 0);

          scene.add(object);
          animate();
        });
      }

      // texture
      var texture = new three.Texture();

      if (textureSrc) {
        var loader = new three.ImageLoader(manager);
        loader.load(textureSrc, function (image) {
          texture.image = image;
          texture.needsUpdate = true;
        });
      }

      // model
      if (materialSrc) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load(materialSrc, function (materials) {
          materials.preload();
          loadModel(texture, materials);
        });
      } else {
        loadModel(texture);
      }

    }

    function load3D(container, opt, modelsArray) {

      var options = opt || {};
      var models = modelsArray || [];

      var elementWidth = container.offsetWidth;
      var elementHeight = container.offsetHeight;

      camera = new three.PerspectiveCamera(55, elementWidth / elementHeight, 1, 2000);
      camera.position.x = options.cameraX || 0;
      camera.position.y = options.cameraY || 0;
      camera.position.z = options.cameraZ || 0;

      var controls = new three.OrbitControls(camera, container);
      controls.addEventListener('change', render);

      // scene

      scene = new three.Scene();

      var ambient = new three.AmbientLight(options.ambientLight || 0x333333, options.ambientLightStrength || 1);
      scene.add(ambient);

      directionalLight = new three.DirectionalLight(options.directionalLight || 0xAAAAAA, options.directionalLightStrength || 1.5);
      directionalLight.position.set(options.cameraX, options.cameraY, options.cameraZ).normalize();
      scene.add(directionalLight);


      // models
      for (var i in models) {
        if (models.hasOwnProperty(i)) {
          loadModelWithTexture(
            scene,
            animate,
            models[i].options,
            models[i].model,
            models[i].texture,
            models[i].material
          );
        }
      }

      renderer = new three.WebGLRenderer({alpha: true});
      //renderer = new three.CanvasRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(elementWidth, elementHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      directionalLight.position.x = camera.position.x;
      directionalLight.position.y = camera.position.y;
      directionalLight.position.z = camera.position.z;
      renderer.render(scene, camera);
    }

    window.modelLoader = {
      load3D: load3D
    };

    return window.modelLoader;
  }
);