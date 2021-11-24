import faker from 'faker';
faker.locale = 'pt_BR';

export default function createState() {
	return {
		name: faker.address.state(),
		initials: faker.address.stateAbbr(),
	};
}
