<?php require("../_config.php"); require("../_header.php"); ?>
<style>
table { margin:30px; border:1px solid #ccc; } td { padding:0 5px; border:1px solid #ccc; }
</style>
<div id="d_outer"><div id="d_inner">
<div id="top"><br/><br/>
<?php
echo "<table><tr><td>Users</td></tr><tr>";
$usersql="SELECT * FROM users"; $usernumrow=mysql_num_rows(mysql_query($usersql)); echo "<td>Registered: ".$usernumrow."</td>";
$usersql="SELECT * FROM users WHERE status>-1"; $usernumrow=mysql_num_rows(mysql_query($usersql)); echo "<td>Verified: ".$usernumrow."</td>";
$usersql="SELECT * FROM users WHERE status>0"; $usernumrow=mysql_num_rows(mysql_query($usersql)); echo "<td>Logined: ".$usernumrow."</td>";
echo "</tr></table>";

$gosql="SELECT * FROM gos WHERE status!=-1"; $gonumrow=mysql_num_rows(mysql_query($gosql));
echo "<table><tr><td>Gos</td><td>All in all: ".$gonumrow."</td></tr>";
for ($n=0; $n<20; $n++) {
$gosql="SELECT * FROM gos WHERE status!=-1 ORDER BY datetime_renew DESC LIMIT $n, 1"; $gorow=mysql_fetch_assoc(mysql_query($gosql));
if (empty($gorow)) { break; }
echo "<tr><td>".$gorow['id']."</td><td>".$gorow['title']."</td><td>".$gorow['datetime_renew']."</td><td>".$gorow['datetime']."</td></tr>";
}
echo "</table>";

$goreplysql="SELECT * FROM gos_replies WHERE status!=-1"; $goreplynumrow=mysql_num_rows(mysql_query($goreplysql));
echo "<table><tr><td>Gos_replies</td><td>All in all: ".$goreplynumrow."</td></tr>";
for ($n=0; $n<20; $n++) {
$goreplysql="SELECT * FROM gos_replies WHERE status!=-1 ORDER BY id DESC LIMIT $n, 1";  $goreplyrow=mysql_fetch_assoc(mysql_query($goreplysql));
if (empty($gorow)) { break; }
echo "<tr><td>".$goreplyrow['id']."</td><td>".$goreplyrow['text']."</td><td>".$goreplyrow['datetime']."</td></tr>";
}
echo "</table>"
?>
</div>
</div></div>

</body></html>
