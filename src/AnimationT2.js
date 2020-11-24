function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(0, 0, 20)); // Init camera in this position
  initDefaultLighting(scene, new THREE.Vector3(11, 36, 23));
  // To use the keyboard
  var keyboard = new KeyboardState();
  var trackballControls = new THREE.TrackballControls( camera, renderer.domElement );
  

  // create the ground plane
  var groundPlane = createGroundPlane(30, 30); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.translateZ(-5.88);
  scene.add(groundPlane);
  
  // Set angles of rotation
  var angleC = [0];
  var angleBD = [-1.57, 0, 0, -1.57];
  var angleBE = [1.57, 0, 0, 1.57];
  var anglePD = [0, 0, -2.57, -0.57, 0];
  var anglePE = [0, 0, 2.57, 0.57, 0];

  // Show world axes
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  //variaveis trabalho 2 animation
  var speed = 0.03;
  var aceleracao = 0.001;
  var speedt = 0.05; 
  var animationOn = false; // control if animation is on or of


  //Parte Central-cabeça
  var s1 = createCenter(); //Centro
  scene.add(s1);
  
  var c1 = createCylinder();
  s1.add(c1);

  var s2 = createSphere();
  c1.add(s2);
  
  var c2 = createCylinder();
  s2.add(c2);
  
  var s3 = createSphere(); //Peito
  c2.add(s3);
  
  var c3 = createCylinder(); //peito-cabeça
  s3.add(c3);

  var s4 = createSphere(); // cabeça
  c3.add(s4);

  //braço lado direito
  var c4 = createCylinder(); //peito-ombro
  s3.add(c4);

  var s5 = createSphere(); 
  c4.add(s5);

  var c5 = createCylinder(); 
  s5.add(c5);

  var s6 = createSphere(); 
  c5.add(s6);

  var c6 = createCylinder(); 
  s6.add(c6);

  var s7 = createSphere(); 
  c6.add(s7);

  //braço lado esquerdo
  var c7 = createCylinder(); //peito-ombro
  s3.add(c7);

  var s8 = createSphere(); 
  c7.add(s8);

  var c8 = createCylinder(); 
  s8.add(c8);

  var s9 = createSphere(); 
  c8.add(s9);

  var c9 = createCylinder(); 
  s9.add(c9);

  var s10 = createSphere(); 
  c9.add(s10);

  //perna direita
  var c10 = createCylinder(); 
  s1.add(c10);

  var s11 = createSphere(); 
  c10.add(s11);

  var c11 = createCylinder(); 
  s11.add(c11);

  var s12 = createSphere(); 
  c11.add(s12);

  var c12 = createCylinder(); 
  s12.add(c12);

  var s13 = createSphere(); 
  c12.add(s13);

  //perna esquerda
  var c13 = createCylinder(); 
  s1.add(c13);

  var s14 = createSphere(); 
  c13.add(s14);

  var c14 = createCylinder(); 
  s14.add(c14);

  var s15 = createSphere(); 
  c14.add(s15);

  var c15 = createCylinder(); 
  s15.add(c15);

  var s16 = createSphere(); 
  c15.add(s16);

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

  //showInformation();
  //buildInterface();
  buildInterfaceAnim();
  render();
  var lado = 1;
  var membro = 0;

//Função para exibir a funcionalidades na tela
function showInformation()
{
  controls = new InfoBox();
      controls.add("Funcionamento pelo teclado");
      controls.add("Aperte as teclas 1 a 4 para escolher os membros");
      controls.add("Aperte ESPAÇO para inverter o lado movimentado");
      controls.add("Aperte as setas para movimentar os membros");
      controls.show();
}

