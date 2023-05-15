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

function renderConnectors(handleMetamaskSignUp) {
  return (
    <div className='modal-connectors'>
        <button
          onClick={ () => handleMetamaskSignUp() }
          style={buttonStyle("Metamask")}
        >
          Metamask
        </button>
    </div>
  );
}

export default renderConnectors;
