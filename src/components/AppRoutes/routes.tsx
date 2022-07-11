import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { AllNotesPage } from '../../pages/AllNotesPage';
import { HomePage } from '../../pages/HomePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <HomePage />,
  },
  {
    path: '/notes',
    element: <AllNotesPage />,
  },
];
