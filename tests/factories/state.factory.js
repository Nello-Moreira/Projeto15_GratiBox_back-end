import faker from 'faker';

faker.locale = 'pt_BR';

function createState() {
	return {
		id: null,
		name: faker.address.state(),
		initials: faker.address.stateAbbr(),
	};
}

export default { createState };
