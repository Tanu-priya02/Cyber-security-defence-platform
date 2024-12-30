import { Router } from 'express';
import { 
  startSimulation, 
  stopSimulation, 
  adjustSimulationRate 
} from '../services/simulationService.js';

const router = Router();

router.post('/start', (req, res) => {
  startSimulation();
  res.json({ message: 'Simulation started' });
});

router.post('/stop', (req, res) => {
  stopSimulation();
  res.json({ message: 'Simulation stopped' });
});

router.post('/rate', (req, res) => {
  const { eventsPerMinute } = req.body;
  adjustSimulationRate(eventsPerMinute);
  res.json({ message: 'Simulation rate adjusted' });
});

export { router as simulatorRouter };
