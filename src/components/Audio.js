import React from 'react'

function Audio(props) {
  return (
    <div>
        { props.source ?
          <audio controls key={props.id} className="h-8 w-full">
            <source
              src={
                props.source                
              }
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio> : ""
          }
    </div>
  )
}

export default Audio