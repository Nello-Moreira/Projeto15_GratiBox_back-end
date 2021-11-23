/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchPlanInformations = (token) =>
	dbConnection.query(
		`SELECT
			users.name,
			plan_types.type as "planType",
			delivery_options.name as "deliveryOption",
			users_plans.subscription_date as "subscriptionDate"
		FROM users
		JOIN sessions
			ON sessions.user_id = users.id
		JOIN users_plans
			ON users_plans.user_id = users.id
		JOIN plan_types
			ON plan_types.id = users_plans.plan_type_id
		JOIN delivery_options
			ON delivery_options.id = users_plans.delivery_option_id
		WHERE sessions.token = $1;`,
		[token]
	);

const insertNewUserPlan = (userId) =>
	dbConnection.query('INSERT INTO users_plans (user_id) VALUES ($1);', [
		userId,
	]);

const updateUserPlan = (token, planId, deliveryOption) =>
	dbConnection.query(
		`
        UPDATE users_plans
        SET plan_id = $2, delivery_option_id = $3, subscription_date = NOW()
        WHERE user_id = (SELECT sessions.user_id FROM sessions WHERE token = $1);`,
		[token, planId, deliveryOption]
	);

const deleteAllUsersPlans = () =>
	dbConnection.query('DELETE FROM users_plans;');

export {
	searchPlanInformations,
	insertNewUserPlan,
	updateUserPlan,
	deleteAllUsersPlans,
};
