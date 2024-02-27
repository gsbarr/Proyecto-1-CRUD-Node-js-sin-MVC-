function cargar_cosas(){

    fetch('http://localhost:3000/api/posts', {
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
        method: "get"
      })
      .then((response) =>  response.json())
      .then((text) => {
        console.log("texto: "+JSON.stringify(text));
        
        const mensajes =  document.querySelector(".mensajes");
        text.forEach(element => {
            div = `<div style="background-color: red; margin: 5px">
                ${element.texto}
            </div>
            `;
            
            mensajes.innerHTML += div;
        });
      });
    


}