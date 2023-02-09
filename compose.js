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
            var selection = window.getSelection().getRangeAt(0);
            var selectedText = selection.extractContents();
            if(command === "increaseFontSize"){
                var modification= document.createElement("big");
            }
            else{
                var modification= document.createElement("small");
            }
            modification.appendChild(selectedText);
            selection.insertNode(modification);
        }
    });
});



//Saving the writ
function  SubmitWrit(){
    var writ= {
        title: document.getElementsByClassName('title')[0].value,
        content: document.querySelectorAll('#compose .content')[0].innerHTML
    };
    console.log(writ);
    // append the writ onto the storage
};

