//switches interpreter into strict mode
"use strict";

var LAST_SEARCH_KEY="lastSearchQuery";

//base search URL
var baseURL="https://api.spotify.com/v1/search?type=track&q=";
//refernce to our search form
var frmSearch=document.querySelector("#search-form");
//reference to the search box
var txtSearch=document.querySelector("#search-form input");
txtSearch.value=localStorage.getItem("LAST_SEARCH_KEY");
//reference to search results div
var divResults=document.querySelector("#search-results");

//preview audio object
var previewAudio=new Audio();
//function to be called when user does a search
//evt is the JavaScript Event object
function onSearch(evt){
    //tell browser not to do default behavior
    evt.preventDefault();
    //get whatever is typed into the search input
    var searchQuery=txtSearch.value;
    //get JSON from spotify
    jQuery.getJSON(baseURL + searchQuery)
    .then(onSearchResults, onSearchError);
    
    localStorage.setItem("LAST_SEARCH_KEY",searchQuery);
    //also tell browser not to submit the form
    return false;
}
// called once the data has come back from spotify
function onSearchResults(data){
    console.log(data);
    divResults.innerHTML="";
    data.tracks.items.forEach(addTrack)
}

function addTrack(track){
    var img=document.createElement("IMG");
    img.src=track.album.images[0].url;
    divResults.appendChild(img);
    
    img.addEventListener("click",function(){
        // if same preview url...
       if(previewAudio.src===track.preview_url){
           previewAudio.pause();
       } 
       else{
           //set the preview url
           previewAudio.src=track.preview_url;
           //play the preview
           previewAudio.play();
       }
    });
}

function onSearchError(response){
    alert(response.responseJSON.error.message);
}
//tell browser to call onSearch when form is submitted
frmSearch.addEventListener("submit", onSearch);