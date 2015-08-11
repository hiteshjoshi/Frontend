
//on hover effect for team members cards.
$('.special.cards .image').dimmer({
  on: 'hover'
})

//drawer functionality for Chat window
$(".top-bar").on("click",function(){
	$(".chat").css("display","none");
	$(".chat-minified").css("display","block");
})
$(".chat-minified").on("click",function(){
	$(this).css("display","none");
	$(".chat").css("display","block")
})