

(function () {
    let userName;

    let socket;

    document.getElementById('form-message').addEventListener('submit',(event)=>{
        event.preventDefault();
        const input = document.getElementById('input-message');
        if(input.value){
            const _newMessage ={username:userName, message : input.value};
            socket.emit('new-message', _newMessage);
            input.value = '';
            input.focus();
        }

    })

    Swal.fire({
        title: 'Escribe tu nombre por favor 👮',
        input: 'text',
        allowOutsideClick: false,
        inputValidator:(value)=>{
            if(!(value.trim())){
                return 'El nombre es obligatorio para ingresar al chat 👀'
            }
        }
    })
        .then((result)=>{
            userName = result.value;
            socket = io();
            socket.on('conversations', async (conversations) => {
                updateMessagesLogs(conversations);
            })
        })
        .catch((error)=>{
            console.error('Ha ocurrido un error al capturar el nombre del usuario 😨:', error.message);
        });
})();

const updateMessagesLogs = (conversations)=>{
    const logMessage = document.getElementById('log-messages');
    if(logMessage && conversations.conversations.length > 0){
        logMessage.innerHTML = '';
        conversations.conversations.map((message,  idx)=>{
            const  p = document.createElement('p');
            p.innerText=`${message.username} : ${message.message}`;
            logMessage.appendChild(p);
        })
    }
}



