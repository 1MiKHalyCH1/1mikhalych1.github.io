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

echo json_encode($filesArray);
?>
