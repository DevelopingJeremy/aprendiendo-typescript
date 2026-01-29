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