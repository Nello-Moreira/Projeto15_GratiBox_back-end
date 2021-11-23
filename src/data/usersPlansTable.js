/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchPlanInformations = (userId) =>
	dbConnection.query(
		`SELECT
			users_plans.subscription_date, plans.type, delivery_options.name as delivery_option
		FROM users
		JOIN plans
			ON plans.id = users.plan_id
		JOIN delivery_options
			ON delivery_options.id = users.delivery_option_id
		WHERE users.id = $1;`,
		[userId]
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
