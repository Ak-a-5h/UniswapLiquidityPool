import {ethers} from 'ethers';
// import axios from 'axios';





const uniswapFactoryAddress = '0x1f98431c8ad98523631ae4a59f267346ea31f984';
// const apiKeyPolyscan = `QZ477QF5TP1UJE9BNZGRQKMASWE6WQ4815`;

const AlchemyProvider = 'https://polygon-mumbai.g.alchemy.com/v2/4kxoR12KYqX4yIsX9Wq0tGAld44toDRm';

const provider = new ethers.providers.JsonRpcProvider(AlchemyProvider);

const walletAddress = "0xA73E0C0A7a87d5AE7545C50b943a2477d7c91549";

const walletSecret = "9c646b676124ca327bb536d3551482475201076c8aade39104a7f417998a00d2";

const stanTokenAddr = "0x08a2e53A8DDD2Dd1d895C18928fc63778D97A55a";

const influencerTokenAddr = "0x6d7a02e23505a74143199abB5FB07e6eA20C6D63";

const wallet = new ethers.Wallet(walletSecret);

const connectedWallet = wallet.connect(provider);
// console.log(" Reached Here 1");

async function main(){

   
    const uniswapFactoryAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":true,"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"FeeAmountEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":false,"internalType":"int24","name":"tickSpacing","type":"int24"},{"indexed":false,"internalType":"address","name":"pool","type":"address"}],"name":"PoolCreated","type":"event"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"enableFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"","type":"uint24"}],"name":"feeAmountTickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint24","name":"","type":"uint24"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"parameters","outputs":[{"internalType":"address","name":"factory","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    const contractFactory = new ethers.Contract(uniswapFactoryAddress, uniswapFactoryAbi, connectedWallet);
    console.log("Reached here");
    console.log(" Contract Factory =>", contractFactory);
    
    //creating pool

    const tx = await contractFactory.connect(connectedWallet).createPool(
        stanTokenAddr,
        influencerTokenAddr,
        500,
        {
            gasLimit:6232234
        }
    ).catch((e: any)=>{console.log("contractfactory connection pool failed ..... " , e)});
    
    const receipt = await tx.wait().catch((e:any)=>{
        console.log(" Tx await Failed",e);
    });
    console.log("Receipt Output=>",receipt);

    // //Fetching Pool Address
    const poolAddress = await contractFactory.connect(connectedWallet).getPool(
        stanTokenAddr,
        influencerTokenAddr,
        500,
        {
            gasLimit: 6232234
        }
        
    ) 

    console.log(" New Pool Generated at address:=>", poolAddress);





}

main();