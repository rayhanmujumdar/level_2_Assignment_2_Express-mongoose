import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler, notFoundError } from './ErrorBoundary/errorBoundary'
import userRoutes from './modules/users/user.routes'
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// health route
app.get('/health',(_req: Request,res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Route Health is Good'
  })
})

// user routes
app.use('/api/users',userRoutes)

// error boundary middleware
app.use(notFoundError)
app.use(errorHandler)

export default app