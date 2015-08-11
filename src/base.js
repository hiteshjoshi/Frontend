//some functions
function navigate(x){window.location= x}
function display(x,y){$(x).css("display",y)}
function setActive(x){
	$(".item").removeClass("active");
	$(x).addClass("active");
}

$("left-link").on("click",function(){
	setActive(this)
})
//on hover effect for team members cards.
$('.special.cards .image').dimmer({
  on: 'hover'
})

//drawer functionality for Chat window
$(".top-bar").on("click",function(){
	$('.chat').transition('fly up');
	$(".chat").css("display","none");
	$(".chat-minified").css("display","block");
})
$(".chat-minified").on("click",function(){
	$(this).css("display","none");
	$(".chat").css("display","block")
})

//header navigation
$(".home").on("click",function(){navigate("index.html")})
$(".team").on("click",function(){navigate("team.html")})
$(".account").on("click",function(){navigate("account.html")})


//css navigation
$(".open").on("click",function(){ //show open tickets
	display(".red","block");
	display(".green","block");
	display(".green","none");
	setActive(".open")}) 
$(".resolved").on("click",function(){ //show resolved tickets
	display(".red","block");
	display(".green","block");
	display(".red","none");
	setActive(".resolved")}) 
$(".all").on("click",function(){
	display(".red","block");
	display(".green","block");
	setActive(".all")	
})