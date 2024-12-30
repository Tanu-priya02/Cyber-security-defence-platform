import { generateSecurityEvent } from '../utils/eventGenerator.js';
import { supabase } from '../lib/supabase.js';

let simulationInterval: NodeJS.Timeout | null = null;
let eventsPerMinute = 10;

export function startSimulation() {
  if (simulationInterval) return;

  const intervalMs = 60000 / eventsPerMinute;
  
  simulationInterval = setInterval(async () => {
    const event = generateSecurityEvent();
    
    const { error } = await supabase
      .from('security_events')
      .insert([event]);

    if (error) {
      console.error('Error inserting security event:', error);
    }
  }, intervalMs);
}

export function stopSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
}

export function adjustSimulationRate(newEventsPerMinute: number) {
  eventsPerMinute = newEventsPerMinute;
  if (simulationInterval) {
    stopSimulation();
    startSimulation();
  }
}
