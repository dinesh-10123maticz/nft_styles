// import ERC721 from '../../src/Abi/erc721.json'
// import ERC1155 from '../../src/Abi/erc1155.json'
// import TRADE from '../../src/Abi/market.json'
// import profile from '../../assets/images/avatar.png'
const EnvName = 'demo';
var key = {};
key.KEY = 'CardBo@rD1290%6Fine3'
key.ONEDAYINSECONDS = 0
key.env = EnvName
key.ENCODEKEY = 'encodenft@x'
key.BLOCKS_PER_YEAR = 0
key.RPAD_ADDRESS = ''
key.ROUTER = ''
key.EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
key.MOBILE = /^\d{10}$/
key.NumOnly = /^\d+$/
key.PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
key.OnlyAlbhabets = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/
key.notSpecil = /^[a-zA-Z0-9]+$/
key.OnlyAlphSpecial = /^[A-Za-z_@.#&+-]*$/
key.IPFS = 'https://ipfs.io/ipfs/'
key.DecimalAlloweddigits = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/
key.limit = 50
key.NumDigitOnly = /[^0-9\.]/g
key.NumberOnly = /[^0-9]/g
key.defaultProfile = "/img/user/user_avatar.gif"
key.months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

if (EnvName === "demo") {
    key.FRONT_URL = 'http://nftdemo.bimaticz.com/naifty'
    key.BACK_URL = 'https://backend-nftsolana.maticz.in/v1/front'
    key.ADMIN_URL = 'https://backend-nftsolana.maticz.in/v1/admin'
    key.IMG_URL = 'https://backend-nftsolana.maticz.in'
    key.network = "devnet"
    key.erc20Address = '7uJSXwU5iNEw2v7eQBkuaMo2RsNS7P5qcYFvy92GDodX'.toLowerCase()
    key.DEADADDRESS = '0x000000000000000000000000000000000000dEaD'.toLowerCase()
    key.Network = "SOLANA"
    key.COIN_NAME = "SOL"
    key.Block_URL = 'https://solscan.io/account/'
    key.devnet = "?cluster=devnet"
    key.network = "devnet"
    key.TradeContract = "4mRv6Rz1vWWE5BKm5ZjjdEFvW2Sg3FQAqgU3eEbaXfMa"
}

else if (EnvName === "production") {
    key.FRONT_URL = 'http://nftdemo.bimaticz.com/naifty'
    key.BACK_URL = ''
    key.ADMIN_URL = ''
    key.IMG_URL = ''
    key.network = "mainnet"
    key.erc20Address = ''.toLowerCase() // Token address
    key.DEADADDRESS = '0x000000000000000000000000000000000000dEaD'.toLowerCase()
    key.Network = "SOLANA"
    key.COIN_NAME = "SOL"
    key.Block_URL = 'https://solscan.io/account/'
    key.devnet = ""
    key.network = "mainnet"
    key.TradeContract = "4mRv6Rz1vWWE5BKm5ZjjdEFvW2Sg3FQAqgU3eEbaXfMa"
}
else {
    key.FRONT_URL = 'http://localhost:3000/'
    key.BACK_URL = 'http://localhost:5001/v1/front'
    key.ADMIN_URL = 'http://localhost:5001/v1/admin'
    key.IMG_URL = 'http://localhost:5001'
    key.DEADADDRESS = '0x000000000000000000000000000000000000dEaD'.toLowerCase()
    key.erc20Address = '7uJSXwU5iNEw2v7eQBkuaMo2RsNS7P5qcYFvy92GDodX'.toLowerCase()
    key.RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc"
    key.Network = "SOLANA"
    key.COIN_NAME = "SOL"
    key.Block_URL = 'https://solscan.io/account/'
    key.network = "devnet"
     key.devnet = "?cluster=devnet"
    key.IPFS = 'https://naifty.infura-ipfs.io/ipfs/'
    key.TradeContract = "4mRv6Rz1vWWE5BKm5ZjjdEFvW2Sg3FQAqgU3eEbaXfMa"
}
export default key;
