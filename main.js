const users = [
    {
        id:1,
        name :"Ishmal Nayab",
        email:"ishmalnayab76@gmail.com"
    },
    {
        id:2,
        name :"Rare Rajput",
        email:"rajputrare@gmail.com"
    }

]
var currentIndex = -1
const makeEvents = () => {
    var editBtns = document.querySelectorAll(".editBtn")
    editBtns.forEach(
        editBtn => {
            editBtn.addEventListener("click",(event) =>{
                var index = event.target.id
                document.getElementById("name") .value = users[index].name
                document.getElementById("email") .value = users[index].email
                currentIndex =index

                document.getElementById("formBtn") .innerHTML="Update User"
                document.getElementById("cancelBtn") .classList.remove("d-none")
               

            })
        }
    )
    var delBtns = document.querySelectorAll(".delBtn")
    delBtns.forEach(
        delBtn => {
            delBtn.addEventListener("click",(event) =>{
                var index = event.target.id
               users.splice(index,1)
               makeTable()
            })
        }
    )
}
const makeTable =()=>{
    var content =""
    if(users.length){
        users.forEach(
            (user ,i) => {
                content +=`
                <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                <div class = "btn-group">
                <button id="${i}" class="btn editBtn btn-sm btn-outline-warning">Edit</button>
                <button id="${i}" class="btn delBtn btn-sm btn-outline-danger">Delete</button>
                </div>
                </td>
                </tr>
                `
            }
        )
        document.getElementById("usersList").innerHTML=content
        makeEvents()
    }else{
        content = `
        <tr>
        <td colspan="4">
        <h6 class="text-center">NO USERS FOUND<h6>
        </td>
        </tr>
        `
        document.getElementById("usersList").innerHTML=content
    }
}
makeTable()
const checkUser = (email) => {
    return users.findIndex(user =>user.email === email)
}
const checkUpdateUser = (email,id) => {
    return users.filter(user =>id!==user.id && user.email===email)
}
const addUser = () =>{
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    if(!email || !name)
    showMsg("Error!" ,"Please fillin all the required fields" ,"error")
  else {
      if(currentIndex === -1 && checkUser(email)!==-1)
      showMsg("Error" ,"A user already exists with this email" ,"error")
      else{
          if(currentIndex === -1){
              const user ={id:users.length+1,name,email}
              users.push(user)
              showMsg("Success" , "Uer add successfully." , "success")
              makeTable()
              document.getElementById("name").value = ""
              document.getElementById("email").value = ""
          }else{
              if(checkUpdateUser(email ,users[currentIndex].id)>0){ 
              showMsg("error!", "A user already exists with this email","error")
          }else
          {
             users[currentIndex].name = name
             users[currentIndex].email = email
             currentIndex = -1
             document.getElementById("formBtn").innerHTML = "Add User"
             document.getElementById("cancelBtn").classList.add("d-none")
             showMsg("success!" ,"User  updated successfully","success") 
             makeTable()
             document.getElementById("name").value=""
             document.getElementById("email").value=""

          }
          }


      }
  }

}
const cancelUpdates =() =>{
    currentIndex =-1
    document.getElementById("name").value =""
    document.getElementById("email").value= ""
    document.getElementById("formBtn").innerHTML ="Add user"
    document.getElementById("cancelBtn").classList.add("d-none")
}
const showMsg =(title , text , icon)=>{
    Swal.fire({
        title , text ,icon
    })
}





