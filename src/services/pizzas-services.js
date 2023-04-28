import config from './dbconfig.js';
import sql from 'mssql';

export class PizzaService {
    static getAll = async() => {
        let returnEntity = null;

        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Pizzas');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getById = async (id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static insert = async(pizza) => {

        const {nombre, libreGluten, importe, descripcion} = pizza;
        console.log("name", nombre)
        let pool = await sql.connect(config)
        const request = new sql.Request(pool);

        request
        .input('nombre', sql.NVarChar(50), nombre)
        .input('libreGluten', sql.Bit, libreGluten)
        .input('importe', sql.Money, importe)
        .input('descripcion', sql.NVarChar(200), descripcion)
        .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@nombre, @libreGluten, @importe, @descripcion)')

    }

    static update = async(pizza) => {

        const {id, nombre, libreGluten, importe, descripcion} = pizza;
        console.log("name", nombre)
        let pool = await sql.connect(config)
        const request = new sql.Request(pool);

        request
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar(50), nombre)
        .input('libreGluten', sql.Bit, libreGluten)
        .input('importe', sql.Money, importe)
        .input('descripcion', sql.NVarChar(200), descripcion)
        .query('UPDATE Pizzas SET Nombre = @nombre, LibreGluten = @libreGluten, Importe = @importe, Descripcion = @descripcion WHERE Id = @id ')


    }

    static deleteById = async (id) => {
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE * FROM Pizzas WHERE id = @pId');
        }catch (error){
            console.log(error);
        }
    }
}