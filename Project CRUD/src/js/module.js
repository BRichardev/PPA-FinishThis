
const productdb = (dbname, table) => {
    // Criação da Database

    const db = new Dexie(dbname)
    db.version(1).stores(table);
    db.open();

    // const db = new Dexie('myDb');
    // db.version(1).stores({
    //     friends: `name, age`
    // })

    return db;
}

// Função de inserir
const bulkcreate = (dbtable, data) => {
    let flag = empty(data)
    if(flag) {
        dbtable.bulkAdd([data])       
        console.log("Data inserted successfully")
    }else{
        console.log("Provide Data")
    }
    return flag
}

// Checagem de validação
const empty =  object => {
    let flag = false;

    for(const value in object){
        if(object[value] != "" && object.hasOwnProperty(value)){
            flag = true;
        }else{
            flag = false;
        }
    }
    return flag;
}
// Pega os dados da base de dados
const getData = (dbtable, fn) => {
    let index = 0
    let obj = {};

    dbtable.count((count)=>{
        if(count) {
            dbtable.each(table => {
                obj = Sortobj(table)
                fn(obj, index++);
            })
        }else{
            fn(0)
        }
    })
}

// Ordena os objetos
const Sortobj = sortobj =>{
    let obj = {};
    obj = {
        id: sortobj.id,
        name: sortobj.name,
        seller: sortobj.seller,
        price: sortobj.price
    }
    return obj
}
// Cria dinâmicamente elementos
const criadorDeElemento = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if(appendTo) appendTo.appendChild(element)
    if(fn) fn(element);
}


export default productdb;
export {
    bulkcreate,
    getData,
    criadorDeElemento
}