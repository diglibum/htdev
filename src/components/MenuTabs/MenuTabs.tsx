import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const MenuTabs = () => {
  let location = useLocation();

  const tabs = [
    { label: 'Создать запись', href: '/' },
    { label: 'Записи', href: '/records' },
  ];

  const activeTab = tabs.findIndex((tab) => tab.href === location.pathname);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs aria-label="Меню" value={activeTab}>
        {tabs.map((tab, index) => (
          <Tab label={tab.label} key={index} area-label={tab.label} href={tab.href} />
        ))}
      </Tabs>
    </Box>
  );
};
