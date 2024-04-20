const { Clients } = require("./typedData");
const {TypedValues} = require("ydb-sdk");

async function getClientsQuery(session, ResponsibleFullName) {
    const query = `
  DECLARE $responsible AS Utf8;
  SELECT 
  AccountNumber, 
  LastName, 
  FirstName, 
  MiddleName, 
  DateOfBirth, 
  INN, 
  ResponsibleFullName, 
  Status 
FROM 
    clients
WHERE 
  ResponsibleFullName = $responsible;
    `;

    const preparedQuery = await session.prepareQuery(query);
    const { resultSets } = await session.executeQuery(preparedQuery, {
        $responsible: TypedValues.utf8(ResponsibleFullName),
    });
    return Clients.createNativeObjects(resultSets[0])
}

const getAllUserClients = async (req, res) => {
    try {
        const { user } = req.params;
        const clients = await getClientsQuery(req.ydbSession, user)
        res.send(clients)
    } catch (err) {
        console.error(err, '/clients')
        res.status(400).send('Smth went wrong')
    }
}

module.exports = {
    getAllUserClients
}