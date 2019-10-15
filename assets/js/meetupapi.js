$(document).ready( () => {
  // loadApi();
  //console.log( "ready!" );
  $(window).on('scroll', function(){
    if($(window).scrollTop()){
    $('#navrecover').addClass('black1');
  }
  else{
    $('#navrecover').removeClass('black1');  
  }
  })
  var viewportWidth = $(window).width();
  if (viewportWidth < 600) {
      $("#screen").removeClass("xs-header header-transparent nav-lights").addClass("xs-header header-transparent header-style3");
      $("#navrecover").removeClass("xs-menus clearfix").addClass("xs-menus clearfix xs_nav-portrait");
   }
  sildes();
   callingWithNewMeathod();
   document.getElementById("gig").style.display = "none";
   document.getElementById("second3").style.color = "white";
 });
 
  var _eventsApi = [
   {
     "event": "https://api.meetup.com/Bangalore-AI-ML-Meetup/events",
     "members" : "https://api.meetup.com//Bangalore-AI-ML-Meetup",
     "join": "https://www.meetup.com/Bangalore-AI-ML-Meetup/?action=join",
     
   },
   {
     "event": "https://api.meetup.com/Bangalore-Bot-Developers-Meetup/events",
     "members":"https://api.meetup.com/Bangalore-Bot-Developers-Meetup",
     "join": "https://www.meetup.com/Bangalore-Bot-Developers-Meetup/?action=join",
     
   },
   {
    "event": "https://api.meetup.com/Serverless-Bangalore/events",
    "members":"https://api.meetup.com/Serverless-Bangalore/",
    "join": "https://www.meetup.com/Serverless-Bangalore/?action=join",
  },
  {
    "event":  "https://api.meetup.com/Mobile-App-Developers-Bangalore-Meetup/events",
    "members": "https://api.meetup.com/Mobile-App-Developers-Bangalore-Meetup/",
    "join": "https://www.meetup.com/Mobile-App-Developers-Bangalore-Meetup/?action=join",
  },
  {
    "event": "https://api.meetup.com/JavaScript-Meetup-Bangalore/events",
    "members":"https://api.meetup.com/JavaScript-Meetup-Bangalore",
    "join": "https://www.meetup.com/JavaScript-Meetup-Bangalore/?action=join",
    
  },
  {
    "event": "https://api.meetup.com/Core-Java-Meetup-Bangalore/events",
    "members": "https://api.meetup.com/Core-Java-Meetup-Bangalore",
    "join": "https://www.meetup.com/Core-Java-Meetup-Bangalore/?action=join",
  },
  {
    "event": "https://api.meetup.com/Container-Developers-Meetup-Bangalore/events",
    "members":"https://api.meetup.com/Container-Developers-Meetup-Bangalore",
    "join": "https://www.meetup.com/Container-Developers-Meetup-Bangalore/?action=join",
   
  },

  {
    "event": "https://api.meetup.com/CloudOps-Meetup-Bangalore/events",
    "members":"https://api.meetup.com/CloudOps-Meetup-Bangalore",
    "join": "https://www.meetup.com/CloudOps-Meetup-Bangalore/?action=join", 
   },

  {
    "event": "https://api.meetup.com/Bangalore-BlockChain-Developers-Meetup/events",
    "members":"https://api.meetup.com/Bangalore-BlockChain-Developers-Meetup",
    "join": "https://www.meetup.com/Bangalore-BlockChain-Developers-Meetup/?action=join",
   
  },
]
 
