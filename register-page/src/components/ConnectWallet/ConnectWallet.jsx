
const connectWallet = async () => { 
    console.log("Connecting wallet")
    try { 
      const { ethereum } = window; 
      
      if(typeof ethereum !== "undefined"){
        console.log("Metamask installed")
      } else {
        window.alert("Kindly install metamask")
      } 

      const accounts = await ethereum.request({ method: "eth_requestAccounts" }); 
      const account = accounts[0]; 

      const chainId = await ethereum.request({ method: "eth_chainId" });  
      const desiredChainId = "0xaa36a7";
      
      if (chainId !== desiredChainId) {
        try {
          // Switching to Sepolia network
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: desiredChainId }],
          });
        } catch (switchError) {
          // If the user rejects network switch, you can handle the error here
          console.error("Failed to switch network:", switchError);
        }
      }

      return account; 
  
    } catch (error) {
      console.error(error); 
    }  
  } 

export default connectWallet; 