/* eslint-disable no-console */
import { dbConnection } from './connection.js';

async function searchUserPlanByUserId({ userId }) {
	try {
		return await dbConnection.query(
			'SELECT id FROM users_plans WHERE user_id = $1 ;',
			[userId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchUserPlanInformations({ userId }) {
	try {
		return dbConnection.query(
			`
			SELECT
				plan_types.type as "planType",
				users_plans.subscription_date as "subscriptionDate",
				delivery_options.name as "deliveryOption"
			FROM users_plans
			JOIN plan_types
				ON plan_types.id = users_plans.plan_type_id
			JOIN delivery_options
				ON delivery_options.id = users_plans.delivery_option_id
			WHERE users_plans.user_id = $1 ;
			`,
			[userId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchLastDeliveryDate({ userId }) {
	try {
		return dbConnection.query(
			'SELECT date FROM deliveries WHERE user_id = $1 ORDER BY id DESC LIMIT 1;',
			[userId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function searchPlanOptions() {
	try {
		return await dbConnection.query(
			`SELECT
				plan_types.id AS "planTypeId",
				plan_types.type AS "planType",
				delivery_options.id AS "deliveryOptionId",
				delivery_options.name AS "deliveryOption"
			FROM plan_types
			JOIN delivery_options
				ON delivery_options.plan_type_id = plan_types.id;`
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertUserPlan({
	userId,
	planTypeId,
	deliveryOptionId,
	subscriptionDate,
}) {
	try {
		return dbConnection.query(
			`INSERT INTO users_plans
                (user_id, plan_type_id, delivery_option_id, subscription_date)
            VALUES
                ($1, $2, $3, $4)
			RETURNING id;`,
			[userId, planTypeId, deliveryOptionId, subscriptionDate]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function deleteUserPlan({ planId }) {
	try {
		return dbConnection.query('DELETE FROM users_plans WHERE id = $1;', [
			planId,
		]);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default {
	searchUserPlanByUserId,
	searchUserPlanInformations,
	searchLastDeliveryDate,
	searchPlanOptions,
	insertUserPlan,
	deleteUserPlan,
};
