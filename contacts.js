const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log("contactsPath", contactsPath);

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const contactList = JSON.parse(buffer);
  return contactList;
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const contactById = contactList.find(({ id }) => id === contactId.toString());
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return null;
  }
  const newContactList = contactList.filter(
    ({ id }) => id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return newContactList;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: uuidv4(), name: name, email: email, phone: phone };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
