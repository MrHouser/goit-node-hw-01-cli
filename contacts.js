const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");
const getNextId = async () => {
  contactsList = await readFile();
  const nextId = contactsList.length + 1;
  return nextId;
};

const readFile = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const listContacts = async () => {
  return readFile();
};

const getContactById = async (contactId) => {
  const contactsList = await readFile();
  const [result] = contactsList.filter(
    (contact) => contact.id === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contactsList = await readFile();
  const index = contactsList.findIndex((item) => item.id === Number(contactId));
  if (index === -1) {
    return null;
  }
  const removedContacts = contactsList.splice(index, 1);
  const contactsStr = JSON.stringify(contactsList);
  await fs.writeFile(contactsPath, contactsStr);
  return removedContacts;
};

const addContact = async (name, email, phone) => {
  const contactsList = await readFile();
  const newContact = { id: await getNextId(), name, email, phone };
  contactsList.push(newContact);
  const contactsStr = JSON.stringify(contactsList);
  await fs.writeFile(contactsPath, contactsStr);
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
