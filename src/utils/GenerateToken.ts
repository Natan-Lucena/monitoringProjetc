export function generateToken(): string {
  let token = '';
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    token += randomDigit.toString();
  }
  return token;
}
