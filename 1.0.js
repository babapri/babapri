// navigation script

const navToggle = document.querySelector(".nav-toggle");
    const sideNav = document.querySelector(".side-nav");
    const closeBtn = document.querySelector(".close-btn");
    const sidebar = document.querySelector(".side-nav");


    navToggle.addEventListener("click", () => {
      sideNav.classList.toggle("show-nav");
    });

    closeBtn.addEventListener("click", () => {
      sideNav.classList.remove("show-nav");
    });


// click anywhere on body to close sidebar navgation

    document.addEventListener('click', function (event) { if (!sidebar.contains(event.target) && !navToggle.contains(event.target)) { sidebar.classList.remove('show-nav'); } });



    // back to top
    $(document).scroll(function() {
      if ($(window).scrollTop() > 1) {
        $('#back-to-top-icon').show();
      } else {
        $('#back-to-top-icon').hide();
      }
    });
    
    $('#back-to-top-icon').click(function(event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    


// load dynamic nkomoji using variable

      $(document).ready(function() {
        var kaomoji = [
          "(｡･ω･｡)",
          "(╥﹏╥)",
          "(｡◕‿◕｡)",
          "(⁎˃ᴗ˂⁎)",
          "ʕ•ᴥ•ʔ",
          "(❤ω❤)",
          "(･ｪ･)ﾉ”",
          "(づ￣ ³￣)づ",
          "(*￣▽￣*)",
          "ʕ·͡ᴥ·ʔ",
          "♪＼(^▽^＠)ノ♪",
          "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"
        ];
        var kaomojiIndex = 0;
    
        setInterval(function() {
          $('#kaomoji-load').html(kaomoji[kaomojiIndex]);
          kaomojiIndex = (kaomojiIndex + 1) % kaomoji.length;
        }, 5000); // interval of 5 seconds
      });


      
//  // load komoji using ajax
    
      $(document).ready(function() {
        var kaomojiIndex = 0;
    
        function loadKaomoji() {
          $.ajax({
            url: "kaomoji.html",
            success: function(data) {
              var kaomoji = $(data).find(".single-kaomoji").slice(0, 15);
              setInterval(function() {
                $('#kaomoji-container').html(kaomoji[kaomojiIndex].innerHTML);
                kaomojiIndex = (kaomojiIndex + 1) % kaomoji.length;
              }, 5000); // interval of 5 seconds
            }
          });
        }
    
        loadKaomoji();
      });



      // copy kaomoji both working below 

// $(document).ready(function() {
//   var clipboard = new ClipboardJS('.single');
  
//   clipboard.on('success', function(e) {
//     var copiedKaomoji = e.text;
//     var copiedElement = e.trigger;
//     copiedElement.textContent = copiedKaomoji + " (copied)";
    
//     setTimeout(function() {
//       copiedElement.textContent = copiedKaomoji;
//     }, 2000);
//   });
// });


// or---------------------
 
// var clipboard = new ClipboardJS('.single');
  
//   clipboard.on('success', function(e) {
//     var $target = $(e.trigger);
//     $target.append('<div class="copied-message">Copied! </div>');
//     setTimeout(function() {
//       $target.find('.copied-message').remove();
//     }, 2000);
//   });




// textarea row set 2 to 1 when screen size is =600px or lesser
$(window).on('load resize', function() {
  if ($(window).width() <= 600) {
    $('#textarea').attr('rows', '1');
    // $('#textarea').style('position', 'absolute');
    // $('#textarea').style('top', '0');
  } else {
    $('#textarea').removeAttr('rows');
  }
});



  // imported new script---- to store kaomoji in local storage--------------------------------
  
      var btns = document.querySelectorAll('.single');
      var clipboard = new ClipboardJS(btns, {
        text: function(trigger) {
            let emojiText = trigger.textContent;
            let collectedEmojiContainer = document.getElementById("collected-kaomoji-container");
            let emojiSpan = document.createElement("span");
            // emojiSpan.classList.add('kaomojiSpan');
            emojiSpan.innerText = emojiText;
            emojiSpan.style.display = "inline-block";
            emojiSpan.style.height = "fit-content";
            emojiSpan.style.whiteSpace = "nowrap";
         
            emojiSpan.style.padding = "5px 10px";
            emojiSpan.style.margin = "1px 5px";
            emojiSpan.style.backgroundColor = "#0057ff";
            emojiSpan.style.color = "#fff";
            emojiSpan.onclick = function() {
                let textarea = document.getElementById("textarea");
                textarea.value += emojiText;
            }
            // collectedEmojiContainer.appendChild(emojiSpan);
            collectedEmojiContainer.insertBefore(emojiSpan, collectedEmojiContainer.firstChild);

            // Store the collected emoji in local storage
            let collectedEmojis = JSON.parse(localStorage.getItem("collectedEmojis")) || [];
            // collectedEmojis.push(emojiText);
            collectedEmojis.unshift(emojiText);

// Limit the array to 15 elements
collectedEmojis = collectedEmojis.slice(0, 10);

            localStorage.setItem("collectedEmojis", JSON.stringify(collectedEmojis));

            return emojiText;
        }
    });

// copy textarea
function copyTextArea() {
    let textarea = document.getElementById("textarea");
    textarea.select();
    document.execCommand("copy");
    console.log("Copied textarea content to clipboard: " + textarea.value);
    let copyButton = document.getElementById("copy-button");
    // copyButton.textContent = "!Copied";
    
    var textCopy = document.createElement("div");
    textCopy.innerHTML = "!Copied";
    textCopy.style.position = "fixed";
    textCopy.style.top = "70vh";
    textCopy.style.right = "10px";
    textCopy.style.backgroundColor = "#0057ff";
    textCopy.style.color = "#fff";
    textCopy.style.padding = "10px";


    document.body.appendChild(textCopy);

    copyButton.style.color = "#fff";
        copyButton.style.backgroundColor = "#000";
    setTimeout(function() {
        copyButton.textContent = copyButton.getAttribute("data-text");
        textCopy.style.display = "none";
        copyButton.style.backgroundColor = "#0057ff";
    }, 2000);
    
}
document.getElementById("copy-button").addEventListener("click", copyTextArea);

// load stored emojis on page load
window.addEventListener('load', (event) => {
    let storedEmojis = localStorage.getItem("collected-kaomoji");
    if (storedEmojis) {
        let emojiContainer = document.getElementById("collected-kaomoji-container");
        emojiContainer.innerHTML = storedEmojis;
    }
});

// store collected emojis in local storage
let collectedEmojiContainer = document.getElementById("collected-kaomoji-container");
collectedEmojiContainer.addEventListener('DOMNodeInserted', (event) => {
    localStorage.setItem("collected-kaomoji", collectedEmojiContainer.innerHTML);
});

// get stored emojis from local storage
const storedEmojis = JSON.parse(localStorage.getItem('collectedEmojis')) || [];

// add stored emojis to collected-kaomoji-container
const collectedKaomojiContainer = document.getElementById('collected-kaomoji-container');
storedEmojis.forEach(emoji => {
  const kaomojiElement = document.createElement('span');
  kaomojiElement.classList.add('kaomojiSpan');
  kaomojiElement.innerText = emoji;
  collectedKaomojiContainer.appendChild(kaomojiElement);
});

// add click event listener to stored kaomoji elements
collectedKaomojiContainer.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('kaomojiSpan')) {
    const textarea = document.getElementById('textarea');
    textarea.value += target.innerText;
  }
});



