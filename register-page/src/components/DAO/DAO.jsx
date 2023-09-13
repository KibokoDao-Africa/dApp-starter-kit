
import React, { useEffect } from 'react';
import { utils } from 'ethers';
import getProviderOrSigner from '../../contractInstance';
import './DAO.css'; // Import the CSS file for styling


const DAO = ({ daoContent, setShowDao }) => {

    const handleWithdrawFunds = async () => {
        console.log("Withdrawing funds..."); 
        try {
            const { farmDaoContract }  = await getProviderOrSigner(true); 
            const tx = await farmDaoContract.withDrawDFunds(daoContent.id); 
            await tx.wait(); 
            console.log("Funds sent successfully!");
        } catch (error) {
            console.error(error); 
        }
    }

    const hyperlinkTag = daoContent.investors.map((investor) => {
        return (
            <a href={`https://sepolia.etherscan.io/address/${investor}`} target='_blank' className='investors'>{investor.slice(0,6)}...{investor.slice(38,42)}</a>
        )
    })

    return (
        <div className="login-container">

            <div className="login-form">
                <h2>{daoContent.financialReports}</h2>

                <div className="description">
                    <p>{daoContent.description}</p>
                </div>

                <div className="invested-form">
                    <p className='descriptionArea' >Total Amount Invested</p>
                    <p className='descriptionArea' >{utils.formatEther(daoContent.amountInvested)} USD</p>
                </div>

                <div className='reports'>
                    <div>
                      <a href={daoContent.farmReports} target='_blank'>Your Financial Report</a>
                    </div>
                    <div>
                      <a href={daoContent.name} target='_blank'>Your Farm Report</a>
                    </div>
                </div>
                    
                <div className="invested-form">
                    <div>
                        <p className='descriptionArea' >Investors</p>
                        <div  className='descriptionArZea'>
                            { hyperlinkTag }
                        </div>
                    </div>

                    <div>
                        <p className='descriptionArea' >Owners</p>
                        <div  className='descriptionArea'>
                            <a href={`https://sepolia.etherscan.io/address/${daoContent.address1}`} target='_blank'>{daoContent.address1.slice(0,6)}...{daoContent.address1.slice(38,42)}</a>
                            <a href={`https://sepolia.etherscan.io/address/${daoContent.address2}`} target='_blank'>{daoContent.address2.slice(0,6)}...{daoContent.address2.slice(38,42)}</a>
                        </div>
                    </div>

                </div>

                <div>
                    { 
                       daoContent.verified ? (
                        <button className="withdraw-button" onClick={ () => handleWithdrawFunds() }>Withdraw Funds</button>
                       ) : (
                        <button className="withdraw-button" onClick={ () => console.error("DAO not verified for withdrawal")}>DAO is not verified for withdrawal</button>
                       )
                    }
                    <button className="exit-button" onClick={ () => setShowDao(false) }>Exit</button>
                </div>
            </div>

        </div>
    );
};

export default DAO;




