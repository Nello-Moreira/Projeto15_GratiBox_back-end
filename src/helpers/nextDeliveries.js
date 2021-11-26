/* eslint-disable no-continue */
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

function calculateWeeklyDeliveries({
	deliveryOption,
	lastDeliveryDate,
	nextDeliveryDatesCount,
}) {
	const nextDeliveries = [];
	const options = { weekday: 'long' };
	let dateString;

	let nextDate = getNextDay(lastDeliveryDate);
	while (nextDeliveries.length < nextDeliveryDatesCount) {
		dateString = nextDate.toLocaleDateString('pt-BR', options);

		if (dateString === deliveryOption) {
			nextDeliveries.push(new Date(nextDate));
		}

		nextDate = getNextDay(new Date(nextDate));
	}

	return nextDeliveries;
}

function calculateMonthlyDeliveries({
	deliveryOption,
	lastDeliveryDate,
	nextDeliveryDatesCount,
}) {
	const nextDeliveries = [];
	const options = {
		weekday: 'long',
	};
	let dateString;
	let nextDate;

	while (nextDeliveries.length < nextDeliveryDatesCount) {
		nextDate = getNextMonthFirstDay(lastDeliveryDate);

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

export default function calculateNextDeliveries({
	planType,
	deliveryOption,
	lastDeliveryDate,
}) {
	const nextDeliveryDatesCount = 3;

	if (planType === 'semanal') {
		return calculateWeeklyDeliveries({
			deliveryOption,
			lastDeliveryDate,
			nextDeliveryDatesCount,
		});
	}

	return calculateMonthlyDeliveries({
		deliveryOption: Number(deliveryOption),
		lastDeliveryDate,
		nextDeliveryDatesCount,
	});
}
