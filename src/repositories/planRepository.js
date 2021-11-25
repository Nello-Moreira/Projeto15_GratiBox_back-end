/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchUserPlan(userId) {
	try {
		return await dbConnection.query(
			'SELECT * FROM users_plans WHERE user_id = $1 ;',
			[userId]
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

async function searchPlanOptions() {
	try {
		return await dbConnection.query(
			`SELECT
				plan_types.id AS "planId",
				plan_types.type AS "planType",
				delivery_options.name AS "deliveryOption"
			FROM plan_types
			JOIN delivery_options
				ON delivery_options.plan_id = plan_types.id;`
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserPlan,
	insertPlan,
	updatePlan,
	searchPlanOptions,
};
