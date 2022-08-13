import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Animated } from '@arwes/animated';

const Item = (): ReactElement => {
  return (
    <Animator>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
        animated={[
          {
            initialStyle: { x: 0 },
            transitions: {
              entering: { x: [0, 100] },
              exiting: { x: [100, 0] }
            }
          },
          {
            initialStyle: { backgroundColor: '#0ff' },
            transitions: {
              entering: { backgroundColor: '#ff0' },
              exiting: { backgroundColor: '#0ff' }
            }
          }
        ]}
      />
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active} manager='stagger' combine>
      {Array(10).fill(0).map((_, i) => <Item key={i} />)}
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
