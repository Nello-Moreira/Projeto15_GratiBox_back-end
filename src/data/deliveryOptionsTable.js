/* eslint-disable implicit-arrow-linebreak */
import { dbConnection } from './connection.js';

const searchDeliveryOptions = (planType) =>
	dbConnection.query(
		`
	SELECT delivery_options.id, delivery_options.name
	FROM plans
	JOIN delivery_options
		ON plan_types.id = delivery_options.plan_id
	WHERE plan_types.type=$1;`,
		[planType]
	);

export default searchDeliveryOptions;
