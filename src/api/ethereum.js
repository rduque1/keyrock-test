import { Router } from 'express'
import { default as Web3} from 'web3'
import { default as check } from 'express-validator/check'
import {addressValidator, validationHandler, hexValidor, numberValidator} from '../lib/util'
const {param, body, validationResult} = check

const weiUnit = Object.entries(Web3.utils.unitMap).find( u => u[1]==1 )[0]

export default config => {
  const router = Router()
  const web3   = new Web3( config.web3.httpProvider )

  router.get("/createWallet", async (req, res, next) => {
    try {
      var account = await web3.eth.accounts.create()
      res.json(account)
    } catch (e) {
      next(e)
    }
  })

  router.get("/getBalance/:ethAddress", param('ethAddress').exists().custom( addressValidator ), validationHandler, async (req, res, next) => {
    try {
      res.json( { balance: await web3.eth.getBalance(req.params.ethAddress), unit: weiUnit  })
    } catch (e) {
      next(e)
    }
  })

  router.post("/transaction",[
      body('destination').exists().custom( addressValidator ),
      body('privateKey').exists().isLength({ min: 40 }).custom( hexValidor ),
      body('amount').exists().custom( numberValidator )
    ], validationHandler
  )

  router.post("/transaction", async (req, res, next) => {
    try {
      var receipt     = null
      var params      = req.body
      var account     = await web3.eth.accounts.privateKeyToAccount(params.privateKey)
      var transParams = {
        from:  account.address,
        to:    params.destination,
        value: web3.utils.toWei(`${params.amount}`, 'ether')
      }
      transParams.gas = await web3.eth.estimateGas(transParams)
      var signedTx    = await account.signTransaction(transParams)
      receipt         = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      res.json(receipt)
    } catch (e) {
      next(e)
    }
  })

  return router
}
