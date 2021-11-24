import { v4 as uuid } from 'uuid';
import userRepository from '../repositories/userRepository.js';
import { isCorrectPassword, hashPassword } from '../helpers/passwordEncrypt.js';
import planController from '../controllers/planController.js';

async function authenticate({ email, password }) {
	const user = await userRepository.searchUserByEmail(email);

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

	return token;
}

async function registerUser({ name, email, password }) {
	const user = await userRepository.searchUserByEmail(email);

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

	const createdNotSubscribedPlan = await planController.setUserPlan({
		userId: userId.rows[0].id,
	});

	if (!createdNotSubscribedPlan) return null;

	return true;
}

export default { authenticate, registerUser };
