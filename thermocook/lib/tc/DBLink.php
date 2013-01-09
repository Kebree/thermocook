<?php

class DBLink {
	private static $host;
	private static $user;
	private static $password;
	private static $connection;

	// singleton instance
	private static $instance;

	// private constructor function
	// to prevent external instantiation
	private function __construct() {
	}

	// getInstance method
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function connect($host, $user, $password, $db) {
		self::$host = $host;
		self::$user = $user;
		self::$password = $password;
		self::$connection = mysql_connect(self::$host, self::$user, self::$password);
		mysql_select_db($db,self::$connection);
	}

	public function close() {
		mysql_close($connection);
	}

	public function executeQuery($query) {
		return mysql_query($query, self::$connection);
	}

	public function insert($table, $columns, $values) {
		$args = array_combine($columns, $values);
		$where = "";
		foreach($args as $key=>$value){
			$where .= "$key='$value' AND ";
		}
		$where = substr_replace($where ,"",-5);
		$query = sprintf("SELECT * FROM `%s` WHERE %s",
			$table,
			$where);
		$res = mysql_query($query, self::$connection);
		if($res && mysql_num_rows($res) > 0){
			mysql_free_result($res);
			return -2;
		}
		
		$cols = '(';
		foreach($columns as $column){
			$cols .= "`$column`,";
		}
		$cols = substr_replace($cols ,"",-1).')';
		$vals = '(';
		foreach($values as $value){
			$vals .= "'$value',";
		}
		$vals = substr_replace($vals ,"",-1).')';
		$query = sprintf("INSERT INTO `%s` %s VALUES %s",
			$table,
			$cols,
			$vals);
		mysql_query($query, self::$connection);
		return mysql_insert_id();
	}
	
	public function select($table, $fields = array("*"), $limits = NULL, $sorter = NULL) {
		$cols = '';
		foreach($fields as $field){
			$cols .= "$field,";
		}
		$cols = substr_replace($cols ,"",-1);
		$limit = "";
		if(isset($limits)){
			$limit .= " LIMIT ".$limits['start'].",".$limits['end'];
		}
		$sort = "";
		if(isset($sorter)) {
			$sort =" ORDER BY ".$sorter['col']." ".$sorter['direction'];
		}
		$query = sprintf("SELECT %s FROM `%s`%s%s;",
			$cols,
			$table,
			$sort,
			$limit);
		$res = mysql_query($query, self::$connection);
		$arr = array();
		while($row = mysql_fetch_assoc($res)) {
			$arr[] = $row;
		}
		mysql_free_result($res);
		return $arr;
	}

	public function remove($table, $fields) {
		$where = "";
		foreach($fields as $key=>$value){
			$where .= "$key='$value' AND ";
		}
		$where = substr_replace($where ,"",-5);
		$query = sprintf("DELETE FROM %s WHERE %s",
			$table,
			$where);
		mysql_query($query, self::$connection);
	}
}
