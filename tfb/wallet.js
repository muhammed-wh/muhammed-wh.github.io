
var apiUrl = 'http://localhost:33500';
var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDQ2IiwiZW1haWwiOiJmZWVkYmFja2NoYWluQGdtYWlsLmNvbSIsImRpZCI6IjdGNEM2ODYzLTk3QUEtNEE4My05NEM5LTNEMzAyRjVFMzg2NCIsImxuZyI6ImVuIiwiaWF0IjoxNjI2MDM5MTQzfQ.u_cjQ_UH6JnJexuWXMeOirMWOrUG0_2w1e8gPrmvbuQ';

var tfbWallet = {};

tfbWallet.generatePrivateKey = async function() {
    var res = await fetch(`${apiUrl}/wallet/newPK`, {
        headers: {
            "auth": jwtToken
        }
    });
    res = await res.json();
    return res.pk;
}

tfbWallet.getInstance = async function(privateKey) {
    return createWallet(privateKey);
}


tfbWallet.createWallet = async function(privateKey) {
    var pkJwt = await fetch(`${apiUrl}/user/pk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "auth": jwtToken
        },
        body: JSON.stringify({
            "pk": privateKey
        })
    });
    pkJwt = await pkJwt.json();

    var headerObj = {
        headers: {
            'Content-Type': 'application/json',
            "auth": pkJwt.token
        }
    };

    async function getAddress() {
        var res = await fetch(`${apiUrl}/wallet/address`, headerObj);
        res = await res.json();
        return res.address;
    }

    async function getBalance(currency) {
        const validCurrencies = ['CELO', 'cUSD', 'TFB'];
        if (validCurrencies.includes(currency) == false) {
            throw new Error('Invalid currency ', currency, 'Please use one of these = ', validCurrencies.join(','));
        }
        var res = await fetch(`${apiUrl}/wallet/balance/${currency}`, headerObj);
        res = await res.json();
        return res.balance;
    }

    async function sendTransaction(currency, amount, recipientAddress, feeCurrency) {
        //console.log(currency, amount, recipientAddress, feeCurrency);
        feeCurrency = feeCurrency || 'CELO';

        const validCurrencies = ['CELO', 'cUSD', 'TFB'];
        if (validCurrencies.includes(currency) == false) {
            throw new Error('Invalid currency ' + currency + '. Please use one of these = ' + validCurrencies.join(','));
        }
        const validFeeCurrencies = ['CELO', 'cUSD'];
        if (validFeeCurrencies.includes(feeCurrency) == false) {
            throw new Error('Invalid fee currency ' + feeCurrency + '. Please use one of these = ' + validFeeCurrencies.join(','));
        }
        if (typeof amount != 'string' || /^([0-9]*[.])?[0-9]+$/.test(amount) == false) {
            throw new Error('Invalid amount = ' + amount);
        }
        if (typeof recipientAddress != 'string' || utils.isAddress(recipientAddress) == false) {
            throw new Error('Invalid  Address = ' + recipientAddress);
        }
        if (account.address == recipientAddress) {
            throw new Error('Trying to send to yourself :)');
        }

        var data = {
            currency,
            amount,
            recipientAddress,
            feeCurrency
        };
        var res = await fetch(`${apiUrl}/wallet/transferTransaction`, {
            method:'POST',
            body: JSON.stringify(data),
            ...headerObj
        });
        res = await res.json();
        return res;
    }

    /*getTransactionHistory(currency, limit, offset, orderBy, orderDir)
	[
		{
			datetime: ‘’,
			type: ‘send/receive/claim’,
			amount: ‘123.12313’,
			currency: ‘’
		}
    ]*/
    async function getTransactionHistory(currency, limit, offset, orderBy, orderDir) {
        //
    }


    return {
        getAddress,
        getBalance,
        sendTransaction,
    };
}