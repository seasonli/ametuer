<?php require("../_config.php"); require("../_header.php"); require("../verify/_verify.php"); ?>

<title>更远网：我的信箱</title>

<?php require("../_a.php"); require("../_b.php"); ?>

<script>	
function removemail(value) { height=$(document).height(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("确认删除吗，无法恢复<br/><br/><form action='-removemail.php?p=<?php echo $_GET['p'] ?>' method='post'><input name='mail' type='hidden' value='"+value+"' /><label style='float:left'><input type='submit' value='确认'></label></form>"); }	
</script>

<?php $p=$_GET['p']; if($p==0) {$p=1;} $n=$p*10; ?>

<div id="b_outer"><div id="b_inner">
	<img src="<?php echo $_SESSION['AVATOR'] ?>" />
	<em><?php echo $_SESSION['NAME'] ?>的信箱</em>
</div></div>

<div id="d_outer"><div id="d_inner">
	<div id="left">
		<div id="mails-container">	
			<?php for ($i=$n-10; $i<$n; $i++) {
				$mailsql= "SELECT * FROM mails WHERE receiver= '".$_SESSION['ID']."' AND status_receiver!=-1 order by datetime desc limit $i,1"; $mailrow=mysql_fetch_assoc(mysql_query($mailsql)); 
				if ($mailrow['id']==0) { break; }
				$usersql= "SELECT * FROM users WHERE id = '".$mailrow['sender']."' ";
				$userrow= mysql_fetch_assoc(mysql_query($usersql));?>
				<div class="mail">
					<div class="mail_text<?php if ($mailrow['status_receiver']==1) {echo " unread";} ?>"><a href="mail/?mail=<?php echo $mailrow['id'] ?>"><?php echo mb_substr($mailrow['text'],0,30,"utf-8"); ?>……</a></div>
					<div class="mail_sender"><?php echo $userrow['name'] ?></div>
					<div class="mail_time"><?php echo $mailrow['datetime'] ?></div>
					<div class="mail_remove"><a href="javascript:void(0)"><span id="<?php echo $mailrow['id'] ?>" onClick="removemail(this.id)">&nbsp;X&nbsp;</span></a></div>
				</div>	
			<?php } ?>
		<div class="mails_page">
			<a href="../mail/" class="link-block">&nbsp;&nbsp;首页&nbsp;&nbsp;</a>&nbsp;&nbsp;&nbsp;
			<?php $mailsql="SELECT * FROM mails WHERE receiver= '".$_SESSION['ID']."' AND status_receiver!=-1"; $mailnumrow=mysql_num_rows(mysql_query($mailsql)); $pagenumrow=$mailnumrow/10+1; 
			for($i=$p-3; $i<$p+7; $i++) {
				if ($i>0 and $i<$pagenumrow and $i!=$p) {echo "<a class='link-block' href='?p=$i'>&nbsp;&nbsp;".$i."&nbsp;&nbsp;</a>"; }
				if ($i==$p) { echo "&nbsp;&nbsp;".$i."&nbsp;&nbsp;"; }
		  	} ?>
		</div>
		</div>	
	</div>
	<div id="right">

	</div>
</div></div>

<div id="c_outer"><div id="c_inner">
	<div class="kneenav">
		<a href="outbox/"><ul>发出的信</ul></a>
	</div>
</div></div>

<?php require("../_footer.php"); ?>

