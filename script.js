const getInput = document.getElementById("userId");
const inputBtn = document.getElementById("userBtn");
const btnText = inputBtn.innerText;
const displayUser = document.getElementById("displayData");
let emptyArr = [];
let user_id = null;
let getallData = () => {
  let strObj = localStorage.getItem("user");
  if (strObj) {
    emptyArr = JSON.parse(strObj); // Parsing the JSON string to populate the array
  }
  inputBtn.addEventListener("click", () => {
    let inputValue = getInput.value;
    if (user_id != null) {
      emptyArr.splice(user_id, 1, { name: inputValue });
    } else {
      emptyArr.push({ name: inputValue });
    }
    saveInfo(emptyArr);
    getInput.value = "";
    inputBtn.innerHTML = btnText;
  });
  showInfo();
};

let saveInfo = (emptyArr) => {
  emptyArr.forEach(user => {  // Convert names to lowercase before saving
    user.name = user.name.toLowerCase();
  });
  let str = JSON.stringify(emptyArr);
  const addData = localStorage.setItem("user", str);
  showInfo();
};

 



let showInfo = () => {
  let statment = "";
  emptyArr.forEach((user, i) => {
    statment += `<tr>
       <th scope="row">${i + 1}</th>
       <td>${user.name}</td>
         <td>
         <i class="fa fa-edit btn btn-info text-dark mx-2" onclick = "editInfo(${i})"></i>
        <i class="fa fa-trash-o btn btn-danger text-white mx-2" onclick = "deleteInfo(${i})"></i>
        </td>
        </tr>`;
  });
  displayUser.innerHTML = statment;
};
let editInfo = (id) => {
  user_id = id;
  getInput.value = emptyArr[id].name;
  inputBtn.innerHTML = "SaveChang";
};
let deleteInfo = (id) => {
  emptyArr.splice(id, 1);
  saveInfo(emptyArr);
};
getallData(); // Call getallData to populate emptyArr initially
