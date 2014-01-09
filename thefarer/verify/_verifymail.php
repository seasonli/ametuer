<?php 
$mailsql= "SELECT * FROM mails WHERE id= '".$_GET['mail']."'" ; $mailrow=mysql_fetch_assoc(mysql_query($mailsql)); 
if ($mailrow['id']==0) { chdir(dirname(__FILE__)); require("../_error/_empty.php"); die(); }
else if ( ($mailrow['status_sender']!=-1 or $mailrow['status_receiver']!=-1) and ($mailrow['sender']!=$_SESSION['ID'] and $mailrow['receiver']!=$_SESSION['ID']) ) { chdir(dirname(__FILE__)); require("../_error/_noauthority.php"); die(); }
else if ( ($mailrow['status_sender']==-1 and $mailrow['sender']==$_SESSION['ID']) or ($mailrow['status_receiver']==-1 and $mailrow['receiver']==$_SESSION['ID']) ) { chdir(dirname(__FILE__)); require("../_error/_empty.php"); die(); } ?>