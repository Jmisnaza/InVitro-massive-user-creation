const firebase = require('firebase-admin');

const auth = firebase.auth();

class Users {
    constructor(db) {
        this.db = db
        this.collection = this.db.collection('user')
    }

    async listUsers() {
        let allUsers = await this.collection.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
              console.log(doc.id, ':', doc.data());
            });
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });
          return allUsers
    }

    async createUser(body) {
        let newUser;
        let dataUser;
        const info = body.infoUser
        const rol = body.rol

        let email = info.email
        let password = info.password

        let status = body.rol.status
        status = true

        //const user = auth.createCustomToken;
        //console.log(user)
            await auth.createUser({email, password})
            //.then(userauth => console.log('Usuario creado', userauth))
            .catch((err) => console.log(err.message))
           
            dataUser = {
                //uid: user.iud,
                infoUser: {
                    idRol: info.idRol ,
                    documentNumber: info.documentNumber,
                    name: info.name,
                    lastName: info.lastName,
                    numberContact: info.numberContact,
                },
                rol: {
                    idRol: rol.idRol,
                    name: rol.name,
                    status: rol.status
                }
            }
            
            newUser = await this.collection.doc().set(dataUser)
        
        return newUser
    }
}

module.exports = Users

// const user = [
//     {
//         idUser:"",
//         infoUser: {
//             documentNumber: "",
//             email:"",
//             idRol:"",
//             lastName:"",
//             name:"",
//             numberContact:"",
//             password:"",
//             userName:"",
//         },
//         rol: {
//             idRol:"",
//             name: "",
//             status: ""
//         },
//     }
// ]

// {
//     "idUser":"",
//     "infoUser": {
//         "documentNumber": "",
//         "email":"",
//         "idRol":"",
//         "lastName":"",
//         "name":"",
//         "numberContact":"",
//         "password":"",
//         "userName":"",
//     },
//     "rol": {
//         "idRol":"",
//         "name": "",
//         "status": ""
//     },
// }


// {
//     "infoUser": {
//         "documentNumber": "",
//         "email":"",
//         "idRol":"",
//         "lastName":"",
//         "name":"",
//         "numberContact":"",
//         "password":"",
//         "userName":"",
//     },
//     "rol": {
//         "idRol":"",
//         "name": "",
//         "status": ""
//     },
// }