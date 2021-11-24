import faker from 'faker';

faker.locale = 'pt_BR';

export default function createState() {
	return {
		id: null,
		name: faker.address.state(),
		initials: faker.address.stateAbbr(),
	};
}
