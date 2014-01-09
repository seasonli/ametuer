<?php require("../../../_config.php"); require("../../../_header.php"); require("../../../verify/_verifygo.php") ?>

<script type="text/javascript">

</script>

<?php 
$onegosql= "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; $onegorow=mysql_fetch_assoc(mysql_query($onegosql));
$oneusersql= "SELECT * FROM users WHERE id = '".$onegorow['users_id']."' "; $oneuserrow= mysql_fetch_assoc(mysql_query($oneusersql));
?>

<title>更远网：<?php echo $onegorow['title'] ?></title>

<?php require("../../../_a.php"); require("../../../_b.php"); ?>

<div id="b_outer"><div id="b_inner">
	<div class="necknav">
		<a href="../<?php echo $_GET['go'] ?>"><ul class="plan">旅行计划</ul></a>
		<a href=""><ul class="talk on">讨论</ul></a>
		<a href="../live/<?php echo $_GET['go'] ?>"><ul class="booklet">旅行手札</ul></a>
	</div>
	<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
		<div class="shouldernav">
			<a href="../../mygos/"><ul class="menu">我的其他计划</ul></a>
		</div>
	<?php } else { ?>
		<div class="shouldernav">
			<?php $marksql= "SELECT * FROM gos_marks WHERE users_id= '".$_SESSION['ID']."' and gos_id= '".$onegorow['id']."'"; $markrow=mysql_fetch_assoc(mysql_query($marksql)); ?>
			<ul id="<?php echo $onegorow['id'] ?>" class="love love<?php echo $onegorow['id']; if ($markrow['status_love']==1) {echo " on";} ?>" onClick="lovego(this.id)">关注这条计划</ul>
			<a href="<?php echo $config_basedir ?>mail/write/?receiver=<?php echo $oneuserrow['id'] ?>"><ul class="write">写信给Ta</ul></a>
		</div>
	<?php } ?>
</div></div>

<div id="dw_outer"><div id="dw_inner">
	<div id="left" class="talk">	
		<?php $onegosql= "SELECT * FROM gos WHERE id= '".$_GET['go']."'"; $onegorow=mysql_fetch_assoc(mysql_query($onegosql)); ?>

	</div>
	<div id="right">

		<div style="float:right; padding:15px 0 0 0"><a href="<?php echo $config_basedir ?>wechat/"><img src="../../../_css/wechat-2.png" style="float:left; width:200px" /></a></div>
	</div>
</div></div>

<div id="c_outer"><div id="c_inner">
	<?php if ($_SESSION['ID']==$onegorow['users_id']) { ?>
		<div class="kneenav">
			<div></div>
			<a href="../revise/?mygo=<?php echo $_GET['go'] ?>"><ul class="revise">修改这个计划</ul></a>
			<div></div>
			<ul class="remove" onclick="removego(<?php echo $_GET['go'] ?>)">删除这个计划</ul>
			<div></div>
		</div>
	<?php } ?>
</div></div>

<?php require("../../../_footer.php"); ?>



