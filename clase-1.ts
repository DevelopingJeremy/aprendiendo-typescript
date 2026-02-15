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









//* Ahora con funciones o callbacks

// fn: (name: string) => void
// Esto significa que fn es una funcion que recibe un string y no retorna nada (void), o mas bien que no nos
// importa lo que retorne
const sayHiFromFunction = (fn: (name: string) => void) => { // todo: revisar esto para comprenderlo mejor
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
// Esto es un tipo de dato que se basa en una plantilla, y solo acepta strings que sigan esa plantilla, por ejemplo, para un UUID

// Imaginemos que guardamos colores, pero no sabemos si lleva # o no.
type ColorHexadecimal = `#${string}`; // Esto es un tipo de dato que solo acepta strings que empiecen con #, y el resto puede ser cualquier string

const color1: ColorHexadecimal = '#ff0000'; // Esto es valido
// const color2: ColorHexadecimal = 'ff0000'; // Esto no es valido porque no empieza con #, nos va a tirar error













//* Union Types
// Union Types es un tipo de dato que puede ser de varios tipos, por ejemplo, un string o un numero, o incluso un valor especifico como 'loading' o 'success'

// Esto es un tipo de dato que puede ser de varios tipos, en este caso string o number
type HeroName = string | number;

const name1: HeroName = 'Hulk'; // Esto es valido
const name2: HeroName = 123; // Esto tambien es valido
// const name3: HeroName = true; //! Esto no es valido porque no es ni string ni number, nos va a tirar error


// Tambien podemos con diferentes valores en vez de tipos de datos, por ejemplo, para un estado de una aplicacion
type AppState = 'loading' | 'success' | 'error';

let state: AppState = 'loading'; // Esto es valido
state = 'success'; // Esto tambien es valido
// state = 'other'; //! Esto no es valido porque no es ninguno de los valores permitidos, nos va a tirar error


// Tambien podemos combinar ambos, por ejemplo, para un estado de una aplicacion que puede ser un string o un valor especifico
type AppState2 = 'loading' | 'success' | 'error' | string;

let state2: AppState2 = 'loading'; // Esto es valido
state2 = 'success'; // Esto tambien es valido
state2 = 'other'; // Esto tambien es valido porque ahora si puede ser cualquier string
// state2 = 123; //! Esto no es valido porque no es ni string ni ninguno de los valores permitidos, nos va a tirar error












//* Intersection Types
// Intersection Types es un tipo de dato que combina varios tipos, es decir, un valor que debe cumplir con las propiedades de todos los tipos combinados

// Esto es un tipo de dato que combina varios tipos, en este caso, un objeto que tiene las propiedades de ambos tipos
type HeroWithPower = Hero & { power: string }; // Esto es un tipo de dato que combina el tipo Hero con un objeto que tiene una propiedad power de tipo string

// Tambien podemos combinar varios tipos o hacer combinaciones
type HeroFinal = Hero & History & { power: string }

//* Type indexing
// Nos sirve para utilizar solo algunas partes de un tipo, por ejemplo, solo el nombre de un heroe

type HeroProperties = {
    isActive: boolean,
    address: {
        planet: string,
        city: string
    }
}

const addressHero: HeroProperties['address'] = {
    planet: 'Tierra',
    city: 'New York'
}

//* Type from value
// Nos sirve para crear un tipo a partir de un valor, por ejemplo, a partir de un objeto
type address = typeof addressHero


//* Type from function return
function createAddress () {
    return {
        planet: 'Tierra',
        city: 'New York'
    }
}

// Esto es un tipo de dato que se basa en el valor de retorno de la funcion createAddress

// El ReturnTpe es un tipo utilitario (Utily Type) que nos permite obtener el tipo de retorno de una funcion
type AddressFromFunction = ReturnType<typeof createAddress>


//* Utility Types
// Los Utility Types son tipos de datos que nos ayudan a modificar otros tipos de datos, por ejemplo, para hacer que todas las propiedades de un tipo sean opcionales














//* Arrays
const languages: string[] = []

languages.push('TypeScript')


const languages2: Array<string> = [] // Esto es lo mismo que el anterior, pero con una sintaxis diferente

const languages3: (string | number)[] = [] // Esto es un array que puede contener tanto strings como numeros

languages3.push('TypeScript')
languages3.push(123)



// Vamos a hacer un array de arrays, ejemplo el gato

/*
[
    ['X', 'X', 'O'], // <- STRING
    ['O', 'O', 'X'], // <- STRING
    ['X', 'O', 'O']  // <- STRING
]
*/

const gameBoard: string[][] = [] // Esto es un array de arrays de strings
// Pero esta mal porque se puede poner lo que queramos en los campos

type Cell = 'X' | 'O' | '' // Esto es un tipo de dato que solo acepta los valores 'X', 'O' o '', asi que no se pueden poner otros valores

const gameBoard2: Cell[][] = [] // Esto es un array de arrays de Cell, asi que solo se pueden poner los valores 'X', 'O' o '' en los campos


// Ahora con esto evitamos que sea diferente a un 3x3
type GameBoard = [ // Esto es una tupla (Tiene un numero fijo de elementos) de arrays de Cell
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell]
]

const gameBoard3: GameBoard = [
    ['X', 'X', 'O'],
    ['O', 'O', 'X'],
    ['X', 'O', 'O']
]

// Otro ejemplo
const RGB: [number, number, number] = [255, 0, 0]