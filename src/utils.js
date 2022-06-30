export const isValidEmail = email => {
  const regex = /^(\w+)(\.\w+)*@(\w+)(\.\w+)*(\.[a-zA-Z]{2,4})$/gi;
  return regex.test(email);
}