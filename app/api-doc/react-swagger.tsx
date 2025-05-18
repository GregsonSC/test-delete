'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: Record<string, any>,
};

function ReactSwagger({ spec }: Props) {
  return (
    <div style={{ background: 'white', padding: '20px' }}>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export default ReactSwagger;