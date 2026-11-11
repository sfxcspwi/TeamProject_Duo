import React from 'react';
import { ClipLoader } from 'react-spinners';
import s from './Spinner.module.css';

export function Spinner({ size = 40, color = '#FFB36C', loading = true }) {
  if (!loading) return null;

  return (
    <div className={s.wrapper}>
      <ClipLoader color={color} loading={loading} size={size} speedMultiplier={0.8} />
    </div>
  );
}