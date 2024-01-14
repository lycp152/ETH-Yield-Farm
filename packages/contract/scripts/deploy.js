const hre = require("hardhat");
const web3 = require("web3");

async function main() {
  // コントラクトをdeployしているアドレスの取得
  const [deployer] = await hre.ethers.getSigners();

  // コントラクトのdeploy
  const daitokenContractFactory = await hre.ethers.getContractFactory(
    "DaiToken"
  );
  const dapptokenContractFactory = await hre.ethers.getContractFactory(
    "DappToken"
  );
  const tokenfarmContractFactory = await hre.ethers.getContractFactory(
    "TokenFarm"
  );
  const daiToken = await daitokenContractFactory.deploy();
  const dappToken = await dapptokenContractFactory.deploy();
  const tokenFarm = await tokenfarmContractFactory.deploy(
    dappToken.address,
    daiToken.address
  );

  // 全てのDappトークンをファームに移動する(1 million)
  await dappToken.transfer(
    tokenFarm.address,
    web3.utils.toWei("1000000", "ether")
  );

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Dai Token Contract has been deployed to: ", daiToken.address);
  console.log("Dapp Token Contract has been deployed to: ", dappToken.address);
  console.log("TokenFarm Contract has been deployed to: ", tokenFarm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
