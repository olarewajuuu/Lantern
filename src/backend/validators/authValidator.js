const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^\d{11}$/;

exports.validateStudentInput = (data) => {
  const errors = {};

  if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  if (!strongPasswordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters, include 1 uppercase and 1 number.";
  }

  if (data.phoneNumber && !phoneRegex.test(data.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 11 digits.";
  }

  return errors;
};
