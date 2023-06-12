"use client";

import EventBusService from '@/services/EventBusService';
import { createContext, useContext } from 'react';

const sharedState: { eventBus: EventBusService } = {
  eventBus: new EventBusService()
}

const AppContext = createContext(sharedState);

type Props = {
  children: React.ReactNode
};

export function AppWrapper({ children }: Props) {
  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export const LINK_CLICKED = 'link-clicked';
export const COLLAPSE_PROJECTS = 'collapse-projects';
export const COLLAPSE_SKILLSETS ='collapse-skillsets';