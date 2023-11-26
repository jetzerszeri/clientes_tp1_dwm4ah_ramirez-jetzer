import app from '../app.js'

const home = app.create.element('main', ['homecontainer']);
const sectionHeroHome = app.create.element('section', ['heroHome']);
const sectionHeroHomeDiv = app.create.element('div');
const sectionHeroHomeDivInfo = app.create.element('div');
const sectionHeroHomeDivInfoh1 = app.create.element('h1', [], 'El mejor servicio de limpieza de la ciudad');
const sectionHeroHomeDiInfovp = app.create.element('p', [], 'Personalizado a tus necesidades, comprometidos con la excelencia.');
const sectionHeroHomeDivInfoLink = app.create.element('a', ['btn', 'primary-yellow'], 'Ver servicios');
sectionHeroHomeDivInfoLink.href = 'index.html#services';
sectionHeroHome.appendChild(sectionHeroHomeDiv);
sectionHeroHomeDivInfo.append(sectionHeroHomeDivInfoh1, sectionHeroHomeDiInfovp, sectionHeroHomeDivInfoLink);
const sectionHeroHomeDivImg = app.create.element('div');
sectionHeroHomeDivImg.innerHTML = `
<img src="img/herohome1.webp" alt="mano con guante amarillo de limpieza agarrando un pañuelo que está sobre el lavabo de un baño">
`;
sectionHeroHomeDiv.append(sectionHeroHomeDivInfo, sectionHeroHomeDivImg);
displayView('#services', sectionHeroHomeDivInfoLink);
home.appendChild(sectionHeroHome);

const sectionHomeServices = app.create.element('section', ['homeservices']);
const sectionHomeServicesDiv = app.create.element('div');
const sectionHomeServicesDivh2 = app.create.element('h2', [], 'Servicos profesionales de limpieza');
const sectionHomeServicesDivp = app.create.element('p', [], 'Especializados en:');
const sectionHomeServicesDivCards = app.create.element('div');

const cardsData = [
    {imgSrc: "img/postreno1.webp", imgAlt: "habitacion en remodelación", description: "Post remodelación"},
    {imgSrc: "img/homemove.webp", imgAlt: "cajas de mudanza", description: "Move in/Move out"},
    {imgSrc: "img/homemantenimiento.webp", imgAlt: "Cocina de una casa en venta", description: "Mantenimiento"}
];

cardsData.forEach(card => {
    const cardDiv = app.create.element('div', ['card']);
    const cardImg = app.create.element('img');
    cardImg.src = card.imgSrc;
    cardImg.alt = card.imgAlt;
    const cardDivP = app.create.element('p', [], card.description);
    const cardDivA = app.create.element('a', [], 'Ver servicios');
    cardDivA.href = 'index.html#services';
    cardDiv.append(cardImg, cardDivP, cardDivA);
    sectionHomeServicesDivCards.append(cardDiv);
    displayView('#services', cardDivA);
})

sectionHomeServicesDiv.append(sectionHomeServicesDivh2, sectionHomeServicesDivp, sectionHomeServicesDivCards);
sectionHomeServices.append(sectionHomeServicesDiv);
home.appendChild(sectionHomeServices);

const sectionHomeContact = app.create.element('section');
const sectionHomeContactDiv = app.create.element('div');
const sectionHomeContactDivh2 = app.create.element('h2', [], '¿Necesitas un servicio personalizado?');
const sectionHomeContactDivp = app.create.element('p', [], 'Dinos cómo podemos ayudarte');
const sectionHomeContactDivA = app.create.element('a', ['btn', 'primary-green'], 'Contáctanos');
sectionHomeContactDivA.href = 'index.html#adminChat';
displayView('#adminChat', sectionHomeContactDivA);
sectionHomeContactDiv.append(sectionHomeContactDivh2, sectionHomeContactDivp, sectionHomeContactDivA);
sectionHomeContact.append(sectionHomeContactDiv);
home.appendChild(sectionHomeContact);

function displayView(view, element){
    element.addEventListener('click', () => {
        window.location.href = '/index.html' + view;
        location.reload();
    })
}


export default home;