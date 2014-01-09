<body>
	
<script>
function nomygo() { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你还没有建立过任何一条行程哟<br/><br/><label style='float:left'><input type='button' value='确认' onclick='closealert()'/></label>"); die; }
</script>

<?php $mygosql = "SELECT * FROM gos WHERE users_id= '".$_SESSION['ID']."' AND status!=-1 ORDER BY id DESC limit 1" ; 
$mygorow = $mysqli -> query($mygosql) -> fetch_assoc(); ?>

<div id="a_outer"><div id="a_inner">
	<div class="headnav">
		<ul class="my">
			<a <?php if ($mygorow['id']==0 and isset($_SESSION['ID'])==TRUE ) { echo "onClick='nomygo()'"; } else if($mygorow['id']!=0) {echo "href='".$config_basedir."travel/go/".$mygorow['id']."'"; } else if (isset($_SESSION['ID'])==FALSE) {echo "href='".$config_basedir."account/login/?fail=needlogin'"; } ?>><li>我的旅行计划</li></a>
			<a href="<?php echo $config_basedir."travel/creatego/" ?>"><li>建立旅行计划</li></a>
		</ul>
		<ul class="love">
			<a href="<?php echo $config_basedir."travel/love/" ?>"><li>我关注的旅行</li></a>
		</ul>
		<a href="<?php echo $config_basedir."travel/new/" ?>" title="更远网"><div class="logo"><img src="<?php echo $config_basedir ?>_css/logo-grey.png" /></div></a>
	</div>
	<div class="topnav">
		<?php if(isset($_SESSION['ID'])==TRUE) { ?>
			<ul class="name">
				<img src="<?php echo $_SESSION['AVATOR'] ?>" />
				<a href="<?php echo $config_basedir ?>account/" ><li class="account"><?php echo $_SESSION['NAME'] ?></li></a>
				<a href="<?php echo $config_basedir ?>account/login/-logout.php" ><li class="logout">注销登录</li>
			</ul>
			<a href="<?php echo $config_basedir ?>mail" ><ul class="mail"><div class="news"></div></ul></a>			
		<?php }  else { ?>
			<a href="<?php echo $config_basedir ?>account/login/" ><ul class="login"><div class="news"></div></ul></a>
		<?php } ?>
	</div>
</div></div>
