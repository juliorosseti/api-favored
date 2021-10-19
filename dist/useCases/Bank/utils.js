const allowedBankAccountTypes = {
    CONTA_CORRENTE: "Conta corrente",
    CONTA_POUPANCA: "Conta poupança",
    CONTA_FACIL: "Conta facil",
};
const allowedBankCompes = [
    {
        compe: "237",
        name: "Bradesco",
        avatar: "https://logodownload.org/wp-content/uploads/2018/09/bradesco-logo-novo-2018-14.png",
    },
    {
        compe: "104",
        name: "Caixa Econômica Federal",
        avatar: "https://logodownload.org/wp-content/uploads/2014/02/caixa-logo.png",
    },
    {
        compe: "756",
        name: "Sicoob",
        avatar: "https://logodownload.org/wp-content/uploads/2017/11/sicoob-logo-6.png",
    },
    {
        compe: "001",
        name: "Banco do Brasil",
        avatar: "https://logodownload.org/wp-content/uploads/2014/05/banco-do-brasil-logo.png",
    },
];
module.exports = { allowedBankAccountTypes, allowedBankCompes };
