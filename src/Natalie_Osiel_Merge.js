 class Skeleton{
   constructor(x,z){
      this.position = {x: x, y: 1.05, z: z};

      //torso
      this.lowerJoin = Helper.createSphere(0.35, 32, 32, "rgb(255,0,50)");
      //scene.add(lowerJoin);

      Helper.resetObjectMatrix(this.lowerJoin);
      Helper.setSpherePosition(this.lowerJoin, this.position.x, this.position.y, this.position.z);

      var c1 = Helper.createCone(0.15, 2.0, 25, "rgb(0,0,180)");
      this.lowerJoin.add(c1);
      Helper.resetObjectMatrix(c1);
      Helper.setConePosition(c1,0);

      var midJoin = Helper.createSphere();
      c1.add(midJoin);
      Helper.resetObjectMatrix(midJoin);
      Helper.setSpherePosition(midJoin);

      var c2 = Helper.createCone();
      midJoin.add(c2);
      Helper.resetObjectMatrix(c2);
      Helper.setConePosition(c2,0);


      var upperJoin = Helper.createSphere();
      c2.add(upperJoin);
      Helper.resetObjectMatrix(upperJoin);
      Helper.setSpherePosition(upperJoin);


      var neck = Helper.createCone();
      upperJoin.add(neck);
      Helper.resetObjectMatrix(neck);
      Helper.setConePosition(neck,0);


      var headJoin = Helper.createSphere();
      neck.add(headJoin);
      Helper.resetObjectMatrix(headJoin);
      Helper.setSpherePosition(headJoin, 0.0, 0.8, 0.0);

      /* ARM */
      // direito
      var c3 = Helper.createCone(0.15, 0.7, 25, "rgb(0,0,180)");
      upperJoin.add(c3);
      Helper.resetObjectMatrix(c3);
      Helper.setConePosition(c3,degreesToRadians(100), 0.0, 0.35, 0.0);

      var shoulder = Helper.createSphere();
      c3.add(shoulder);
      Helper.resetObjectMatrix(shoulder);
      Helper.setSpherePosition(shoulder, 0.0, 0.5, 0.0);

      var c4 = Helper.createCone();
      shoulder.add(c4);
      Helper.resetObjectMatrix(c4);
      Helper.setConePosition(c4,degreesToRadians(75));

      var elbow = Helper.createSphere();
      c4.add(elbow);
      Helper.resetObjectMatrix(elbow);
      Helper.setSpherePosition(elbow);

      var c5 = Helper.createCone();
      elbow.add(c5);
      Helper.resetObjectMatrix(c5);
      Helper.setConePosition(c5,degreesToRadians(0));

      var fist = Helper.createSphere();
      c5.add(fist);
      Helper.resetObjectMatrix(fist);
      Helper.setSpherePosition(fist);

      // arms
      // esquerdo
      var c6 = Helper.createCone(0.15, 0.7, 25, "rgb(0,0,180)");
      upperJoin.add(c6);
      Helper.resetObjectMatrix(c6);
      Helper.setConePosition(c6,degreesToRadians(-100), 0.0, 0.35, 0.0);

      var shoulderE = Helper.createSphere();
      c6.add(shoulderE);
      Helper.resetObjectMatrix(shoulderE);
      Helper.setSpherePosition(shoulderE, 0.0, 0.5, 0.0);

      var c7 = Helper.createCone();
      shoulderE.add(c7);
      Helper.resetObjectMatrix(c7);
      Helper.setConePosition(c7,degreesToRadians(-75));

      var elbowE = Helper.createSphere();
      c7.add(elbowE);
      Helper.resetObjectMatrix(elbowE);
      Helper.setSpherePosition(elbowE);

      var c8 = Helper.createCone();
      elbowE.add(c8);
      Helper.resetObjectMatrix(c8);
      Helper.setConePosition(c8,degreesToRadians(0));

      var fistE = Helper.createSphere();
      c8.add(fistE);
      Helper.resetObjectMatrix(fistE);
      Helper.setSpherePosition(fistE);

      /* LEGS */
      //esquerda

      var c9 = Helper.createCone(0.15, 1.0, 25, "rgb(0,0,180)");
      this.lowerJoin.add(c9);
      Helper.resetObjectMatrix(c9);
      Helper.setConePosition(c9,degreesToRadians(-120), 0.0, 0.5, 0.0);

      var hipE = Helper.createSphere();
      c9.add(hipE);
      Helper.resetObjectMatrix(hipE);
      Helper.setSpherePosition(hipE, 0.0, 0.5, 0.0);

      var c10 = Helper.createCone(0.15, 3.0, 25, "rgb(0,0,180)");
      hipE.add(c10);
      Helper.resetObjectMatrix(c10);
      Helper.setConePosition(c10,degreesToRadians(-55), 0.0, 1.5, 0.0);

      var kneeE = Helper.createSphere();
      c10.add(kneeE);
      Helper.resetObjectMatrix(kneeE);
      Helper.setSpherePosition(kneeE, 0.0, 1.0, 0.0);

      var c11 = Helper.createCone(0.15, 2.5, 25, "rgb(0,0,180)");
      kneeE.add(c11);
      Helper.resetObjectMatrix(c11);
      Helper.setConePosition(c11,degreesToRadians(0), 0.0, 1.25, 0.0);


      var ankleE = Helper.createSphere();
      c11.add(ankleE);
      Helper.resetObjectMatrix(ankleE);
      Helper.setSpherePosition(ankleE, 0.0, 1.0, 0.0);

      /* LEGS */
      //esquerda

      var c12 = Helper.createCone(0.15, 1.0, 25, "rgb(0,0,180)");
      this.lowerJoin.add(c12);
      Helper.resetObjectMatrix(c12);
      Helper.setConePosition(c12,degreesToRadians(120), 0.0, 0.5, 0.0);

      var hipD = Helper.createSphere();
      c12.add(hipD);
      Helper.resetObjectMatrix(hipD);
      Helper.setSpherePosition(hipD, 0.0, 0.5, 0.0);

      var c13 = Helper.createCone(0.15, 3.0, 25, "rgb(0,0,180)");
      hipD.add(c13);
      Helper.resetObjectMatrix(c13);
      Helper.setConePosition(c13,degreesToRadians(55), 0.0, 1.5, 0.0);

      var kneeD = Helper.createSphere();
      c13.add(kneeD);
      Helper.resetObjectMatrix(kneeD);
      Helper.setSpherePosition(kneeD, 0.0, 1.0, 0.0);

      var c14 = Helper.createCone(0.15, 2.5, 25, "rgb(0,0,180)");
      kneeD.add(c14);
      Helper.resetObjectMatrix(c14);
      Helper.setConePosition(c14,degreesToRadians(0), 0.0, 1.25, 0.0);


      var ankleD = Helper.createSphere();
      c14.add(ankleD);
      Helper.resetObjectMatrix(ankleD);
      Helper.setSpherePosition(ankleD, 0.0, 1.0, 0.0);


      this.skeleton = {
        "torso": {
          "spheres":{
            "midJoin": midJoin, 
            "upperJoin": upperJoin,
            "headJoin": headJoin,
            "lowerJoin": this.lowerJoin
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
              "c1": {"mesh":c3, "angle": degreesToRadians(100)},
              "c2": {"mesh":c4, "angle": degreesToRadians(75)}, 
              "c3": {"mesh": c5, "angle": degreesToRadians(0)}
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
          }
        }    
      };
   }

   getSkeleton(){
    return this.lowerJoin;
   }

   getSkeletonObject(){
     return this.skeleton;
   }

 }

 class Helper{
  static mat4 = new THREE.Matrix4();

   static resetObjectMatrix(object){
    object.matrixAutoUpdate = false;
    object.matrix.identity();
  }
  
  static setSpherePosition(sphere, x=0.0, y=1.0, z=0.0){
    sphere.matrix.multiply(this.mat4.makeTranslation(x, y, z));
  }
  
  static setConePosition(cone, angle, x=0.0, y=1.0, z=0.0){
    cone.matrix.multiply(this.mat4.makeRotationZ(angle));
    cone.matrix.multiply(this.mat4.makeTranslation(x, y, z));
  }

  static createSphere(radius=0.2, widthSegments=32, heightSegments=32, color="rgb(180,180,255)") {
    var sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    var sphereMaterial = new THREE.MeshPhongMaterial({
      color: color,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    return sphere;
  }
  
  static createCone(radius=0.15, height=2.0, radialSegment=25, color="rgb(0,0,180)") {
    var coneGeometry = new THREE.ConeGeometry(radius, height, radialSegment);
    var coneMaterial = new THREE.MeshPhongMaterial({ color: color });
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.receiveShadow = true;
    cone.castShadow = true;
    return cone;
  }

  static createCylinder(radiusTop=0.5, radiusBottom=0.5, height=30.0, radialSegments=30.0)
  {
    var cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,255)'} );
    var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
      cylinder.castShadow = true;
      cylinder.receiveShadow = true;
    return cylinder;
  }
 }

 
 
 function main() {

  var stats = initStats(); 
  var scene = new THREE.Scene(); 
  var renderer = initRenderer(); 
  //initDefaultLighting(scene, new THREE.Vector3(-100, 5000, -150));
  //Iniciando camera em perspectiva
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 7, 0);
  camera.lookAt(new THREE.Vector3(0, 7, 0));
  scene.add(camera);

  //tela inicial
  const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0).normalize(), 0, 2);
  const controls = new THREE.PointerLockControls(camera, renderer.domElement);
  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');
  instructions.addEventListener('click', function () {

      controls.lock();

  }, false);
  
  controls.addEventListener('lock', function () {
      instructions.style.display = 'none';
       blocker.style.display = 'none';
  });
  
  controls.addEventListener('unlock', function () {
      blocker.style.display = 'block';
      instructions.style.display = '';
  });

  scene.add(controls.getObject());

  //Criando movimentação em primeira pessoa
  const speed = 20;
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;

  window.addEventListener('keydown', (event) => movementControls(event.keyCode, true));
  window.addEventListener('keyup', (event) => movementControls(event.keyCode, false));

  function movementControls(key, value) {
      switch (key) {
          case 87: // W
              moveForward = value;
              break;
          case 83: // S
              moveBackward = value;
              break;
          case 65: // A
              moveLeft = value;
              break;
          case 68: // D
              moveRight = value;
              break;
      }
  }

  function moveAnimate(delta) {
      raycaster.ray.origin.copy(controls.getObject().position);

      if (moveForward) {
          controls.moveForward(speed * delta);
      }
      else if (moveBackward) {
          controls.moveForward(speed * -1 * delta);
      }
      if (moveRight) {
          controls.moveRight(speed * delta);
      }
      else if (moveLeft) {
          controls.moveRight(speed * -1 * delta);
      }
  }

  //Eixos XYZ
  var axesHelper = new THREE.AxesHelper(12);
  axesHelper.translateY(-4.35);
  axesHelper.visible = true;
  //scene.add(axesHelper);

  //Carregando texturas para o solo
  var textureLoader = new THREE.TextureLoader();
  var sand = textureLoader.load('../assets/textures/areia2.jpg');

  //Criando solo e aplicando repetição de textura
  var groundPlane = createGroundPlane(1350, 1350); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.translateZ(-4.37);
  groundPlane.receiveShadow = true;
  groundPlane.castShadow = false;
  groundPlane.material.map = sand;
  groundPlane.material.map.repeat.set(2500,2500);
  groundPlane.material.map.wrapS = THREE.RepeatWrapping;
  groundPlane.material.map.wrapT =THREE.RepeatWrapping;
  groundPlane.material.map.minFilter =THREE.LinearFilter;
  groundPlane.material.map.magFilter =THREE.LinearFilter;
  scene.add(groundPlane);

  //Criando Array de texturas para a skybox
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( '../assets/textures/tras.png');
  let texture_bk = new THREE.TextureLoader().load( '../assets/textures/esq.png');
  let texture_up = new THREE.TextureLoader().load( '../assets/textures/ceu.png');
  let texture_dn = new THREE.TextureLoader().load( '../assets/textures/chao.png');
  let texture_rt = new THREE.TextureLoader().load( '../assets/textures/frente.png');
  let texture_lf = new THREE.TextureLoader().load( '../assets/textures/dir.png'); 
  
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk })); 
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  //Aplicando texturas as faces do cubo
  for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
  //criando skybox como boxGeometry com as texturas carregadas
  let skyboxGeo = new THREE.BoxGeometry( 550, 250, 550);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  skybox.translateY(15);
  skybox.castShadow = false;
  skybox.receiveShadow = false;
  scene.add( skybox );

  //Criando Luz direcional
  var colorLight = 0xffffff;
  var intensityLight = 1;
  dirLight = new THREE.DirectionalLight( colorLight, intensityLight );
  dirLight.position.set(-100, 250, -150);
  dirLight.castShadow = true;
  scene.add( dirLight );
  //Criando Sol
  //var sunPosition = new THREE.Vector3(170, 170, 170);
  //var sunSphere = createLightSphere(scene, 3.0, 10, 10, sunPosition);
  //var sun = textureLoader.load('../assets/textures/sun.jpg');
  //sunSphere.material.map = sun;
 
  //Criando postes
  //Poste 1
  var spherePosition = new THREE.Vector3(0, 15, 0);
  var c1 = Helper.createCylinder(0.5,0.5,30.0,30.0);
  scene.add(c1);
  c1.translateY(10.0).translateX(220.0);
  var s1 = createLightSphere(scene, 1.5,45,45, spherePosition);
  c1.add(s1);
  //Poste 2
  var c2 = Helper.createCylinder(0.5,0.5,30.0,30.0);
  scene.add(c2);
  c2.translateY(10.0).translateX(-220.0);
  var s2 =  createLightSphere(scene, 1.5,45,45, spherePosition);
  c2.add(s2);
  //Poste 3
  var c3 = Helper.createCylinder(0.5,0.5,30.0,30.0);
  scene.add(c3);
  c3.translateY(10.0).translateZ(220.0);
  var s3 =  createLightSphere(scene, 1.5,45,45, spherePosition);
  c3.add(s3);
  //Poste 4
  var c4 = Helper.createCylinder(0.5,0.5,30.0,30.0);
  scene.add(c4);
  c4.translateY(10.0).translateZ(-220.0);
  var s4 =  createLightSphere(scene, 1.5,45,45, spherePosition);
  c4.add(s4);

  //Colocando iluminação nos postes
  var lightColor = "rgb(255,255,255)";
  //poste 1
  var lightPosition1 = new THREE.Vector3(220, 30, 0);
  var pointLight1 = new THREE.PointLight(lightColor,1,100,0.2);
  pointLight1.position.copy(lightPosition1);
  pointLight1.castShadow = false;
  pointLight1.receiveShadow = false;
  scene.add( pointLight1 );
  //poste 2
  var lightPosition2 = new THREE.Vector3(-220, 30, 0);
  var pointLight2 = new THREE.PointLight(lightColor,1,100,0.2);
  pointLight2.position.copy(lightPosition2);
  pointLight2.castShadow = false;
  scene.add( pointLight2 );
  //poste 3
  var lightPosition3 = new THREE.Vector3(0, 30, 220);
  var pointLight3 = new THREE.PointLight(lightColor,1,100,0.2);
  pointLight3.position.copy(lightPosition3);
  pointLight3.castShadow = false;
  scene.add( pointLight3 );
  //poste 4
  var lightPosition4 = new THREE.Vector3(0, 30, -220);
  var pointLight4 = new THREE.PointLight(lightColor,1,100,0.2);
  pointLight4.position.copy(lightPosition4);
  pointLight4.castShadow = false;
  scene.add( pointLight4 );

  // // var mat4 = new THREE.Matrix4();

  // /* Construindo os esqueletos */
  
  let skeletonObject_01 = new Skeleton(0,0);
  let skeleton_01 = skeletonObject_01.getSkeleton();
  scene.add(skeleton_01);
  
  let skeleton_02 = new Skeleton(-10,6);
  scene.add(skeleton_02.getSkeleton());

  let skeleton_03 = new Skeleton(7,-10);
  scene.add(skeleton_03.getSkeleton());

  let skeleton_04 = new Skeleton(3,20);
  scene.add(skeleton_04.getSkeleton());

  let skeleton_05 = new Skeleton(21,0);
  scene.add(skeleton_05.getSkeleton());

  // //   /* INICIO: Segundo trabalho */

  var tween = new TWEEN.Tween(skeleton_01.position)
    .to({ x : -10.0, z:-15.0}, 3000)
    .delay(2000)
    .onUpdate(() => {
      Helper.resetObjectMatrix(skeleton_01);
      Helper.setSpherePosition(skeleton_01, skeleton_01.position.x, 1.05, skeleton_01.position.z);
    })
    .onComplete(() => {
      //qualquer coisa
    })
    .start()
    .repeat(3)
    .yoyo(true);

  //   /* FIM: Segundo trabalho */
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
  const clock = new THREE.Clock();
  render();
  function render()
  {
    stats.update(); // Update FPS
    if (controls.isLocked) {
      moveAnimate(clock.getDelta());
  }
    //trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    TWEEN.update();
    renderer.render(scene, camera) // Render scene
  }

} 

