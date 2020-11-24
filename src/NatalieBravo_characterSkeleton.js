//Natalie Bravo, 201735021

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
  var keyboard = new KeyboardState();

  // Show world axes
  var axesHelper = new THREE.AxesHelper(12);
  axesHelper.translateY(-4.1);
  scene.add(axesHelper);

  var groundPlane = createGroundPlane(23, 23); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.translateZ(-4.1);
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);


  var mat4 = new THREE.Matrix4();

  showInformation();

  // torso
  var lowerJoin = createSphere(radius=0.25, widthSegments=32, heightSegments=32, color="rgb(255,0,50)");
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
  var c9 = createCone();
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
  var c12 = createCone();
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
          "c1": {"mesh":c1, "angle": 0},
          "c2": {"mesh":c2, "angle": 0},
          "neck": {"mesh":neck, "angle": 0}
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
            "c1": {"mesh":c3, "angle": 80},
            "c2": {"mesh":c4, "angle": 0}, 
            "c3": {"mesh": c5, "angle": 0}
          }
        },
        "leg":{
          "spheres": {
            "hip": hipD,
            "knee": kneeD,
            "ankle": ankleD
          },
          "cones": {
            "c1": {"mesh":c12, "angle": 60.3},
            "c2": {"mesh": c13, "angle": 0},
            "c3": {"mesh": c14,  "angle": 0} 
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
            "c1": {"mesh":c6, "angle": -80},
            "c2": {"mesh": c7, "angle": 0}, 
            "c3": {"mesh": c8, "angle": 0}
          }
        },
        "leg":{
          "spheres": {
            "hip": hipE,
            "knee": kneeE,
            "ankle": ankleE
          },
          "cones": {
            "c1": {"mesh":c9, "angle": -60.3},
            "c2": {"mesh": c10, "angle": 0}, //0.4
            "c3": {"mesh": c11, "angle": 0} //-100.3
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


  let chosenSide = {"side": skeleton.rightSide, "sideName": "skeleton.rightSide"};

  let member = (side, bodyPart) => {
    let obj = side;
    bodyPart.split(".").forEach(prop => {
      obj = obj[prop];
    });
    return obj;
  };
  
  let chosenMember = {
    "member": member(chosenSide.side,"arm.cones.c2"),
    "bodyPart": "arm.cones.c2"
  };
  
  function keyboardUpdate() {

    keyboard.update();
    let limit = {
      "arm.cones.c2": degreesToRadians(210), //ombro
      "arm.cones.c3": degreesToRadians(150), //cotovelo
      "leg.cones.c2": degreesToRadians(180), //perna
      "leg.cones.c2": degreesToRadians(90), //perna
      "leg.cones.c3": degreesToRadians(150), //joelho
    }

  	if ( keyboard.down("right") )  {
      angle = chosenMember.member.angle + -1 * degreesToRadians(20);
      chosenMember.member.angle = (angle >=-limit[chosenMember.bodyPart]) ? angle : -limit[chosenMember.bodyPart];
      
    } 
  	if ( keyboard.down("left") ) {
      angle = chosenMember.member.angle + degreesToRadians(20);
      chosenMember.member.angle = (angle<=limit[chosenMember.bodyPart]) ? angle : limit[chosenMember.bodyPart];
      
    }
    if ( keyboard.down("up") ){
      angle = chosenMember.member.angle + degreesToRadians(20);
      chosenMember.member.angle = (angle<=limit[chosenMember.bodyPart]) ? angle : limit[chosenMember.bodyPart];
    }
  	if ( keyboard.down("down") ){
      angle = chosenMember.member.angle + -1 * degreesToRadians(20);
      chosenMember.member.angle = (angle >=-limit[chosenMember.bodyPart]) ? angle : -limit[chosenMember.bodyPart];
    }

  	if ( keyboard.pressed("1") ) { 
      let bodyPart = "arm.cones.c2"; //ombro
      chosenMember.member = member(chosenSide.side, bodyPart);
      chosenMember.bodyPart = bodyPart;
    }
  	if ( keyboard.pressed("2") ) { 
      let bodyPart = "arm.cones.c3"; //cotovelo
      chosenMember.member = member(chosenSide.side, bodyPart);
      chosenMember.bodyPart = bodyPart;
    }
    if ( keyboard.pressed("3") ) {
      let bodyPart ="leg.cones.c2"; //perna
      chosenMember.member = member(chosenSide.side, bodyPart);
      chosenMember.bodyPart = bodyPart;
    }
  	if ( keyboard.pressed("4") ) { 
      let bodyPart = "leg.cones.c3"; //joelho
      chosenMember.member = member(chosenSide.side, bodyPart);
      chosenMember.bodyPart = bodyPart;

    }

    if ( keyboard.down("space") ){
      
      if(chosenSide.sideName === "skeleton.rightSide"){
        chosenSide.side =  skeleton.leftSide;
        chosenSide.sideName = "skeleton.leftSide";
        chosenMember = {...chosenMember, "member": member(chosenSide.side, chosenMember.bodyPart)};
      } else{
        chosenSide.side =  skeleton.rightSide;
        chosenSide.sideName = "skeleton.rightSide";
        chosenMember = {...chosenMember, "member": member(chosenSide.side, chosenMember.bodyPart)};
      }
      // keyboardUpdate();
    }

    rotateAll(skeleton);
  }

  
                                                                                                                                                                                                                                                                                                                                                                                                                                       
  function buildInterface() {
    var controls = new (function () {
      //arms
      this.rightShoulder = skeleton.rightSide.arm.cones.c2.angle;
      this.rightElbow = skeleton.rightSide.arm.cones.c3.angle;
      this.leftShoulder = skeleton.leftSide.arm.cones.c2.angle;
      this.leftElbow =  skeleton.leftSide.arm.cones.c3.angle;
      //legs
      this.rightLeg = skeleton.rightSide.leg.cones.c2.angle;
      this.rightKnee = skeleton.rightSide.leg.cones.c3.angle;
      this.leftLeg = skeleton.leftSide.leg.cones.c2.angle;
      this.leftKnee = skeleton.leftSide.leg.cones.c3.angle;

      this.rotate = function (val = 1, val1 =1) {
        skeleton.rightSide.arm.cones.c2.angle = val * degreesToRadians(this.rightShoulder);
        skeleton.rightSide.arm.cones.c3.angle = degreesToRadians(this.rightElbow);
        skeleton.leftSide.arm.cones.c2.angle = val1 * degreesToRadians(this.leftShoulder);
        skeleton.leftSide.arm.cones.c3.angle = degreesToRadians(this.leftElbow);

        skeleton.rightSide.leg.cones.c2.angle = degreesToRadians(this.rightLeg);
        skeleton.rightSide.leg.cones.c3.angle = degreesToRadians(this.rightKnee);
        skeleton.leftSide.leg.cones.c2.angle = degreesToRadians(this.leftLeg);
        skeleton.leftSide.leg.cones.c3.angle = degreesToRadians(this.leftKnee);

        rotateAll(skeleton);
      };
    })();
    // GUI interface
    var gui = new dat.GUI();

    var button = { reset: function(){ 
      createSkeleton(); 
    }};
    gui.add(button, 'reset').name("Reset");


    var folder = gui.addFolder("Braço Direito");
    folder
    .add(controls, "rightShoulder", 0, 210)
    .onChange(function (e) {controls.rotate();})
    .name("Right Shoulder Down");
    
    folder
    .add(controls, "rightShoulder", 0, 210)
    .onChange(function (e) {controls.rotate(-1, 1);})
    .name("Right Shoulder Up");

    folder
    .add(controls, "rightElbow", 0, 150)
    .onChange(function (e) {controls.rotate();})
    .name("Right Elbow");



    var folder = gui.addFolder("Braço Esquerdo");
    folder
    .add(controls, "leftShoulder", 0, 210)
    .onChange(function (e) {controls.rotate();})
    .name("Left Shoulder Down");

    folder
    .add(controls, "leftShoulder", 0, 210)
    .onChange(function (e) {controls.rotate(1, -1);})
    .name("Left Shoulder Up");
    
    folder
    .add(controls, "leftElbow", 0, 150)
    .onChange(function (e) {controls.rotate();})
    .name("Left Elbow");




    var folder = gui.addFolder("Perna Direita");
    folder
    .add(controls, "rightLeg", 0, 180)
    .onChange(function (e) {controls.rotate();})
    .name("Right Leg Front");

    folder
    .add(controls, "rightLeg", 0, 90)
    .onChange(function (e) {controls.rotate();})
    .name("Right Leg Side");
    
    folder
    .add(controls, "rightKnee", 0, 150)
    .onChange(function (e) {controls.rotate();})
    .name("Right Knee");


    var folder = gui.addFolder("Perna Esquerda");
    folder
    .add(controls, "leftLeg", 0, 90)
    .onChange(function (e) {controls.rotate();})
    .name("Left Leg Side");

    folder
    .add(controls, "leftLeg", 0, 180)
    .onChange(function (e) {controls.rotate();})
    .name("Left Leg Front");
    
    folder
    .add(controls, "leftKnee", 0, 150)
    .onChange(function (e) {controls.rotate();})
    .name("Left Knee");
  }

  function showInformation()
  {
    // Use this to show information onscreen
    controls = new InfoBox();
      controls.add("Keyboard commands");
      controls.addParagraph();
      controls.add("Press 1,2,3 or 4 to select a member");
      controls.add("Press space to alternate side");
      controls.add("Press arrow keys to move");
      controls.show();
  }

  function render() {
    stats.update(); // Update FPS
    trackballControls.update();
    keyboardUpdate();
    rotateAll(skeleton);
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
