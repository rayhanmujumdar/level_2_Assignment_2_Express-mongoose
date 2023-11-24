import bcrypt  from "bcrypt"
import config from '../config';
const hashStr = (text: string = "") => {
  return bcrypt.hash(text,Number(config.salt_Rounds))
}

export default hashStr