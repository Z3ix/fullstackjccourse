require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]); // Reqired to resolve DNS issue on windows

const mongo = require ('mongoose');


const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
    console.log('Password reuired');
    process.exit(1);
    return;
}

const url = `mongodb+srv://admin:${password}@cluster0.ebbbq4v.mongodb.net/phonebookDatabase?appName=Cluster0`;

mongo.set('strictQuery',false);


mongo.connect(url, { family: 4 });


const personSchema = new mongo.Schema({
  name: String,
  number: String,
})

const Person = mongo.model('Person', personSchema)

if (name && number) {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongo.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(person.name +' '+ person.number)
        })
        mongo.connection.close()
        })
}



