import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler, notFoundError } from './ErrorBoundary/errorBoundary'
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// error boundary middleware
app.use(notFoundError)
app.use(errorHandler)

// health route
app.get('/health',(_req: Request,res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Route Health is Good'
  })
})

export default app