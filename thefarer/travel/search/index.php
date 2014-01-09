<?php require("../../_config.php"); require("../../_header.php"); ?>
<script>
function loadsearchgos(value,value0) {
	$.post("_ajax_loadsearchgos.php?spot="+value+"&type="+value0, function(data) {
		if (data.length<5) { $(".loadgos").html("暂时没有更多了"); $(".loadgos").css("border-top","2px solid #f6f6f6"); }
		else { $(".loadgos").before(data); }
	})			 	
}
</script>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="d_outer"><div id="d_inner">

<div id="left">
<div id="newgos-container">
	<?php $onespotsql= "SELECT * FROM spots WHERE id= '".$_GET['spot']."' "; $onespotrow= mysql_fetch_assoc(mysql_query($onespotsql)); ?>
	<div class="cap">搜索：有关<?php echo $onespotrow['spot'] ?>的旅行计划</div><title>更远网：有关<?php echo $onespotrow['spot'] ?>的旅行计划</title>
	<div class="sievegos">
		<a href="?spot=<?php echo $_GET['spot'] ?>"><li <?php if(isset($_GET['type'])==FALSE) {echo "class='on'";} ?>>全部</li></a><a href="?spot=<?php echo $_GET['spot'] ?>&type=from"><li <?php if($_GET['type']==from) {echo "class='on'";} ?>>从<?php echo $onespotrow['spot'] ?>出发</li></a><a href="?spot=<?php echo $_GET['spot'] ?>&type=to"><li <?php if($_GET['type']==to) {echo "class='on'";} ?>>去<?php echo $onespotrow['spot'] ?></li></a>
	</div>	
	<?php $_SESSION['LOADGO']=2099; require("_ajax_loadsearchgos.php") ?>
	<div class="loadgos" onclick="loadsearchgos(<?php echo $_GET['spot'] ?>,<?php echo "'".$_GET['type']."'" ?>)">加载更多</div> 
</div>

</div>

<div id="right">
</div>

</div></div>
<?php require("../../_footer.php"); ?>