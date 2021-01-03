import { httpService } from './HttpService'


export const bitcoinService = {
  getRate() {
    return httpService.get('https://api.blockchain.info/tobtc?currency=USD&value=100000&cors=true1')
  },

  getTradeVolume() {
    return httpService.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
  },

  getMarketPrice() {
    return httpService.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
  },

  
}