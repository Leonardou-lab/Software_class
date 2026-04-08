 const traducciones = {
    es: {
        titulo: "Purrfect Cat Café",
        parrafo1: `Somos un café en el corazón de la ciudad donde puedes disfrutar de una deliciosa bebida
            rodeado de gatos rescatados. Cada visita es una experiencia única llena de ronroneos,
            tranquilidad y el mejor café artesanal de la ciudad.`,
        parrafo2: `Todos nuestros gatos están rescatados, esterilizados y en busca de un hogar. Además de
            disfrutar tu café favorito, puedes conocer a cada uno de ellos y, si lo deseas, iniciar
            el proceso de adopción. ¡Ven a visitarnos y llévate un nuevo amigo peludo!`,
        link1: "Contáctanos por correo",
        link2: "Síguenos en Instagram",
        boton: "Switch to English",
    },
    en: {
        titulo: "Purrfect Cat Café",
        parrafo1: `We are a café in the heart of the city where you can enjoy a delicious drink
            surrounded by rescued cats. Every visit is a unique experience full of purring,
            relaxation, and the best artisan coffee in the city.`,
        parrafo2: `All our cats are rescued, spayed/neutered, and looking for a home. In addition to
            enjoying your favorite coffee, you can get to know each one of them and, if you wish, start
            the adoption process. Come visit us and take home a new furry friend!`,
        link1: "Contact us by email",
        link2: "Follow us on Instagram",
        boton: "Cambiar a Español",
    },
};

class CambiadorIdioma {
    constructor() {
        this.idiomaActual = "es";
        this.h1 = document.querySelector("header h1");
        this.parrafos = document.querySelectorAll("section p");
        this.links = document.querySelectorAll("section a");
        this.boton = this.crearBoton();
        document.querySelector("section").appendChild(this.boton);
    }

    crearBoton() {
        const boton = document.createElement("button");
        boton.className = "boton-idioma";
        boton.textContent = traducciones["es"].boton;
        boton.onclick = () => this.cambiarIdioma();
        return boton;
    }

    cambiarIdioma() {
        this.idiomaActual = this.idiomaActual === "es" ? "en" : "es";
        const t = traducciones[this.idiomaActual];

        this.h1.textContent = t.titulo;
        this.parrafos[0].textContent = t.parrafo1;
        this.parrafos[1].textContent = t.parrafo2;
        this.links[0].textContent = t.link1;
        this.links[1].textContent = t.link2;
        this.boton.textContent = t.boton;
        document.documentElement.lang = this.idiomaActual;
    }
}

class CambiadorColor {
    constructor() {
        this.oscuro = false;
        this.boton = this.crearBoton();
        document.querySelector("section").appendChild(this.boton);
    }

    crearBoton() {
        const boton = document.createElement("button");
        boton.className = "boton-color";
        boton.textContent = "Modo Oscuro";
        boton.onclick = () => this.cambiarColor();
        return boton;
    }

    cambiarColor() {
        this.oscuro = !this.oscuro;
        if (this.oscuro) {
            document.body.style.backgroundColor = "#0D0603";
            document.querySelector("section").style.backgroundColor = "#150A07";
            this.boton.textContent = "Modo Normal";
        } else {
            document.body.style.backgroundColor = "";
            document.querySelector("section").style.backgroundColor = "";
            this.boton.textContent = "Modo Oscuro";
        }
    }
}

new CambiadorIdioma();
new CambiadorColor();
