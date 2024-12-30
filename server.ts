import express from 'express';
import cors from 'cors';
import { simulatorRouter } from './routes/simulator.js';
import { eventsRouter } from './routes/events.js';
import { startSimulation } from './services/simulationService.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/simulator', simulatorRouter);
app.use('/api/events', eventsRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
  startSimulation(); // Start the security event simulation
});
