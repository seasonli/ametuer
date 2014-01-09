<?php require("../../_config.php"); require("../../_header.php"); ?>

<script>
  $("#photoUploaded", window.parent.document).show();
  $("#photoUnuploaded", window.parent.document).hide();
  $("#photoUploaded", window.parent.document).html("<img src='http://imagea.thefarer.com<?php echo $_GET['url'] ?>' style='margin:10px 0 0 10px; max-height:80px; max-width:180px' /><div style='margin:5px 0 0 10px'>相片已上传，<a href='javascript:void(0)' onClick='changePhoto()'>换一张</a></div>");
  $("#photoUploadedUrl", window.parent.document).html("<input type='hidden' name='image' value='http://imagea.thefarer.com<?php echo $_GET['url'] ?>' />");
</script>