function callingWithNewMeathod(){
   for(i=0;i<_eventsApi.length;i++){
     callAjaxApi(_eventsApi[i].event,i, []);

  }
 }
 var flag = 0;
 function sortTheData(data, _number) {
   flag++
  var obj = JSON.parse(JSON.stringify(data));
  if (obj.data[0] === undefined) {
    obj["members"]  = _number;
    nullData.push(obj);
  }
  else{
    
    obj["members"]  = _number;
    notNullData.push(obj);
  }
  if(flag == 9) {
    for(var i=0 ; i< nullData.length; i++) { 
      notNullData.push(nullData[i]);
      
    }
    for(i=0;i< notNullData.length ; i++) {
     callAjaxApi(_eventsApi[notNullData[i].members].members,i, notNullData[i])
    }
  }

 }

 function callAjaxApi(_url,_number, display_data) {
   $.ajax({
     type: "GET",
     url: _url,
     dataType: 'jsonp',
     success: function (data) {
       //console.log(data);
       if(_url.indexOf('events')>-1) {
        // getTheDataFromEventApi(data,_number);
        sortTheData(data,_number);
       }
       else{
        getTheDataFromMemberApi(data,_number);
        
        getTheDataFromEventApi(display_data,_number);
       } 
     }
   });
 }
 var nullData = [];
 var notNullData = [];
 function getTheDataFromEventApi(data,_number){
   var _id = "card-".concat((_number).toString());
     var obj = JSON.parse(JSON.stringify(data));
     //console.log(obj);
     if (obj.data[0] === undefined) {
       //$('.cloudeventName').css({ "font-size": "22px" });
       $('#'+ _id+'-topic').html($.parseHTML("Yet to be scheduled "));
       $('#'+ _id+'-topic').css({ "font-size": "150%", "text-align" : "center", "font-family" : "work sans" });
       $('#'+ _id+'-naidu').css({"margin-top":"50px"})
       $('#'+ _id+'-date').text("");
       $('#'+ _id+'-venue').text("");
     } else if (obj.data[0].venue === undefined) {
       //$('.cloudHeading').text(obj.data[0].group.name);
       $('#'+ _id+'-topic').text(obj.data[0].name);
       $('#'+ _id+'-date').append((new Date(obj.data[0].time)).toString().substring(0, 21));
      // $('.cloudWhere').css({ "font-size": "17px" });
       $('#'+ _id+'-venue').html($.parseHTML(" Location will be announced soon."));
     } else {
       $('.cloudHeading').text(obj.data[0].group.name);
       $('#'+ _id+'-topic').text(obj.data[0].name);
       $('#'+ _id+'-naidu').css({"margin":"50px"})
       $('#'+ _id+'-topic').css({  "text-align" : "center", "font-family" : "Work sans"});
       $('#'+ _id+'-date').append((new Date(obj.data[0].time)).toString().substring(0, 21));
       $('#'+ _id+'-date').css({  "text-align" : "center", "font-family" : "Work sans"});
       $('#'+ _id+'-venue').append(obj.data[0].venue.name + " " + obj.data[0].venue.address_1);
       $('#'+ _id+'-venue').css({  "text-align" : "center", "font-family" : "Work sans" });
     }
 }
  var add_members = [];
  function getTheDataFromMemberApi(data,_number){
  var _idName = "card".concat((_number).toString());
  var _members = "member".concat(_number).toString();
   $("#member0").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px", });
   
   $("#member1").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member2").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member3").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member4").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member5").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member6").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member7").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member8").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   $("#member9").css({"font-weight":"50", "font-family":"work sans, sans-serif", "font":"22px"});
   
   $("#"+_idName+"name").html(data.data.name);
      
   $("#"+_idName+"name").attr("href",data.data.link);
       //console.log(data.data.link);
       $("#"+_idName+"share").attr("href", data.data.link);
       $("#"+_idName+"share").attr('target', '_blank');
       $("#"+_idName+"f").attr("href", data.data.link);
       $("#"+_idName+"f").attr('target', '_blank');
       $("#"+_idName+"t").attr("href", data.data.link);
       $("#"+_idName+"t").attr('target', '_blank');
       $("#"+_members).html(data.data.members);
       
       $("#"+_members).html(data.data.members);
       //console.log(data.data.members);
       add_members.push(data.data.members);
       //console.log(add_members);
        var a = add_members.reduce((a, b) => a + b, 0);
        Intl.NumberFormat().format(a);
        document.getElementById("total").innerHTML = a;
       $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration:900,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
        
    });
   
}
function myFunction1(){
  var link = document.getElementById('card0share');

 
      window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
    
}

function myFunction2(){
  var link = document.getElementById('card1share');
   window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
  
}
function myFunction3(){
  var link = document.getElementById('card2share');
   window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 
}
function myFunction4(){
  var link = document.getElementById('card3share');
   window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 
}
function myFunction5(){
  var link = document.getElementById('card4share');
   window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 }
function myFunction6(){
  var link = document.getElementById('card5share');
    window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}


