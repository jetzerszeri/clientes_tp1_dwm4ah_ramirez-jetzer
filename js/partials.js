const success = `
<div class="confirmation">
<p>El vehículo se ha registrado exitosamente!</p>
<div>
    <a href="/" class="btn">Ver listado</a>
</div>
</div>
`

const successMsgAdd = (text, btnlink) => {

    let mensaje  = `
    <div class="confirmation">
    <p>${text}</p>
    <div>
        <a href="${btnlink}" class="btn">Ver listado</a>
    </div>
    </div>
    `
    return mensaje;
}

const chatView = `
<div>
<h2>Chat</h2>

<form action="" class="chatForm">
    <textarea name="texto" id="textochat"></textarea>
    <button type="submit" class="btn primary-green">Enviar</button>
</form>




</div>

`

export {
    success,
    successMsgAdd,
}