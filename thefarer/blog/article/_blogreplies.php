<script>
function removeblogreply(value) { var height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除?<br/><br/><label style='float:left'><input type='button' value='确认' onclick='confirmremoveblogreply("+value+"); closealert()'/></label>"); }
function confirmremoveblogreply(value) { var height=$(document).height(); 
	$.post("../../verify/_ajax_verify.php", function(data) {
		if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你可能还没有登录"); }	
		else {
			$.post("_ajax_removeblogreply.php", {blogreply:value}, function(data){
				if (data==-1) { $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你没有这个操作的权限，建议刷新页面，确认链接的来源"); }	
				else { $(".blogreply"+value).fadeOut(300); $("#alert_outer").delay(500).show(1); $("#alert_outer").height("0"); $("#alert").html("删除成功"); $("#alert_outer").delay(1000).hide(1); }
			})
		}
	})
}	
</script>

<?php $p=$_GET['p']; if($p==0) {$p=1;} $n=$p*30; ?>

<?php for ($i=$n-30; $i<$n; $i++) {
	$blogreplysql= "SELECT * FROM blogs_replies WHERE blogs_id = '".$_GET['blog']."' AND users_id!= '".$topicrow['users_id']."' AND status!=-1 order by id limit $i,1"; $blogreplyrow=mysql_fetch_assoc(mysql_query($blogreplysql)); 
	if ( $blogreplyrow['id']==0) { break; } ?>
	<div class="article_reply blogreply<?php echo $blogreplyrow['id'] ?>">
		<?php $usersql="SELECT * FROM users WHERE id= '".$blogreplyrow['users_id']."'"; $userrow=mysql_fetch_assoc(mysql_query($usersql)); ?>
		<div class="article_reply_avator"><img src="<?php echo $userrow['avator_thumb'] ?>" /></div>
		<div class="article_reply_name"><?php echo $userrow['name']; ?></div>              
		<div class="article_reply_sign">					
			<?php if ($_SESSION['ID']==$blogreplyrow['users_id']) { ?><a href="javascript:void(0)"><span id="<?php echo $blogreplyrow['id'] ?>" onclick="removeblogreply(this.id)">X</span></a><?php } ?>
			<span><?php echo $blogreplyrow['datetime'] ?></span>
		</div>
		<div class="article_reply_text"><?php echo nl2br($blogreplyrow['text']); ?></div>
 	</div>
<?php } ?>






