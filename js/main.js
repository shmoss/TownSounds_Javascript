document.addEventListener('DOMContentLoaded', function(e) {

    
    times = ["12:00 AM",
            "1:00 AM",
            "2:00 AM",
            "3:00 AM",
            "4:00 AM",
            "5:00 AM",
            "6:00 AM",
            "7:00 AM",
            "8:00 AM",
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "13:00 PM",
            "14:00 PM",
            "15:00 PM",
            "16:00 PM",
            "17:00 PM",
            "18:00 PM",
            "19:00 PM",
            "20:00 PM",
            "21:00 PM",
            "22:00 PM",
            "23:00 PM"         
    ]

    var value 
  
    var currentValue = 10

    var sizeValue

    //Set values for time range slider
    var inputValue = null;
   

    var currentMap = d3.map();


    d3.queue()

    .defer(d3.csv, "./data/sf_events.json", function(d) { 
       // console.log('cw')
    })
    .await(readyLeaflet);


    // Build Leaflet Map
    function readyLeaflet(error) {

    var selectedDate

    //set today's date
    var today = new Date()
    console.log(today.toLocaleDateString())
    console.log(today)
    var todaySplit = today.toString().split(" " ,4)
    //console.log(instanceSplit);
    var todayClean = todaySplit.toString().replace(/,/g, ' ')
    //console.log(todayClean)
    var dayNumber = todaySplit[2]

    var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
    .replace(/02/g, '2')
    .replace(/03/g, '3')
    .replace(/04/g, '4')
    .replace(/05/g, '5')
    .replace(/06/g, '6')
    .replace(/07/g, '7')
    .replace(/08/g, '8')
    .replace(/09/g, '9')

    var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]

    selectedDate = todayClean2
    

    
    var nextweek
    //d3.selectAll(".events")
        //.style("display", initialDateMatch);
    function nextweek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    console.log(nextweek)
    return nextweek;
}
    nextweek()
   

var dat
console.log(dat)
const picker = datepicker(document.querySelector('#datepicker'), {

        



  // Event callbacks.
  onSelect: function(instance) {
    
    var instanceSplit = instance.dateSelected.toString().split(" " ,4)
    var dayofMonth = instanceSplit[2]
    console.log(dayofMonth)
    var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
    var dayofMonthClean = dayofMonth.toString().replace(/01/g, '1')
    .replace(/02/g, '2')
    .replace(/03/g, '3')
    .replace(/04/g, '4')
    .replace(/05/g, '5')
    .replace(/06/g, '6')
    .replace(/07/g, '7')
    .replace(/08/g, '8')
    .replace(/09/g, '9')

    console.log(dayofMonthClean)

    var finalDate = instanceSplit[0] + " " + instanceSplit[1] + " " + dayofMonthClean + " " + instanceSplit[3]


    selectedDate = finalDate
    //console.log(selectedDate)
    update()
       
  },
  onShow: function(instance) {
    //console.log('Calendar showing.');
  },
  onHide: function(instance) {
    //console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    //console.log(instance.currentMonthName);
  },
 
 
 
  // Customizations.
  formatter: function(el, date, instance) {
    // This will display the date as `1/1/2019`.
    el.value = date.toDateString();
    //console.log(el)
    dat = new Date()
    //console.log(dat.getMonth())
  },
  
  position: 'tr', // Top right.
  startDay: 1, // Calendar week starts on a Monday.
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  overlayButton: 'Go!',
  overlayPlaceholder: 'Enter a 4-digit year',
 
  // Settings.
  alwaysShow: true, // Never hide the calendar.
  dateSelected: new Date(), // Today is selected.
  maxDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Jan 1st, 2099.
  minDate: new Date(new Date().getTime()), // June 1st, 2016.
  startDate: new Date(), // This month.
 

  
  // Disabling things.


  
});


    
    


    //var SFData = SFCoworking.features
        //console.log(SFData)
    var allSFEvents

    function combineArray(arr) {
    allSFEvents = [];
    for (var i = 0; i < arr.length; i++) {
        allSFEvents = allSFEvents.concat(arr[i]);
    }
     
    return allSFEvents;

}

combineArray(sf_events);
//console.log(allSFEvents)


        var radius = d3.scaleLinear()
            .domain([20000, 40000, 60000, 80000, 100000]) //568158 37691912
            .range([8, 10, 12, 14, 16]);


        var type = d3.scaleOrdinal()
            .domain(['WeWork', 'Regus', 'Spaces', 'Knotel', 'RocketSpace', 'HQ Global Workplaces'])
            .range(['#e30613', '#17a2b8', '#28a745', '#6610f2', '#ffc107', '#ed700a'])
             .unknown("white");

        //Build Leaflet Map
        /*
        L.mapbox.accessToken = 'pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjaXFheXZ6ejkwMzdyZmxtNmUzcWFlbnNjIn0.IoKwNIJXoLuMHPuUXsXeug';
        var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
            //var accessToken = 'pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjam13ZHlxbXgwdncwM3FvMnJjeGVubjI5In0.-ridMV6bkkyNhbPfMJhVzw';
        var map = L.map('map').setView([37.7749, -122.4194], 13);
                mapLink = 
            '<a href="https://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
                tileSize: 512,
                detectRetina: false,
                zoomOffset: -1,
                attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        setTimeout(function(){ map.invalidateSize()}, 400);
        */

        var token ="pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjaXFheXZ6ejkwMzdyZmxtNmUzcWFlbnNjIn0.IoKwNIJXoLuMHPuUXsXeug"; // replace with your Mapbox API Access token. Create a Mapbox account and find it on https://account.mapbox.com/

var map = L.map('map').setView([37.7778532, -122.4222303], 13);
  
var gl = L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/dark-v8'
}).addTo(map);





        var svgLayer = L.svg()
            svgLayer.addTo(map);

     
            
        var svgMap = d3.select("#map").select("svg");
            var mapG = svgMap.select('g');

    

        var LeafletDiv = d3.select("#content").append("div")   
            .attr("class", "county2014Tooltip")               
            .style("opacity", 1)
            .style("scrollTop", 0)


        var scrollBar = d3.select("#sidebar")
            .style("scrollTop", 0)


        var scrollBarActive = d3.select("#sidebar.active")
            .style("scrollTop", 0)

            
       
        d3.selectAll('.county2014Tooltip')
        .selectAll('div')
        .enter()
        .append('div')
            .style("background-color", 'red')
            .style("width", '40px')
           
      
     
        var tenantNamesArray = []
        var agencyBrokerNamesArray = []
        allSFEvents.forEach(function(d) {
     
      d.latLong = new L.LatLng(d.Coordinates[1],
                  d.Coordinates[0]);
      //console.log(d.latLong)
      })
            
 

    //console.log(allSFEvents)

    var events = mapG.selectAll("circle")
        .data(allSFEvents)
        .enter().append("circle")
        //.style("stroke", "none")
        .attr("class", 'events')
        .style("fill", '#ffba00')
        .style("opacity", '.7')
        .attr("r", 17.5)
        .style("display", initialDateMatch)
        .style("pointer-events", "auto")
        .on("mouseover", function(d) { 
           // moveLabel()
            d3.selectAll(".events").style("stroke", 'none')
                 d3.selectAll(".events").style("stroke-width", '0px')
            var value2014 = currentMap.get(d.location);     
                  LeafletDiv.transition()        
                     .duration(200)      
                    .style("opacity", 1.7)
                    .style("scrollTop", 0)
                    

                    //console.log(h)

                  LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
                    )
                       
                    .style("top", "1.5vh")
                    .style("text-align", 'left'); 
                   d3.select(this).style("stroke", 'black')
                   d3.select(this).style("stroke-width", '3px')
                   //console.log(d.Coordinates)


            
                   //var tooltip_rect = ('.county2014Tooltip').getBoundingClientRect();
                   //console.log(tooltip_rect)

              })
        

        .on("click", function(d) { 
            $('body').css({
            overflow: 'hidden'
            });
            //d3.select("body").style("pointer-events", 'all')
            d3.selectAll(".events").style("stroke", 'none')
            d3.selectAll(".events").style("stroke-width", '0px')
            console.log("event clicked!")
            const currentCircle = this; 
            console.log(currentCircle)
            //disable hover event listeners
            d3.selectAll(".events").on("mouseout", null);
            d3.selectAll(".events").on("mouseover", null);
            //add popup   


            var value2014 = currentMap.get(d.location);     
                  LeafletDiv.transition()        
                     .duration(200)      
                    .style("opacity", .9);

                  LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
                    )
                    .style("top", "1.5vh")
                    .style("text-align", 'left')
                    .style("pointer-events", 'all')
                  d3.select(this).style("stroke", 'black')  
                  d3.select(this).style("stroke-width", '3px')


                 


                  $('.county2014Tooltip').scrollTop(0);



            d3.event.stopPropagation();

            // if user clicks a SECOND time, anywhere, make popup disappear
            d3.select("body").on("click", function(d) { 
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')
                //d3.select("body").style("pointer-events", 'none')
                if(this !== currentCircle){
                    //console.log("body clicked")
                    //hide popup

                    var elements = d3.select(LeafletDiv)
                  elements.scrollTop = 0
                 // console.log( elements.scrollTop)

                    LeafletDiv.transition()        
                        .duration(200)      
                        .style("opacity", 0)
                        .style("pointer-events", 'none') 
                        .attr("scrollTop", 0) 
                    //revert back to hover, unless user clicks again!
                    d3.selectAll(".events").on("mouseout", true);
                    d3.selectAll(".events").on("mouseover", true);
                    d3.selectAll(".events").on("mouseout", function(d) { 
                    //console.log("mousing out!")      
                        LeafletDiv.transition()        
                        .duration(200)      
                        .style("opacity", 0);  
                        d3.selectAll(".events").style("stroke", 'none')
                        d3.selectAll(".events").style("stroke-width", '0px')      

                })

                    // mouseover event listers added back in
                    d3.selectAll(".events").on("mouseover", function(d) { 
                    LeafletDiv.transition()        
                        .duration(200)      
                        .style("opacity", .9);
                        LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
                    )
                    .style("top", "1.5vh")
                    .style("text-align", 'left')
                  d3.select(this).style("stroke", 'black')  
                  d3.select(this).style("stroke-width", '3px')


          })
       }
                  
            })
        })

            .on("mouseout", function(d) {       
                    LeafletDiv.transition()        
                      .duration(200)      
                      .style("opacity", 0)
                      .style("scrollTop", 0)  
                     d3.selectAll(".events").style("stroke", 'none')
                     d3.selectAll(".events").style("stroke-width", '0px')
                  })




            

          /*Bind an event handler to the "resize"*/

            //if ($(window).width() < 480 || $(window).height() < 480) {
                //window.event.cancelBubble = true
                
                
                //d3.select("#sidebarCollapse").on("click", function(d) { 
                    //console.log("toggle clicked!")
                    //$('#sidebar').addClass('active');   
                    


                    //d3.select("#sidebarCollapse").on("click", function(d) { 
                    //console.log("toggle clicked!")
                    //$('#sidebar').removeClass('active');   
                    
                //})
                    
            //})
                
                //}
                


            /*
            d3.select("body").on("click",function(){
                LeafletDiv.transition()        
                      .duration(200)      
                      .style("opacity", 0);  
                     d3.selectAll(".events").style("stroke", 'none')
                     d3.selectAll(".events").style("stroke-width", '0px')
                    document.getElementById("test").innerHTML = 'no picture'
        });
      
*/


        //$(document).on('click',function(d){
                //if(d.target.onclick==null) {
                    //console.log('unclicked')
                //}
        //})

      
        

    var todaysDate = new Date 


    var date
