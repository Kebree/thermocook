<?php
session_start();

/**
 *
 */
class ShoppingList {

	private static $shopList;

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
			if (isset($_SESSION['shopList'])) {
				self::$shopList = $_SESSION['shopList'];
			} else {
				self::$shopList = array();
			}
		}
		return self::$instance;
	}

	private function getIngs($connec, $id) {
		$query = sprintf("SELECT * FROM lk_rec_ing LEFT JOIN ingredient ON id_ingredient = ingredient.id WHERE id_recipe='%s'", $id);
		$result = $connec -> executeQuery($query);
		$ings = array();
		$ings_name = array();
		$ings_measure = array();

		while ($row = mysql_fetch_assoc($result)) {
			if (isset($ings[$row["id_ingredient"]])) {
				$ings[$row["id_ingredient"]] += $row["quantity"];
			} else {
				$ings[$row["id_ingredient"]] = $row["quantity"];
				$ings_name[$row["id_ingredient"]] = $row["name"];
				$ings_measure[$row["id_ingredient"]] = $row["measure"];
			}
		}
		return array($ings, $ings_name, $ings_measure);
	}

	public function add($connec, $id) {
		$ings = self::getIngs($connec, $id);
		foreach ($ings[0] as $id => $quant) {
			if (!isset(self::$shopList[$id])) {
				self::$shopList[$id]["quant"] = $quant;
				self::$shopList[$id]["name"] = $ings[1][$id];
				self::$shopList[$id]["measure"] = $ings[2][$id];
				self::$shopList[$id]["modified"] = false;
			} else {
				self::$shopList[$id]["quant"] += $quant;
			}
		}
		$_SESSION['shopList'] = self::$shopList;
	}

	public function delete($connec, $id) {
		$ings = self::getIngs($connec, $id);
		foreach ($ings[0] as $id => $quant) {
			if (isset(self::$shopList[$id]) && !self::$shopList[$id]["modified"]) {
				self::$shopList[$id]["quant"] -= $quant;
				if (self::$shopList[$id]["quant"] == 0) {
					unset(self::$shopList[$id]);
				}
			}
		}
		$_SESSION['shopList'] = self::$shopList;
	}

	public function removeIng($id) {
		unset(self::$shopList[$id]);
		$_SESSION['shopList'] = self::$shopList;
	}

	public function output($format = "json") {
		$ret = "";
		switch ($format) {
			case 'json' :
				$ret = "{list : [";
				if (count(self::$shopList) > 0) {
					foreach (self::$shopList as $id => $ing) {
						$ret .= "{id : '" . $id . "', name : '" . $ing['name'] . "',quantity : '" . $ing['quant'] . " " . $ing['measure'] . "'},";
					}
					$ret = substr_replace($ret, "", -1);
				}
				$ret .= "]}";
				break;
			case 'html' :
				if (count(self::$shopList) > 0) {
					$ret = "<table class=\"ingTable\">";
					foreach (self::$shopList as $id => $ing) {
						$ret .= "<tr><td class=\"ingName\">" . $ing['name'] . "</td><td class=\"ingQuant\">" . $ing['quant'] . " " . $ing['measure'] . "</td></tr>";
					}
					$ret = substr_replace($ret, "", -1);
					$ret .= "</table>";
				}
				break;
		}
		return $ret;
	}

	public function clean() {
		$_SESSION['shopList'] = array();
	}

}
