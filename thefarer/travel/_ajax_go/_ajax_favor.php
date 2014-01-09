<?php
require("../../_config.php");
require("../../_header.php");
?>

<div class="favor_input favor_input<?php echo $_POST['go'] ?>">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<textarea class="replyfavor<?php echo $_POST['go'] ?>" style="float:left; width:320px; height:30px"></textarea>
	<label style="float:left; margin:12px 0 0 10px"><input id="<?php echo $_POST['go'] ?>" value="回 应" type="button" onclick="replyfavor(this.id)"></label>
</div>



