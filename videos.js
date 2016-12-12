document.addEventListener('DOMContentLoaded', function(){


var addition = 0;


chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    if (url.match('wikipedia.org') !== null) {
    var pageId = '';
      for (var i=url.length-1; i>=0; i--) {
          //console.log(url[i]);
          if (url[i] === '/' || url[i] === '#') {
              break;
          } 
          if (url[i] === '_') {
            pageId += '+';
          } 
          else {
            pageId += url[i];
          }
      }


      pageId = pageId.split('').reverse().join('');
      console.log(pageId);

      var btn = document.querySelectorAll('#nextBtn')[0];
        console.log(btn);
        btn.addEventListener('click', getNextVideo);

        function getNextVideo() {
            addition++;
            console.log('addition is ' + addition);
            getVideo(pageId, addition);
        
        }


      
      getVideo(pageId, 0);
    }
    //format url of wikipedia page

    //send buzz word to youtube search url

    //traverse dom for first video

    //play video with id found in dom on embedded popup
});

function getVideo(searchTerm, addition) {
    var url = 'https://www.youtube.com/results?q=what+is+' + searchTerm;
        
    var request = new XMLHttpRequest();
    request.open('GET', url)
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            var videoArray = [];
            var videoId = '';
            //console.log(request.response);
            for (var index = request.response.indexOf('data-context-item-id');index >= 0; index = request.response.indexOf('data-context-item-id', index + 1)) {
                index = index + 22;
                while (request.response[index] !== '\"') {
                    videoId += request.response[index];
                    index++;
                }
                videoArray.push(videoId);
                videoId = '';
            }

            console.log(videoArray);
            
            
            document.getElementById("vidPlayer").src = "https://www.youtube.com/v/" + videoArray[addition];
            addition = 0;
            
        }
    }

}


    




})

