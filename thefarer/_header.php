<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	
<head>
<link rel="shortcut icon" type="image/x-icon" href="/css/ico.ico" media="screen" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet/less" type="text/css" href="/_css/standard.less" >

<script type="text/javascript" >var config_basedir="<?php echo $config_basedir ?>"</script>
<script type="text/javascript" src="/_scripts/jquery.min.js"></script>
<script type="text/javascript" src="/_scripts/less-1.3.3.min.js"></script>
<script type="text/javascript" src="/_scripts/template.syntax.1.0.min.js"></script>
<script type="text/javascript" src="/_scripts/jquery.imgareaselect.min.js"></script>
<script type="text/javascript" src="/_scripts/standard.js"></script>

<script type="text/html" id="template-go">
	{each go as val i}
		<div class="go" id="{ val.id }" onmouseout="hideslidedown(this.id)" onmouseover="showslidedown(this.id)">
			<div class="go_spots">
				<div class="go_spots_spots">
					{ if val.spot_0 }
						#{ val.spot_0 }#&nbsp;&nbsp;&nbsp;
					{ /if }
					{ if val.spot_1 }
						#{ val.spot_1 }#&nbsp;&nbsp;&nbsp;
					{ /if }
					{ if val.spot_2 }
						#{ val.spot_2 }#&nbsp;&nbsp;&nbsp;
					{ /if }
					{ if val.spot_3 }
						#{ val.spot_3 }#&nbsp;&nbsp;&nbsp;
					{ /if }
					{ if val.spot_4 }
						#{ val.spot_4 }#
					{ /if }
				</div>
				<div class="go_spots_start">
					{ if val.startday != 0 || val.start }
						{ if val.startday != 0 }
							{ val.startday_ }
						{ /if }
						{ if val.startdays != 0 }  
							~ { val.startdays_ }
						{ /if }
						{ if val.start }
						从{ val.start }
						{ /if }
						出发
					{ /if }
				</div>
			</div>
			<div class="go_avator"><img src="{ val.user.avator_thumb }" /></div>
			<div class="go-middle">	
				<div class="go_title"><a href="../go/{ val.id }">{ val.user.name }：{ val.title }</a></div>
				<div class="go_date">{ val.datetime } 记下的</div>
				<div class="go_icons"><ul class="talk">{ val.goreplynum }</ul></div>
				<div class="clear"></div>
				<div class="go_text">
					{ val.text }
				</div>
				<div class="go-addition go-addition">
					<div class="go_slidedown go_slidedown{ val.id }" id="{ val.id }" onclick='browsego(this.id)'>点击快速回复</div>
					<div class="go_input go_input{ val.id }">
						<textarea class="replygo<{ val.id }"></textarea>
						<input type="button" class="green" onclick="replygo(this.id)" id="{ val.id }" value="回 应" />
					</div>	
				</div>	
			</div>
			{ if val.live }
				<div class="go_img"><img src="{ val.live }" /></div>
			{ /if }
			<div class="clear"></div>
		</div>
	{ /each }
</script>

</head>
