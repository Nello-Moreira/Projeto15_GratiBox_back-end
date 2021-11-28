import { v4 as uuid } from 'uuid';
import userRepository from '../repositories/userRepository.js';
import planService from './planService.js';
import { isCorrectPassword, hashPassword } from '../helpers/passwordEncrypt.js';

async function authenticate({ email, password }) {
	const user = await userRepository.searchUserByParam({
		param: 'email',
		value: email,
	});

	if (!user) return null;

	if (user.rowCount === 0) {
		return false;
	}

	if (
		!isCorrectPassword({
			password,
			hashedPassword: user.rows[0].password,
		})
	) {
		return false;
	}

	const token = uuid();

	const createdSession = await userRepository.insertSession({
		userId: user.rows[0].id,
		token,
	});

	if (!createdSession) return null;

	const isSubscriber = await planService.isSubscriber({
		userId: user.rows[0].id,
	});

	return { username: user.rows[0].name, token, isSubscriber };
}

async function registerUser({ name, email, password }) {
	const user = await userRepository.searchUserByParam({
		param: 'email',
		value: email,
	});

	if (!user) return null;

	if (user.rowCount !== 0) {
		return false;
	}

	const hashedPassword = hashPassword(password);

	const userId = await userRepository.insertUser({
		name,
		email,
		password: hashedPassword,
	});

	if (!userId) return null;

	return true;
}

export default { authenticate, registerUser };
