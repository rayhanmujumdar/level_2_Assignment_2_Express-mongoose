/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

export const notFoundError = (_req: Request,_res:Response,next: NextFunction):void => {
  const err:any = new Error('Response not found')
  err.status = 404
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error:any ,_req: Request,res: Response, _next: NextFunction) => {
  if(error && error.status){
    res.status(error.status).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: error.status,
        description: error.message
      }
    })
  }
  res.status(500).json({
    success: false,
    message:'Something went wrong',
    error: {
      code: 500,
      description: "I think you are something mistake please check your input"
    }
  })
}