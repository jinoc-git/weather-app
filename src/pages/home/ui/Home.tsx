import { Card } from '@/widgets/card';
import { getDailyWeather } from '@/entities/weather/api';
import React, { useEffect } from 'react';

export const HomePage = () => {
  const eg = {
    tmp: 24,
    tmn: 18,
    tmx: 28,
  };

  useEffect(() => {
    const now = new Date();
    getDailyWeather({
      nx: 55,
      ny: 127,
      now,
    });
  }, []);
  return (
    <>
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
    </>
  );
};
