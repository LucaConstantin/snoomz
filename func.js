const firebaseConfig = {
    //put your firebase config here
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  

function deleteMessage(doc_id){
  
    var flag = window.confirm("Are you sure to want delete ?")

    if(flag){
        
        $("#"+doc_id+"-message").html("This message has been deleted")
        db.ref('channels/' + cid + "/messages/" + doc_id).update({msg: "This message has been deleted",});
        
        console.log("Deleted");
    
    }
    }
    function deletePMessage(doc_id){
  
        var flag = window.confirm("Are you sure to want delete ?")
    
        if(flag){
            
            $("#"+doc_id+"-message").html("This message has been deleted")
            db.ref("/public/" + "/messages/" + doc_id).update({msg: "This message has been deleted",});
            
            console.log("Deleted");
        
        }
        }

function loadChat(uid, usrid, usr){
    if( $('#chat').css('display')=='none') {
             
        document.getElementById("chat").style.display = "block";
        document.getElementById("plist").style.display = "none";
    db.ref("/users/" + uid).get().then((snapshot) => {
        const data = snapshot.val();
        
        document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> ${data.bio} </small></p>`
        document.getElementById("topName").innerHTML = data.uid;
        document.getElementById("topPfp").src = data.pfp;
        
        const username = usr;
    db.ref("/users/" + usrid + "/people/" + uid).get().then((snapshot) => {
        const ch = snapshot.val();
        const fetchChat = db.ref( 'channels/' + ch.cid + "/messages/");

        $('#messages').empty()
        const input = `<input id="chat-txt" maxlength="150" type="text" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                            <span class="input-group-btn">
                                <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendMsg('${usr}', '${ch.cid}')" >
                                    <i class="fa fa-send" ></i></button>
                                    
                                        
                                    
                            </span>
                                `
        const buttons =  `
        <a href="javascript:closeDm('${usrid}','${uid}', '${username}');" class="btn btn-outline-info" id="closeDM"><i class="fa fa-window-close-o"></i></a>
        <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
        <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD TYHE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      


        document.getElementById("input-group").innerHTML = input;
        document.getElementById("buttons").innerHTML = buttons;

        fetchChat.orderByChild("date").on("child_added", function (snapshot, ind) {
            const messages = snapshot.val();
            
            if(username == messages.usr){
                const msg = `
                <li class="clearfix">
                    <div class="message-data text-right">
                    </div>
                    <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deleteMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
                </li>`;
                document.getElementById("messages").innerHTML += msg;
                }
                else{
                    
                    const msg = `
                    <li class="clearfix">
                    <div class="message-data text-left">
                        <span class="message-data-time"> ~${messages.usr}
                    </div>
                    <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                    </li>`;

                document.getElementById("messages").innerHTML += msg;

                }
                aScroll();
          });
        });
          

      }).catch((error) => {
        console.error(error);
      });
    }
    else{
        db.ref("/users/" + uid).get().then((snapshot) => {
            const data = snapshot.val();
            
            document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> ${data.bio} </small></p>`
            document.getElementById("topName").innerHTML = data.uid;
            document.getElementById("topPfp").src = data.pfp;
            
            const username = usr;
        db.ref("/users/" + usrid + "/people/" + uid).get().then((snapshot) => {
            const ch = snapshot.val();
            const fetchChat = db.ref( 'channels/' + ch.cid + "/messages/");
    
            $('#messages').empty()
            const input = `<input id="chat-txt" maxlength="150" type="text" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendMsg('${usr}', '${ch.cid}')" >
                                        <i class="fa fa-send" ></i></button>
                                        
                                            
                                        
                                </span>
                                    `
            const buttons =  `
            <a href="javascript:closeDm('${usrid}','${uid}', '${username}');" class="btn btn-outline-info" id="closeDM"><i class="fa fa-window-close-o"></i></a>
            <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
            <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD TYHE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      
    
    
            document.getElementById("input-group").innerHTML = input;
            document.getElementById("buttons").innerHTML = buttons;
    
            fetchChat.orderByChild("date").on("child_added", function (snapshot, ind) {
                const messages = snapshot.val();
                
                if(username == messages.usr){
                    const msg = `
                    <li class="clearfix">
                        <div class="message-data text-right">
                        </div>
                        <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deleteMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
                    </li>`;
                    document.getElementById("messages").innerHTML += msg;
                    }
                    else{
                        
                        const msg = `
                        <li class="clearfix">
                        <div class="message-data text-left">
                            <span class="message-data-time"> ~${messages.usr}
                        </div>
                        <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                        </li>`;
    
                    document.getElementById("messages").innerHTML += msg;
    
                    }
                    aScroll();
              });
            });
              
    
          }).catch((error) => {
            console.error(error);
          });
    }
}
function loadSChat(uid, usrid, usr){
    if( $('#chat').css('display')=='none') {
             
        document.getElementById("chat").style.display = "block";
        document.getElementById("plist").style.display = "none";
    db.ref("/servers/" + uid).get().then((snapshot) => {
        const data = snapshot.val();
        
        document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> ${data.bio} </small></p>`
        document.getElementById("topName").innerHTML = data.name;
        document.getElementById("topPfp").src = data.pfp;
        
        
        const username = usr;
    db.ref("/users/" + usrid + "/servers/" + uid).get().then((snapshot) => {
        const ch = snapshot.val();
        const fetchChat = db.ref( 'channels/' + ch.id + "/messages/");

        $('#messages').empty()
        const input = `<input id="chat-txt" maxlength="150" type="text" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                            <span class="input-group-btn">
                                <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendMsg('${usr}', '${ch.id}')" >
                                    <i class="fa fa-send" ></i></button>
                                    
                                        
                                    
                            </span>
                                `
        const buttons =  `
        <p id="inv" onclick="copyEvent('inv')"><strong>${ch.inv}</strong></p>
        <a href="javascript:exitServer('${usrid}','${uid}', '${username}');" class="btn btn-outline-info" id="closeDM"><i class="fa fa-window-close-o"></i></a>
        <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
        <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD TYHE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      


        document.getElementById("input-group").innerHTML = input;
        document.getElementById("buttons").innerHTML = buttons;

        fetchChat.orderByChild("date").on("child_added", function (snapshot, ind) {
            const messages = snapshot.val();
            
            if(username == messages.usr){
                const msg = `
                <li class="clearfix">
                    <div class="message-data text-right">
                    </div>
                    <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deleteMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
                </li>`;
                document.getElementById("messages").innerHTML += msg;
                }
                else{
                    
                    const msg = `
                    <li class="clearfix">
                    <div class="message-data text-left">
                        <span class="message-data-time"> ~${messages.usr}
                    </div>
                    <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                    </li>`;

                document.getElementById("messages").innerHTML += msg;

                }
                aScroll();
          });
        });
          

      }).catch((error) => {
        console.error(error);
      });
    }
    else{
        db.ref("/servers/" + uid).get().then((snapshot) => {
            const data = snapshot.val();
            
            document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> ${data.bio} </small></p>`
            document.getElementById("topName").innerHTML = data.name;
            document.getElementById("topPfp").src = data.pfp;
            
            
            const username = usr;
        db.ref("/users/" + usrid + "/servers/" + uid).get().then((snapshot) => {
            const ch = snapshot.val();
            const fetchChat = db.ref( 'channels/' + ch.id + "/messages/");
    
            $('#messages').empty()
            const input = `<input id="chat-txt" maxlength="150" type="text" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendMsg('${usr}', '${ch.id}')" >
                                        <i class="fa fa-send" ></i></button>
                                       
                                            
                                        
                                </span>
                                    `
            const buttons =  `
            <p id="inv" onclick="copyEvent('inv')"><strong>${ch.inv}</strong></p>
            <a href="javascript:exitServer('${usrid}','${uid}', '${username}');" class="btn btn-outline-info" id="closeDM"><i class="fa fa-window-close-o"></i></a>
            <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
            <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD THE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      
    
    
            document.getElementById("input-group").innerHTML = input;
            document.getElementById("buttons").innerHTML = buttons;
    
            fetchChat.orderByChild("date").on("child_added", function (snapshot, ind) {
                const messages = snapshot.val();
                
                if(username == messages.usr){
                    const msg = `
                    <li class="clearfix">
                        <div class="message-data text-right">
                        </div>
                        <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deleteMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
                    </li>`;
                    document.getElementById("messages").innerHTML += msg;
                    }
                    else{
                        
                        const msg = `
                        <li class="clearfix">
                        <div class="message-data text-left">
                            <span class="message-data-time"> ~${messages.usr}
                        </div>
                        <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                        </li>`;
    
                    document.getElementById("messages").innerHTML += msg;
    
                    }
                    aScroll();
              });
            });
              
    
          }).catch((error) => {
            console.error(error);
          });
    }
}
function loadPChat(usr){
    if( $('#chat').css('display')=='none') {
             
        document.getElementById("chat").style.display = "block";
        document.getElementById("plist").style.display = "none";
    document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> Official Server!Free for all </small></p>`
    document.getElementById("topName").innerHTML = "Public Chat";
    document.getElementById("topPfp").src = "https://media.istockphoto.com/vectors/chat-icon-vector-sign-and-symbol-isolated-on-white-background-chat-vector-id1001103912?k=20&m=1001103912&s=170667a&w=0&h=7KUgKVheK714AsPDWVw1J5GlBRVzd1XXmDcTgV-Q76o=";
    const fetchChat = db.ref("public/" + "/messages/");
    $('#messages').empty()
    const username = usr;
    const input = `<input id="chat-txt" type="text" maxlength="150" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                            <span class="input-group-btn">
                                <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendPMsg('${usr}')" >
                                    <i class="fa fa-send" ></i></button>
                                    
                                        
                                    
                            </span>
                                `
                                const buttons =  `
        
        <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
        <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD THE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      


       
        document.getElementById("buttons").innerHTML = buttons;
        document.getElementById("input-group").innerHTML = input;
    fetchChat.orderByChild("date").on("child_added", function (snapshot) {
        const messages = snapshot.val();
        
        if(username == messages.usr){
            const msg = `
            <li class="clearfix">
                <div class="message-data text-right">
                </div>
                <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deletePMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
            </li>`;
            document.getElementById("messages").innerHTML += msg;
            }
            else{
                
                const msg = `
                <li class="clearfix">
                <div class="message-data text-left">
                    <span class="message-data-time"> ~${messages.usr}
                </div>
                <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                </li>`;

            document.getElementById("messages").innerHTML += msg;

            }
            aScroll();
      });
    }
    else
    {
        document.getElementById("topBio").innerHTML = ` <p> <small> <i class="fa fa-circle online" style="color:#86c541;"></i> Official Server!Free for all </small></p>`
    document.getElementById("topName").innerHTML = "Public Chat";
    document.getElementById("topPfp").src = "https://media.istockphoto.com/vectors/chat-icon-vector-sign-and-symbol-isolated-on-white-background-chat-vector-id1001103912?k=20&m=1001103912&s=170667a&w=0&h=7KUgKVheK714AsPDWVw1J5GlBRVzd1XXmDcTgV-Q76o=";
    const fetchChat = db.ref("public/" + "/messages/");
    $('#messages').empty()
    const username = usr;
    const input = `<input id="chat-txt" type="text" maxlength="150" class="form-control input-sm" style="border-radius: 4px;" placeholder="Type your message here..." />
                            <span class="input-group-btn">
                                <button style="background-color:rgb(215, 220, 228); border-color: transparent; border-radius: 15%;" type="submit" class="btn btn-warning btn-sm send-button" onclick="sendPMsg('${usr}')" >
                                    <i class="fa fa-send" ></i></button>
                                    
                                        
                                    
                            </span>
                                `
                                const buttons =  `
        
        <a href="javascript:help();" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
        <a href="javascript:closeChat();" class="btn btn-outline-warning" id="exitbtn"><i class="fa fa-arrow-right "></i></a>`//TO DO: ADD THE BUTTONS TO THE UPPER BUTTONS PART AT CHAT.      


       
        document.getElementById("buttons").innerHTML = buttons;
        document.getElementById("input-group").innerHTML = input;
    fetchChat.orderByChild("date").on("child_added", function (snapshot) {
        const messages = snapshot.val();
        
        if(username == messages.usr){
            const msg = `
            <li class="clearfix">
                <div class="message-data text-right">
                </div>
                <div class="message other-message float-right" > <p id="${messages.id}-message">${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> <span onClick="deletePMessage('${messages.id}')" class="glyphicon glyphicon-trash">  </p></div>
            </li>`;
            document.getElementById("messages").innerHTML += msg;
            }
            else{
                
                const msg = `
                <li class="clearfix">
                <div class="message-data text-left">
                    <span class="message-data-time"> ~${messages.usr}
                </div>
                <div class="message my-message float-left"> <p> ${messages.msg} <span></span> <span class="message-data-time"><small>${messages.ndate}</small></span> </p></div>
                </li>`;

            document.getElementById("messages").innerHTML += msg;

            }
            aScroll();
      });
    }
}

    function copyEvent(id)
                        {
                            var str = document.getElementById(id);
                            window.getSelection().selectAllChildren(str);
                            document.execCommand("Copy")
                        }

                        var myVar;

                        function loading() {
                            myVar = setTimeout(showPage, 3000);
                        }
                        
                        function showPage() {
                            document.getElementById("loading").style.display = "none";
                            document.getElementById("mainContent").style.display = "block";
                         }

      if(document.getElementById("people").getElementsByTagName('li').length >= 4)
      {
        document.getElementById("peopleMain").style.overflow = "scroll";
      }                   

      function aScroll(){
        if(document.getElementById('messages').getElementsByTagName('li').length >= 4){ // we will scoll down on last message
        // auto scroll
        $(".chat-history").animate({ scrollTop: $('.chat-history').prop("scrollHeight")}, 10);
        }
        }

        function sendMsg(usr, cid) {
            if(document.getElementById("chat-txt").value != ""){
            
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var n = today.getHours();
            var s = today.getMinutes();
            
            var today = mm + '-' + dd + '-' + yyyy + " : " + n + " / " + s;
            var nDate = n + " / " + s;
            const timestamp = today;
            const ntimestamp = nDate;
            const chatTxt = document.getElementById("chat-txt");
            const message = chatTxt.value;
            const id = makeid(15);
            chatTxt.value = "";
            db.ref( 'channels/' + cid + "/messages/" + id).set( {
                usr: usr,
                msg: message,
                date: timestamp,
                ndate: ntimestamp,
                id: id,
                
            });
            aScroll();
            }
            }
            function sendPMsg(usr) {
                if(document.getElementById("chat-txt").value != ""){
                
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var n = today.getHours();
                var s = today.getMinutes();
                
                var today = mm + '-' + dd + '-' + yyyy + " : " + n + " / " + s;
                var nDate = n + " / " + s;
                const timestamp = today;
                const ntimestamp = nDate;
                const chatTxt = document.getElementById("chat-txt");
                const message = chatTxt.value;
                const id = makeid(15);
                chatTxt.value = "";
                db.ref( "public/" + "/messages/" + id).set( {
                    usr: usr,
                    msg: message,
                    date: timestamp,
                    ndate: ntimestamp,
                    id: id,
                    
                });
                aScroll();
                }
                }
               
            
                        function makeid(length) {
                            var result           = '';
                            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            var charactersLength = characters.length;
                            for ( var i = 0; i < length; i++ ) {
                                result += characters.charAt(Math.floor(Math.random() * 
                            charactersLength));
                            }
                            return result;
                            }
            
                            function aScroll(){
                                if(document.getElementById('messages').getElementsByTagName('li').length >= 4){ // we will scoll down on last message
                                // auto scroll
                                $(".chat-history").animate({ scrollTop: $('.chat-history').prop("scrollHeight")}, 10);
                                }
                                }

        function help(){
            location.reload();
            
        }
        function gEdit()
        {
            var g = document.getElementById("gEdit");
            var m = document.getElementById("mEdit");
        
            if(g.style.display == "none")
            {
                g.style.display = "block";
                m.style.display = "none";
            }
            else
            {
                g.style.display = "none";
                m.style.display = "block";
            }
        }
        function closeChat(){
            
            document.getElementById("chat").style.display = "none";
            document.getElementById("plist").style.display = "block";
        }
       
        function exitServer(id, uid, username){
            var flag = window.confirm("Are you sure you want to exit this server?")

            if(flag){
    
            db.ref("/users/" + id + "/servers/" + uid).remove();
            
            
            document.getElementById(uid).style.display = "none";
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var n = today.getHours();
            var s = today.getMinutes();
            
            var today = mm + '-' + dd + '-' + yyyy + " : " + n + " / " + s;
            var nDate = n + " / " + s;
            const timestamp = today;
            const ntimestamp = nDate;
            
           
            const idmsg = makeid(15);
            
            db.ref( 'channels/' + uid + "/messages/" + idmsg).set( {
                usr: "Server",
                msg: username + " has left the group",
                date: timestamp,
                ndate: ntimestamp,
                id: idmsg,
                
            });
            loadPChat(username);
            }
            
        }
        function closeDm(id, uid, username){
            var flag = window.confirm("Are you sure you want to close this DM?")

            if(flag){
    
            db.ref("/users/" + id + "/people/" + uid).remove();
            db.ref("/users/" + uid + "/people/" + id).remove();
            
            document.getElementById(uid).style.display = "none";
            
            loadPChat(username);
            }
            
        }
        
        