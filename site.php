<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Player</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/bootstrap_col_15.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.fullPage.css">
    <script src="js/jquery.fullPage.js"></script>
    <script src="js/controls.js" ></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <audio id="audio"></audio>
    <div class="container-fluid">
      <div class="row">
          <!-- <button onclick="play()" id="Play">Play</button>
          <button onclick="next()">Next</button>
          <button onclick="prev()">Prev</button> -->

        <div class="col15-md-15">
          <div class="bg"></div>
          <div class="title">
            <h1>STAYING ALIVE</h1>
            <p>CAPITAL CITIES</p>
            <button class="vol-ctrl" onclick="document.getElementById('audio').volume+=0.1">+</button>
            <img class="volume" src="icons/sound_low.png">
            <button class="vol-ctrl" onclick="document.getElementById('audio').volume-=0.1">-</button>
            <p class="time-cur">0:45 <span>/ 1:35</span></p>
          </div>
        </div>

        <!-- <div class="col-md-12 timeline"></div> -->

          <div class="col15-xs-3 col15-md-3 col15-sm-3 inactive">
            <img class="repeat" src="icons/repeat.png">
          </div>

          <div class="col15-xs-3 col15-md-3 col15-sm-3 inactive" onclick="prev()">
            <img class="backward" src="icons/backward.png">
          </div>

          <div class="col15-xs-3 col15-md-3 col15-sm-3 active" onclick="play()" id="Play">
            <img class="pause" src="icons/pause.png">
          </div>

          <div class="col15-xs-3 col15-md-3 col15-sm-3 inactive" onclick="next()">
            <img class="forward" src="icons/forward.png">
          </div>
          
          <div class="col15-xs-3 col15-md-3 col15-sm-3 inactive">
            <img class="shuffle" src="icons/shuffle.png">
          </div>
          <div>
            <p id="musArr"></p>
          </div>
      </div>
    </div>

    <script>
      document.getElementById('AudioCh').addEventListener('change', handleFileSelect, false);
    </script>

    <!-- <p>
      
    </p> -->
   
  <script>

    <?php
    $dir = 'music' ;

    $filesArray = array(); 
    $Counter = 0; 
    $files = scandir($dir); 

    foreach ($files as &$file) { 
        if ($file!='.' && $file!='..' ) { 
            $filesArray[$Counter] = $file; 
            $Counter++;
        }
    } 
    echo "var theArray=" . json_encode($filesArray) . ";";
    ?>

    document.getElementById("musArr").innerHTML = theArray.join('\n');
    musicListInit();
    document.getElementById("musArr").innerHTML = "";
  </script>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>