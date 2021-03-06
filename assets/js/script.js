//SSL!
if (window.location.protocol != "https:")
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

//Clear anything and focus on the input box
$('#maininput').val('');
$('#maininput').focus();

//Check to see if there is any paramaters and if so, check to see if it's a username
if(window.location.href.substring(window.location.href.lastIndexOf("/") + 1) != '') {
	if (window.location.href.substring(window.location.href.lastIndexOf("#") + 1) != window.location.href) {
		if (window.location.href.substring(window.location.href.lastIndexOf("#") + 1)) {
			if ((window.location.href.substr(window.location.href.length-1)) != "#") {
			    $('#maininput').val(window.location.href.substring(window.location.href.lastIndexOf("#") + 1));
			    start();
			}
		}
	}
}

//Bind the Go button and bind the enter key on the input box
$('#GO').click(function() {
    start();
});
$('#maininput').keypress(function(e) {
    if (e.which == 13) {
        start();
    }
});

//Check to see if the url has changed
window.onpopstate = function (event) {
  if (event.state) {
    //This script changed the url
  } else {
  	//The user chaned the url
    if(window.location.href.substring(window.location.href.lastIndexOf("/") + 1) != '') {
        $('#maininput').val(window.location.href.substring(window.location.href.lastIndexOf("/") + 2));
        start();
    }
  }
}

//Bind Fingerprint Bit Pills
$('#bit64').click(function() {
    $('#bit64').addClass('active');
    $('#bit128').removeClass('active');
    start();
})
$('#bit128').click(function() {
    $('#bit128').addClass('active');
    $('#bit64').removeClass('active');
    start();
})

//Start (close alert box, update image urls, add code, link images, and update url)
function start(){
    $('#alertBox').hide();
    $('#GO').addClass('active');
    if ($('#bit128').hasClass('active')) {
        var bit = "&bit=128";
        var width = 210;
        var height = 58;
    } else {
        var bit = "";
        var width = 255;
        var height = 68;
    }
    document.getElementById('default-theme-card').src='https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=default'+bit;
    document.getElementById('clean-theme-card').src='https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=clean'+bit;
    document.getElementById('dark-theme-card').src='https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=dark'+bit;

    $('#default-theme-code').val('<a href="https://keybase.io/'+$("#maininput").val()+'"><img src="https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=default'+bit+'" width="'+width+'" height="'+height+'" alt="keybase.io profile for '+$("#maininput").val()+'"></a>');
    $('#clean-theme-code').val('<a href="https://keybase.io/'+$("#maininput").val()+'"><img src="https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=clean'+bit+'" width="'+width+'" height="'+height+'" alt="keybase.io profile for '+$("#maininput").val()+'"></a>');
    $('#dark-theme-code').val('<a href="https://keybase.io/'+$("#maininput").val()+'"><img src="https://keybase.onlineth.com/'+$("#maininput").val()+'.png?theme=dark'+bit+'" width="'+width+'" height="'+height+'" alt="keybase.io profile for '+$("#maininput").val()+'"></a>');
    $('#default-theme-card-a').attr("href", 'https://keybase.io/'+$("#maininput").val());
    $('#clean-theme-card-a').attr("href", 'https://keybase.io/'+$("#maininput").val());
    $('#dark-theme-card-a').attr("href", 'https://keybase.io/'+$("#maininput").val());
    history.pushState('', $("#maininput").val() + ' Keybase.io Card', location.protocol + '//' + location.host + location.pathname + '#' + $("#maininput").val());
}

//Show images
function checkImageLoad() {
    $('#cards').show('400');
    $('#GO').removeClass('active');
}

//Show an error message
function reportError(message) {
    $('#GO').removeClass('active');
    $('#alertMessage').html(message);
    $('#alertBox').show('400');
}

//Image didn't load
function imgError() {
    reportError("There was an error (probably the username you typed in doesn't exist).");
    $('#cards').hide();
}
