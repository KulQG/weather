const title = document.querySelector(".title");
if (title) title.textContent = "НеПогода :(";

function greet(name: string): string {
  return `Hello, ${name}!`;
}

const user = "TypeScript Developer";

console.log(greet(user));
