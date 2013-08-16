<?php


/** Error reporting */
error_reporting(E_ALL);

date_default_timezone_set('Europe/London');

/** PHPExcel_IOFactory */
require_once '../Classes/PHPExcel/IOFactory.php';
$filename = $argv[1];

//DEBUG
//echo "O Ficheiro é: ".$filename. " \n";


$objReader = PHPExcel_IOFactory::createReader('Excel2007');
$objPHPExcel = $objReader->load($filename);

$dados=array();
$nomes=array();
$nLinhas = 0;
$nColunas = 0;


foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
		foreach ($worksheet->getRowIterator() as $row) {
		//echo 'RN: ' . $row->getRowIndex() . "\r\n";
		$nLinhas++;
		$nColunas=0;

		$cellIterator = $row->getCellIterator();
		$cellIterator->setIterateOnlyExistingCells(true); // Loop all cells, even if it is not set
		foreach ($cellIterator as $cell) {
			if ($nLinhas==1) {
				array_push($nomes,$cell->getCalculatedValue());
				//break;
				
			}
			else{
				array_push($dados,$nomes[$nColunas],$cell->getCalculatedValue());
				echo ' Cell: ' . $cell->getCoordinate() . ' - ' . $cell->getCalculatedValue() . "\r\n";
			}
			$nColunas++;
		}
	}
}
//print_r($nomes);
print_r(json_encode($dados));

// Echo memory peak usage
//echo date('H:i:s') . " Peak memory usage: " . (memory_get_peak_usage(true) / 1024 / 1024) . " MB\r\n";

// Echo done
//echo date('H:i:s') . " Done writing files.\r\n";
