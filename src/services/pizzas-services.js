import config from '../../dbconfig.js';
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
        console.log(pizza);
        const {Id, Nombre, LibreGluten, Importe, Descripcion} = pizza;
        let pool = await sql.connect(config)
        const request = new sql.Request(pool);

        request
        .input('Nombre', sql.NVarChar(50), Nombre)
        .input('LibreGluten', sql.Bit, LibreGluten)
        .input('Importe', sql.Float, Importe)
        .input('Descripcion', sql.NVarChar(200), Descripcion)
        .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@Nombre, @LibreGluten, @Importe, @Descripcion)')

    }

    static update = async(pizza) => {
        const {Id, Nombre, LibreGluten, Importe, Descripcion} = pizza;
        let pool = await sql.connect(config)
        const request = new sql.Request(pool);

        request
        .input('Id', sql.Int, Id)
        .input('Nombre', sql.NVarChar(50), Nombre)
        .input('LibreGluten', sql.Bit, LibreGluten)
        .input('Importe', sql.Float, Importe)
        .input('Descripcion', sql.NVarChar(200), Descripcion)
        .query('UPDATE Pizzas SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE Id = @Id')
    }

    static deleteById = async (id) => {
        let result = null;
        try{
            let pool = await sql.connect(config);
            result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Pizzas WHERE id = @pId');
        }catch (error){
            console.log(error);
        }
        return result;
    }
}