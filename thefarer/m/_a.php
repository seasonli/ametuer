<body>
<div id="m_a_outer">
	<div><img src="<?php echo $config_basedir ?>_css/logo.png" /></div>
	<div style="padding:0 5px 5px 5px"><a href="<?php echo $config_basedir_m ?>go/new/">最新计划</a> | <?php if(isset($_SESSION['ID'])==TRUE) { ?><a href="<?php echo $config_basedir_m ?>me/"><?php echo $_SESSION['NAME'] ?></a> | <a href="<?php echo $config_basedir_m ?>account/login/-logout.php">[注销]</a><?php } else { ?><a href="<?php echo $config_basedir_m ?>account/login/">[登录]</a><?php } ?></div>
</div>

