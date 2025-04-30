
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Terminal from '@/components/Terminal';
import "../lib/i18n"; // This ensures i18n is initialized

const Index = () => {
  return (
    <MainLayout>
      <Terminal />
    </MainLayout>
  );
};

export default Index;
