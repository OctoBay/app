const Web3 = require("web3")
const { RelayProvider } = require('@opengsn/gsn')

export default async ({ app }, inject) => {
  if (window.ethereum) {
    const plainWeb3 = new Web3(window.ethereum || "ws://localhost:8545");

    // const gsnRelayProvider = await RelayProvider.newProvider({
    //   provider: plainWeb3.currentProvider,
    //   config: {
    //     relayHubInstance: process.env.GSN_RELAYHUB_ADDRESS,
    //     paymasterAddress: process.env.GSN_PAYMASTER_ADDRESS,
    //     loggerConfiguration: {
    //       logLevel: 'debug',
    //       loggerUrl: 'https://logger.opengsn.org',
    //       applicationId: 'octobay-dev'
    //     }
    //   }
    // }).init()

    const web3 = plainWeb3 // new Web3(gsnRelayProvider)
    const octoBay = new web3.eth.Contract(process.env.OCTOBAY_ABI, process.env.OCTOBAY_ADDRESS)
    const octoPin = new web3.eth.Contract(process.env.OCTOPIN_ABI, process.env.OCTOPIN_ADDRESS)

    window.ethereum.on('accountsChanged', accounts => {
      app.store.dispatch('load')
    })

    window.ethereum.on('chainChanged', network => {
      app.store.dispatch('load')
    })

    inject('octoBay', octoBay)
    inject('octoPin', octoPin)
    inject('web3', web3)
  }
}
