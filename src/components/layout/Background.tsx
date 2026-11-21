import React from 'react';

export const Background: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Deep dark base background */}
      <div className="absolute inset-0 bg-portal-darker" />

      {/* Blurred glowing gradients */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-30 filter blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-25 filter blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(167, 139, 250, 0.2) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-20 filter blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(59, 130, 246, 0.3) 70%, transparent 90%)',
        }}
      />

      {/* Dark overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-portal-darker/70 backdrop-blur-[1px]" />
    </div>
  );
};
