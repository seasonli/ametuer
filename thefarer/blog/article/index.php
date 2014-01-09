<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verifyblog.php"); ?>
<script>
function removeblog(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='-removeblog.php' method='post'><label style='float:left'><input name='myblog' type='hidden' value='"+value+"' /><input type='submit' value='确认'></label></form>"); }
</script>

<title>更远博客</title>
<?php require("../../_a_blog.php"); ?>

<?php
$oneblogsql= "SELECT * FROM blogs WHERE id = '".$_GET['blog']."' "; $oneblogrow= mysql_fetch_assoc(mysql_query($oneblogsql));
$oneusersql= "SELECT * FROM users WHERE id = '".$oneblogrow['users_id']."' "; $oneuserrow= mysql_fetch_assoc(mysql_query($oneusersql));
?>

<div id="d_outer"><div id="d_inner">

<div id="top">
<div id="oneuser-container">
	<div class="oneuser">
		<img src="<?php echo $oneuserrow['avator_thumb'] ?>" />
		<div class="oneuser_text"><?php echo $oneuserrow['name']."：".$oneblogrow['title']; ?></div>
	</div>
</div>
</div>

<div id="left">
<div id="article-container">
	<div class="article">
		<div class="article_text content"><?php echo nl2br($oneblogrow['text']); ?></div>
		<?php if(strlen($oneblogrow['img'])==TRUE) { ?><div class="onetopic_img"><img src="<?php echo $oneblogrow['img'] ?>" /></div><?php } ?> 
	</div>
	<div class="article_replies"><?php require("_blogreplies.php"); ?></div>
	<div class="article_page">
		<a href="?topic=<?php echo $_GET['blog'] ?>" class="link-block">首页</a>&nbsp;&nbsp;&nbsp;
		<?php $blogreplysql="SELECT * FROM blogs_replies WHERE blogs_id = '".$_GET['blog']."' AND users_id!= '".$topicrow['users_id']."' AND status!=-1"; $blogreplynumrow=mysql_num_rows(mysql_query($blogreplysql)); $pagenumrow=$blogreplynumrow/30+1; 
		for($i=$p-3; $i<$p+7; $i++) {
			if ($i>0 and $i<$pagenumrow and $i!=$p) {echo "<a class='link-block' href='?topic=".$_GET['blog']."&p=".$i."#mark'>&nbsp;&nbsp;".$i."&nbsp;&nbsp;</a>"; }
			if ($i==$p) { echo "&nbsp;&nbsp;".$i."&nbsp;&nbsp;"; }
		} ?>
	</div>	
	<?php if (isset($_SESSION['ID'])==TRUE) { ?>
		<div class="article_input">
			<form action="-replyblog.php" onsubmit="return checktextarea()" method="post">
				<textarea name="text" style="float:left; width:360px; height:80px; "></textarea> 
				<label style="float:left; margin:62px 0 0 10px"><input name="submit" type="submit" value="回应" /></label>
				<input type="hidden" name="blog" value="<?php echo $_GET['blog'] ?>" />
			</form>
		</div>
	<?php } ?>
</div>	
</div>

<div id="right">
<?php if ($_SESSION['ID']==$oneblogrow['users_id']) { ?>			
<div class="rightnav">
	<a href="../revise/?blog=<?php echo $_GET['blog']?>"><div>
		<li class="rightnav_revisego_icon icon"></li>			
		<li class="text">修改这篇</li>			
	</div></a>
	<div onclick="removeblog(<?php echo $_GET['blog'] ?>)" >
		<li class="rightnav_removego_icon icon"></li>			
		<li class="text">删除这篇</li>			
	</div>
</div>
<?php } ?>
</div>

</div></div>

<?php require("../../_footer.php"); ?>