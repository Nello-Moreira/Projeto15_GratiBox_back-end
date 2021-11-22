/* eslint-disable no-continue */
import { searchLastDelivery } from '../data/deliveriesTable.js';

async function getLastDeliveryDate(userId, planInformations) {
	try {
		const lastDeliveryQuery = await searchLastDelivery(userId);

		if (lastDeliveryQuery.rowCount === 0) {
			return new Date(planInformations.subscription_date);
		}
		return new Date(lastDeliveryQuery.rows[0].date);
	} catch (error) {
		return error;
	}
}

function getNextDay(previousDate) {
	return new Date(previousDate.setDate(previousDate.getDate() + 1));
}

function getNextMonthFirstDay(previousDate) {
	const nextMonthDate = new Date(
		previousDate.setMonth(previousDate.getMonth() + 1)
	);
	nextMonthDate.setDate(1);
	return nextMonthDate;
}

function calculateWeeklyDeliveries(
	deliveryOption,
	lastDate,
	nextDeliveryDatesCount
) {
	const nextDeliveries = [];
	const options = { weekday: 'long' };
	let dateString;

	let nextDate = getNextDay(lastDate);

	while (nextDeliveries.length < nextDeliveryDatesCount) {
		dateString = nextDate.toLocaleDateString('pt-BR', options);

		if (dateString === deliveryOption) {
			nextDeliveries.push(new Date(nextDate));
		}

		nextDate = getNextDay(new Date(nextDate));
	}
	return nextDeliveries;
}

function calculateMonthlyDeliveries(
	deliveryOption,
	lastDate,
	nextDeliveryDatesCount
) {
	const nextDeliveries = [];
	const options = {
		weekday: 'long',
	};
	let dateString;
	let nextDate;

	while (nextDeliveries.length < nextDeliveryDatesCount) {
		nextDate = getNextMonthFirstDay(lastDate);

		// eslint-disable-next-line no-constant-condition
		while (true) {
			dateString = nextDate.toLocaleDateString('pt-BR', options);

			if (!(nextDate.getDate() === deliveryOption)) {
				nextDate = getNextDay(nextDate);
				continue;
			}

			if (dateString === 'sábado' && nextDate.getDate() === deliveryOption) {
				nextDate = getNextDay(nextDate);
				nextDate = getNextDay(nextDate);
				nextDeliveries.push(new Date(nextDate));
				break;
			}

			if (dateString === 'domingo' && nextDate.getDate() === deliveryOption) {
				nextDate = getNextDay(nextDate);
				nextDeliveries.push(new Date(nextDate));
				break;
			}

			nextDeliveries.push(new Date(nextDate));
			break;
		}
	}
	return nextDeliveries;
}

export default async function calculateNextDeliveries(
	userId,
	planInformations
) {
	const nextDeliveryDatesCount = 3;
	const deliveryOption = planInformations.delivery_option;

	try {
		const lastDeliveryDate = await getLastDeliveryDate(
			userId,
			planInformations
		);

		if (planInformations.type === 'semanal') {
			return calculateWeeklyDeliveries(
				deliveryOption,
				lastDeliveryDate,
				nextDeliveryDatesCount
			);
		}

		return calculateMonthlyDeliveries(
			Number(deliveryOption),
			lastDeliveryDate,
			nextDeliveryDatesCount
		);
	} catch (error) {
		return error;
	}
}
