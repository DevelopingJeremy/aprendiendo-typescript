const a = 1;
const b = 'a';
const c = a + b; // Infiere que es un string por la concatenacion
const d = 2;
const e = a + d; // Infiere que es un numero


// Opciones para tipar funciones
// Con objetos
function saludar ({nombre, edad}: {nombre: string, edad: number}) {
    return `Hola ${nombre}, tienes ${edad} años`;
}

function saludar2 (persona: {nombre: string, edad: number}) {
    // El problema de esto es estamos pasando un objeto y debemos destructurar
    const { nombre, edad } = persona;
    return `Hola ${nombre}, tienes ${edad} años`;
}

// Con ese :string despues de los () estamos diciendo que esa funcion debe retornar ese tipo de dato
function saludar3 ({nombre, edad}: {nombre: string, edad: number}): string {
    return `Hola ${nombre}, tienes ${edad} años`;
}


// Ahora con funciones o callbacks

// fn: (name: string) => void
// Esto significa que fn es una funcion que recibe un string y no retorna nada (void), o mas bien que no nos
// importa lo que retorne
const sayHiFromFunction = (fn: (name: string) => void) => { // todo: revisar esto
    fn('Jeremy')
}

sayHiFromFunction((name: string) => {
    console.log(`Hola ${name}`);
})

document.writeln('Hola')


// Dos maneras de escribir tipos para funciones

// Manera 1
const sumar = (a: number, b: number): number => {
    return a + b;
}

// Manera 2
const restar: (a: number, b: number) => number = (a,b) => {
    return a - b;
}

// Inferencia funciones anonimas segun el contexto
const avengers = ['hulk', 'ironman']

avengers.forEach(avenger => {
    console.log(avenger.toUpperCase()); // infiere que como tiene texto ese [], deja poner metodos de strings 
})

//* Objetos

let heroe = {
    nombre: 'Hulk',
    edad: 500
}

function crearHeroe (nombre: string, edad: number) {
    return { nombre, edad }
}

const thor = crearHeroe('Thor', 1500);

//* Type Alias

// Template Union Types
type HeroId = `${string}-${string}-${string}-${string}-${string}` // Vamos a crear un tipo de dato con formato para UUID
// Podemos crear cualquier tipo nos guste, asi que es muy util para crear tipos de datos personalizados y reutilizables

// Creamos un tipo para un objeto
// Esto nos ayuda a reutilizar ese tipo de objeto varias veces y saber que pertenece a la misma estructura
type Hero = {
    readonly id?: HeroId, // con readonly decimos que solo se puede leer y no se puede modificar
    nombre: string,
    edad: number,
    activo?: boolean // con el ? antes de los : decimos que es opcional
    // activo: boolean - Asi nos va a tirar error porque no sale en lo demas
}

// Creamos un heroe y decimos que es del tipo Hero
let heroe2: Hero = {
    nombre: 'Hulk',
    edad: 55
}

// Creamos el objeto con los parametros de tipo Hero, y devolemos un tipo Hero
// (Este nos ayuda a comprender el como funciona el tipo y las funciones)
function createHero (hero: Hero): Hero {
    const id = crypto.randomUUID(); // Esto es un metodo de JS para crear un UUID
    const { nombre, edad } = hero;
    const activo = true;
    return { id, nombre, edad, activo }
}

const thor2 = createHero({ nombre: 'Thorcito', edad: 200})

// Object.freeze hace que el objeto sea inmutable, es decir, no se pueden modificar sus propiedades (Propio de JS no de TS)
const thor3 = Object.freeze(createHero({ nombre: 'Thorcito', edad: 200}))


// con el ? decimos que si realmente lo tiene, haga esa funcion
thor2.id?.toString()


//* Template Union Types

// Imaginemos que guardamos colores, pero no sabemos si lleva # o no.


type ColorHexadecimal = `#${string}`; // Esto es un tipo de dato que solo acepta strings que empiecen con #, y el resto puede ser cualquier string

const color1: ColorHexadecimal = '#ff0000'; // Esto es valido
// const color2: ColorHexadecimal = 'ff0000'; // Esto no es valido porque no empieza con #, nos va a tirar error