//Função para uso do teclado
  function keyboardUpdate() {

    keyboard.update();
    if ( keyboard.down("space") ) lado = lado*-1;
    if ( keyboard.down("1")) membro = 1;
    if ( keyboard.down("2")) membro = 2;
    if ( keyboard.down("3")) membro = 3;
    if ( keyboard.down("4")) membro = 4;
    //ombro
    if(membro == 1)
    {
      //Ombro direito
       if(lado>0)
       {
        //cima-baixo
        if(angleBD[0]>-1.83)
        {
        if ( keyboard.pressed("down")) angleBD[0] = angleBD[0] - .1;
        }else angleBD[0] = angleBD[0] + .1;
        if(angleBD[0]<1.83)
       {
        if ( keyboard.pressed("up")) angleBD[0] = angleBD[0] + .1;
        }else angleBD[0] = angleBD[0] - .1;
        //frente-costas
        if(angleBD[1]>-1.83)
        {
        if ( keyboard.pressed("left")) angleBD[1] = angleBD[1] - .1;
        }else angleBD[1] = angleBD[1] + .1;
        if(angleBD[1]<1.83)
       {
        if ( keyboard.pressed("right")) angleBD[1] = angleBD[1] + .1;
        }else angleBD[1] = angleBD[1] - .1;
      }
        
      //ombro esquerdo
      if(lado<0)
       {
        //cima-baixo
        if(angleBE[0]>-1.83)
        {
        if ( keyboard.pressed("up")) angleBE[0] = angleBE[0] - .1;
        }else angleBE[0] = angleBE[0] + .1;
        if(angleBE[0]<1.83)
       {
        if ( keyboard.pressed("down")) angleBE[0] = angleBE[0] + .1;
        }else angleBE[0] = angleBE[0] - .1;
        //frente-costas
        if(angleBE[1]>-1.83)
        {
        if ( keyboard.pressed("left")) angleBE[1] = angleBE[1] - .1;
        }else angleBE[1] = angleBE[1] + .1;
        if(angleBE[1]<1.83)
       {
        if ( keyboard.pressed("right")) angleBE[1] = angleBE[1] + .1;
        }else angleBE[1] = angleBE[1] - .1;
      }
    }
    //cotovelo
    if(membro == 2)
    {
      //Cotovelo direito
       if(lado>0)
       {
        if(angleBD[2]>0)
        {
        if ( keyboard.pressed("right")) angleBD[2] = angleBD[2] - .1;
        }else angleBD[2] = angleBD[2] + .1;
        if(angleBD[2]<2.61)
       {
        if ( keyboard.pressed("left")) angleBD[2] = angleBD[2] + .1;
        }else angleBD[2] = angleBD[2] - .1;
      }
      //Cotovelo esquerdo
      if(lado<0)
      {
       if(angleBE[2]>-2.61)
        {
       if ( keyboard.pressed("right")) angleBE[2] = angleBE[2] - .1;
        }else angleBE[2] = angleBE[2] + .1;
        if(angleBE[2]<0)
       {
       if ( keyboard.pressed("left")) angleBE[2] = angleBE[2] + .1;
        }else angleBE[2] = angleBE[2] - .1;
      }
    }
    //Perna
    if(membro == 3)
    {
      //direita
      if(lado>0)
      {
        //frontal
        if(anglePD[4]>-1.83)
        {
        if ( keyboard.pressed("down")) anglePD[4] = anglePD[4] - .1;
        }else anglePD[4] = anglePD[4] + .1;
        if(anglePD[4]<1.83)
       {
        if ( keyboard.pressed("up")) anglePD[4] = anglePD[4] + .1;
        }else anglePD[4] = anglePD[4] - .1;
        //Lateral
        if(anglePD[3]>-1.30)
        {
        if ( keyboard.pressed("left")) anglePD[3] = anglePD[3] - .1;
        }else anglePD[3] = anglePD[3] + .1;
        if(anglePD[3]<0.26)
       {
        if ( keyboard.pressed("right")) anglePD[3] = anglePD[3] + .1;
        }else anglePD[3] = anglePD[3] - .1;
      }
      //esquerda
      if(lado<0)
      {
        //frontal
        if(anglePE[4]>-1.83)
        {
        if ( keyboard.pressed("down")) anglePE[4] = anglePE[4] - .1;
        }else anglePE[4] = anglePE[4] + .1;
        if(anglePE[4]<1.83)
       {
        if ( keyboard.pressed("up")) anglePE[4] = anglePE[4] + .1;
        }else anglePE[4] = anglePE[4] - .1;
        //lateral
        if(anglePE[3]>-0.26)
        {
        if ( keyboard.pressed("left")) anglePE[3] = anglePE[3] - .1;
        }else anglePE[3] = anglePE[3] + .1;
        if(anglePE[3]<1.30)
       {
        if ( keyboard.pressed("right")) anglePE[3] = anglePE[3] + .1;
        }else anglePE[3] = anglePE[3] - .1;
      }
    }
    //joelho
    if(membro == 4)
    {
      //direito
      if(lado>0)
      {
       if(anglePD[1]>-2.61)
       {
       if ( keyboard.pressed("up")) anglePD[1] = anglePD[1] - .1;
       }else anglePD[1] = anglePD[1] + .1;
       if(anglePD[1]<0)
      {
       if ( keyboard.pressed("down")) anglePD[1] = anglePD[1] + .1;
       }else anglePD[1] = anglePD[1] - .1;
     }
      //esquerdo
      if(lado<0)
      {
       if(anglePE[1]>-2.61)
       {
       if ( keyboard.pressed("up")) anglePE[1] = anglePE[1] - .1;
       }else anglePE[1] = anglePE[1] + .1;
       if(anglePE[1]<0)
      {
       if ( keyboard.pressed("down")) anglePE[1] = anglePE[1] + .1;
       }else anglePE[1] = anglePE[1] - .1;
     }
    }

  }

