//Natalie Bravo, 201735021

Myround = function(number, precision) {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

function main() {
  var stats = initStats(); // To show FPS information
  var scene = new THREE.Scene(); // Create main scene
  var renderer = initRenderer(); // View function in util/utils
  
  var camera = initCamera(new THREE.Vector3(15, 15, 15)); // Init camera in this position

  var light = initDefaultLighting(scene, new THREE.Vector3(7, 7, 7));

  var trackballControls = new THREE.TrackballControls(
    camera,
    renderer.domElement
  );

  // Show world axes
  var axesHelper = new THREE.AxesHelper(12);
  axesHelper.translateY(-4.1);
  axesHelper.visible = false;
  scene.add(axesHelper);

  var groundPlane = createGroundPlane(23, 23); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.translateZ(-4.07);
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);

  var mat4 = new THREE.Matrix4();
  var walkAnimationOn = true;
  var stop = false;

  class movementAngle {
    constructor(minAngle, maxAngle){
      this.maxAngle = maxAngle;
      this.minAngle = minAngle;
      this.angleOld = minAngle;
      this.angleNow = 0;
    }

    toFront(){
      if(this.angleNow <= this.maxAngle && this.angleOld == this.minAngle){
        this.angleNow += degreesToRadians(1);
      } else{
        this.angleOld = this.maxAngle;
      }
    }

    toBack() {
      if(this.angleNow >= this.minAngle && this.angleOld == this.maxAngle){
        this.angleNow -= degreesToRadians(1);
      } else{
        this.angleOld = this.minAngle;
      }
    }

    move(){
      if(!(stop && Myround(this.angleNow, 1) == 0.0)){
        this.toFront();
        this.toBack();
      }
    }
  };

  let skeletonMovement = {
    "rightSide":{
      "arm":{
        "c2": new movementAngle(degreesToRadians(-42), degreesToRadians(42)),
        "c3": new movementAngle(degreesToRadians(-12), degreesToRadians(47)),
      },
      "leg":{
        "c2": new movementAngle(degreesToRadians(-42), degreesToRadians(42)),
        "c3": new movementAngle(degreesToRadians(-28.6), 0),
      }
    },
    "leftSide":{
      "arm":{
        "c2": new movementAngle(degreesToRadians(-42), degreesToRadians(42)),
        "c3": new movementAngle(degreesToRadians(-12), degreesToRadians(47)),
      },
      "leg":{
        "c2": new movementAngle(degreesToRadians(-42), degreesToRadians(42)),
        "c3": new movementAngle(degreesToRadians(-28.6), 0),
      }
    },
  };
  var cones = [...findProp(skeletonMovement, "arm"), ...findProp(skeletonMovement, "leg")];
  

  // torso
  var lowerJoin = createSphere(radius=0.35, widthSegments=32, heightSegments=32, color="rgb(255,0,50)");
  scene.add(lowerJoin);
  lowerJoin.translateZ(10.0);

  var c1 = createCone();
  lowerJoin.add(c1);
  var midJoin = createSphere();
  c1.add(midJoin);

  var c2 = createCone();
  midJoin.add(c2);
  var upperJoin = createSphere();
  c2.add(upperJoin);

  var neck = createCone();
  upperJoin.add(neck);
  var headJoin = createSphere();
  neck.add(headJoin);

  // arms
  // direito
  var c3 = createCone();
  upperJoin.add(c3);
  var shoulder = createSphere();
  c3.add(shoulder);

  var c4 = createCone();
  shoulder.add(c4);
  var elbow = createSphere();
  c4.add(elbow);

  var c5 = createCone();
  elbow.add(c5);
  var fist = createSphere();
  c5.add(fist);

  // arms
  // esquerdo
  var c6 = createCone();
  upperJoin.add(c6);
  var shoulderE = createSphere();
  c6.add(shoulderE);

  var c7 = createCone();
  shoulderE.add(c7);
  var elbowE = createSphere();
  c7.add(elbowE);

  var c8 = createCone();
  elbowE.add(c8);
  var fistE = createSphere();
  c8.add(fistE);

  // legs
  // esquerdo
  var c9 = createCone(radius=0.15, height=2.0, radialSegment=25, color="rgb(100,255,100)");
  lowerJoin.add(c9);
  var hipE = createSphere();
  c9.add(hipE);

  var c10 = createCone();
  hipE.add(c10);
  var kneeE = createSphere();
  c10.add(kneeE);

  var c11 = createCone();
  kneeE.add(c11);
  var ankleE = createSphere();
  c11.add(ankleE);

  // legs
  // direita
  var c12 = createCone(radius=0.15, height=2.0, radialSegment=25, color="rgb(100,255,100)");
  lowerJoin.add(c12);
  var hipD = createSphere();
  c12.add(hipD);

  var c13 = createCone();
  hipD.add(c13);
  var kneeD = createSphere();
  c13.add(kneeD);

  var c14 = createCone();
  kneeD.add(c14);
  var ankleD = createSphere();
  c14.add(ankleD);

  

  var skeleton = {}
  createSkeleton();

  function createSkeleton(){
    skeleton = {
      "torso": {
        "spheres":{
          "midJoin": midJoin, 
          "upperJoin": upperJoin,
          "headJoin": headJoin,
          "lowerJoin": lowerJoin
        },
        "cones": {
          "c1": {"mesh":c1, "angle": degreesToRadians(0)},
          "c2": {"mesh":c2, "angle": degreesToRadians(0)},
          "neck": {"mesh":neck, "angle": degreesToRadians(0)}
        }      
      },
      "rightSide":{
        "arm":{
          "spheres": {
            "shoulder": shoulder,
            "elbow": elbow,
            "fist": fist
          },
          "cones": {
            "c1": {"mesh":c3, "angle": degreesToRadians(95)},
            "c2": {"mesh":c4, "angle": degreesToRadians(90)}, 
            "c3": {"mesh": c5, "angle": degreesToRadians(10)}
          }
        },
        "leg":{
          "spheres": {
            "hip": hipD,
            "knee": kneeD,
            "ankle": ankleD
          },
          "cones": {
            "c1": {"mesh":c12, "angle": degreesToRadians(120)}, //160
            "c2": {"mesh": c13, "angle": degreesToRadians(50)}, // 0
            "c3": {"mesh": c14,  "angle": degreesToRadians(10)} 
          }
        }
      },
      "leftSide":{
        "arm":{
          "spheres": {
            "shoulder": shoulderE,
            "elbow": elbowE,
            "fist": fistE
          },
          "cones": {
            "c1": {"mesh":c6, "angle": degreesToRadians(-95)},
            "c2": {"mesh": c7, "angle": degreesToRadians(-90)}, 
            "c3": {"mesh": c8, "angle": degreesToRadians(0)}
          }
        },
        "leg":{
          "spheres": {
            "hip": hipE,
            "knee": kneeE,
            "ankle": ankleE
          },
          "cones": {
            "c1": {"mesh":c9, "angle": degreesToRadians(-120)},
            "c2": {"mesh": c10, "angle": degreesToRadians(-50)}, 
            "c3": {"mesh": c11, "angle": degreesToRadians(-10)} 
          }
        },
      }    
    }
  }

  // Listen window size changes
  window.addEventListener(
    "resize",
    function () {
      onWindowResize(camera, renderer);
    },
    false
  );

  buildInterface();
  render();

  function rotateSphere(...spheres){
    spheres.map(sphere => {
      sphere.matrixAutoUpdate = false;
      sphere.matrix.identity();

      // Just need to translate the sphere to the right position
      sphere.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
    });
  }

  function rotateCone(...cones){
    cones.map(cone => {
      cone.mesh.matrixAutoUpdate = false;
      cone.mesh.matrix.identity();
      
      // Will execute T and then R
      cone.mesh.matrix.multiply(mat4.makeRotationZ(cone.angle)); // R
      cone.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); // T
    
    });
  }
    
  function findProp (obj, prop) {
    let result = [];
    const find = (obj, prop) => {
      Object.entries(obj).reduce((a, [key, val]) => {
        if (a) result = result.concat(Object.values(a));
        if (key === prop) result = result.concat(Object.values(val));
        //console.log(key)
        if (typeof val === 'object' && !val.hasOwnProperty('mesh') && !(val instanceof THREE.Mesh)) find(val, prop);
      }, null);
    }
    find(obj, prop);
    return result;
  }

  //console.log(findProp(skeleton, 'spheres'));

  function rotateAll(skeleton) {
    var joins = findProp(skeleton, 'spheres');
    let cones = findProp(skeleton, 'cones');

    rotateSphere(...joins);
    rotateCone(...cones);
  } 


  

  function animateWalk(skeleton){

    let rightArm1 = skeleton.rightSide.arm.cones.c2;
    let rightArm2 = skeleton.rightSide.arm.cones.c3;
    let rightLeg1 = skeleton.rightSide.leg.cones.c2;
    let rightLeg2 = skeleton.rightSide.leg.cones.c3;
    let leftArm1 = skeleton.leftSide.arm.cones.c2;
    let leftArm2 = skeleton.leftSide.arm.cones.c3;
    let leftLeg1 = skeleton.leftSide.leg.cones.c2;
    let leftLeg2 = skeleton.leftSide.leg.cones.c3;
  
    rightArm1.matrixAutoUpdate = false;
    rightArm2.matrixAutoUpdate = false;
    rightLeg1.matrixAutoUpdate = false;
    rightLeg2.matrixAutoUpdate = false;
    leftArm1.matrixAutoUpdate = false;
    leftArm2.matrixAutoUpdate = false;
    leftLeg1.matrixAutoUpdate = false;
    leftLeg2.matrixAutoUpdate = false;

    if(walkAnimationOn){

      cones.forEach(cone => cone.move());

      rightArm1.mesh.matrix.identity();
      rightArm2.mesh.matrix.identity();
      rightLeg1.mesh.matrix.identity();
      rightLeg2.mesh.matrix.identity();
      leftArm1.mesh.matrix.identity();
      leftArm2.mesh.matrix.identity();
      leftLeg1.mesh.matrix.identity();
      leftLeg2.mesh.matrix.identity();
  
      // movimento de rotação
      rightArm1.mesh.matrix.multiply(mat4.makeRotationY(cones[0].angleNow));
      rightArm2.mesh.matrix.multiply(mat4.makeRotationX(cones[1].angleNow));

      leftArm1.mesh.matrix.multiply(mat4.makeRotationY(cones[2].angleNow));
      leftArm2.mesh.matrix.multiply(mat4.makeRotationX(cones[3].angleNow)); 

      rightLeg1.mesh.matrix.multiply(mat4.makeRotationY(-cones[4].angleNow));
      rightLeg2.mesh.matrix.multiply(mat4.makeRotationX(cones[5].angleNow));

      leftLeg1.mesh.matrix.multiply(mat4.makeRotationX(cones[6].angleNow));
      leftLeg2.mesh.matrix.multiply(mat4.makeRotationX(cones[7].angleNow));
      


      //posicionamento do cone
      rightArm1.mesh.matrix.multiply(mat4.makeRotationZ(rightArm1.angle));
      rightArm1.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      rightArm2.mesh.matrix.multiply(mat4.makeRotationX(degreesToRadians(10)));
      rightArm2.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      leftArm1.mesh.matrix.multiply(mat4.makeRotationZ(leftArm1.angle));
      leftArm1.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      leftArm2.mesh.matrix.multiply(mat4.makeRotationX(degreesToRadians(10)));
      leftArm2.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));


      rightLeg1.mesh.matrix.multiply(mat4.makeRotationZ(rightLeg1.angle));
      rightLeg1.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      rightLeg2.mesh.matrix.multiply(mat4.makeRotationX(degreesToRadians(-10)));
      rightLeg2.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      leftLeg1.mesh.matrix.multiply(mat4.makeRotationZ(leftLeg1.angle));
      leftLeg1.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

      leftLeg2.mesh.matrix.multiply(mat4.makeRotationX(degreesToRadians(-10)));
      leftLeg2.mesh.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
    }
  } 
  
  
  
  function buildInterface() {
    var controls = {
      start: () => {
        console.log("start");
        walkAnimationOn = true;
        stop = false;
      },
      stop: () => {
        console.log("stop");
        stop = true;
        //rotateAll(skeleton);
      },
      pause: () => {
        console.log("pause");
        walkAnimationOn = !walkAnimationOn;
        stop = false;
      },
      viewAxes: () => {
        axesHelper.visible = !axesHelper.visible;
      }
    };

    // GUI interface
    var gui = new dat.GUI();
    var folder = gui.addFolder("Actions");
    folder
    .add(controls, "start", true)
    .name("Start");
    
    folder
    .add(controls, "stop", false)
    .name("Stop");

    folder
    .add(controls, "pause", false)
    .name("Pause");

    folder.open();
    gui.add(controls, "viewAxes").name("View Axes");
  }

  rotateAll(skeleton);

  function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    animateWalk(skeleton)
    lightFollowingCamera(light, camera);
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera); // Render scene
  }
}

function createSphere(radius=0.2, widthSegments=32, heightSegments=32, color="rgb(180,180,255)") {
  var sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: color,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.receiveShadow = true;
  sphere.castShadow = true;
  return sphere;
}

function createCone(radius=0.15, height=2.0, radialSegment=25, color="rgb(100,255,100)") {
  var coneGeometry = new THREE.ConeGeometry(radius, height, radialSegment);
  var coneMaterial = new THREE.MeshPhongMaterial({ color: color });
  var cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.receiveShadow = true;
  cone.castShadow = true;
  return cone;
}

