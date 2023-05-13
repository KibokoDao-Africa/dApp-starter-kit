const buttonStyle = (connector) => ({
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  margin: '5px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  opacity: connector.ready ? 1 : 0.5,
});

function renderConnectors(connectors, handleSignUpWithWagmi, isLoading, pendingConnector) {
  return (
    <div className='modal-connectors'>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          disabled={!connector.ready}
          onClick={() => handleSignUpWithWagmi({ connector })}
          style={buttonStyle(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}
    </div>
  );
}

export default renderConnectors;