//Função para criar esfera
  function createSphere()
  {
    var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(0,180,0)'} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      sphere.castShadow = true;
    return sphere;
  }

//Função para criar o centro do personagem
  function createCenter()
  {
    var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(180,0,0)'} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      sphere.castShadow = true;
    return sphere;
  }

//Função para criar cilindros
  function createCylinder()
  {
    var cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.0, 25);
    var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(0,0,180)'} );
    var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
      cylinder.castShadow = true;
    return cylinder;
  }

//Função para modelar o personagem
  function rotateCylinder()
  {
    //cilindros
    c1.matrixAutoUpdate = false;
    c2.matrixAutoUpdate = false;
    c3.matrixAutoUpdate = false;
    c4.matrixAutoUpdate = false;
    c5.matrixAutoUpdate = false;
    c6.matrixAutoUpdate = false;
    c7.matrixAutoUpdate = false;
    c8.matrixAutoUpdate = false;
    c9.matrixAutoUpdate = false;
    c10.matrixAutoUpdate = false;
    c11.matrixAutoUpdate = false;
    c12.matrixAutoUpdate = false;
    c13.matrixAutoUpdate = false;
    c14.matrixAutoUpdate = false;
    c15.matrixAutoUpdate = false;

    //esferas
    s2.matrixAutoUpdate = false;
    s3.matrixAutoUpdate = false;
    s4.matrixAutoUpdate = false;
    s5.matrixAutoUpdate = false;
    s6.matrixAutoUpdate = false;
    s7.matrixAutoUpdate = false;
    s8.matrixAutoUpdate = false;
    s9.matrixAutoUpdate = false;
    s10.matrixAutoUpdate = false;
    s11.matrixAutoUpdate = false;
    s12.matrixAutoUpdate = false;
    s13.matrixAutoUpdate = false;
    s14.matrixAutoUpdate = false;
    s15.matrixAutoUpdate = false;
    s16.matrixAutoUpdate = false;

    var mat4 = new THREE.Matrix4();

    // resetting matrices Cilindros
    c1.matrix.identity();
    c2.matrix.identity();
    c3.matrix.identity();
    c4.matrix.identity();
    c5.matrix.identity();
    c6.matrix.identity();
    c7.matrix.identity();
    c8.matrix.identity();
    c9.matrix.identity();
    c10.matrix.identity();
    c11.matrix.identity();
    c12.matrix.identity();
    c13.matrix.identity();
    c14.matrix.identity();
    c15.matrix.identity();

    //resetting matrices esferas
    s2.matrix.identity();
    s3.matrix.identity();
    s4.matrix.identity();
    s5.matrix.identity();
    s6.matrix.identity();
    s7.matrix.identity();
    s8.matrix.identity();
    s9.matrix.identity();
    s10.matrix.identity();
    s11.matrix.identity();
    s12.matrix.identity();
    s13.matrix.identity();
    s14.matrix.identity();
    s15.matrix.identity();
    s16.matrix.identity();

    //Central
    // Posicionando Cilindro
    c1.matrix.multiply(mat4.makeRotationZ(angleC[0])); 
    c1.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); 
    
    // Posicionando esfera
    s2.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c2.matrix.multiply(mat4.makeRotationZ(angleC[0]));
    c2.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s3.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
    
    // Posicionando Cilindro3
    c3.matrix.multiply(mat4.makeRotationZ(angleC[0]));
    c3.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s4.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Braço direito
    // Posicionando Cilindro
    c4.matrix.multiply(mat4.makeRotationZ(angleBD[3]));
    c4.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s5.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c5.matrix.multiply(mat4.makeRotationZ(angleBD[0]));
    c5.matrix.multiply(mat4.makeRotationX(angleBD[1]));
    c5.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s6.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c6.matrix.multiply(mat4.makeRotationZ(angleBD[2]));
    c6.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); 

    // Posicionando esfera
    s7.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Braço esquerdo
    // Posicionando Cilindro
    c7.matrix.multiply(mat4.makeRotationZ(angleBE[3]));
    c7.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); 

    // Posicionando esfera
    s8.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c8.matrix.multiply(mat4.makeRotationZ(angleBE[0]));
    c8.matrix.multiply(mat4.makeRotationX(angleBE[1]));
    c8.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s9.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c9.matrix.multiply(mat4.makeRotationZ(angleBE[2]));
    c9.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s10.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Perna direita
    // Posicionando Cilindro
    c10.matrix.multiply(mat4.makeRotationZ(anglePD[2]));
    c10.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s11.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c11.matrix.multiply(mat4.makeRotationZ(anglePD[3]));
    c11.matrix.multiply(mat4.makeRotationX(anglePD[4]));
    c11.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s12.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c12.matrix.multiply(mat4.makeRotationZ(anglePD[0]));
    c12.matrix.multiply(mat4.makeRotationX(anglePD[1]));
    c12.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s13.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Perna esquerda
    // Posicionando Cilindro
    c13.matrix.multiply(mat4.makeRotationZ(anglePE[2]));
    c13.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s14.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c14.matrix.multiply(mat4.makeRotationZ(anglePE[3]));
    c14.matrix.multiply(mat4.makeRotationX(anglePE[4]));
    c14.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s15.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando Cilindro
    c15.matrix.multiply(mat4.makeRotationZ(anglePE[0]));
    c15.matrix.multiply(mat4.makeRotationX(anglePE[1]));
    c15.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));

    // Posicionando esfera
    s16.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
  }

