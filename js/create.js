function element(elementToCreate, elementClassList){
    let element = document.createElement(elementToCreate);
    if (elementClassList){
        elementClassList.forEach(elementClass => {
            element.classList.add(elementClass);
        });
    }
    return element;
}

export { element }