var dateClean
    d3.selectAll(".events").each(function(d) {
            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            //console.log("d.startDate is: "+ d.startDate+"date is: "+date)
            var dateString = date.toString()
            //console.log(d.startDate + date + d.name)
            //date.toLocaleDateString()
            var dateSplit = dateString.split(" " ,4)
            var dateClean = dateSplit.toString().replace(/,/g, ' ')
            //console.log(date.split(' '))
            //dateSplit = date.split(/ (.*)/);
            //console.log(dateSplit)
            d.dateFormatted = dateClean
            //dateClean = date
            return d.dateFormatted

        });

   
 
    //console.log(events)
      
    function drawAndUpdateEventCircles() {
        events.attr("transform",
            function(d) {
                var layerPoints = map.latLngToLayerPoint(d.latLong);
                //console.log(d.latLong)
                return "translate("+ layerPoints.x +","+ layerPoints.y +")";
            }
        )
    }
drawAndUpdateEventCircles();
    map.on("moveend", drawAndUpdateEventCircles);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    var today  = new Date();
    var todayString = today.toString().split(" " ,4)
    var todayClean = todayString.toString().replace(/,/g, ' ')
    //console.log(todayClean)



//console.log(today.toLocaleDateString("en-US")); // 9/17/2016
//console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
//console.log(today.toLocaleDateString("hi-IN", options));