// end imported new script------------------------------------------




// remove content of textarea

// jquery version
// $(document).ready(function() {
//   $("#remove-icon").click(function() {
//     $("#textarea").val("");
//   });
// });

// javascript version

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("remove-icon").addEventListener("click", function() {
    document.getElementById("textarea").value = "";
  });
});



// emoji in textarea

// $("#textarea").emojioneArea({
//   pickerPosition:'bottom'
// });


// or---

// $("#textarea").emojioneArea({
//       autoHideFilters: true
//     });
    
// end copy textarea


      clipboard.on('success', function(e) {
        var copiedMessageContainer = document.createElement("div");
        copiedMessageContainer.style.position = "fixed";
        copiedMessageContainer.style.top =  "70vh";
        copiedMessageContainer.style.right = "7px";
        copiedMessageContainer.style.zIndex = "1000";
        copiedMessageContainer.style.fontSize = "14px";
        copiedMessageContainer.style.backgroundColor = "#0057ff";
        copiedMessageContainer.style.color = "#fff";
        copiedMessageContainer.style.padding = "7px 15px";
        copiedMessageContainer.innerHTML = e.trigger.innerHTML + "<br>" + "Copied!";
        document.body.appendChild(copiedMessageContainer);

        setTimeout(function() {
          copiedMessageContainer.remove();
        }, 2000);
      });



      clipboard.on('error', function(e) {

      // Fallback solution for devices that do not support Clipboard.js
      var textArea = document.createElement("textarea");
      textArea.value = e.trigger.innerHTML;
      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      // Create a new div to display the copied message
      var copiedMessageContainer = document.createElement("div");
      copiedMessageContainer.innerHTML = "Copied " + e.trigger.innerHTML;
      copiedMessageContainer.style.position = "absolute";
      copiedMessageContainer.style.top = "70vh";
      copiedMessageContainer.style.right = "10px";
      copiedMessageContainer.style.backgroundColor = "#0057ff";
      copiedMessageContainer.style.color = "#fff";
      copiedMessageContainer.style.padding = "10px";
      
      // Show the copied message for 2 seconds
      e.trigger.parentElement.appendChild(copiedMessageContainer);
      setTimeout(function() {
        copiedMessageContainer.style.display = "none";
      }, 2000);
    });

  



    $(document).ready(function() {
      var nextURL;
  
      function updateNextURL(doc) {
          nextURL = $(doc).find('.kao-next').attr('href');
      }
  
      // get initial nextURL
      updateNextURL(document);
  
      // init Infinite Scroll
      var $container = $('.kaomoji-container').infiniteScroll({
          // use function to set custom URLs
          path: function() {
              return nextURL;
          },
          append: '.kaomoji, .ads, .head, pre',
          status: '.page-load-status',
          hideNav: '.kao-p',
          scrollThreshold: 100,
          checkLastPage: '.kao-next',
          history: 'push',
          historyTitle: true,
      });
  
      // re-initialize ClipboardJS for dynamically loaded content
      $('.kaomoji-container').on('append.infiniteScroll', function(event, response, path, items) {
        updateNextURL(response);

        // Get the newly added elements
    var newElems = $(items);



    // writing all code again-----------


    // Set up Clipboard.js for the newly added elements
    newElems.find('.single').each(function() {
      var clipboard = new ClipboardJS(this,  {
        text: function(trigger) {
            let emojiText = trigger.textContent;
            let collectedEmojiContainer = document.getElementById("collected-kaomoji-container");
            let emojiSpan = document.createElement("span");
            // emojiSpan.classList.add('kaomojiSpan');
            emojiSpan.innerText = emojiText;
            emojiSpan.style.display = "inline-block";
            emojiSpan.style.height = "fit-content";
            emojiSpan.style.whiteSpace = "nowrap";
         
            emojiSpan.style.padding = "5px 10px";
            emojiSpan.style.margin = "1px 5px";
            emojiSpan.style.backgroundColor = "#0057ff";
            emojiSpan.style.color = "#fff";
            emojiSpan.onclick = function() {
                let textarea = document.getElementById("textarea");
                textarea.value += emojiText;
            }
            // collectedEmojiContainer.appendChild(emojiSpan);
            collectedEmojiContainer.insertBefore(emojiSpan, collectedEmojiContainer.firstChild);

            // Store the collected emoji in local storage
            let collectedEmojis = JSON.parse(localStorage.getItem("collectedEmojis")) || [];
            // collectedEmojis.push(emojiText);
            collectedEmojis.unshift(emojiText);

// Limit the array to 15 elements
collectedEmojis = collectedEmojis.slice(0, 10);

            localStorage.setItem("collectedEmojis", JSON.stringify(collectedEmojis));

            return emojiText;
        }
    });



      clipboard.on('success', function(e) {
        var copiedMessageContainer = document.createElement("div");
        copiedMessageContainer.style.position = "fixed";
        copiedMessageContainer.style.top =  "70vh";
        copiedMessageContainer.style.right = "7px";
        copiedMessageContainer.style.zIndex = "1000";
        copiedMessageContainer.style.fontSize = "14px";
        copiedMessageContainer.style.backgroundColor = "#0057ff";
        copiedMessageContainer.style.color = "#fff";
        copiedMessageContainer.style.padding = "7px 15px";
        copiedMessageContainer.innerHTML = e.trigger.innerHTML + "<br>" + "Copied!";
        document.body.appendChild(copiedMessageContainer);

        setTimeout(function() {
          copiedMessageContainer.remove();
        }, 2000);
      });

      clipboard.on('error', function(e) {

        // Fallback solution for devices that do not support Clipboard.js
        var textArea = document.createElement("textarea");
        textArea.value = e.trigger.innerHTML;
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        
        // Create a new div to display the copied message
        var copiedMessageContainer = document.createElement("div");
        copiedMessageContainer.innerHTML = "Copied " + e.trigger.innerHTML;
        copiedMessageContainer.style.position = "absolute";
        copiedMessageContainer.style.top = "70vh";
        copiedMessageContainer.style.right = "10px";
        copiedMessageContainer.style.backgroundColor = "#0057ff";
        copiedMessageContainer.style.color = "#fff";
        copiedMessageContainer.style.padding = "10px";
        
        // Show the copied message for 2 seconds
        e.trigger.parentElement.appendChild(copiedMessageContainer);
        setTimeout(function() {
          copiedMessageContainer.style.display = "none";
        }, 2000);
      });
      

    });
      });
  });
  
