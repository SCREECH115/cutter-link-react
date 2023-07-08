migrate((db) => {
  const collection = new Collection({
    "id": "vbpdmlo2iqmls6o",
    "created": "2023-07-07 22:15:43.920Z",
    "updated": "2023-07-07 22:15:43.920Z",
    "name": "links",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mysmcde5",
        "name": "input",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vbpdmlo2iqmls6o");

  return dao.deleteCollection(collection);
})
