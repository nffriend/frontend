import React, { FC, HTMLProps, useEffect, useMemo, useState } from 'react'
import { isBrowser } from '@/env';
import '@google/model-viewer'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any
    }
  }
}

interface ModelViewProps extends HTMLProps<HTMLDivElement> {
  source?: string
}

const ModelView: FC<ModelViewProps> = ({ source='' }) => {

  const [init, setInit] = useState(false);
  useEffect(() => {
    setInit(true);
  },[])

  return useMemo(() => {
    if (!isBrowser || !init || source.indexOf('glb') === -1) return null
    return (
      <div style={{width: '100%', height: '100%'}}>
        <model-viewer
          style={{ width: '90%', height: '100%', margin: 'auto' }}
          src={source}
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
        />
      </div>
    )
  }, [source, isBrowser, init])
}

export default ModelView
