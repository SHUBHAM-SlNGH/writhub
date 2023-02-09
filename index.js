//turn off jquery animation
jQuery.fx.off = true;

// #################### to toggle the pages using z index #####################
let topIndex = 1;
function Toggle(event){
    //Push a state on browser's history so that the back button can be used to toggle off pages
    history.pushState({}, '');

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let divName = ((typeof event) === 'object') ? event.getAttribute("data-divname") : event;

    //if the div is on the top then put it at bottom
    //else, put it on top
    if(document.getElementById(divName).style.zIndex == topIndex){
        
        // if the div is messages or search then show transition of width to 0 then put at bottom
        // else, put it at bottom
        if (divName == 'messages' || divName == 'search'){
            $('#' + divName).width("1px");
            setTimeout(function() {
                document.getElementById(divName).style.zIndex = 0;
              }, 500);
              topIndex--;
        }
        else{
            document.getElementById(divName).style.zIndex = 0;
            topIndex--;
        }
        
    }
    else{
        // if the div is messages or search then show transition of width to 40%
        // else, put the div on top.
        if (divName == 'messages' || divName == 'search'){
            document.getElementById(divName).style.zIndex = ++topIndex;
            
            //if screen is small then set width to 100%
            //else, set width to 40%
            if (width < 640)
            $('#' + divName).width("100%");
            else 
            $('#' + divName).width("40%");
        }
        else
            document.getElementById(divName).style.zIndex = ++topIndex;
     }
}
  
// handle device's / browser's back button
window.onpopstate = function() {
    //find the top div
    let topdiv =['home','compose','collection', 'messages', 'search','profile','notification']
                    .filter((value) => document.getElementById( value ).style.zIndex == topIndex)[0];

    //toogle off the div if it's not the home page
    (topdiv != undefined) && Toggle(topdiv);

    //close the comment's section of writ before leaving
    //if it's open
    if($('.comment-section').is(':visible'))
        $('.comment-button').click();
}
 
 
  

// #################################################### writ page #################################################

// Make the clicked writ full screen
function launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
  }
  
//Exit Fullscreen
function exitFullScreen(buttonClicked) {
    
    //get the current writ
    let writ = buttonClicked.parentElement.parentElement;

    //turn off the comment section
    $(writ).find('.comment-section').css('display', 'none');
    
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (isInFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


//open engagement's details when clicked on the engagement-bar
$('.engagement-bar').click((I)=>{
    let engagementBar = I.target;

    //close self
    $(engagementBar).css('display','none');

    //open head
    $(engagementBar.nextElementSibling).css('display','inline-flex')

    //open detail's tiles container
    $(engagementBar.nextElementSibling.nextElementSibling).css('display','block');
})

//close engagement's details
$('.close-engagements-tile').click((I)=>{
    $(I.target.parentElement).css('display','none');
    $(I.target.parentElement.nextElementSibling).css('display','none'); 

    $(I.target.parentElement.previousElementSibling).css('display','inline-flex');
})

//Toggle comment
$('.comment-button').click((I)=>{
    let commentSectionContainer = $(I.target.parentElement).nextUntil('.comment-section').next()[1];
    // find the related comment section and toggle its visibility
    console.log($(commentSectionContainer).toggle());
    $(commentSectionContainer).toggle();
    let commentSection = $(commentSectionContainer.children);
    console.log(commentSection[0]);
    $(commentSection).toggle(); 
});
//existing fullscreen using escape key






//########################################## index.js #############################################

// To open a writ when clicked on

$('.writ .content').click(function (e) { 
    launchFullScreen(e.target.parentElement);
});



function itworks(writ){
    
}












//########################################## search.js ##############################################

//step1: IF user press enter after writing in the search bar
//step2: this enter will trigger writ.click() by default
//step3: which will render the list of writs based on the input in the search field.
//step4: ELSE user can click on anyone of the two category button (writ & writer) after filling up the search field
//step4: then then the search results will be generated based on the clicked button of choosen category 
function writSearch(){
    // turn on writ's-results dispplay
    $('.writs-results').css('display', 'block');
    $('.writers-results').css('display', 'none');

    console.log($('#search-query').val());
    //check the search query to see if its the same as previous one to stop multiple ajax calls
}

function writerSearch(){
    // turn on writer's-results display
    $('.writers-results').css('display', 'block');
    $('.writs-results').css('display', 'none');

    console.log($('#search-query').val());
    //check the search query to see if its the same as previous one to stop multiple ajax calls
}











//########################################## message.js ###########################################

$('.user-list .user').click(function (e) { 
    e.preventDefault();
    console.log(e);

    //1. Turn the inbox's display off
    $('.inbox').css('display', 'none');

    //2. Turn communiques' display on
    $('.communiques').css('display', 'block');
    
});

function turnOff(){
    $('.communiques').css('display', 'none');
    $('.inbox').css('display', 'block');
}









//########################################## Compose.js ###########################################

//Back Button
// function toggleComposeDisplay(){
//     [document.getElementById('compose').style.display, document.getElementById('home').style.display] = [document.getElementById('home').style.display, document.getElementById('compose').style.display];

// }

//Selecting buttons
const buttons= document.querySelectorAll('.btn');

//applying selected font setting
buttons.forEach(button => {
    button.addEventListener('click', () => {
        //Edit text style based on clicked button
        let command = button.dataset['element'];
        document.execCommand(command, false, null);

        //if the command is to increase or decrease text size
        if(command === "increaseFontSize" || command === "decreaseFontSize"){
            let selection = window.getSelection().getRangeAt(0);
            let selectedText = selection.extractContents();
            if(command === "increaseFontSize"){
                let modification= document.createElement("big");
            }
            else{
                let modification= document.createElement("small");
            }
            modification.appendChild(selectedText);
            selection.insertNode(modification);
        }
    });
});



//Saving the writ
function  SubmitWrit(){
    let writ= {
        title: document.getElementsByClassName('title')[0].value,
        content: document.querySelectorAll('#compose .content')[0].innerHTML
    };
    console.log(writ);
    // append the writ onto the storage
};

