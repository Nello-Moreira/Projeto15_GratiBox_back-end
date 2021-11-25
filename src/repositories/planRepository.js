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

async function insertUserPlan({
	userId,
	planId,
	deliveryOption,
	subscriptionDate,
}) {
	try {
		await dbConnection.query(
			`INSERT INTO users_plans
                (user_id, plan_id, delivery_option_id, subscription_date)
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
				delivery_options.id AS "deliveryOptionId",
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

async function deleteAllPlanOptions() {
	try {
		await dbConnection.query('DELETE FROM delivery_options;');
		await dbConnection.query('DELETE FROM plan_types;');
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertPlanType(type) {
	try {
		return await dbConnection.query(
			`INSERT INTO plan_types
                (type)
            VALUES
                ($1)
			RETURNING id;`,
			[type]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertDeliveryOptions({ planId, optionName }) {
	try {
		return await dbConnection.query(
			`INSERT INTO delivery_options
                (plan_id, name)
            VALUES
                ($1, $2)
			RETURNING id;`,
			[planId, optionName]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserPlan,
	insertUserPlan,
	updatePlan,
	searchPlanOptions,
	deleteAllPlanOptions,
	insertPlanType,
	insertDeliveryOptions,
};
