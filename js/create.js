function element(elementToCreate, elementClassList, textContent){
    let element = document.createElement(elementToCreate);
    if (elementClassList){
        elementClassList.forEach(elementClass => {
            element.classList.add(elementClass);
        });
    }
    if (textContent){
        element.textContent = textContent;
    }
    return element;
}

export { element }