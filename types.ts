
import React from 'react';

export interface AppUsage {
  id: 'instagram' | 'tiktok' | 'youtube';
  name: string;
  limit: number; // daily limit in minutes
  usage: number[]; // weekly usage, array of 7 days in minutes
  icon: React.ReactNode;
  color: string;
}

export enum Page {
  Home = '/',
  Controls = '/controls',
  Stats = '/stats',
  Settings = '/settings',
}
