import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { AllRecordsPage } from '../../pages/AllRecordsPage';
import { HomePage } from '../../pages/HomePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <HomePage />,
  },
  {
    path: '/records',
    element: <AllRecordsPage />,
  },
];
