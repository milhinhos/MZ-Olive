<?php

require_once('Streamer.php');

$ft = new File_Streamer();
$ft->setDestination('uploads/');
$ft->receive();
$ft->dataProcess($ft->getFilename());
//echo "Nome do Ficheiro: ".$ft->getFilename();
