import MenuItem from "./MenuItem";
import { getData } from '../services/dataHandler';

function createCard() {

    function makeItem(parent, imageSrc, imageAlt, header, description, price) {

        const obj = new MenuItem(parent, imageSrc, imageAlt, header, description, price);
        obj.initializeStructure();
        obj.fillStructure();
        obj.applyClassesToStructure();
        obj.displayStructure();
    }

    const data = getData("http://localhost:3000/menu");

    data
        .then(list => {
            list.forEach(({ img, altImg, title, descr, price }) => {
                makeItem('.menu', img, altImg, title, descr, price);
            })
        });
}

export default createCard;