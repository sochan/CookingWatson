//console.log("Cooking Started");

var url = 'https://smao737.mybluemix.net/getRecipes';
var allRecipes;
var listing = function(myList) {
	//console.log("Listing()");
	//console.log(myList);
	var strResult = '<ol>';
	for(var i=0; i < myList.length; i++){
		strResult += '<li class="grey-text text-darken-4">' + myList[i] + '</li>';
	}
	strResult += "</ol>";

	return strResult;
};

var createCard = function(recipe, imgSr, ingredients, steps) {
	//console.log(ingredients);
	var card =  '<div class="card">' +
    '<div class="card-image waves-effect waves-block waves-light">'+
      '<img class="activator" title="'+ recipe +', click to see its ingredients and how to make it." src="'+imgSr+'">'+
    '</div>' +
    '<div class="card-content">'+
      '<span class="card-title activator grey-text text-darken-4">How to cook <b>'+recipe+'</b><i class="material-icons right"></i></span>'+
      '<p><a href="#">Go to top</a></p>'+
    '</div>'+
    '<div class="card-reveal">'+
      '<span class="card-title grey-text text-darken-4"><b>'+recipe+'</b><i class="material-icons right">close</i></span>' +
      '<p class="grey-text text-darken-4"><h2 class="grey-text text-darken-4">Ingredients:</h3></p>'+listing(ingredients)+'<p class="grey-text text-darken-4"><h2 class="grey-text text-darken-4">How to cook:</h3><p>'+listing(steps)+
    '</div>' +
  '</div>';
	return card;
};

var hasThisIngredient = function(listIngredients, text){
	var str = "";
	listIngredients.forEach(function(ingredient){
		str += ingredient.toUpperCase();
	});
	if (str.includes(text.toUpperCase()))
		return true;

	return false;
};

var createCards = function(cards, search) {

	cards.forEach(function(card) {
		if (typeof search !== 'undefined'){
			
			var recipe = card.name.toUpperCase();
			
			if (recipe.includes(search.toUpperCase()) || hasThisIngredient(card.ingredients, search)){
				$('.row').append(createCard(card.name, card.imgSrc, card.ingredients, card.steps));
			}
			
		} else {
			$('.row').append(createCard(card.name, card.imgSrc, card.ingredients, card.steps));
		}
	});
};


var getRecipes = function() {
	console.log('Starting Request');
	$.get(url, {}, function(result) {
		allRecipes = result;
		//console.log('Request Completed');
		//console.log(result);

		createCards(allRecipes);
	});
};

//window.onload = getRecipes;
$(document).ready(function(){
	getRecipes();
	
	$("#searchBtn").click(function(){
		console.log("Click started: " + $("#searchTxt").val());
		$('.row').html("");
		
		createCards(allRecipes, $("#searchTxt").val());
	});
	
	
	$(".open-popup").click(function(event) {
		console.log("Chat Me clicked");	
	     event.preventDefault();
	     $("#popup").load("watson.html");
		 $("#popup").show();		
		 $("#closechat").show();
	});
	
	
	$("#closechat").click(function(event){
		 $("#popup").hide();
		 $("closechat").hide();
	});
});



