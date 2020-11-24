function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = changeCamera(new THREE.Vector3(0, -30, 15)); // init camera in this position
  var clock = new THREE.Clock();

  // Show text information onscreen
  showInformation();

  // To use the keyboard
  var keyboard = new KeyboardState();

  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls(camera, renderer.domElement );

  // Show axes (parameter is size of each axis)
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(150, 150, 150)",
      side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // position the cube
  cube.position.set(0.0, 0.0, 2.0);
  // add the cube to the scene
  scene.add(cube);

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
  render();

  function keyboardUpdate() {

    keyboard.update();

    //var speed = 30;
    //var moveDistance = speed * clock.getDelta();
    
    if ( keyboard.pressed("left") )   camera.position.x = camera.position.x + 0.1;
    if ( keyboard.pressed("right") )  camera.position.x = camera.position.x - 0.1;
    if ( keyboard.pressed("up") )   camera.position.z = camera.position.z + 0.1;
    if ( keyboard.pressed("down") )  camera.position.z = camera.position.z - 0.1;
      
    if ( keyboard.pressed("A") )    camera.lookAt.x = camera.lookAt.x + 0.1;
    if ( keyboard.pressed("D") )  camera.lookAt.x = camera.lookAt.x - 0.1;
    if ( keyboard.pressed("W") )   camera.lookAt.z = camera.lookAt.z + 0.1;
    if ( keyboard.pressed("S") )  camera.lookAt.z = camera.lookAt.z - 0.1;

    if ( keyboard.pressed("Q") )   {
        camera.up.x = camera.up.x + 0.1;
        camera.up.z = camera.up.z - 0.1;}
    if ( keyboard.pressed("E") )   {
        camera.up.x = camera.up.x - 0.1;
        camera.up.z = camera.up.z + 0.1;}
  }

  function showInformation()
  {
    // Use this to show information onscreen
    controls = new InfoBox();
      controls.add("Keyboard Example");
      controls.addParagraph();
      controls.add("Pressione as setas para alterar a posição da câmera");
      controls.add("Pressione ADWS para alterar onde a câmera aponta");
      controls.add("Pressione QE para alterar o vetor up da camera");
      controls.show();
      
  }

  function render()
  {
    stats.update(); // Update FPS
    requestAnimationFrame(render); // Show events
    trackballControls.update();
    keyboardUpdate();
    renderer.render(scene, camera) // Render scene
  }

  function changeCamera(initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    //camera.lookAt(new THREE.Vector3(0, 0, 0)); // or camera.lookAt(0, 0, 0);
    //camera.up.set(0, 1, 0); // That's the default value
    return camera;
}
}
