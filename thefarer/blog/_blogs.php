<?php $p=$_GET['p']; if($p==0) {$p=1;} $n=$p*5; ?>

<?php 
for ($i=$n-5; $i<$n; $i++) { 
	$blogsql ="SELECT * FROM blogs WHERE status!=-1 ORDER by datetime_renew desc limit $i,1"; $blogrow=mysql_fetch_assoc(mysql_query($blogsql)); 
	$blogreplynum=mysql_num_rows(mysql_query("SELECT * FROM blogs_replies WHERE blogs_id = '".$blogow['id']."' "));
	if ($blogrow['id']==0) { break; } ?>
	<div class="blog">
		<?php $usersql=" SELECT * FROM users WHERE id= '".$blogrow['users_id']."' "; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
		<div class="blog_title">
			<div class="topic_content_title">		
				<a href="article/<?php echo $blogrow['id'] ?>"><?php echo $blogrow['title'] ?></a>
			</div>
			<div class="blog_text content"><?php echo mb_substr(nl2br($blogrow[text]),0,720,"utf-8"); ?><br/><br/>
				<span style="float:left;"><img src="<?php echo $userrow['avator_thumb'] ?>" width="16px"/></span>&nbsp;
				<?php echo $userrow['name'] ?> | <?php $blogreplynum=mysql_num_rows(mysql_query("SELECT * FROM blogs_replies WHERE blogs_id = '".$blogrow[id]."' AND status!=-1 ")); echo $blogreplynum ?> 个回应
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $blogrow['time'] ?>
			</div>    
		</div> 
	</div>
<?php } ?>

<div class="blog_page">
	<a href="../blog" class="link-block">&nbsp;&nbsp;首页&nbsp;&nbsp;</a>&nbsp;&nbsp;&nbsp;
	<?php $blogsql="SELECT * FROM blogs WHERE status!=-1"; $blognumrow=mysql_num_rows(mysql_query($blogsql)); $pagenumrow=$blognumrow/5+1;
	for($i=$p-3; $i<$p+7; $i++) {
		if ($i>0 and $i<$pagenumrow and $i!=$p) {echo "<a class='link-block' href='?p=".$i."'>&nbsp;&nbsp;".$i."&nbsp;&nbsp;</a>"; }
		if ($i==$p) { echo "&nbsp;&nbsp;".$i."&nbsp;&nbsp;"; }
	} ?>
</div>	