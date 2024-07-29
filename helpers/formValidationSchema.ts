import * as yup from 'yup';
import { FORM_MESSAGES } from '@/constants/formMessages';

export const formValidationSchema = yup.object({
	firstName: yup
		.string()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.min(2, FORM_MESSAGES.ERR_MIN_2_SYMBOLS)
		.max(20, FORM_MESSAGES.ERR_MAX_20_SYMBOLS),
	lastName: yup
		.string()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.min(2, FORM_MESSAGES.ERR_MIN_2_SYMBOLS)
		.max(20, FORM_MESSAGES.ERR_MAX_20_SYMBOLS),
	email: yup
		.string()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.email(FORM_MESSAGES.ERR_EMAIL_FORMAT),
	password: yup
		.string()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.min(10, FORM_MESSAGES.ERR_MIN_10_SYMBOLS)
		.matches(/^[a-zA-Z0-9]+$/, FORM_MESSAGES.ERR_PASS_ONLY_LETTERS_NUMBERS),
	birthDate: yup
		.date()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.max(new Date(), FORM_MESSAGES.ERR_DATE_IN_FUTURE),
	acceptTermsAndConditions: yup
		.boolean()
		.required(FORM_MESSAGES.ERR_REQ_FIELD)
		.oneOf([true]),
});
