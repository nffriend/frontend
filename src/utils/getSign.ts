import Web3 from 'web3'
import * as ethers from 'ethers'

export async function getSign(
  dataToSign: string,
  account: string | undefined | null,
  provider: any = Web3.givenProvider
) {
  const web3 = new Web3(provider)
  if (!account) return
  try {
    const sign = await web3.eth.personal.sign(dataToSign, account, '')
    return sign
  } catch (e) {
    return ""
  }
}

export async function getWeb3Sign(
  dataToSign: string,
  account: string | undefined | null,
  provider: any = Web3.givenProvider
) {
  const web3 = new Web3(provider)
  if (!account) return
  try {
    return await web3.eth.personal.sign(web3.utils.utf8ToHex(dataToSign), account, '')
  } catch (e) {
    return null
  }
}
