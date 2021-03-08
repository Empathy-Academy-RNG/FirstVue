'use strict';

const persons = [
  {
    name: 'Pedro',
    age: 35,
    country: 'ES',
    infected: true,
    pet: 'Troski',
  },
  {
    name: 'Elisabeth',
    age: 14,
    country: 'UK',
    infected: true,
    pet: 'Firulais',
  },
  {
    name: 'Pablo',
    age: 25,
    country: 'ES',
    infected: false,
    pet: 'Berritxu',
  },
  {
    name: 'Angela',
    age: 18,
    country: 'DE',
    infected: false,
    pet: 'Noodle',
  },
  {
    name: 'Boris',
    age: 50,
    country: 'UK',
    infected: true,
    pet: 'Leon',
  },
  {
    name: 'Donald',
    age: 69,
    country: 'US',
    infected: false,
    pet: 'Pence',
  },
];

const pets = [
  {
    name: 'Troski',
    animal: 'perro',
  },
  {
    name: 'Firulais',
    animal: 'perro',
  },
  {
    name: 'Berritxu',
    animal: 'loro',
  },
  {
    name: 'Noodle',
    animal: 'araña',
  },
  {
    name: 'Leon',
    animal: 'gato',
  },
  {
    name: 'Pence',
    animal: 'perro',
  },
];

const animals = [
  {
    name: 'perro',
    legs: 4,
  },
  {
    name: 'araña',
    legs: 8,
  },
  {
    name: 'gato',
    legs: 4,
  },
  {
    name: 'loro',
    legs: 2,
  },
  {
    name: 'gallina',
    legs: 2,
  },
];

// Población en millones
const countries = [
  {
    code: 'CN',
    name: 'China',
    population: 1439,
    infected: 81999,
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    population: 331,
    infected: 112468,
  },
  {
    code: 'DE',
    name: 'Alemania',
    population: 83,
    infected: 56202,
  },
  {
    code: 'ES',
    name: 'España',
    population: 46,
    infected: 72248,
  },
  {
    code: 'UK',
    name: 'Reino Unido',
    population: 67,
    infected: 17301,
  },
];

/**
 * EJERCICIOS
 */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Número total de infectados
const numberOfInfected = persons.reduce(function (infectedPersons, person) {
  if (person.infected) {
    infectedPersons++;
  }
  return infectedPersons;
}, 0);
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log(numberOfInfected + ' infected persons');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Número total de sanos
const numberOfHealthy = persons.reduce(function (healthyPersons, person) {
  if (!person.infected) {
    healthyPersons++;
  }
  return healthyPersons;
}, 0);
console.log(numberOfHealthy + ' healthy persons');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Numero total de infectados en los países (del array de países)
const totalInfectedInCountries = countries.reduce(function (
  totalInfected,
  country
) {
  totalInfected += country.infected;
  return totalInfected;
},
0);
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log(
  totalInfectedInCountries + ' persons infected in all the countries'
);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// País con más infectados (del array de países)
const mostInfectedCountry = countries.reduce(function (maxCountry, country) {
  if (country.infected > maxCountry.infected) {
    maxCountry = country;
  }
  return maxCountry;
}, countries[0]);
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log(
  mostInfectedCountry.name + ' is the country with more infected people'
);

// Número de total de infectados del array de personas
//  REPETIDO??

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Array con nombre de todas las mascotas
const petsNames = pets.map((pet) => pet.name);
console.log('Names of all the pets:');
console.log(petsNames);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Array con las personas infectadas del array de personas
const personsInfected = persons.filter((person) => person.infected);
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log('Persons infected:');
console.log(personsInfected);
//console.log(personsInfected.map((p)=>p.name));

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Array de españoles con perro
const petsThatAreDogs = pets.filter((pet) => pet.animal === 'perro');
const spanishWithDog = persons.filter(function (person) {
  return (
    petsThatAreDogs.some((dog) => dog.name === person.pet) &&
    person.country === 'ES'
  );
});
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log('Spanish people with a dog:');
console.log(spanishWithDog);

// Número de personas infectadas del array de personas
//  REPETIDO??
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Array con las personas y el objeto de la persona tiene a mayores todos los datos de su mascota
const personsAndPets = persons
  .map(function (person) {
    person.petType = pets
      .filter((pet) => pet.name === person.pet)
      .map(function (mascotSameName) {
        return mascotSameName.animal;
      });
    return person;
  })
  .map(function (person) {
    person.petNumberOfLegs = animals
      .filter(function (animal) {
        return animal.name === person.petType[0];
      })
      .map(function (animalOfSameType) {
        return animalOfSameType.legs;
      });
    return person;
  })
  .map(function (personToUnpack) {
    personToUnpack.petType = personToUnpack.petType[0];
    personToUnpack.petNumberOfLegs = personToUnpack.petNumberOfLegs[0];
    return personToUnpack;
  });
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log('Persons and their pets:');
console.log(personsAndPets);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// A partir de las personas sacar el animal que tienen más personas como mascota

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Número total de patas de las mascotas de las personas
const totalPetLegs = persons.reduce(function (legCounter, personWithPet) {
  return (legCounter += personWithPet.petNumberOfLegs);
  console.log(personWithPet.petNumberOfLegs);
}, 0);
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log('Total number of legs:');
console.log(totalPetLegs);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Array con las personas que tienen animales de 4 patas
const fourLeggedOwners = persons.filter(function (owner) {
  return owner.petNumberOfLegs === 4;
});
console.log(
  '-------------------------------------------------------------------------------------------------------------'
);
console.log('Persons with four-legged pets:');
console.log(fourLeggedOwners);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A partir del string 'España' obtener un array de personas no infectadas de ese país

// Array de paises que tienen personas con loros como mascota

// Numero de infectados totales (los del objeto del país) de los paises con mascotas de ocho patas

// A partir de las personas sacar el animal que tienen más personas como mascota
//  REPETIDO
