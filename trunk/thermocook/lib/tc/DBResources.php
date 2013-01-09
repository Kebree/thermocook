<?php
class DBResources {
	private $type;
	private $table;
	private $field;

	public function select() {
		$this -> type = "select";
		return $this;
	}

	public function insert() {
		$this -> type = "insert";
		return $this;
	}

	public function table($table) {
		$this -> table = $table;
		return $this;
	}
	
	public function fields($fields) {
		if(!isset($fields))
			$fields = "";
		if(is_array($fields)){
			foreach($fields as $field) {
				
			}
		}
	}

	public function getQuery() {
		if (!isset($this -> type)) {
			throw new Exception("A type must have been selected", 1);
		}
		if (!isset($this -> table)) {
			throw new Exception("A table must have been selected", 1);
		}
		switch ($this->type) {
			case 'select' :
				$ret = "SELECT ";
				break;

			default :
				break;
		}
	}

}
