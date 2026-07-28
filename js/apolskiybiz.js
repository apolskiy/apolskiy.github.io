//by Aleksandr Polskiy
//this javascript for apolskiy.biz
//
//declaring basic contact form elements as an array


//navigation menu functions

document.addEventListener('DOMContentLoaded', () => {
  // Decode the base64-obfuscated email so scrapers/bots don't see it in the markup.
  // Without JS the span stays empty and the <noscript> LinkedIn fallback shows instead.
  const emailEl = document.getElementById('contact-email');
  if (emailEl && emailEl.dataset.e) {
    const address = atob(emailEl.dataset.e);
    const link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = 'Email'; // show only the word "Email", never the actual address
    emailEl.replaceWith(link);
  }

  // Decode all base64-obfuscated hyperlinks. Each <span class="enc-link" data-h="...">
  // keeps its visible label as text; the real URL lives base64-encoded in data-h.
  document.querySelectorAll('.enc-link').forEach(el => {
    if (!el.dataset.h) return;
    const link = document.createElement('a');
    link.href = atob(el.dataset.h);
    // Preserve the original contents (text and/or elements such as badge images)
    while (el.firstChild) link.appendChild(el.firstChild);
    // Opt-in "open in new tab" via the data-nw attribute
    if (el.hasAttribute('data-nw')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    el.replaceWith(link);
  });

  const tabItems = document.querySelectorAll('.item');
  const tabContents = document.querySelectorAll('.tab-content');


  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all tabs and content
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to the clicked tab
      item.classList.add('active');

      // Get the data-tab attribute to find corresponding content
      const targetTabId = item.getAttribute('data-tab');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      const submenu = item.querySelector('.submenu');
      if (submenu) {
        submenu.style.display = item.classList.contains('active') ? 'block' : 'none';
      }

    });
  });
});



var formi=["name","email","comment"];
var contact=document.getElementById("contact");
var email=document.getElementById("email");
var comment=document.getElementById("comment");
var arvalue=new Array(30);
var arelements=new Array(30);
var tempcounter=0;
var counterar=0;
var elcolor;
var elbackground;

for (counterar=0;counterar<30;counterar++){
	tempcounter=counterar+1;
	arvalue[counterar]="array"+tempcounter.toString();

	arelements[counterar]=document.getElementById(arvalue[counterar]);

	if (typeof(arelements[counterar]) != 'undefined' && arelements[counterar] != null){
		document.getElementById(arvalue[counterar]).onmouseover = function() {sampleCode1(this)};
		document.getElementById(arvalue[counterar]).onmouseout = function() {resetCode1(this)};
	}
}


function smenu(control){
  console.log("Entering function smenu");
  if (control!=null){
    control.style.background="#94c8d3";
    control.style.textDecoration="underline";

    const subMenu1 = document.getElementById('submenu1');
    submenu1.positiont ='absolute';
    subMenu1.style.display = 'block'; // Makes the div visible and display as a block
    subMenu1.visibilityState = 'visible';


  }

  else{
    console.log("Function smenu. Control value = Null. Check function call.");
  }

}



function reset_smenu(control){
  console.log("Entering function reset_smenu");
  if (control!=null){
    control.style.background="#ffffff";
    control.style.textDecoration="none";
    const subMenu1 = document.getElementById('submenu1');

    subMenu1.style.display = 'none'; // Makes the div visible and display as a block
    subMenu1.visibilityState = 'hidden';


  }

  else{
    console.log("Control value = Null. Check function call.");
  }

}

//color and background of certain code samples changes, when user mouses over those code lines
function sampleCode1(control){
	if (control!=null){

		control.style.color="#000000";
		control.style.background="#d8bfd8";
	}
}

//certain snippets return to their original color and background
function resetCode1(control){
	if (control!=null){
			control.style.color="#afeeee";
			control.style.background="#333333";
		}

	else{
		console.log("Control value = Null. Check function call.");
	}

}



//this function sets image shadow box
function setIMGBG(control){
		control.style.background="#e6e6fa";
		control.style.boxShadow="2px 4px 8px #228b22";
}

//this function sets image shadow box
function setIMGBG2(control){
		control.style.boxShadow="-2px -4px 8px #999999";
}
//this function resets image shadow box
function resetIMGBG(control){
	control.style.background="initial";
	control.style.boxShadow="none";
}

//this function sets a particular color on mouse in
function ostyleIN(control){
		control.style.color="#dc143c";
}

//this function sets a particular color on mouse out
function ostyleOUT(control){
	control.style.background="#32cd32";
}
