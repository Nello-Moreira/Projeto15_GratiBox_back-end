/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchUserPlan(id) {
	try {
		return await dbConnection.query(
			'SELECT * FROM users_plans WHERE user_id = $1 ;',
			[id]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertPlan({
	userId,
	planId,
	deliveryOption,
	subscriptionDate,
}) {
	try {
		await dbConnection.query(
			`INSERT INTO users_plans
                (user_id, plan_type_id, delivery_option_id, subscription_date)
            VALUES
                ($1, $2, $3, $4);`,
			[userId, planId, deliveryOption, subscriptionDate]
		);
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function updatePlan({
	userId,
	planId,
	deliveryOption,
	subscriptionDate,
}) {
	try {
		await dbConnection.query(
			`
            UPDATE users_plans
            SET
                plan_id = $2, delivery_option_id = $3, subscription_date = $4
            WHERE user_id = $1;`,
			[userId, planId, deliveryOption, subscriptionDate]
		);
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserPlan,
	insertPlan,
	updatePlan,
};
