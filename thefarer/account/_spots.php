<script>

function loadevers() { $.post("_ajax_loadevers.php", function(data) { $('.dna_spots.evers').html(data) }) }	
$(function() { $("#readever").val("输入你去过的地方"); $("#readever").css("color","#999") })
$(function() { $("#readever").focus(function() { var value=$(this).val(); if (value=="输入你去过的地方") { $(this).val(""); $(this).css("color","#333"); $("#ever").val("0"); $("#fillever").html(""); } }) })
$(function() { $("#readever").blur(function() { var value=$(this).val(); $(this).val("输入你去过的地方"); $(this).css("color","#999");$('#sugever').fadeOut(300) }) })
function readever(value) { if(value.length==0 || value=="输入你去过的地方" ) { $('#sugever').fadeOut(300);}
	else { $.post("_ajax_sugever.php", {spot: value}, function(data) {
		if(data.length>0) { $('#sugever').fadeIn(300); $('#sugever').html(data) } }) } }
function fillever(value) { $("#readever").val(""); $("#readever").focus(); $('.dna_spots.evers').append(value); } /*readever清空拜拜fillever来了*/
function addever(value) { $.post("_ajax_addever.php", {spot: value}, function(data){ 
	if(data==1) { height=$(document).height(); $(".dna_spots.evers li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); $("#alert").html("你好像添加过这个地点了");
	 } }) } /*ever赋值*/
$(function() {
	$("#readever").keydown(function(event) {
		if(event.which==13) { value=$("#spaceever").val(); /*当只有一个匹配时有个hiddeninput*/
			if (value>0) {
				$.post("_ajax_spaceever.php", {ever:value}, function(data) { 	
					$("#readever").val(""); setTimeout("$('#readever').focus()", 50); $('.dna_spots.evers').append(data); 
					$.post("_ajax_addever.php", {spot: value}, function(data){ if(data==1) { 
						height=$(document).height();
						$(".dna_spots.evers li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); 
						$("#alert").html("你好像添加过这个地点了");
					} }); /*ever赋值*/ 					
					$("#spaceever").val("0"); /*hiddeninput要清空*/ }) } } }) })
function showremoveevers() { $.post("_ajax_showremoveevers.php", function(data) { $(".dna_spots.evers").html(data); $(".dna_spots.evers").append("<label style='float:right'><input type='button' value='完 成' onClick='loadevers()' /></label>"); }) }
function removeever(value) { $.post("_ajax_removeever.php", {spot:value}, function() { $('.ever'+value).hide(); }) }


function loadloves() { $.post("_ajax_loadloves.php", function(data) { $('.dna_spots.loves').html(data) }) }	
$(function() { $("#readlove").val("输入你想去的地方"); $("#readlove").css("color","#999") })
$(function() { $("#readlove").focus(function() { var value=$(this).val(); if (value=="输入你想去的地方") { $(this).val(""); $(this).css("color","#333"); $("#love").val("0"); $("#filllove").html(""); } }) })
$(function() { $("#readlove").blur(function() { var value=$(this).val(); $(this).val("输入你想去的地方"); $(this).css("color","#999");$('#suglove').fadeOut(300) }) })
function readlove(value) { if(value.length==0 || value=="输入你想去的地方" ) { $('#sugever').fadeOut(300);}
	else { $.post("_ajax_suglove.php", {spot: value}, function(data) {
		if(data.length>0) { $('#suglove').fadeIn(300); $('#suglove').html(data) } }) } }
function filllove(value) { $("#readlove").val(""); $("#readlove").focus(); $('.dna_spots.loves').append(value); } /*readlove清空拜拜filllove来了*/
function addlove(value) { $.post("_ajax_addlove.php", {spot: value}, function(data){ if(data==1) { 
	height=$(document).height();
	$(".dna_spots.loves li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); 
	$("#alert").html("你好像添加过这个地点了");
	 } }) } /*love赋值*/
$(function() {
	$("#readlove").keydown(function(event) {
		if(event.which==13) { value=$("#spacelove").val(); /*当只有一个匹配时有个hiddeninput*/
			if (value>0) {
				$.post("_ajax_spacelove.php", {love:value}, function(data) { 	
					$("#readlove").val(""); setTimeout("$('#readlove').focus()", 50); $('.dna_spots.loves').append(data); 
					$.post("_ajax_addlove.php", {spot: value}, function(data){ if(data==1) { 
						height=$(document).height();
						$(".dna_spots.loves li:last").hide(); $("#alert_outer").show(); $("#alert_outer").height(height+"px"); 
						$("#alert").html("你好像添加过这个地点了<br/><br/><input type='button' value='确认' onclick='closealert()'/>");
					} }); /*love赋值*/ 				
					$("#spacelove").val("0"); /*hiddeninput要清空*/ }) } } }) })
function showremoveloves() { $.post("_ajax_showremoveloves.php", function(data) { $('.dna_spots.loves').html(data); $(".dna_spots.loves").append("<label style='float:right'><input type='button' value='完 成' onClick='loadloves()' /></label>");}) }
function removelove(value) { $.post("_ajax_removelove.php", {spot:value}, function() { $('.love'+value).hide(); }) }					

					
$(function() { $("#readnow").val("现居"); $("#readnow").css("color","#999") })
$(function() { $("#readnow").focus(function() { var value=$(this).val(); if (value=="现居") { $(this).val(""); $(this).css("color","#333"); $("#now").val("0"); $("#fillnow").html(""); } }) })
$(function() { $("#readnow").blur(function() { var value=$(this).val(); $(this).val("现居"); $(this).css("color","#999");$('#sugnow').fadeOut(300) }) })
function readnow(value) { if(value.length==0 || value=="现居") { $('#sugnow').fadeOut(300);}
	else { $.post("_ajax_sugnow.php", {spot: value}, function(data) {
		if(data.length>0) { $('#sugnow').fadeIn(300); $('#sugnow').html(data) } }) } }
function fillnow(value) { $("#readnow").val(""); $("#readnow").focus(); $('.dna_spots.now').html(value); } /*readnow清空拜拜fillnow来了*/
function addnow(value) { $.post("_ajax_addnow.php", {spot: value}, function(){ }) } /*now赋值*/
$(function() {
	$("#readnow").keydown(function(event) {
		if(event.which==13) { value=$("#spacenow").val(); /*当只有一个匹配时有个hiddeninput*/
			if (value>0) {
				$.post("_ajax_spacenow.php", {now:value}, function(data) { 	
					$("#readnow").val(""); setTimeout("$('#readnow').focus()", 50); $('.dna_spots.now').html(data); 
					$.post("_ajax_addnow.php", {spot: value}, function(data){ }); /*now赋值*/ 				
					$("#spacenow").val("0"); /*hiddeninput要清空*/ }) } } }) })	

</script>

<div class="dna spots-wrapper">
	<div class="dna_top">
		<div class="dna_top_title">现居</div>			
		<div class="dna_top_option">
			<span class="click-underline add" onclick="$('.adddna_now').toggle()">修改</span>	
		</div>
	</div>
	<div class="dna_spots spots-wrapper now">
		<?php $dnasql="SELECT * FROM dna_now WHERE users_id = '".$_SESSION['ID']."' "; $dnarow=mysql_fetch_assoc(mysql_query($dnasql)); $spotsql="SELECT * FROM spots WHERE id = '".$dnarow['spots_id']."' "; $spotrow=mysql_fetch_assoc(mysql_query($spotsql)); echo "<li>".$spotrow['spot']."</li>"; ?></div>
	<div class="adddna_now">		
		<input id="readnow" type="text" maxlength="10" oninput="readnow(this.value)" onpropertychange="readnow(this.value)" />
		<div id="sugnow" class="sugspot"></div>
	</div>
</div>
<div class="dna spots-wrapper">
	<div class="dna_top">
		<div class="dna_top_title">去过</div>	
		<div class="dna_top_option">
			<span class="click-underline remove" onClick="$('.adddna_ever').hide(); showremoveevers()">删去</span>
			<span class="click-underline add" onClick="loadevers(); $('.adddna_ever').toggle()">增加</span>	
		</div>
	</div>
	<div class="dna_spots spots-wrapper evers"><?php require("_ajax_loadevers.php"); ?></div>
	<div class="adddna_ever">		
		<input id="readever" type="text" maxlength="10" oninput="readever(this.value)" onpropertychange="readever(this.value)" />
		<div id="sugever" class="sugspot"></div>
	</div>		
</div>
<div class="dna spots-wrapper">
	<div class="dna_top">
		<div class="dna_top_title">想去</div>	
		<div class="dna_top_option">		
			<span class="click-underline remove" onClick="$('.adddna_love').hide(); showremoveloves()">删去</span>
			<span class="click-underline add" onClick="loadloves(); $('.adddna_love').toggle()">增加</span>
		</div>
	</div>
	<div class="dna_spots spots-wrapper loves"><?php require("_ajax_loadloves.php"); ?></div>
	<div class="adddna_love">		
		<input id="readlove" type="text" maxlength="10" oninput="readlove(this.value)" onpropertychange="readlove(this.value)" />
		<div id="suglove" class="sugspot"></div>
	</div>
</div>