import SQLite from 'react-native-sqlite-storage';
export class BaseManager {

    constructor() {
        this.sqlite = SQLite;
        this.sqlite.DEBUG(true);
        this.sqlite.enablePromise(true);
        this.sqlite.openDatabase({
            name: 'Todo.db',
            location: 'default'
        }).then((db) => {
            this.dbInstance = db;
        })
    }

    createUser() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE IF NOT EXISTS Users (" +
                "id INTEGER PRIMARY KEY," +
                "username TEXT NOT NULL," +
                "name TEXT NOT NULL," +
                "password TEXT NOT NULL)"
            ).then((res) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            });
        })
    }

    checkUser(userName) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Users WHERE username='" + userName + "'"
            ).then((res) => {
                resolve(res[0].rows);
            }).catch((err) => {
                reject(false);
            });
        })
    }

    getUser(userName, password) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Users WHERE username='" + userName + "' AND password='" + password + "'"
            ).then((res) => {
                if (res[0].rows.length > 0) {
                    resolve(res[0].rows.item(0));
                } else {
                    resolve(false);
                }

            }).catch((err) => {
                reject(false);
            });
        })
    }

    insertUser(userName, Name, Password) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO Users(username,name,password) VALUES('" + userName + "','" + Name + "','" + Password + "')"
            ).then((res) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            });
        })
    }

    createTodo() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE IF NOT EXISTS Todo (" +
                "id INTEGER PRIMARY KEY," +
                "userid INTEGER NOT NULL," +
                "title TEXT NOT NULL," +
                "type INTEGER NOT NULL," +
                "date TEXT NOT NULL)"
            ).then((res) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    insertTodo(userId, title, type, date) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO Todo(userid,title,type,date) VALUES(" + userId + ",'" + title + "','" + type + "','" + date + "')"
            ).then((res) => {
                resolve(res[0].insertId);
            }).catch((err) => {
                reject(false);
            });
        })
    }

    selectTodo() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Todo"
            ).then((res) => {
                if (res[0].rows.length > 0) {
                    let myArr = [];
                    for (let i = 0; i < res[0].rows.length; i++) {
                        myArr.push(res[0].rows.item(i));
                    }
                    resolve(myArr);
                    console.log(myArr);
                } else {
                    resolve(false);
                }

            }).catch((err) => {
                reject(false);
            });
        })
    }

    getTodo(userId, date) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Todo WHERE userid=" + userId + " AND date='" + date + "'"
            ).then((res) => {
                if (res[0].rows.length > 0) {
                    let myArr = [];
                    for (let i = 0; i < res[0].rows.length; i++) {
                        myArr.push(res[0].rows.item(i));
                    }
                    resolve(myArr);
                } else {
                    resolve(false);
                }

            }).catch((err) => {
                reject(false);
            });
        })
    }

    updateTodo(id, type) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "UPDATE Todo SET type=" + type + " WHERE id=" + id + ""
            ).then((res) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            });
        })
    }

    returnTypeNormal() {
        return 0;
    }
    returnTypeDone() {
        return 1;
    }
    returnTypeNotDone() {
        return 2;
    }
}