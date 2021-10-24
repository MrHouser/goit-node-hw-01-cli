const { Command } = require("commander");
const chalk = require("chalk");
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await listContacts();
        console.table(contactsList);
        return contactsList;

      case "get":
        const requiredContact = await getContactById(id);
        console.log(requiredContact);
        return requiredContact;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        return newContact;

      case "remove":
        const removedContact = await removeContact(id);
        console.log(removedContact);
        return removedContact;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

invokeAction(argv);
