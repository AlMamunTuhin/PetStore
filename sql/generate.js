import { writeFileSync } from 'fs';

const species = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const breeds = ['Golden Retriever', 'Siamese', 'Beagle', 'Poodle', 'Parrot', 'Persian', 'Bulldog', 'Holland Lop', 'Labrador', 'Canary'];
const genders = ['Male', 'Female'];
const statuses = ['Available', 'Sold', 'Under Treatment'];
const petNames = ["Bailey", "Harper", "Oreo", "Teddy", "Hazel", "Finn", "Stella", "Tucker", "Chloe", "Bandit", "Rosie", "Pepper", "Diesel", "Lily", "Moose", "Sadie", "Blue", "Milo", "Nala", "Dexter", "Cleo", "Marley", "Ruby", "Hunter", "Poppy", "Dash", "Koda", "Ellie", "Scout", "Ginger"];



let sql = "INSERT INTO pets (name, species, age, breed, gender, status) VALUES\n";

for (let i = 1; i <= 1000; i++) {
  const nameIdx = Math.floor(Math.random() * petNames.length);
  const speciesIdx = Math.floor(Math.random() * species.length);
  const breedIdx = Math.floor(Math.random() * breeds.length);
  const genderIdx = Math.floor(Math.random() * genders.length);
  const statusIdx = Math.floor(Math.random() * statuses.length);
  const age = Math.floor(Math.random() * 10) + 1; // Age between 1 and 10

  sql += `('${petNames[nameIdx]}', '${species[speciesIdx]}', ${age}, '${breeds[breedIdx]}', '${genders[genderIdx]}', '${statuses[statusIdx]}')`;
  sql += i < 1000 ? ",\n" : ";\n";
}

writeFileSync('generate.sql', sql);
console.log("SQL file generated successfully!");
