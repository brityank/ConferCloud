$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page






    $.get("/api/user_data").then(function(userdata) {
    
      $(".member-name").text(userdata.id);
      //$("#logMsg").text("Logged In").css("display", "unset");
      $("#login").css("display", "none");
      $("#signup").css("display", "none");
      $("#features").css("display", "none");
  
  

 $.get("/api/reservations/" , function(resdata) {

var i=0;


  resdata.forEach(function(element){

    rowDiv=$("<tr>")
    rowDiv.addClass("reservationrow")
    rowDiv.attr("id", "reservation-row"+i)

    $("#my-reservations").append(rowDiv)

    roomName=$("<td>")
    roomName.addClass("get-room-info")
    roomName.attr("id", element.RoomId)
    roomName.html('<a href="#" id="'+element.roomId+'">'+element.Room.roomName)
    
  

    resName=$("<td>")
    resName.attr("id", "reservation"+i)
    resName.attr("id", element.id)
    resName.text(element.text)

   
    

    resDate=$("<td>")
    resDate.attr("id", "reservation-date"+i)
    resDate.text(moment(element.start_date).format( "MMM DD YYYY"))

    resTime=$("<td>")
    resTime.attr("id", "reservation-time"+i)
    resTime.text(moment(element.start_date+ " " + element.start_time).format("hh:mm A"))
   

    resDur=$("<td>")
    resDur.attr("id", "reservation-duration"+i)
    resDur.text(element.duration + " hr")

    resCost=$("<td>")
    resCost.text("$" + element.duration * element.Room.hourlyRate)

    resDel=$("<td>")
    resDel.addClass("del-res")
    resDel.html('<i class="fa fa-trash" ></i>')
    resDel.attr("id", element.id)

    rowDiv.append(resName,roomName, resDate, resTime, resDur, resCost, resDel)

  i++
  })


  
  
  })

  $.get("/api/rooms/" , function(roomdata) {
  var i=0;
    
    roomdata.forEach(function(element){
  
      rowDiv=$("<tr>")
      rowDiv.addClass("room-row")
      rowDiv.attr("id", "room-row"+i)
  
      $("#my-rooms").append(rowDiv)
  
      roomImg=$("<img>")
      roomImg.attr("src", element.roomURL)
      roomImg.addClass("room-thumb")
  
    
  
      roomName=$("<td>")
      roomName.attr("id", "room-name"+i)
      roomName.attr("id", element.id)
      roomName.text(element.roomName)
      
  
      roomLoc=$("<td>")
      roomLoc.attr("id", "room-loc"+i)
      roomLoc.text(element.city + ", " + element.state_us)

      roomResCount=$("<td>")
      roomResCount.attr("id", "room-res-count"+i)
      roomResCount.text(element.Reservations.length)
  
      
  
      rowDiv.append(roomImg, roomName, roomLoc, roomResCount)
  
    i++
    })
  
  
    
    
    })


  
      
    })
 
    
    /*Clickable actions */

    $(document).on ("click", ".get-room-info", function (event)  {
      event.preventDefault();
      var roomid = this.id
      console.log("Id from click is " + this.id)
      $("#room-name").empty(); 
      jQuery.noConflict();
     
      $.get("/api/rooms/" + roomid, function(roomdata) {

        $("#modal-room-name").text(roomdata.roomName)

        console.log("Room data from link click is " + roomdata)

        var roomDiv=$("<div>");
        roomDiv.addClass("card modal-room-card");
        roomDiv.attr("id", "room");
        roomDiv.attr("value", roomdata.roomID);
 
        $("#room-name").append(roomDiv);
 
 
        var roomImg=$("<img>");
        roomImg.attr("id", "room-image");
        roomImg.attr("src", roomdata.roomURL);
        roomImg.addClass("card-img-top modal-room-photo");
 
        $("#room").append(roomImg);
 
        var bodyDiv=$("<div>");
        bodyDiv.addClass("card-body modal-room-card-body");
        bodyDiv.attr("id", "card-body");
 
        $("#room").append(bodyDiv);
 
   
        var roomAddCont = $("<div>")
        roomAddCont.addClass("d-inline-block")
        roomAddCont.attr("id", "roomAddCont")
 
        var roomAdd=$("<p>")
        roomAdd.html(roomdata.address1 + "<br>" + roomdata.address2 +"<br>" + roomdata.city + " " + roomdata.state_us + " " +roomdata.zip)
         roomAdd.addClass("text-left");
         
        $("#card-body").append(roomAddCont)
 
        $("#roomAddCont").append(roomAdd)
 
        var roomInfo=$("<ul>")
         roomInfo.addClass("list-group list-group-flush")
         roomInfo.attr("id", "roomInfo")
 
         $("#room").append(roomInfo)
 
        var roomType=$("<li>");
        roomType.addClass("list-group-item ")
        roomType.text("Type: " + roomdata.roomType.toUpperCase() + "  Rate:  $" + roomdata.hourlyRate+"/hr")
 
         var roomCapacity=$("<li>");
         roomCapacity.addClass("list-group-item")
         roomCapacity.text("Capacity: " + roomdata.roomCapacity)
 
     $("#roomInfo").append(roomType, roomCapacity)

     $("#show-room-modal").modal("toggle");


/* end get*/
      })

/*end click*/
})
      

$(document).on ("click", ".del-res", function (event)  {
  console.log("Delete clicked")
  event.preventDefault();
var resid = this.id 

$.ajax({
method: "DELETE",
url: "api/reservations/" + resid
})
.then(function() {
console.log("Reservation ID "+ resid)
location.reload(true)
});

})

 
/* end doc*/
})

