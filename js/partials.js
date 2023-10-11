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


export {
    success,
    successMsgAdd,
}