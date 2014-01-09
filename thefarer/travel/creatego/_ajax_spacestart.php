<?php
require("../../_config.php");
$sql="SELECT * FROM spots WHERE id= ".$_POST['start']." limit 0,1;"; $row=mysql_fetch_assoc(mysql_query($sql)); ?>
<li id="<?php echo $row['id'] ?>" onClick="$(this).hide(); removestart(this.id)"><?php echo $row['spot'] ?></li>