function update(value) {

    resetStroke ()
    //filter by current date selected
    d3.selectAll(".events")
        .style("display", dateMatch);


    
    //filter by current time filter selected

    if(document.getElementById('allTimes').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "00:00", "24:00")
        });      
    }

    if(document.getElementById('morn').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "07:00", "12:00")
        });      
    }

    if(document.getElementById('lunch').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "12:00", "16:00")
        });      
    }

    if(document.getElementById('afternoon').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "16:00", "20:00")
        });      
    }

    if(document.getElementById('eve').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "20:00", "24:00")
        });      
    }

    if(document.getElementById('late').checked) {
         d3.selectAll(".events")
        .style("display", function(d) {
            return timeInterval(d, "24:00", "07:00")
        });      
    }

    


   
   

   
 
}

function updateTime(start, end) {
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "20:00", "24:00")
            //use it here-------^
        });
};



//console.log(dateClean)

    function initialDateMatch(data){
        d3.selectAll(".events").each(function(d) {
            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            var dateString = date.toString()
            var dateClean= dateString.split(" " ,4).toString().replace(/,/g, ' ')
            d.dateFormatted = dateClean
 
            return d.dateFormatted

        });

        var x = "Friday, June 14th, 2019"

        //console.log(data.dateFormatted)
    if (todayClean2 == data.Date) {
        

        
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.dateFormatted)
        return 'inline'
    } else {
       return 'none'
    }
}


    function dateMatch(data){

        

        //console.log(selectedDate)
    if (selectedDate === data.Date) {
        
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.Date)
        return 'inline'
    } else {
       return 'none'
    }
}


    function timeInterval(data, start, end) {


        var today = new Date()
    //console.log(today.toLocaleDateString())
    //console.log(today)
    var todaySplit = today.toString().split(" " ,4)
    //console.log(instanceSplit);
    var todayClean = todaySplit.toString().replace(/,/g, ' ')
    //console.log(todayClean)
    var dayNumber = todaySplit[2]

    var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
    .replace(/02/g, '2')
    .replace(/03/g, '3')
    .replace(/04/g, '4')
    .replace(/05/g, '5')
    .replace(/06/g, '6')
    .replace(/07/g, '7')
    .replace(/08/g, '8')
    .replace(/09/g, '9')

    var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]
        //console.log(start, end)
    var time = data.Time
        
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        var showStartTime = (sHours + ":" + sMinutes);
        //console.log(showStartTime)

        //var beginning = start
        //var ending = end
        //console.log(selectedDate)
        //console.log(todayClean2)
        //selectedDate = todayClean2

        if (start <= showStartTime && showStartTime <= end && selectedDate === data.Date) {
            //console.log(selectedDate)
                    
         return "inline";
        } else {
            return "none";
        };
   
 } 

    //console.log(d.dateFormatted)

    
    //Apply checkbox filters for genre


    d3.selectAll("#allGenre").on("change", function() {
    resetDisplay()
    resetAll()
    resetVisibility()

    
    //genreMatch("Rock", "Pop", "Indie Pop")
});


    var currentValue = 0;
    d3.selectAll("#bluesGenre").on("change", function() {
    resetDisplay()
    console.log("blue clicked! radio")
    console.log("current")
    var bluesRadioValue = document.getElementById("bluesGenre").value 
    console.log(bluesRadioValue, "blues radio value")
    console.log(currentValue, "current value")
    currentValue = bluesRadioValue
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Blues"]
    genreMatch(x)
});


 

    d3.selectAll("#classicalGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Classical"]
    genreMatch(x)
});

    d3.selectAll("#electronicGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Electronic", "Electronica", "House", "DJ", "Techno", "Trance", "Dance"]
    genreMatch(x)
    //removePoints(x)
    //genreMatch("Electronica")
    //genreMatch("House")
    //genreMatch("DJ")
    //genreMatch("Techno")
    //genreMatch("Dance")
    //genreMatch("Trance")
});

    d3.selectAll("#folkGenre").on("change", function() {
    console.log("folk yeah!")
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Bluegrass","Folk","Singer Songwriter","Americana","Country","Acoustic"]
    genreMatch(x)
    
});

    d3.selectAll("#hipHopGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Hip Hop", "Rap"]
    genreMatch(x)
    
});

    d3.selectAll("#jazzGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Jazz"]
    genreMatch(x)
});

    d3.selectAll("#metalGenre").on("change", function() {
    resetDisplay()
    isplay = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["Metal", "Black Metal", "Hardcore"]
    genreMatch(x)
    //genreMatch("Metal")
    //genreMatch("Black Metal")
    //genreMatch("Hardcore")
});

    d3.selectAll("#rbGenre").on("change", function() {
    resetDisplay()
    isplay = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["R&B", "Rnb", "Soul", "Disco", "Reggae", "rnb", "funk"]
    genreMatch(x)
    
});


    d3.selectAll("#rockPopGenre").on("change", function() {
    resetDisplay()
    noPointers()
    //resetVisibility()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    pointerEvents = this.checked ? "all" : "all";
    //notMatchFill= this.checked ? "initial" : "none";
    //pointerEvents = this.checked ? "all" : "none";
    x = ["Rock", "Pop","Indie"]
    genreMatch(x)
    removePoints(x)
    
    
    
});

    d3.selectAll("#genreUnknownGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "#ffba00" : "none";
    display2 = this.checked ? "black" : "none";
    x = ["No genre available"]
    genreMatch(x)
});
    
