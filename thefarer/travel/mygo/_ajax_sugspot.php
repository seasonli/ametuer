<?php
require("../../_config.php");
$sql="SELECT * FROM spots WHERE spot like '%".addslashes($_POST['spot'])."%'";
$k=mysql_num_rows(mysql_query($sql));
if ($k==1) {
	$sql="SELECT * FROM spots WHERE spot like '%".addslashes($_POST['spot'])."%' limit 0,1;";
	$row=mysql_fetch_assoc(mysql_query($sql)); ?>
	<input type="hidden" id="spacespot" value="<?php echo $row['id'] ?>" />
	<ul onClick="fillspot('<li id=\'<?php echo $row['id'] ?>\' onClick=\'$(this).hide(); removespot(this.id)\'><?php echo $row['spot'] ?></li>');addspot('<?php echo $row['id'] ?>')"><?php echo $row['spot']?></ul>    
	<ul background-color:#f0f6f3>尝试敲击回车以快速输入</ul>
<?php }
else {
	for ($n=0; $n<5; $n++) {
		$sql="SELECT * FROM spots WHERE spot like '%".addslashes($_POST['spot'])."%' order by id limit $n,1;";
		$row=mysql_fetch_assoc(mysql_query($sql));
		if($row['id']==0) { break; }	?>
		<ul onClick="fillspot('<li id=\'<?php echo $row['id'] ?>\' onClick=\'$(this).hide(); removespot(this.id)\'><?php echo $row['spot'] ?></li>');addspot('<?php echo $row['id'] ?>')"><?php echo $row['spot']?></ul>    
	<?php } ?>
	<?php if ($k==0 or $k>5) { ?><ul background-color:#f0f6f3><?php echo $k ?>个匹配，尝试更准确地输入</ul><?php }} ?>