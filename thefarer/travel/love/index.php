<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?>
<script>
function loadlovegos() {
	$.post("_ajax_loadlovegos.php", function(data) {
		if (data.length<5) { $(".loadgos").html("暂时没有更多了"); $(".loadgos").css("border-top","2px solid #f6f6f6"); }
		else {
			var content=template.render("template-go", data);
			$(".loadgos").before(content); 
		}
	})			 	
}
loadlovegos();
</script>

<title>更远网：我关注的旅行计划</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div id="lovegos-container">
			<div class="gos-top">我关注的旅行计划</div>
			<?php $_SESSION['TMP_MARKGO_DATETIME_RENEW']=2099; $_SESSION['TMP_MARKGO_ID']=999999999; ?>
			<div class="loadgos" onclick="loadlovegos()">加载更多</div> 
		</div>
	</div>
</div></div>

<?php require("../../_footer.php"); ?>