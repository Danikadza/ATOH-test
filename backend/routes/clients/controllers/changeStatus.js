const { Clients } = require("./typedData");
const {TypedValues} = require("ydb-sdk");

async function getClientsQuery(session, {AccountNumber, Status}) {
    const query = `
  DECLARE $status AS Utf8;
  DECLARE $accountNumber AS Uint64;
  UPDATE clients
  SET Status = $status
  WHERE AccountNumber = $accountNumber;
    `;

    const preparedQuery = await session.prepareQuery(query);
    await session.executeQuery(preparedQuery, {
        $status: TypedValues.utf8(Status),
        $accountNumber: TypedValues.uint64(AccountNumber),
    });
}

const changeStatus = async (req, res) => {
    try {
        const data = req.body;
        await getClientsQuery(req.ydbSession, data)
    } catch (err) {
        console.error(err, '/clients')
        res.status(400).send('Smth went wrong')
        return
    }
}

module.exports = {
    changeStatus
}