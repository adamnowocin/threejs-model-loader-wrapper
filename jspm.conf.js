System.config({
  baseURL: "",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "threejs": {
      "map": {
        "./loaders/OBJLoader": "./examples/js/loaders/OBJLoader.js",
        "./loaders/MTLLoader": "./examples/js/loaders/MTLLoader.js",
        "./controls/OrbitControls": "./examples/js/controls/OrbitControls.js",
        "./renderers/Projector": "./examples/js/renderers/Projector.js",
        "./renderers/CanvasRenderer": "./examples/js/renderers/CanvasRenderer.js"
      },
      "meta": {
        "examples/js/loaders/OBJLoader.js": {
          "globals": {
            "THREE": "threejs"
          },
          "exports": "THREE.OBJLoader",
          "format": "global"
        },
        "examples/js/loaders/MTLLoader.js": {
          "globals": {
            "THREE": "threejs"
          },
          "exports": "THREE.MTLLoader",
          "format": "global"
        },
        "examples/js/controls/OrbitControls.js": {
          "globals": {
            "THREE": "threejs"
          },
          "exports": "THREE.OrbitControls",
          "format": "global"
        },
        "examples/js/renderers/Projector.js": {
          "globals": {
            "THREE": "threejs"
          },
          "exports": "THREE.Projector",
          "format": "global"
        },
        "examples/js/renderers/CanvasRenderer.js": {
          "globals": {
            "THREE": "threejs"
          },
          "exports": "THREE.CanvasRenderer",
          "format": "global"
        }
      }
    }
  },

  map: {
    "threejs": "github:mrdoob/three.js@master",
    "typescript": "npm:typescript@1.8.10",
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
