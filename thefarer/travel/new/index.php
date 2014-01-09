<?php require("../../_config.php"); require("../../_header.php"); ?>

<script>
	function readsearch(value) { if(value.length == 0) { $('#sugsearch').fadeOut(300);}
		else { $.post("_ajax_sugsearch.php", {spot: value}, function(data) {
			if(data.length>0) { $('#sugsearch').fadeIn(300); $('#sugsearch').html(data) } }) } }
	function loadnewgos() {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "_ajax_loadnewgos.php",
			success: function(data) {
				if (data.length<5) { $(".loadgos").html("暂时没有更多了"); $(".loadgos").css("border-top","2px solid #f6f6f6"); }
				else {
					$(".loadgos").before(template.render("template-go", data));
				}
			},
		})			 	
	};
	loadnewgos();
</script>

<title>更远网 Thefarer.com - 自由 自主 互助的旅行方式</title>
<?php require("../../_a.php"); require("../../_b.php"); ?>

<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div class="brands-container">
			<div class="brands_wrapper">
				<ul class="brand"><a href="../go/live/80"><img src="http://imagea.thefarer.com/201305151241432" /></a></ul><ul class="brand"><a href="../go/live/39"><img src="http://imagea.thefarer.com/20130423171004101" /></a></ul><ul class="brand"><a href="../go/live/80"><img src="http://imagea.b0.upaiyun.com/20130310234039abce667c5674cf51.jpg" /></a></ul>
			</div>
			<div class="brands_checkbox">
				<li id="nxt"></li><li id="pre"></li>
			</div>
			<div class="clear"></div>
		</div>
		<div id="newgos-container">
			<div class="gos-top">最新的旅行计划</div>
			<?php $_SESSION['TMP_LOADGO']=2099; ?>	
			<div class="loadgos" onclick="loadnewgos()">加载更多</div> 
		</div>
	</div>
	<div id="right">
		<div class="search-container">	
			<div class="search">
				<input id="readsearch" class="readspot" placeholder="感兴趣的城市 / 地点 / 路线" oninput="readsearch(this.value)" onpropertychange="readsearch(this.value)" type="text" />
				<div id="sugsearch" class="sugspot"></div>
			</div>
		</div>
		<div class="instruction-container">
			<div class="instruction">
				<div class="instruction_title"><h3>怎么更远</h3></div>
				<div class="instruction_text">
					<p class="f-grey">更远旨在为你提供寻找旅行同伴的可能，以及用集体的力量化解旅行中的难题。这里崇尚分享和互助的精神，也期待你的旅行故事</p>
				</div>
				<a href="../creatego/"><label class="instruction_btn"><button>告诉我们你的旅行计划</button></label></a>
				<div class="clear"></div>
			</div>
		</div>

		<div class="subslips-container">
			<div class="subslips-top">最新的纸条</div>
			<div class="subslips">
				<?php for ($n=0; $n<7; $n++) {
					$slipsql= "SELECT * FROM gos_slips WHERE status!= -1 GROUP BY idd ORDER BY datetime DESC limit $n, 1"; $sliprow = $mysqli -> query($slipsql) -> fetch_assoc(); 
					if ($sliprow['id']==0) { break; }
					$idd=$sliprow['idd']; ?>
					<a href="../go/<?php echo $sliprow['gos_id'] ?>"><div class="subslip">
						<div class="subslip_text"><?php echo $sliprow['text'] ?>
						<span class="subslip_spots f-sky">
						<?php for ($i=0; $i<3; $i++) { 
							$slipsql= "SELECT * FROM gos_slips WHERE idd=$idd limit $i,1"; $sliprow = $mysqli -> query($slipsql) -> fetch_assoc(); 
							if ($sliprow['id']==0) { break; }
							if ($i==2 && $sliprow['id']!=0) { echo "等地"; break; }
							$spotsql= "SELECT * FROM spots WHERE id= '".$sliprow['spot']."' "; $spotrow= $mysqli -> query($spotsql) -> fetch_assoc(); 
							echo "#".$spotrow['spot']."#&nbsp;&nbsp;&nbsp;";
						} ?></span></div>
					</div></a>
				<?php } ?>
			</div>
		</div>
		<div style="float:left; padding:30px 0 0 0"><a href="<?php echo $config_basedir ?>wechat/"><img src="../../_css/wechat-1.png" style="float:left; width:300px" /></a></div>
	</div>
	<div class="clear"></div>
</div></div>

<?php require("../../_footer.php"); ?>

<script>
	$(".brands_checkbox li").click(function(){
		startSlide(this.id);
		changeBackground();
	})

	function startSlide(to) {
		var distance = 0;
		slide();
		function slide() {
			switch (to) {
				case "nxt":		
				var left = parseInt($(".brands_wrapper").css("left")) - 20;
				if (left >= -1160) {
					$(".brands_wrapper").css("left", left + "px");
					distance = distance + 20;
					if (distance < 580) {
						setTimeout(arguments.callee, 1);
					}
				}
				break;
				case "pre":
				var left = parseInt($(".brands_wrapper").css("left")) + 20;
				if (left <= 0) {
					$(".brands_wrapper").css("left", left + "px");
					distance = distance + 20;
					if (distance < 580) {
						setTimeout(arguments.callee, 1);
					}
				}
				break;			
			}
		}
	}
</script>