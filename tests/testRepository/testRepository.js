import faker from 'faker';
import { dbConnection } from '../../src/repositories/connection';

async function searchUserByParam({ param, value }) {
	return dbConnection.query(`SELECT * FROM users WHERE ${param} = $1 ;`, [
		value,
	]);
}

async function searchSession({ token }) {
	return dbConnection.query(
		'SELECT user_id AS "userId" FROM sessions WHERE token = $1;',
		[token]
	);
}

async function insertState({ name, initials }) {
	return dbConnection.query(
		`INSERT INTO
            states (name, initials)
        VALUES ($1, $2)
        RETURNING id;`,
		[name, initials]
	);
}

async function insertUser({ name, email, password }) {
	return dbConnection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
		[name, email, password]
	);
}

async function insertSession({ userId, token }) {
	return dbConnection.query(
		'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
		[userId, token]
	);
}

async function insertProduct({ name }) {
	return dbConnection.query(
		'INSERT INTO products (name) VALUES ($1) RETURNING id;',
		[name]
	);
}

async function insertPlanType({ type }) {
	return dbConnection.query(
		`
        INSERT INTO plan_types
                (type)
        VALUES
                ($1)
		RETURNING id;`,
		[type]
	);
}

async function insertDeliveryOptions({ planTypeId, optionName }) {
	return dbConnection.query(
		`
        INSERT INTO delivery_options
                (plan_type_id, name)
        VALUES
                ($1, $2)
		RETURNING id;`,
		[planTypeId, optionName]
	);
}

async function deleteAllSessions() {
	return dbConnection.query('DELETE FROM sessions;');
}

async function deleteAllUsers() {
	await dbConnection.query('DELETE FROM sessions;');
	await dbConnection.query('DELETE FROM addresses;');
	await dbConnection.query('DELETE FROM users_products;');
	await dbConnection.query('DELETE FROM users_plans;');
	return dbConnection.query('DELETE FROM users;');
}

async function deleteAllProducts() {
	await dbConnection.query('DELETE FROM users_products;');
	return dbConnection.query('DELETE FROM products;');
}

async function deleteAllAddresses() {
	return dbConnection.query('DELETE FROM addresses;');
}

async function deleteAllStates() {
	await deleteAllAddresses();
	return dbConnection.query('DELETE FROM states;');
}

async function deleteAllPlanOptions() {
	await dbConnection.query('DELETE FROM users_plans;');
	await dbConnection.query('DELETE FROM delivery_options;');
	return dbConnection.query('DELETE FROM plan_types;');
}

async function deleteAllUserPlans() {
	return dbConnection.query('DELETE FROM users_plans;');
}

async function clearDataBase() {
	await dbConnection.query('DELETE FROM sessions;');
	await dbConnection.query('DELETE FROM addresses;');
	await dbConnection.query('DELETE FROM states;');
	await dbConnection.query('DELETE FROM users_products;');
	await dbConnection.query('DELETE FROM products;');
	await dbConnection.query('DELETE FROM feedbacks;');
	await dbConnection.query('DELETE FROM ratings;');
	await dbConnection.query('DELETE FROM deliveries;');
	await dbConnection.query('DELETE FROM users_plans;');
	await dbConnection.query('DELETE FROM delivery_options;');
	await dbConnection.query('DELETE FROM plan_types;');
	await dbConnection.query('DELETE FROM users;');

	return true;
}

async function subscribeUser({
	userId,
	planTypeId,
	deliveryOptionId,
	productsList,
	address,
}) {
	const subscriptionDate = faker.date.past(1);

	await dbConnection.query(
		`INSERT INTO users_plans
			(user_id, plan_type_id, delivery_option_id, subscription_date)
		VALUES
			($1, $2, $3, $4)
		RETURNING id;`,
		[userId, planTypeId, deliveryOptionId, subscriptionDate]
	);

	const { receiverName, zipCode, streetName, city, stateId } = address;

	await dbConnection.query(
		`
		INSERT INTO addresses
			(user_id, receiver_name, zip_code, street_name, city, state_id)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id;`,
		[userId, receiverName, zipCode, streetName, city, stateId]
	);

	const valuesQuery = productsList
		.map((productId) => `(${userId}, ${productId})`)
		.join(', ');

	await dbConnection.query(`
			INSERT INTO users_products
			(user_id, product_id)
			VALUES
			${valuesQuery};`);

	return true;
}

export default {
	searchUserByParam,
	searchSession,
	insertState,
	insertUser,
	insertSession,
	insertProduct,
	insertPlanType,
	insertDeliveryOptions,
	subscribeUser,
	deleteAllUsers,
	deleteAllSessions,
	deleteAllProducts,
	deleteAllAddresses,
	deleteAllStates,
	deleteAllPlanOptions,
	deleteAllUserPlans,
	clearDataBase,
};
