<script>
$(function(){
	$("#calendar_nxt").click(function(){
		$.post("_ajax_calendar.php", {to:"nxt"}, function(data) {
			$('#calendar-wrapper').html(data);
			startday=$("#startday").val(); startdays=$("#startdays").val();
			$("#calendar_container li").removeClass('on');
			if (startdays==0) { $("#"+startday).addClass('on'); }
			else {
				times=(parseFloat(startdays)-parseFloat(startday))/86400;
				abstimes=Math.abs(times);
				ii=parseFloat(startday);
				for (i=0;i<=abstimes;i++) {
					$("#"+ii).addClass('on');
					ii=ii+86400; } } }) }) })
$(function() {
	$("#calendar_pre").click(function(){
		$.post("_ajax_calendar.php", {to:"pre"}, function(data) {
			$('#calendar-wrapper').html(data);
			startday=$("#startday").val(); startdays=$("#startdays").val();
			$("#calendar_container li").removeClass('on');
			if (startdays==0) { $("#"+startday).addClass('on'); }
			else {
				times=(parseFloat(startdays)-parseFloat(startday))/86400;
				abstimes=Math.abs(times);
				ii=parseFloat(startday);
				for (i=0;i<=abstimes;i++) {
					$("#"+ii).addClass('on');
					ii=ii+86400; } } }) }) })
				
startday_=$("#startday").attr("alt");
startdays_=$("#startdays").attr("alt");
			
function selectdate(value) {
	startday=$("#startday").val(); startdays=$("#startdays").val();
	if (startday==0) { startday=value; startday_=$("#"+value).attr("alt"); $("#calendar_date").html(startday_); }
	else if ( startdays==0 ) { if (value>startday) {startdays=value; startdays_=$("#"+value).attr("alt"); } else {startdays=startday; startday=value; startdays_=startday_; startday_=$("#"+value).attr("alt"); } $("#calendar_date").html(startday_+" ~ "+startdays_); }
	else {startday=value; startdays=0; startday_=$("#"+value).attr("alt"); $("#calendar_date").html(startday_); } 		
	$("#startday").val(startday); $("#startdays").val(startdays);	 
	$("#calendar_container li").removeClass('on');
	if (startdays==0) { $("#"+startday).addClass('on'); }
	else {
		times=(parseFloat(startdays)-parseFloat(startday))/86400;
		abstimes=Math.abs(times);
		ii=parseFloat(startday);
		for (i=0;i<=abstimes;i++) {
			$("#"+ii).addClass('on');
			ii=ii+86400; }	} }
			
function canceldate() { $("#startday").val("0"); $("#startdays").val("0"); $("#calendar_date").html("出发日期 / 范围"); $("#calendar_container li").removeClass('on'); }
</script>

<?php require("../../../_config.php"); ?>
<?php if ($_POST['to']==nxt) {
	if ($_SESSION['TMP_MONTH']==12) {$_SESSION['TMP_MONTH']=1; $_SESSION['TMP_YEAR']++;}
	else {$_SESSION['TMP_MONTH']++;}
}
if ($_POST['to']==pre) {
	if ($_SESSION['TMP_MONTH']==1) {$_SESSION['TMP_MONTH']=12; $_SESSION['TMP_YEAR']--;}
	else {$_SESSION['TMP_MONTH']--;}
}
?>
<span id="calendar_pre"><</span>
<div id="calendar_month"><?php echo strtoupper(date("Y - M",mktime(0,0,0,$_SESSION['TMP_MONTH'],1,$_SESSION['TMP_YEAR']))); ?></div>
<span id="calendar_nxt">></span>
<div id="calendar_days"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></div>
<div id="calendar_container">
<?php for ($i=1; $i<date("w",mktime(0,0,0,$_SESSION['TMP_MONTH'],1,$_SESSION['TMP_YEAR']))+1; $i++) {
	echo "<li></li>";
}
/*计算每月天数*/
switch($_SESSION['TMP_MONTH']) {
	case 4: case 6: case 9: case 11: $days=30;
	break;
	case 2:
	if ($_SESSION['TMP_YEAR']%4==0) {
		if ($_SESSION['TMP_YEAR']%100==0) {
			if ($_SESSION['TMP_YEAR']%400==0) {
				$days=29;
			}
        	else {
				$days=28;
			}
		}
		else {
			$days =29;
		}
	}
    else {
		$days=28;
	}
	break;
	default:
	$days = 31;
	break;
}

for ($i=1; $i<$days+1; $i++) {
	$date=mktime(0,0,0,date("m"),date("d"),date("Y")); ?>
	<li id="<?php echo mktime(0,0,0,$_SESSION['TMP_MONTH'],$i,$_SESSION['TMP_YEAR']); ?>" alt="<?php echo $_SESSION['TMP_YEAR']."-".$_SESSION['TMP_MONTH']."-"; if ($i<10) {echo "0";} echo $i; ?>" onclick="selectdate(this.id)"><?php echo $i ?></li>
<?php } ?>
</div>