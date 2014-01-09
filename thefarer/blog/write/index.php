<?php require("../../_config.php"); require("../../_header.php"); require("../../verify/_verify.php"); ?>
<title>更远博客</title>
<?php require("../../_a_blog.php"); ?>

<div id="d_outer"><div id="d_inner">

<div id="left">
    <div style="float:left; padding:50px 0 100px 0; width:580px">
        <form action="-write.php" method="post" onsubmit="return check()" >
            <div style="float:left; line-height:30px; width:80px; ">标题</div>
            <div style="float:left; height:30px; width:500px"><input name="title" type="text" style="width:480px;" maxlength="30" /></div>
            <div style="float:left; margin:20px 0 0 0; line-height:30px; width:80px">内容</div>
            <div style="float:left; margin:20px 0 0 0; width:500px"><textarea name="text" style="width:480px; height:500px"></textarea></div>          
            <label style="float:left; margin:20px 0 0 80px"><input type="submit" name="submit" value="好 了" /></label>
        </form>
    </div>	
</div>


</div></div>
<?php require("../../_footer.php"); ?>