/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchProducts = () => dbConnection.query('SELECT * FROM products;');

const insertProducts = () =>
	dbConnection.query(`
    INSERT INTO products (name) VALUES
    ('Chás'), ('Produtos orgânicos'), ('Incensos');`);

const deleteAllProducts = () => dbConnection.query('DELETE FROM products;');

export { searchProducts, insertProducts, deleteAllProducts };