//Função para voltar o personagem para a posição inicial
  function restartPosition()
  {
    angleC[0] = 0;
    angleBD[0] = 0;
    angleBD[1] = 0;
    angleBD[2] = 0;
    angleBD[3] = -1.57;
    angleBE[0] = 0;
    angleBE[1] = 0;
    angleBE[2] = 0;
    angleBE[3] = 1.57;
    anglePD[0] = 0;
    anglePD[1] = 0;
    anglePD[2] = -2.57;
    anglePD[3] = -0.57;
    anglePD[4] = 0;
    anglePE[0] = 0;
    anglePE[1] = 0;
    anglePE[2] = 2.57;
    anglePE[3] = 0.57;
    anglePE[4] = 0;
    
  }

//Função para criar os sliders de movimentação
  function buildInterface()
  {
    var controls = new function ()
    {
      this.joint1 = 0;
      this.joint2 = 0;
      this.joint3 = 0;
      this.joint4 = 0;
      this.joint5 = 0;
      this.joint6 = 0;
      this.joint7 = -30;
      this.joint8 = 30;
      this.joint9 = 0;
      this.joint10 = 0;
      this.joint11 = 0;
      this.joint12 = 0;
      this.onRestartPosition = function(){
        restartPosition()
        this.joint1 = 0;
        this.joint2 = 0;
        this.joint3 = 0;
        this.joint4 = 0;
        this.joint5 = 0;
        this.joint6 = 0;
        this.joint7 = -30;
        this.joint8 = 30;
        this.joint9 = 0;
        this.joint10 = 0;
        this.joint11 = 0;
        this.joint12 = 0;}

      this.rotate = function(){
        //Ombro
        angleBD[0] = degreesToRadians(this.joint1);
        angleBD[1] = degreesToRadians(this.joint2);
        angleBE[0] = degreesToRadians(this.joint3);
        angleBE[1] = degreesToRadians(this.joint4);
        //Cotovelo
        angleBD[2] = degreesToRadians(this.joint5);
        angleBE[2] = degreesToRadians(this.joint6);
        //Perna
        anglePD[3] = degreesToRadians(this.joint7);
        anglePE[3] = degreesToRadians(this.joint8);
        anglePD[4] = degreesToRadians(this.joint9);
        anglePE[4] = degreesToRadians(this.joint10);
        //joelho
        anglePD[1] = degreesToRadians(this.joint11);
        anglePE[1] = degreesToRadians(this.joint12);
      }
    }

    // GUI interface
    var gui = new dat.GUI();
    gui.add(controls, 'joint1', -105, 105)
      .onChange(function(e) { controls.rotate() })
      .name("Ombro direitoS");
    gui.add(controls, 'joint2', -105, 105)
      .onChange(function(e) { controls.rotate() })
      .name("Ombro direitoF");
    gui.add(controls, 'joint3', -105, 105)
      .onChange(function(e) { controls.rotate() })
      .name("Ombro esquerdoS");
    gui.add(controls, 'joint4', -105, 105)
      .onChange(function(e) { controls.rotate() })
      .name("Ombro esquerdoF");
    gui.add(controls, 'joint5', 0, 150)
      .onChange(function(e) { controls.rotate() })
      .name("Cotovelo direito");
    gui.add(controls, 'joint6', -150, 0)
      .onChange(function(e) { controls.rotate() })
      .name("Cotovelo esquerdo");
    gui.add(controls, 'joint7', -75, 15)
      .onChange(function(e) { controls.rotate() })
      .name("Perna direitaL");
    gui.add(controls, 'joint8', -15, 75)
      .onChange(function(e) { controls.rotate() })
      .name("Perna esquerdaL");
    gui.add(controls, 'joint9', -90, 90)
      .onChange(function(e) { controls.rotate() })
      .name("Perna direitaF");
    gui.add(controls, 'joint10', -90, 90)
      .onChange(function(e) { controls.rotate() })
      .name("Perna esquerdaF");
    gui.add(controls, 'joint11', -150, 0)
      .onChange(function(e) { controls.rotate() })
      .name("Joelho direito");
    gui.add(controls, 'joint12', -150, 0)
      .onChange(function(e) { controls.rotate() })
      .name("Joelho esquerdo");
      gui.add(controls, 'onRestartPosition').name("Reset Position");
  }

  function buildInterfaceAnim()
  {
    var controls = new function ()
    {
      this.onChangeAnimation = function(){
        animationOn = !animationOn;
      };
      this.speed = 0.05;
      //this.aceleracao = 0.01;
      // this.joint2 = 0;
      //
      this.changeSpeed = function(){
        speed = this.speed;
      };
      //this.stop = function()
      //{
        //speed = speed - aceleracao;
      //};
    };

    // GUI interface
    var gui = new dat.GUI();
    gui.add(controls, 'onChangeAnimation',true).name("Pause");
    //gui.add(controls, 'speed', 0, 0.05)
      //.onChange(function(e) { controls.changeSpeed() })
      //.name("Change Speed");
    //gui.add(controls, 'stop').name("Stop")
        //.onChange(function(e) { controls.stop() });
  }

  function Animation()
  {
    if(animationOn)
    {
        //if(speed == 0.05 || speed == -0.05)
        //{
          //Animação Ombro
          if(speed>0)
          {
            if(angleBD[1]<0.78)
            {
                angleBD[1] = angleBD[1] + speed;
                angleBE[1] = angleBE[1] - speed;
            }
                else speed = speed*(-1);
          }
          if(speed<0)
          {
            if(angleBD[1]>-0.78)
            {
                angleBD[1] = angleBD[1] + speed;
                angleBE[1] = angleBE[1] - speed;
            }
                else speed = speed*(-1);
          }
          //Animação perna
          if(speed>0)
          {
            if(anglePD[4]<0.78)
            {
                anglePD[4] = anglePD[4] + speed;
                anglePE[4] = anglePE[4] - speed;
                //if (anglePD[1]<0)
                //anglePD[1] = anglePD[1] - speedt;
                //else speedt = speedt*(-1);
            }
                else speed = speed*(-1);
          }
          if(speed<0)
          {
            if(anglePD[4]>-0.78)
            {
                anglePD[4] = anglePD[4] + speed;
                anglePE[4] = anglePE[4] - speed;
                //if (anglePD[1]>-0.52)
                //anglePD[1] = anglePD[1] - speedt;
                //else speedt = speedt*(-1);
            }
                else speed = speed*(-1);
          }
        /*}else
        {
          speed = speed + aceleracao;
          //Animação Ombro
          if(speed>0)
          {
            if(angleBD[1]<0.78)
            {
                angleBD[1] = angleBD[1] + speed;
                angleBE[1] = angleBE[1] - speed;
            }
                else speed = speed*(-1);
          }
          if(speed<0)
          {
            if(angleBD[1]>-0.78)
            {
                angleBD[1] = angleBD[1] + speed;
                angleBE[1] = angleBE[1] - speed;
            }
                else speed = speed*(-1);
          }
          //Animação perna
          if(speed>0)
          {
            if(anglePD[4]<0.78)
            {
                anglePD[4] = anglePD[4] + speed;
                anglePE[4] = anglePE[4] - speed;
                //if (anglePD[1]<0)
                //anglePD[1] = anglePD[1] - speedt;
                //else speedt = speedt*(-1);
            }
                else speed = speed*(-1);
          }
          if(speed<0)
          {
            if(anglePD[4]>-0.78)
            {
                anglePD[4] = anglePD[4] + speed;
                anglePE[4] = anglePE[4] - speed;
                //if (anglePD[1]>-0.52)
                //anglePD[1] = anglePD[1] - speedt;
                //else speedt = speedt*(-1);
            }
                else speed = speed*(-1);
          }
        }*/
        
    }
  }

//Função para renderizar a cena
  function render()
  {
    stats.update(); // Update FPS
    trackballControls.update();
    rotateCylinder();
    Animation();
    //lightFollowingCamera(light, camera); checar diferença de luz
    requestAnimationFrame(render); // Show events
    //keyboardUpdate();
    renderer.render(scene, camera) // Render scene
  }
}
