function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(15, 15, 35)); // Init camera in this position
  initDefaultLighting(scene, new THREE.Vector3(11, 36, 23));
  var trackballControls = new THREE.TrackballControls( camera, renderer.domElement );

  // create the ground plane
  var groundPlane = createGroundPlane(25, 25); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.translateZ(-1.0);
  scene.add(groundPlane);

  // Show world axes
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  //criando esfera
  var sphere = createSphere();
  scene.add(sphere);

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
  buildInterface();
  render();

  //Função para criar esfera
  function createSphere()
  {
    var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      sphere.castShadow = true;
    return sphere;
  }

  //Função para criar os sliders de movimentação
  function buildInterface()
  {
      //var speed = 0.5;
      var controls = new function()
      {
          this.joint1 = 0;
          this.joint2 = 0;
          this.joint3 = 0;

          this.move = function()
          {
           sphere.position.set(this.joint1, this.joint2, this.joint3);
          }
      }

      //GUI interface
      var gui = new dat.GUI();
        gui.add(controls, 'joint1', -12.5, 12.5).name("Posição X");
        gui.add(controls, 'joint2', -12.5, 12.5).name("Posição Y");
        gui.add(controls, 'joint3', -12.5, 12.5).name("Posição Z");
        gui.add(controls, 'move').name("Mover");
  }

  //Função para renderizar a cena
  function render()
  {
    stats.update(); // Update FPS
    trackballControls.update();
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
  }
}