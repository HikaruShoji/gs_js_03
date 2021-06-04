var firebaseConfig = {
  apiKey: "AIzaSyD69wPx7qnS8rn92Z7wj-on5rNy9I52WLY",
  authDomain: "dev20chat-4a8af.firebaseapp.com",
  databaseURL: "https://dev20chat-4a8af-default-rtdb.firebaseio.com/",
  projectId: "dev20chat-4a8af",
  storageBucket: "dev20chat-4a8af.appspot.com",
  messagingSenderId: "254701266315",
  appId: "1:254701266315:web:ad3ae2f908ef9d568d3b8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebaseのデーターベース（保存させる場所）を使いますよ
const newPostRef = firebase.database().ref();

// ここから下にjqueryの処理を書いて練習します

// 送信ボタンをクリックされたら次の処理をする
function scrollToEnd() {
  const messagesArea = document.getElementById('scroll-inner');
  messagesArea.scrollTop = messagesArea.scrollHeight;
}
function timeString(date) {
  return date.getFullYear() + '年' + date.getMonth()+1 + '月' + date.getDate() + '日' + date.getHours() + '時' + date.getMinutes() + '分'
};
$("#send").on("click", function () {
  if ($("#text").val() === ""){
    alert("入力されていません")
    return
  }
  
  newPostRef.push({
    username: $("#username").val(),
    text: $("#text").val(),
  })
  if (username === ""){
    username = "名無しさん";
    return
  }
  
  $("#text").val("");
  $("#username").val("");
});

// 受信処理
newPostRef.on("child_added", function (data) {
  let v = data.val();
  let k = data.key;


// テンプレートリテラル
  let str = `<p>${v.username}<br>${v.text}</p>`;

  $("#output").prepend(str);
})

$("#text").on("keydown", function (e) {
  console.log(e , 'evetデータの塊')

  if (e.keyCode === 13){
    if ($("#text").val() === ""){
    alert("入力されていません")
    return
  }
    newPostRef.push({
    username: $("#username").val(),
    text: $("#text").val(),
  })
  if ($("#username").val() === ""){
    username="名無しさん"
    return
  }
  $("#text").val("");
  $("#username").val("");
  }
})