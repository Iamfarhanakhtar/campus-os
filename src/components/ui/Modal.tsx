import React from 'react';
import { Dialog, DialogProps } from './Dialog';

export const Modal: React.FC<DialogProps> = (props) => {
  return <Dialog {...props} />;
};
