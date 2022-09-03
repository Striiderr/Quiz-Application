var count =0;
var marks =0;
var answer =[];

function buttons_manager(){
  if(count==0){
    $('#prev').hide();
  }
  else
  if(count == 4){
    $('#next').hide();
  }
  else{
    $('#prev').show();
    $('#next').show();
  }
}

function adding_Question(data,count){
  $(data).find("question").each(function(index,element){
if($(element).find("qnumber").text() == count+1 ){
  $('#question').text($(element).find("qtitle").text());
  $('#qnumber').text($(element).find("qnumber").text());
  $('#option1').text($(element).find("a").text());
  $('#option2').text($(element).find("b").text());
  $('#option3').text($(element).find("c").text());
  $('#option4').text($(element).find("d").text()); 
}
  });
}

function selected_Answer(){ 
  for(var i=0; i<4;i++){
    var a=document.getElementById("options").children;
    
    if(a[i].innerHTML==answer[count]){
        $("#options").children("button")[i].classList.add("active");
    }
    else{
      $("#options").children("button")[i].classList.remove("active");
    }
  }
}

function creating_result(data){

  var ans= $(data).find('rightanswers').text();
  
  var iter=0,c=0;

  $(data).find("question").each(function(index,element){
      var check=$(element).find(ans[iter]).text();
      if(answer[iter/2]==check){
        marks++;
      }
      console.log(check);
      iter+=2;
  });
   
  
    $('#marks').text(marks);
    $('#correct-answer').text(marks);
    $('#precentage').text((marks/5)*100 + "%");

    $('#main').hide();  
  $('#Result').show();

}

    

$(function(){
  
  $('#main').hide();
  $('#Result').hide();

  buttons_manager();
 
  $('#options').hide();


  var xhttp = new XMLHttpRequest();
      var xmlDoc;
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          xmlDoc=this.responseXML;
   
        
              
            $("#btn").click(function() {     
              $('#options').show();
              $('#start_page').hide();
              $('#main').show();
              adding_Question(xmlDoc, count);
            });


            $('.option').click(function() {
              $(this).addClass('active');
              $(this).siblings().removeClass("active");
              answer[count]=$(this).html();
            });

            //Next questions
            $('#next').click(function() {
              if(count > answer.length-1){
                alert('Select atleast one option');
              }
              else{
                count++;
                adding_Question(xmlDoc,count);
                $('#prev').show();
                $('#options').removeClass('active');
                buttons_manager();
                selected_Answer();

              }
            });

            //prev questions
            $('#prev').click(function() {
              count --;
              adding_Question(xmlDoc,count);
              buttons_manager();
              selected_Answer();
            });
            
            $('#finish').click(function(){
              
              if(count > answer.length -1){
                alert("select atleast Options");
              }
              else{
                creating_result(xmlDoc);
              }
            });

          // });

        }
      };
      xhttp.open("GET", "finalQuiz.xml", true);
      xhttp.send();


});


