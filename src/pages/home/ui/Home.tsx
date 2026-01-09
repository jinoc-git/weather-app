import { Card } from '@/app/widgets/card';
import React from 'react';

export const HomePage = () => {
  const eg = {
    tmp: 24,
    tmn: 18,
    tmx: 28,
  };
  return (
    <>
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
    </>
  );
};
