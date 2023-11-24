/* eslint-disable @typescript-eslint/no-explicit-any */
const error = (status: number = 500, message: string = "Something went wrong") => {
  const err: any = new Error(message)
  err.status = status
  return err
}

export default error