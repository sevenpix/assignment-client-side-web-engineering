import PouchDB from 'pouchdb'

const localDB = new PouchDB('mmt-ss2017')
const remoteDB = new PouchDB('https://couchdb.5k20.com/mmt-ss2017', {
    auth: {
        username: 'mtaferner',
        password: 'test'
    }
})

export default class Store {
    /**
     * @param {!string} name Database name
     * @param {function()} [callback] Called when the Store is ready
     */
    constructor(name, callback) {
        /**
         * @type {ItemList}
         */

        localDB.sync(remoteDB, {
            live: true,
            retry: true
        })

        /**
         * Read the local ItemList from localStorage.
         *
         * @returns {ItemList} Current array of todos
         */
        this.getStore = () => {
            return new Promise((resolve) => {
                localDB.allDocs({
                    include_docs: true,
                }).then((response) => {
                    const todos = response.rows.map((todo) => {
                        const doc = todo.doc
                        return {
                            id: doc._id,
                            title: doc.title,
                            completed: doc.completed,
                            _rev: doc._rev,
                        }
                    })
                    resolve(todos)
                })
            })
        }

        /**
         * Write the local ItemList to localStorage.
         *
         * @param {ItemList} todos Array of todos to write
         */
        this.setStore = (todos) => {
            localDB.put(todos)
        }

        if (callback) {
            callback()
        }
    }

    /**
     * Find items with properties matching those on query.
     *
     * @param {ItemQuery} query Query to match
     * @param {function(ItemList)} callback Called when the query is done
     *
     * @example
     * db.find({completed: true}, data => {
	 *	 // data shall contain items whose completed properties are true
	 * })
     */
    find(query, callback) {
        this.getStore().then((todos) => {
            let i
            const filteredTodos = todos.filter((todo) => {
                for (i in query) {
                    if (query[i] !== todo[i]) {
                        return false
                    }
                }
                return true
            })
            if (callback) {
                callback(filteredTodos)
            }
        })
    }

    /**
     * Update an item in the Store.
     *
     * @param {ItemUpdate} update Record with an id and a property to update
     * @param {function()} [callback] Called when partialRecord is applied
     */
    update(update, callback) {
        this.getStore().then((todos) => {
            todos.forEach((todo) => {
                if (String(update.id) === String(todo.id)) {
                    return localDB.put({
                        _id: String(todo.id),
                        title: todo.title,
                        completed: update.completed,
                        _rev: todo._rev
                    })
                }
            })
        })
        if (callback) {
            callback()
        }
    }

    /**
     * Insert an item into the Store.
     *
     * @param {Item} item Item to insert
     * @param {function()} [callback] Called when item is inserted
     */
    insert(item, callback) {
        localDB.put({
            _id: String(item.id),
            title: item.title,
            completed: item.completed,
        }).then(callback)
    }

    /**
     * Remove items from the Store based on a query.
     *
     * @param {ItemQuery} query Query matching the items to remove
     * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
     */
    remove(query, callback) {
        let k

        this.getStore().then((todos) => {
            const removeTodos = todos.filter((todo) => {
                for (k in query) {
                    if ((query[k]).toString() !== (todo[k]).toString()) {
                        return false
                    }
                }
                return true
            })

            removeTodos.forEach((todo) => {
                localDB.remove({
                    _id: String(todo.id),
                    _rev: todo._rev
                })
            })

            if (callback) {
                callback()
            }
        })
    }

    /**
     * Count total, active, and completed todos.
     *
     * @param {function(number, number, number)} callback Called when the count is completed
     */
    count(callback) {
        localDB.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (todos){
            const total = todos.rows.length
            const completed = todos.rows.filter((todo) => {
                return todo.completed
            })

            const active = total - completed

            if (callback) {
                callback(total, active, completed)
            }
        })
    }
}
