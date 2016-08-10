/* global define, window, requestAnimationFrame */

define(['threejs', 'threejs/loaders/OBJLoader', 'threejs/loaders/MTLLoader', 'threejs/controls/OrbitControls',
    'threejs/renderers/Projector', 'threejs/renderers/CanvasRenderer'],
  function (three) {

    var camera, scene, renderer, directionalLight;
    window.THREE = three;

    function animate() {
      if(window.requestAnimationFrame) {
        requestAnimationFrame(animate);
      }
      render();
    }

    function render() {
      directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z);
      renderer.render(scene, camera);
    }

    function loadModelWithTexture(options, modelSrc, textureSrc, materialSrc) {
      var manager = new three.LoadingManager();

      function loadModel(texture, materials) {
        var loader = new three.OBJLoader(manager);

        if (materials) {
          loader.setMaterials(materials);
        }

        loader.load(modelSrc, function (object) {
          object.traverse(function (child) {
            if (child instanceof three.Mesh) {
              child.material.map = textureSrc ? texture : child.material.map;
              child.material.side = three.DoubleSide;
              child.scale.set(options.scale || 1, options.scale || 1, options.scale || 1);
            }
          });

          object.position.set(options.x || 0, options.y || 0, options.z || 0);
          object.rotateX((options.rotateX || 0) * Math.PI / 180);
          object.rotateY((options.rotateY || 0) * Math.PI / 180);
          object.rotateZ((options.rotateZ || 0) * Math.PI / 180);

          scene.add(object);
          animate();
        });
      }

      var texture = new three.Texture();

      if (textureSrc) {
        var loader = new three.ImageLoader(manager);
        loader.load(textureSrc, function (image) {
          texture.image = image;
          texture.needsUpdate = true;
        });
      }

      if (materialSrc) {
        var mtlLoader = new three.MTLLoader();
        mtlLoader.load(materialSrc, function (materials) {
          materials.preload();
          loadModel(texture, materials);
        });
      } else {
        loadModel(texture);
      }
    }

    window.load3D = function (container, opt, modelsArray) {

      if (!container || !container.offsetWidth) {
        return;
      }

      var options = opt || {};
      var models = modelsArray || [];
      var containerWidth = container.offsetWidth;
      var containerHeight = container.offsetHeight;

      camera = new three.PerspectiveCamera(55, containerWidth / containerHeight, 1, 2000);
      camera.position.set(options.cameraX || 0, options.cameraY || 0, options.cameraZ || 0);

      var controls = new three.OrbitControls(camera, container);
      controls.addEventListener('change', render);

      var ambient = new three.AmbientLight(options.ambientLight || 0x333333, options.ambientLightStrength || 1);
      directionalLight = new three.DirectionalLight(options.directionalLight || 0xAAAAAA, options.directionalLightStrength || 1.5);
      directionalLight.position.set(options.cameraX, options.cameraY, options.cameraZ);

      scene = new three.Scene();
      scene.add(ambient);
      scene.add(directionalLight);

      for (var i in models) {
        if (models.hasOwnProperty(i)) {
          loadModelWithTexture(
            models[i].options,
            models[i].model,
            models[i].texture,
            models[i].material
          );
        }
      }

      renderer = new three.WebGLRenderer({alpha: true});
      //renderer = new three.CanvasRenderer();
      renderer.setPixelRatio(window.devicePixelRatio||1);
      renderer.setSize(containerWidth, containerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    };

    return window.load3D;
  }
);