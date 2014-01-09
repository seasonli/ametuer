{each go as val i}
	<div class="go" id="<%=go[n].id%>" onmouseout='hideslidedown(this.id)' onmouseover='showslidedown(this.id)'>
		<div class="go_spots">
			<div class="go_spots_spots"><%for(i=0; i<go[n].spot.length; i++) {%> #<%=go[n].spot[i] %>#&nbsp;&nbsp;&nbsp; <%}%></div>
			<div class="go_spots_start">
				<%if(go[n].startday!=0 || go[n].start!=0 ) {
					if (go[n].startday!=0) {%>
						<%=go[n].startday_%>
					<%}
					if (go[n].startdays!=0) {%> ~ 
						<%=go[n].startdays_%>
					<%}
					if (go[n].start!=0) {%>从
						<%=go[n].start%>
					<%}%>
					出发
				<%}%> 
			</div>
		</div>
		<div class="go_avator"><img src="<%=go[n].user.avator_thumb%>" /></div>
		<div class="go-middle">	
			<div class="go_title"><a href="../go/<%=go[n].id%>"><%=go[n].user.name%>：<%=go[n].title%></a></div>
			<div class="go_date"><%=go[n].datetime%>记下的</div>
			<div class="go_icons"><ul class="talk"><%=go[n].goreplynum%></ul></div>
			<div class="clear"></div>
			<div class="go_text"><%=go[n].text%>……</div>
			<div class="go-addition go-addition">
				<div class="go_slidedown go_slidedown<%=go[n].id%>" id="<%=go[n].id%>" onclick='browsego(this.id)'>点击快速回复</div>
				<div class="go_input go_input<%=go[n].id%>">
					<textarea class="replygo<%=go[n].id%>"></textarea>
					<input type="button" class="green" onclick="replygo(this.id)" id="<%=go[n].id%>" value="回 应" />
				</div>	
			</div>	
		</div>
		<%if(go[n].live) {%><div class="go_img"><img src="<%=go[n].live%>" /></div><%}%>
		<div class="clear"></div>
	</div>
{/each}