function myFunction7(){
  var link = document.getElementById('card6share');
 window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 }


function myFunction8(){
  var link = document.getElementById('card7share');
  window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}


function myFunction9(){
  var link = document.getElementById('card8share');
  window.open("https://twitter.com/share?text=Join%20me%20in%20this%20meetup%20by%20registering%20on%20this%20link:&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}

function myFunctiona(){
  var link = document.getElementById('card0f');
 window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}

function myFunctionb(){
  var link = document.getElementById('card1f');
 window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}


function myFunctionc(){
  var link = document.getElementById('card2f');
 window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 }

function myFunctiond(){
  var link = document.getElementById('card3f');
 window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 }

function myFunctione(){
  var link = document.getElementById('card4f');
  window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}


function myFunctionf(){
  var link = document.getElementById('card5f');
  window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
}


function myFunctiong(){
  var link = document.getElementById('card6f');
  window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 }


function myFunctionh(){
  var link = document.getElementById('card7f');
  window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
  
}


function myFunctioni(){
  var link = document.getElementById('card8f');
  window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
 
}

function myFunctiono(){
  var link = document.getElementById('card0t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=400,height=400");
  }

function myFunctionq(){
  var link = document.getElementById('card1t');
 window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
}


function myFunctionw(){
  var link = document.getElementById('card2t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
}

function myFunctionp(){
  var link = document.getElementById('card3t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
 }

function myFunctionr(){
  var link = document.getElementById('card4t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
 }


function myFunctiont(){
  var link = document.getElementById('card5t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
 }


function myFunctiony(){
  var link = document.getElementById('card6t');
  window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
 }


function myFunctionu(){
  var link = document.getElementById('card7t');
   window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");

}


function myFunctionz(){
  var link = document.getElementById('card8t');
 window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(link), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=10,left=100,width=600,height=600");
 
}

var kki= [];
// Ajax request 
function sildes(){
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         kki = JSON.parse(xhttp.response);
        //console.log(kki);
        createTiles(kki);
      }
   }
   xhttp.open("GET", "resources.json", true)
   xhttp.send();
  function createTiles(data) {
  $("#myUL").html("");
   var _endLoop = data.length;
   //console.log(data.length);
   for(var i=0; i < _endLoop ; i++) {
   $("#myUL").append(
    '<div class="col-sm-8 col-md-6 col-lg-4" >'+
           '<iframe   src='+data[i].link+'  width="680" height="300" frameborder="0" marginwidth="0" marginheight="0" scrscrolling="no" style="max-width: 100%;" allowfullscreen=""></iframe>'+
       '<br>'+
       '<li ><a href='+data[i].href+' target="_blank">'+data[i].title+'</a></li>'+  
       
       '<hr>'+
       '</div>'
   )}
  
 }

 $(".filter").click(function(){
  var b = this.innerHTML;
  var result = []; 
  for (var i=0; i < kki.length; i++){
  if(kki[i].category == b){
      result.push(kki[i]);
    }
    
  }
  createTiles(result);
});

$("#s0").click(function(){
  
  var a = document.getElementById("s0").innerHTML;
 // console.log(a);
  var result = [];
  for (var i=0; i < kki.length; i++){
  result.push(kki[i]);
  }
  createTiles(result);
//console.log(result);
 });
}

$("#color6").on('click', function(event) {
   if (this.hash !== "") {
    event.preventDefault();
   var hash = this.hash;
   $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1800, function(){
   
      window.location.hash = hash;
     
    });
  } 
});
$("#second3").click(function () {
  
  });
 // Add smooth scrolling to all links
    
   $("#second2").on('click', function(event) {
      
        if (this.hash !== "") {
          
          event.preventDefault();
    
          
          var hash = this.hash;
    
          
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
       
            window.location.hash = hash;
          });
        } 
      });
      $("#second1").on('click', function(event) {
         if (this.hash !== "") {
          
          event.preventDefault();
    
          
          var hash = this.hash;
    
         
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
       
            window.location.hash = hash;
          });
        } // End if
  });
 //scroll button
 $(window).scroll(function() {
  var height = $(window).scrollTop();
  if (height > 300) {
      $('#back2start').fadeIn();
  } else {
      $('#back2start').fadeOut();
  }
 });
$(document).ready(function() {
  $("#back2start").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
  });

});

