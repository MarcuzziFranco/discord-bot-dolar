import puppeteer from 'puppeteer';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();


const getImageWeb = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //  Cambia el ancho y alto de la ventana del navegador
    await page.setViewport({ width: 1200, height: 2000 });

    // Cambia la URL a la página que deseas capturar
    const url = process.env.URL_DOLARITO;
    await page.goto(url);

    // Esperar hasta que la página haya cargado completamente
    await page.waitForSelector('body')

    // Configurar el ancho y alto de la captura de imagen (en píxeles)
    const width = 270;
    const height = 220;

    //Captura una imagen de la página con el ancho y alto especificados
    await page.screenshot({ path: builderPath(process.env.IMG_PATH, process.env.IMG_BASE), width, height });

    await browser.close();

}

export const builderPath = (pathBase, nameFile) => {
    return pathBase + nameFile;
}

const cropImage = async () => {

    const imagePath = builderPath(process.env.IMG_PATH, process.env.IMG_BASE);
    const canvas = createCanvas(400, 300); // Especifica el tamaño del lienzo según tus necesidades
    const ctx = canvas.getContext('2d');

    const image = await loadImage(imagePath);

    // Cargar la imagen desde el archivo 

    // Recortar una parte de la imagen (x, y, ancho, alto)
    const x = 330; // Cambia las coordenadas según tus necesidades
    const y = 550;
    const width = 270;
    const height = 220;

    // Dibujar la parte recortada en el lienzo
    ctx.drawImage(image, x, y, width, height, 0, 0, 400, 300);

    // Guardar la parte recortada como un nuevo archivo PNG
    const outputPath = builderPath(process.env.IMG_PATH, process.env.IMG_CROP);
    const stream = fs.createWriteStream(outputPath);
    const out = canvas.createPNGStream();

    out.pipe(stream);
    const finishBuffer = new Promise(resolve => {
        stream.on('finish', () => {
            stream.end();
            resolve();
        });
    })

    await finishBuffer
}

export const getImageDolar = async () => {
    await getImageWeb();
    await cropImage();
}






