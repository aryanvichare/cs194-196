import { create } from 'zustand';
import { EmergencyResponseSystem } from './system';
import type { EmergencyData, ProcessedEmergency } from '../types/emergency';

interface AutogenState {
  system: EmergencyResponseSystem;
  activeEmergencies: ProcessedEmergency[];
  currentEmergency: ProcessedEmergency | null;
  
  processEmergency: (data: EmergencyData) => Promise<void>;
  setCurrentEmergency: (id: string) => void;
  updateEmergency: (id: string, data: Partial<ProcessedEmergency>) => void;
}

export const useAutogenStore = create<AutogenState>((set, get) => ({
  system: new EmergencyResponseSystem(),
  activeEmergencies: [],
  currentEmergency: null,

  processEmergency: async (data) => {
    const system = get().system;
    const result = await system.processEmergency(data);
    
    set((state) => ({
      activeEmergencies: [...state.activeEmergencies, {
        id: data.id,
        ...result
      }]
    }));
  },

  setCurrentEmergency: (id) => {
    const emergency = get().activeEmergencies.find(e => e.id === id);
    set({ currentEmergency: emergency || null });
  },

  updateEmergency: (id, data) => {
    set((state) => ({
      activeEmergencies: state.activeEmergencies.map(e => 
        e.id === id ? { ...e, ...data } : e
      )
    }));
  }
}));