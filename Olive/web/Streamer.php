<?php

error_reporting(E_ALL);

date_default_timezone_set('Europe/London');

/** PHPExcel_IOFactory */
require_once '../Classes/PHPExcel/IOFactory.php';

class File_Streamer
{
	private $fileName;
	private $contentLength;
	private $path;
	private $tempFilename;
	
	public function __construct()
	{
        if (array_key_exists('HTTP_X_FILE_NAME', $_SERVER) && array_key_exists('CONTENT_LENGTH', $_SERVER)) {
            $this->fileName = $_SERVER['HTTP_X_FILE_NAME'];
            $this->contentLength = $_SERVER['CONTENT_LENGTH'];
        } else throw new Exception("Error retrieving headers");
	}
    
    public function setDestination($p)
    {
    	$this->path = $p;
    }
    
    public function receive()
    {
        $this->tempFilename = uniqid(rand(),true);	
        if (!$this->contentLength > 0) {
            throw new Exception('No file uploaded!');
        }
		
        /*file_put_contents(
            $this->path . $this->fileName,
            file_get_contents("php://input")
        );*/
        file_put_contents(
            $this->path . $this->tempFilename,
            file_get_contents("php://input")
        );
        return true;
    }
	
	public function dataProcess($tf)
	{
		
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		$objPHPExcel = $objReader->load($tf);

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
						//echo ' Cell: ' . $cell->getCoordinate() . ' - ' . $cell->getCalculatedValue() . "\r\n";
					}
					$nColunas++;
				}
			}
		}
		//print_r($nomes);
		
		print_r(json_encode($dados));
		//return json_encode($dados);
		//return $dados;
	}
	
	public function getFilename()
	{
		//$target_script = "dataProcessor.php";
		/*echo 'SERVER<br/>';
		var_dump($_SERVER);	
		echo 'FILES<br/>';
		var_dump($_FILES);
		echo 'FICHEIRO FINAL<br/>';
		$ficheiroFinal= $this->path . $this->fileName;*/
		//$res=this->dataProcess($this->path . $this->tempFilename);
		//echo dataProcess($this->path . $this->tempFilename);
		//echo shell_exec('php '. $target_script .' '. $this->path . $this->tempFilename);	
		
		return ''. $this->path . $this->tempFilename;
		
	}
}
