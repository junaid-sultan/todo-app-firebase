
var list = document.getElementById("listItem")

firebase.database().ref("todos").on("child_added" , function(data){
    var li = document.createElement("li")
      var text = document.createTextNode(data.val().value)
      li.appendChild(text)
     
      list.appendChild(li)
      li.setAttribute("class", "list")
  
  
  
      var dltBtn = document.createElement("button")
      var dltText = document.createTextNode("Delete")
      dltBtn.appendChild(dltText)
      li.appendChild(dltBtn)
      dltBtn.setAttribute("onclick" , "deleteLi(this)")
      dltBtn.setAttribute("id",data.val().key)
      dltBtn.setAttribute("class","btn")
  
  
      var edtbtn = document.createElement("button")
      var edtText = document.createTextNode("Edit")
      edtbtn.setAttribute("onclick","editLi(this)")
      edtbtn.appendChild(edtText)
      li.appendChild(edtbtn)
      edtbtn.setAttribute("id",data.val().key)
      edtbtn.setAttribute("class","btn")
  
  })

function addItem(){

    var val = document.getElementById("val")
    var key = firebase.database().ref("todos").push().key

    var todo = {
        value: val.value,
        key:key
    }
    firebase.database().ref("todos").child(key).set(todo)
    





  
    val.value = ""

}
function deleteLi(e){
    firebase.database().ref("todos").child(e.id).remove()
    e.parentNode.remove()
}

function editLi(e){
   
    var ubdValue = prompt("Enter Undated value", e.parentNode.firstChild.nodeValue )
    var edtTool = {
        value: ubdValue,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(edtTool)
    e.parentNode.firstChild.nodeValue = ubdValue;
}

function dltAll(){
    list.innerHTML = ""
}