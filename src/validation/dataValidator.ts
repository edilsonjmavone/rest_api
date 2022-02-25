import joi from "joi";
// Data validation using joi
const loginData = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

const newUserData = joi.object({
  name: joi
    .string()
    .min(3)
    .max(20)
    .required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

const newPostData = joi.object({
  text: joi
    .string()
    .min(1)
    .max(100)
    .required()
});

export default class Validator {
  login(email: string, password: string) {
    const { error, value } = loginData.validate({ email, password });
    if (error) return { isValid: false, message: error.details[0].message };
    return { isValid: true, message: "" };
  }
  user(name: string, email: string, password: string) {
    const { error, value } = newUserData.validate({ name, email, password });
    if (error) return { isValid: false, message: error.details[0].message };
    return { isValid: true, message: "" };
  }
  post(text: string) {
    const { error, value } = newPostData.validate({ text });
    if (error) return { isValid: false, message: error.details[0].message };
    return { isValid: true, message: "" };
  }
}