//timeMatch


d3.selectAll("#allTimes").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "00:00", "24:00")
});
})

d3.selectAll("#morn").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "07:00", "12:00")
});
})

d3.selectAll("#lunch").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "12:00", "16:00")
});
})

d3.selectAll("#afternoon").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "16:00", "20:00")
});
})



d3.selectAll("#eve").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "20:00", "24:00")
});
})

d3.selectAll("#late").on("change", function() {
    resetStroke ()
    d3.selectAll(".events")
        .style("display", function(d) {
            //your datum is here---^
            return timeInterval(d, "24:00", "07:00")
});
})
    


    


    


    
function genreMatch2(genreType){

     var genreType

     
    //.style("opacity", opac)
    


    for (i=0; i<genreType.length; i++){
        d3.selectAll(".events")
    if (d.Genre.includes(genreType[i])==false) {
        return 'inline'
    } else {
       return 'none'
    }
}
    
}

    




 function genreMatch (genreType) {

    d3.selectAll(".events").style("stroke", 'none')
                 d3.selectAll(".events").style("stroke-width", '0px')
    var genreType

    for (i=0; i<genreType.length; i++){
        console.log(genreType[i])
        d3.selectAll(".events")
    .filter(function(d) {       
        return (d.Genre.includes(genreType[i]))
    })
    .style("fill", display)
    //.style("stroke", display2)
    //.style("pointer-events",pointerEvents)
    //.style("opacity", opac)
    }  


    for (i=0; i<genreType.length; i++){
        console.log(genreType[i])
        d3.selectAll(".events")
    .filter(function(d) {       
        return (d.Genre.includes(genreType[i])==true)
    })
    .style("pointer-events", all)
    //.style("pointer-events",pointerEvents)
    //.style("opacity", opac)
    } 

 }  

 function removePoints (genreType) {
    var genreType

    for (i=0; i<genreType.length; i++){
        console.log(genreType[i])
        d3.selectAll(".events")
    .filter(function(d) {       
        return (!d.Genre.includes(genreType[i]))
    })
    .style("pointer-events", notMatchFill)
    .style("stroke", display2)
    //.style("pointer-events",pointerEvents)
    //.style("opacity", opac)
    }  

    
 }    

 function genreExclude (genreType, key1, key2, key3) {
    var genreType
    //console.log(genreType)
    //console.log("genre match function on")

    //var conditions = [key1, key2, key3];
    //console.log(conditions)

    d3.selectAll(".events")
    .filter(function(d) {     
        console.log((!d.Genre.includes(genreType))) 
        return (!d.Genre.includes(genreType))

        //return d.Genre.includes(key1)
      
    })
    .style("display", visibility)
    //.style("opacity", opac)
 }   

 
 

 //function display(){
    //display = this.checked ? "inline" : "none";
 //}

 function resetDisplay (){
    d3.selectAll(".events")
            .style("fill", 'none')
            .style("stroke", 'none')
            .style("stroke-width", '0 px')
 }

 function resetStroke (){
    d3.selectAll(".events")
            .style("stroke", 'none')        
 }

 function resetAll (){
    d3.selectAll(".events")
            .style("fill", '#ffba00');
 }

 function resetVisibility (){
    d3.selectAll(".events")
            .style("display", 'all');
 }

 function noPointers (){
    d3.selectAll(".events")
            .style("pointer-events", 'auto');
 }

 //Time slider
 d3.select("#timeslide").on("input", function() {       
            //console.log(value)
            //updateTime(+this.value);   
           // console.log(this.value)
        });


 

function timeMatch(d, value) {

        var time = d.Time
        
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        var newTime = (sHours + ":" + sMinutes);
        console.log(newTime)

        //var time = (d.Time);
        //time = time.getHours()
       // console.log(newTime, "is time")
        console.log(inputValue, "is input value")
        if (inputValue >= newTime) {
            console.log("match")
                    
         return "inline";
        } else {
            return "none";
        };
    }


//function to move info label with mouse
function moveLabel(){
    //get width of label
    var labelWidth = d3.select(".county2014Tooltip")
        .node()
        .getBoundingClientRect()
        .width;

    //use coordinates of mousemove event to set label coordinates
    var x1 = d3.event.clientX + 10,
        y1 = d3.event.clientY - 50,
        x2 = d3.event.clientX - labelWidth - 10,
        y2 = d3.event.clientY + 25;

    //horizontal label coordinate, testing for overflow
    var x = d3.event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1;
    //vertical label coordinate, testing for overflow
    var y = d3.event.clientY < 75 ? y2 : y1;

    d3.select(".county2014Tooltip")
        .style({
            "left": x + "px",
            "top": y + "px"
        });
}; 




}
})

