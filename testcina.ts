



let x = 10; // broj
x = "Hello"; // string

async function fetchData() {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    console.log(data);
}




function greet(name) {
    return 'Zdravo, ' + name;
}

function sayHello(greetingFunction, name) {
    console.log(greetingFunction(name));
}

sayHello(greet, 'Ana'); // Zdravo, Ana














try {
    throw new Error('Nešto je pošlo po zlu!');
} catch (error) {
    console.error(error.message); // Nešto je pošlo po zlu!
} finally {
    console.log('Uvek se izvršava');
}











if (true) {
    let x = 1;
    const y = 2;
    console.log(x); // 1
    console.log(y); // 2
}
console.log(x); // ReferenceError











const person = { name: 'Alice', age: 25 };
const { name, age } = person;
console.log(name); // Alice
console.log(age); // 25









// file1.js
export const greet = () => 'Hello';

// file2.js
import { greet } from './file1.js';
console.log(greet()); // Hello






document.getElementById('myButton').addEventListener('click', () => {
    alert('Dugme kliknuto!');
});



// Funkcionalna komponenta
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Klasična komponenta
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}







function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}














export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return { props: { data } };
}

function Page({ data }) {
    return <div>{data}</div>;
}







interface Person {
    name: string;
    age: number;
}

function greet(person: Person) {
    return `Hello, ${person.name}`;
}




//

let id: number | string;
id = 123;  // validno
id = '123';  // validno





interface User {
    name: string;
}
interface Admin {
    privileges: string[];
}
type AdminUser = User & Admin;





type Direction = 'left' | 'right' | 'up' | 'down';
let move: Direction = 'up';
