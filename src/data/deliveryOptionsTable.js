/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchDeliveryOptions = (planType) =>
	dbConnection.query(
		`
	SELECT delivery_options.name
	FROM plans
	JOIN delivery_options
		ON plans.id = delivery_options.plan_id
	WHERE plans.type=$1;`,
		[planType]
	);

export default searchDeliveryOptions;
