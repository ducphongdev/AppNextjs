import { useSensor, useSensors as useSensorsLib } from '@dnd-kit/core';
import { MouseSensor, TouchSensor, PointerSensor } from '@/lib/dndkit-sensor';

export const useSensors = () => {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  return useSensorsLib(mouseSensor, touchSensor, pointerSensor);
};
